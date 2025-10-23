import  { TaskDefault, Status, Priority, Levels, Roles, TaskType}from "./types"
import { DEF_DESCRIPTION, DEF_CREATED_AT, DEF_STATUS, DEF_PRIORITY, DEF_DEADLINE, DEF_TITLE } from './constants'
const API_URL = 'http://localhost:3001/tasks';

async function getAllTasks(): Promise<TaskDefault[]> {
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

async function getTaskById(id: number): Promise<TaskDefault> {
    try{
        const response = await fetch(`${API_URL}/${id}`)
        if (!response.ok){
            throw new Error(`Error - > Task ${id} doesn't exist!}`)
        }
        const task = await response.json()
        console.log(`Here's Task${id} -> ${task}`)
        return task
    }
    catch(error) {
        console.error('Error task existing:', error)
        throw error;
    }

}

async function createTask(taskData : Partial<TaskDefault>): Promise<TaskDefault> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
}

 async function updateTask(id: number, taskData: TaskDefault): Promise<TaskDefault> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json();
}

async function deleteTask(id: number): Promise<void> {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}


export {
    getTaskById,
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
}
export type { Status, Priority, TaskType, TaskDefault } from './types';
