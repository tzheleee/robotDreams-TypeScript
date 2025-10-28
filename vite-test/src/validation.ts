import { z } from 'zod'
import { TaskDefault, Status, Priority, TaskType } from './types';
import { DEF_TITLE, DEF_DESCRIPTION, DEF_CREATED_AT, DEF_STATUS, DEF_PRIORITY, DEF_DEADLINE } from './constants';

function validation(data: Partial<TaskDefault> | any): TaskDefault | TaskDefault[] {
    const tasksValidation = z.object({
        typeOfTask: z.string(),
        id: z.number().optional(),
        title: z.string().default(DEF_TITLE),
        description: z.string().optional().default(DEF_DESCRIPTION),
        createdAt: z.string().optional().default(DEF_CREATED_AT),
        status: z.string().optional().default(DEF_STATUS),
        priority: z.string().optional().default(DEF_PRIORITY),
        deadline: z.union([z.string(), z.date()]).optional().default(DEF_DEADLINE)
    });

    if (Array.isArray(data)) {
        const result = z.array(tasksValidation).safeParse(data);
        if (!result.success) {
            throw new Error(result.error.message);
        }
        return result.data as TaskDefault[];
    } else {
        const result = tasksValidation.safeParse(data);
        if (!result.success) {
            throw new Error(result.error.message);
        }
        return result.data as TaskDefault;
    }
}

function validateFormData(formData: FormData): Partial<TaskDefault> {
    const rawData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        status: formData.get('status') as string,
        priority: formData.get('priority') as string,
        deadline: formData.get('deadline') as string,
        typeOfTask: 'task' as TaskType
    };

    return validation(rawData) as Partial<TaskDefault>;
}

export{
    validation,
    validateFormData
}

