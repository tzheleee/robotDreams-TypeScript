export type Status = 'todo' | 'in_progres' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export type Task= {
    id: number
    title: string
    description?: string
    createdAt?: string | Date
    status?: Status
    priority?: Priority
    deadline?: string | Date
}
