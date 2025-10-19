import { TaskDefault, TaskType, Status, Priority } from './types';
import { Task, Subtask, Bug, Story, Epic } from './task.types';
import { z } from 'zod';
import data from '../../../tasks.json'
import { DEF_CREATED_AT, DEF_DEADLINE, DEF_DESCRIPTION, DEF_PRIORITY, DEF_STATUS, DEF_TITLE } from './constants';
import promptSync from 'prompt-sync';
const prompt = promptSync();

export class TaskService{
    private tasksMassive: Task[] = []

    private validation(data: Partial<TaskDefault>): TaskDefault {
        const tasksValidation = z.object({
            typeOfTask: z.string(),
            id: z.number().optional(),
            title: z.string().default(DEF_TITLE),
            description: z.string().optional().default(DEF_DESCRIPTION),
            createdAt: z.string().optional().default(DEF_CREATED_AT),
            status: z.string().optional().default(DEF_STATUS),
            priority: z.string().optional().default(DEF_PRIORITY),
            deadline: z.union([z.string(), z.date()]).optional().default(DEF_DEADLINE)
        })

        const result = tasksValidation.safeParse(data)  
        if (!result.success) {
            throw new Error(result.error.message)
        }
        return result.data as TaskDefault
    }

    private validationArray(data: any[]): TaskDefault[] {
        const taskSchema = z.object({
            typeOfTask: z.string(),
            id: z.number(),
            title: z.string().default(DEF_TITLE),
            description: z.string().optional().default(DEF_DESCRIPTION),
            createdAt: z.string().optional().default(DEF_CREATED_AT),
            status: z.string().optional().default(DEF_STATUS),
            priority: z.string().optional().default(DEF_PRIORITY),
            deadline: z.union([z.string(), z.date()]).optional().default(DEF_DEADLINE)
        })

        const result = z.array(taskSchema).safeParse(data)  
        if (!result.success) {
            throw new Error(result.error.message)
        }
        return result.data as TaskDefault[]
    }
    
    public loadTasksFromJSON(): void {
        // console.log('First task in JSON:', data[0]); 
        const validatedData = this.validationArray(data)

        validatedData.forEach((taskData: TaskDefault) => {
            const task = new Task(taskData)
            this.tasksMassive.push(task)
        })
        // console.log('JSON structure:', data[0]);

        console.log(`Succesfully loaded ${this.tasksMassive.length} tasks from JSON`)
    }

    isTaskExist(taskId: number){
        const taskExist = this.tasksMassive.find(t => t.id === taskId)
        if (taskExist){
            console.log(`Here is Task ${taskId}`)
            taskExist.getTaskInfo()
        }else {
            console.log(`Task ${taskId} doesnt exist!`)
        }
    }

    showTasks(): Task[]{
        return this.tasksMassive
    }

    addTask(taskData: Partial<TaskDefault> = {}){
        const validatedData = this.validation(taskData);

        const newTask = new Task({
            typeOfTask: validatedData.typeOfTask ?? 'task',
            id: this.tasksMassive.length + 1,
            title: validatedData.title ?? `${DEF_TITLE}${this.tasksMassive.length} `,
            description: validatedData.description ?? DEF_DESCRIPTION,
            createdAt: DEF_CREATED_AT,
            status: validatedData.status ?? DEF_STATUS,
            priority: validatedData.priority ?? DEF_PRIORITY,
            deadline: validatedData.deadline ?? DEF_DEADLINE
        })
        
        this.tasksMassive.push(newTask)
        console.log(`  NEW TASK - ${newTask.title}${this.tasksMassive.length } was added!`)
        return newTask
    }

    updateTask(taskId: number, updatedFields: Partial<TaskDefault>){
        const taskToUpdate = this.tasksMassive.find(task => task.id === taskId)
        if(!taskToUpdate){
            console.log(`Task for updating (TaskId${taskId}) haven't found!`)
        } else{
            Object.assign(taskToUpdate, updatedFields)
            console.log(`Task ${taskId} was succesfully updated!`)
            console.log(taskToUpdate)
        }
    }

    removeTask(taskId: number){
        const index = this.tasksMassive.findIndex(i => i.id === taskId)
        if (index === -1){
            console.log(`Task with Id ${taskId} not found`)
            
        }else{
            const deleted = this.tasksMassive.splice(index, 1)[0]!  
            console.log(`Task with Id ${taskId}(${deleted.title}) deleted succesfull`)
        }  
    }

    filterTasksByTaskType(typeOfTask: TaskType){
        console.log(`Tasks with Type "${typeOfTask}" --->`)
        console.log(this.tasksMassive.filter(tasks => tasks.typeOfTask === typeOfTask))
    }

    filterTasksByStatus(status: Status){
        console.log(`Tasks with Status "${status}" --->`)
        console.log(this.tasksMassive.filter(tasks => tasks.status === status))
    }

    filterTasksByPriority(priority: Priority){
        console.log(`Tasks with Priority "${priority}" --->`)
        console.log(this.tasksMassive.filter(tasks => tasks.priority === priority))
    }
    
    filterTaskByDate(){
        const input = prompt('Which date you want to find?(yyyy-mm-dd) - ')!.trim()
        const filterDate = new Date(input)
        if (!input || isNaN(filterDate.getTime())){
            console.log("Incorrect Input!")
        }
        const targetDate = filterDate.toDateString().split('T')[0]

        const filtered = this.tasksMassive.filter(task => {
            const taskDate = new Date(task.createdAt!).toDateString().split('T')[0]
            return taskDate === targetDate
        })

        console.log(`Found ${filtered.length} tasks for ${targetDate}`)
        return filtered;
    }

    checkDeadlineDate(){
        const deadlineDate = new Date()
        deadlineDate.setHours(23, 59, 59)
        const filteredDeadline = this.tasksMassive.filter(tasks => 
            tasks.deadline && (tasks.status === 'todo' || tasks.status === 'in_progress') && (new Date(tasks.deadline) <= deadlineDate))
        if (filteredDeadline.length === 0 ){
            console.log('Congrats, You finished all your tasks!')
        } else {
            console.log(`You have ${filteredDeadline.length} unfinished tasks!`)
        }
        return filteredDeadline
    }

}





