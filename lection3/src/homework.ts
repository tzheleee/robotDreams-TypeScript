//  TO DO:
// update task

import tasks from '../tasks.json' 
import {z} from 'zod'
import {DEF_CREATED_AT, DEF_DEADLINE, DEF_DESCRIPTION, DEF_PRIORITY, DEF_STATUS, deadlineDate} from './constants'
import { Status,Priority, Task } from './types'
const prompt = require("prompt-sync")();

const tasksValidation = z.object({
    id: z.union([z.string(), z.number()]),
    title: z.string(),
    description: z.string().optional().default(DEF_DESCRIPTION),
    createdAt: z.string().optional().default(DEF_CREATED_AT),
    status: z.string().optional().default(DEF_STATUS),
    priority: z.string().optional().default(DEF_PRIORITY),
    deadline: z.union([z.string(), z.date()]).optional().default(DEF_DEADLINE)
})

let validatedArray = z.array(tasksValidation)
//type zodMovie = z.infer<typeof tasksValidation>
let result = validatedArray.safeParse(tasks).data ?? []
//console.log(result)

function getTaskDetails(taskId: string | number){
    let ifTaskExist = result?.find(t => t.id === taskId)
    if (ifTaskExist){
        console.log(ifTaskExist)
    }else {
        console.log(`Task ${taskId} doesnt exist!`)
    }
}

function createNewTask(taskData: Partial<Task> = {}){                               // <--
    const newTask = {
        id: result!.length + 1,
        title: taskData.title ?? `New Task ${taskData.id}`,
        description: taskData.description ?? DEF_DESCRIPTION,
        createdAt: DEF_CREATED_AT,
        status: taskData.status ?? DEF_STATUS,
        priority: taskData.priority ?? DEF_PRIORITY,
        deadline: taskData.deadline ?? DEF_DEADLINE
    }  
    result.push(newTask)
    console.log(`  NEW TASK - ${newTask}`)
    return newTask
}

function removeTask(taskId: string | number){
    const index = result!.findIndex(i => i.id === taskId)
    if (index === -1){
        console.log(`Task with Id ${index} not found`)
    }else{
        const deleted = result.splice(index, 1)[0]  
    }  
    console.log(`Task with Id ${index} deleted succesfull`)
}

function filterTasksByStatus(status: Status){
    return result!.filter(tasks => tasks.status === status)
}

function filterTasksByPriority(priority: Priority){
    return result!.filter(tasks => tasks.priority === priority)
}

function filterTaskByDate(){
    const input = prompt('Which date you want to find?(yyyy-mm-dd) - ')!.trim()
    const filterDate = new Date(input)
    if (!input || isNaN(filterDate.getTime())){
        console.log("Incorrect Input!")
    }
    const targetDate = filterDate.toDateString();

    const filtered = result!.filter(task => {
        const taskDate = new Date(task.createdAt).toDateString();
        return taskDate === targetDate;
    });

    console.log(`Found ${filtered.length} tasks for ${targetDate}`);
    return filtered;
}

function checkDeadlineDate(){
    const deadlineDate = new Date()
    deadlineDate.setHours(23, 59, 59)
    const filteredDeadline = result.filter(tasks => 
        tasks.deadline && (tasks.status === 'todo' || tasks.status === 'in_progress') && (new Date(tasks.deadline) <= deadlineDate))
    if (filteredDeadline.length === 0 ){
        console.log('Congrats, You finished all your tasks!')
    } else {
        console.log(`You have ${filteredDeadline.length} unfinished tasks!`)
    }
    return filteredDeadline
}

function updateTask(){
    
}

// getTaskDetails(1)
// console.log(createNewTask({}))

// console.log('Before delete - ',result)
// removeTask(2)
// console.log('After delete- ', result)

// console.log('Filter Status TODO :', filterTasksByStatus('todo'))
// console.log('Filter Priority LOW :', filterTasksByPriority('low'))
//filterTaskByDate()
//checkDeadlineDate()



// - - - - - - -- - - - - - - - - - - - - -  - - - - -- -- 


//          TO DO!!!
// function filterTasksByDate(createdAt?: string | number){
//     const filterDate = new Date(createdAt).toDateString();

//     return result!.filter(task => {
//         const taskDate = new Date(task.createdAt!).toDateString();
//         return taskDate === filterDate;
//     });
// }
//console.log(filterTasksByDate("Fri Oct 10 2025"))





