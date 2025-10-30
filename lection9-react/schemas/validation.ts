import { z } from "zod"
import { Task} from '../types/task';
import { DEF_TITLE, DEF_DESCRIPTION, DEF_CREATED_AT, DEF_STATUS, DEF_PRIORITY, DEF_DEADLINE } from '../types/constants';

export const taskSchema = z.object({
    //typeOfTask: z.string(),
    //id: z.number().optional(),
    title: z.string().min(1, 'Title required'),
    description: z.string().optional().default(DEF_DESCRIPTION),
    //createdAt: z.string().optional().default(DEF_CREATED_AT),
    status: z.string().optional().default(DEF_STATUS),
    priority: z.string().optional().default(DEF_PRIORITY),
    deadline: z.union([z.string(), z.date()]).optional().default(DEF_DEADLINE)
        .refine((date) => date && new Date(date) > new Date(), {
        message: "Deadline cannot be in the past"
    })
})

 export type TaskFormData = z.infer<typeof taskSchema>
   



