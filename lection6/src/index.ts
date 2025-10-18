import { TaskService } from './modules/tasks/task.service';
import { TaskDefault } from './modules/tasks/types';

const taskService = new TaskService()

const testTask: Partial<TaskDefault> =  {
    typeOfTask: 'task',
    description: 'Test description'
}
const allTasks = taskService.showTasks()

taskService.loadTasksFromJSON()
taskService.isTaskExist(13)
//taskService.isTaskExist(22)
taskService.isTaskExist(14)
taskService.addTask(testTask)
taskService.isTaskExist(14)
//console.log(allTasks)

