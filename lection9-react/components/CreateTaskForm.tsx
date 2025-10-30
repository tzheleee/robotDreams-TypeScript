import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema } from '../schemas/validation'
import { createTask } from '../api/taskAPI'
import { Task } from '../types/task'
import {z} from 'zod'
 
type TaskFormData = z.infer<typeof taskSchema>

export const CreateTaskForm = () =>{
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isValid },
        reset
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema as any),
        mode: 'onChange' 
    })

    const onSubmit = async (data: TaskFormData) => {
        try {
            await createTask(data as any)
            alert('Task created successfully!')
            reset()
        } catch (error) {
            console.error('Error creating task:', error)
            alert('Error creating task!')
        }
    }

    return (
    <div className='form-container'>
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} id="createTaskForm">
            <input {...register('title')} placeholder="Title" required></input>
            {errors.title && (
                    <span style={{color: 'red'}}>{errors.title.message}</span>
                )}
            <textarea {...register('description')} placeholder="Description"></textarea>
            <select {...register('status')} required> 
                <option value=""> Select status</option>
                <option value="todo"> To Do </option>
                <option value="in_progress"> In Progress </option>
                <option value="done"> Done </option>
            </select>
            {errors.status && (
                    <span style={{color: 'red'}}>{errors.status.message}</span>
                )}
            <select {...register('priority')} required>
                <option value=""> Select Priority </option>
                <option value="low"> Low </option>
                <option value="medium"> Medium </option>
                <option value="high">High </option>
            </select>
            {errors.priority && (
                    <span style={{color: 'red'}}>{errors.priority.message}</span>
                )}
            <input type="date" {...register('deadline')}></input>
            {errors.deadline && (
                    <span style={{color: 'red'}}>{errors.deadline.message}</span>
                )}
            <button type="submit">Create Task</button>
        </form>
    </div>
    )
}

