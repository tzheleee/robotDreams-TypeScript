import { TaskService } from './modules/tasks/task.service';
import { TaskDefault } from './modules/tasks/types';

const taskService = new TaskService()

const testTask: TaskDefault = {
    typeOfTask: 'task',
    id: 13,
    description: 'Test description'
}
const allTasks = taskService.showTasks()

taskService.isTaskExist(13)
taskService.addTask(testTask)
console.log(allTasks)

