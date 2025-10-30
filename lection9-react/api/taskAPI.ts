import  { Task, Status, Priority, Levels, Roles, TaskType}from "../types/task"
const API_URL = 'http://localhost:3001/tasks'

async function getAllTasks(): Promise<Task[]> {
    try{
        const response = await fetch(API_URL)
        if (!response.ok){
            throw new Error(`HTML error - > ${response.status}`)
        }
        const data = await response.json()
        return data
    }
    catch(error) {
        console.error('Error fetching tasks:', error)
        throw error;
    }
}
async function createTask(taskData : Omit<Task, 'id'>): Promise<Task> {
    const tasksCount = await getAllTasks()
    const maxId = tasksCount.length > 0 ? Math.max(...tasksCount.map(task => task.id)) : 0;
    const newId = maxId + 1;
    const taskWithId = {
        ...taskData,
        typeOfTask: 'task' as const,
        id: newId,
        createdAt: new Date().toDateString(),  
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(taskWithId)
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
}

// async function getTaskById(id: number): Promise<Task> {
//     try{
//         const response = await fetch(`${API_URL}/${id}`)
//         if (!response.ok){
//             throw new Error(`Error - > Task ${id} doesn't exist!}`)
//         }
//         const task = await response.json()
//         console.log(`Here's Task${id} -> ${task}`)
//         return task
//     }
//     catch(error) {
//         console.error('Error task existing:', error)
//         throw error;
//     }

// }

//  async function updateTask(id: number, taskData: Task): Promise<Task> {
//     const response = await fetch(`${API_URL}/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(taskData)
//     })
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//     }
//     return await response.json();
// }

// async function deleteTask(id: number): Promise<void> {
//     console.log(`Deleting task with ID: ${id}`)

//     const response = await fetch(`${API_URL}/${id.toString()}`, { 
//         method: 'DELETE' 
//     })
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//     }
//     console.log(`Task ${id} deleted successfully`);
// }


export {
    createTask,
    getAllTasks,
    // getTaskById,
    // updateTask,
    // deleteTask
}
export type { Status, Priority, TaskType, Task } from '../types/task';
