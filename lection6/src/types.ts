export type Status = 'todo' | 'in_progress' | 'done'
export type Priority = 'low' | 'medium' | 'high'
export type Levels = 'minor' | 'major' | 'critical'
export type Roles = 'admin' | 'user'
export type TaskType = 'task' | 'subtask' | 'bug' | 'story' | 'epic'


export type TaskDefault= {
    typeOfTask: TaskType
    id: number
    title: string
    description?: string
    createdAt?: string | Date
    status?: Status
    priority?: Priority
    deadline?: string | Date
}

