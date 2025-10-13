export type Status = 'todo' | 'in_progres' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export type Task= {
    id: string | number
    title: string
    description?: string
    createdAt?: string | Date
    status?: Status
    priority?: Priority
    deadline?: string | Date
}
