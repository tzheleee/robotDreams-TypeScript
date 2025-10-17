import { TaskDefault, TaskType, Status, Priority } from './types';
import { Task, Subtask, Bug, Story, Epic } from './task.types';
import { z } from 'zod';
import data from '../../../tasks.json'
import { DEF_CREATED_AT, DEF_DEADLINE, DEF_DESCRIPTION, DEF_PRIORITY, DEF_STATUS, DEF_TITLE } from './constants';

export class TaskService{
    private tasksMassive: Task[] = []

    private validation(data: Partial<TaskDefault>): TaskDefault{
        const tasksValidation = z.object({
            typeOfTask: z.string(),
            id: z.number(),
            title: z.string().default(DEF_TITLE),
            description: z.string().optional().default(DEF_DESCRIPTION),
            createdAt: z.string().optional().default(DEF_CREATED_AT),
            status: z.string().optional().default(DEF_STATUS),
            priority: z.string().optional().default(DEF_PRIORITY),
            deadline: z.union([z.string(), z.date()]).optional().default(DEF_DEADLINE)
        })

        const validatedResult = z.array(tasksValidation)
        let result = validatedResult.safeParse(data).data ?? []
        console.log(result)
        // const result = tasksValidation.safeParse(data)
        // if (!result.success) {
        //     throw new Error(result.error.message)
        // }
        // return result.data as TaskDefault
    }

    isTaskExist(taskId: number){
        const taskExist = this.tasksMassive.find(t => t.id === taskId)
        if (taskExist){
            console.log(taskExist)
        }else {
            console.log(`Task ${taskId} doesnt exist!`)
        }
    }

    showTasks(): Task[]{
        return this.tasksMassive
    }

    addTask(taskData: Partial<Task> = {}){
        const validatedData = this.validation(taskData);

        const newTask = new Task({
            typeOfTask: validatedData.typeOfTask ?? 'task',
            id: this.tasksMassive.length + 1,
            title: validatedData.title ?? `${DEF_TITLE} ${this.tasksMassive.length + 1}`,
            description: validatedData.description ?? DEF_DESCRIPTION,
            createdAt: DEF_CREATED_AT,
            status: validatedData.status ?? DEF_STATUS,
            priority: validatedData.priority ?? DEF_PRIORITY,
            deadline: validatedData.deadline ?? DEF_DEADLINE
        })
        
    this.tasksMassive.push(newTask)
    console.log(`  NEW TASK - ${newTask.title} was added!`)
    return newTask
    }
}





