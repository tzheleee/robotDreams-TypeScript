import  { TaskDefault, Status, Priority, Levels, Roles, TaskType}from "../../types"
import { DEF_DESCRIPTION, DEF_CREATED_AT, DEF_STATUS, DEF_PRIORITY, DEF_DEADLINE } from '../../constants'
import { z } from 'zod'
import tasks from '../../../tasks.json' 



export class Task implements TaskDefault{
    typeOfTask: TaskType
    id: number
    title: string
    description?: string
    createdAt?: string | Date
    status?: Status
    priority?: Priority
    deadline?: string | Date

    constructor({typeOfTask, id, title, description, createdAt, 
                status, priority, deadline}: TaskDefault){
        this.typeOfTask = typeOfTask
        this.id = id
        this. title = title
        this.description = description ?? DEF_DESCRIPTION
        this.createdAt = createdAt ?? DEF_CREATED_AT
        this.status = status ?? DEF_STATUS
        this.priority = priority ?? DEF_PRIORITY
        this.deadline = deadline ?? DEF_DEADLINE
    }

    getTaskInfo(){
        console.log(` taskID: ${this.id}\n TITLE: ${this.title}\n DESCRIPTION: ${this.description}\n CREATED AT: ${this.createdAt}\n
            STATUS: ${this.status}\n PRIORITY: ${this.priority}\n DEADLINE: ${this.deadline}`)
    }

    validate(){
        const tasksValidation = z.object({
            typeOfTask: z.string(),
            id: z.number(),
            title: z.string(),
            description: z.string().optional().default(DEF_DESCRIPTION),
            createdAt: z.string().optional().default(DEF_CREATED_AT),
            status: z.string().optional().default(DEF_STATUS),
            priority: z.string().optional().default(DEF_PRIORITY),
            deadline: z.union([z.string(), z.date()]).optional().default(DEF_DEADLINE)
        })
        let validatedArray = z.array(tasksValidation)
        let result = validatedArray.safeParse(tasks).data ?? []
        console.log(result)
    }
}

export class Subtask extends Task{
    parentId: number
    subtaskDescription: string
    isDone: boolean

    constructor({typeOfTask, id, title, description, createdAt, status, priority, deadline}: TaskDefault, 
                parentId: number, subtaskDescription: string, isDone: boolean){
        super({typeOfTask, id, title, description, createdAt, status, priority, deadline})
        this.parentId = parentId
        this.subtaskDescription = subtaskDescription
        this.isDone = isDone
    }
    getTaskInfo(){
        super.getTaskInfo()
        console.log(` Subtask: ${this.subtaskDescription}`)
    }
}

export class Bug  extends Task {
    importanceLevel: Levels
    bugDescription: string
    stepsToReproduce: string

    constructor({typeOfTask, id, title, description, createdAt, status, priority, deadline}: TaskDefault, 
                importanceLevel: Levels, bugDescription: string, stepsToReproduce: string){
        super({typeOfTask, id, title, description, createdAt, status, priority, deadline})
        this.importanceLevel = importanceLevel
        this.bugDescription = bugDescription
        this.stepsToReproduce = stepsToReproduce
    }

    getTaskInfo(){
        super.getTaskInfo()
        console.log(`Bug Importance: ${this.importanceLevel}\n Bug Description: ${this.bugDescription}\n 
            Steps to reproduce: ${this.stepsToReproduce}`)
    }

}

export class Story extends Task{
    userRole: Roles
    acceptanceCriteria: string


    constructor({typeOfTask, id, title, description, createdAt, status, priority, deadline}: TaskDefault, 
                userRole: Roles, acceptanceCriteria: string){
        super({typeOfTask, id, title, description, createdAt, status, priority, deadline})
        this.userRole = userRole
        this.acceptanceCriteria = acceptanceCriteria
    }

    getTaskInfo(){
        super.getTaskInfo()
        console.log(`Task for: ${this.userRole}\n ToDo: ${this.acceptanceCriteria}`)
    }
    
}

export class Epic extends Task{
    tasksInEpic: Task[]
    progress: number
    summary: string


    constructor({typeOfTask, id, title, description, createdAt, status, priority, deadline}: TaskDefault, 
                tasksInEpic: Task[], progress: number, summary: string){
        super({typeOfTask, id, title, description, createdAt, status, priority, deadline})
        this.tasksInEpic = tasksInEpic
        this.progress = progress
        this.summary = summary
    }

    getTaskInfo(){
        super.getTaskInfo()
        console.log(`Summary: ${this.summary}\nProgress: ${this.progress}%\nTasks in epic: ${this.tasksInEpic.length}`)
    }
}

export class GeneralTask{

}