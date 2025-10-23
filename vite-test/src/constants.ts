import {Status, Priority} from './types'


export const DEF_TITLE: string = 'New Task'
export const DEF_DESCRIPTION: string = '---'
export const DEF_CREATED_AT: string = new Date().toDateString()
export const DEF_STATUS: Status = 'todo'
export const DEF_PRIORITY: Priority = 'high'
export const deadlineDate = new Date()
    deadlineDate.setDate(deadlineDate.getDate() + 5)
export const DEF_DEADLINE: string = deadlineDate.toDateString()