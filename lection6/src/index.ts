import { TaskService } from './modules/tasks/task.service';
import { TaskDefault } from './modules/tasks/types';

const taskService = new TaskService()

const testTask: Partial<TaskDefault> =  {
    typeOfTask: 'task',
    description: 'Test description'
}

taskService.loadTasksFromJSON()
// console.log(taskService.showTasks())
// console.log(allTasks)

// taskService.isTaskExist(13)
// taskService.isTaskExist(22)

// taskService.isTaskExist(14)
// taskService.addTask(testTask)
// taskService.isTaskExist(14)

// taskService.removeTask(14)
// taskService.isTaskExist(1)

// taskService.filterTasksByStatus('done')
// taskService.filterTasksByPriority('low')
// taskService.filterTaskByDate()
// taskService.filterTasksByTaskType('epic')
// taskService.checkDeadlineDate()
// taskService.isTaskExist(2)
// taskService.updateTask(2, {status: 'done'})

// taskService.addTask(testTask)
// taskService.saveTasksToJSON()

