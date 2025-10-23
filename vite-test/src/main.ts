import './style.css'
import * as API from './api'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1> Task Manager </h1>
    <div class="card">
      <input type="number" id="taskIdInput" placeholder="Enter task ID">
      <button id="findTaskBtn" type="button"> Find task by ID </button>
      <button id="createTaskForm" type="button" >Create Task</button>
      <button id="loadTaskBtn" type="button"> Load all tasks </button>
    

    </div>

    <div id="tasksContainer">
    </div>
  </div>
`


const loadTasksBtn = document.getElementById('loadTaskBtn') as HTMLButtonElement
const findTasksByIdBtn = document.getElementById('findTaskBtn') as HTMLButtonElement
const taskIdInput = document.getElementById('taskIdInput') as HTMLInputElement;
const tasksContainer = document.getElementById('tasksContainer') as HTMLDivElement


loadTasksBtn.addEventListener('click', () =>
  API.getAllTasks()
    .then(displayTasks)
    .catch(handleError)
)

findTasksByIdBtn.addEventListener('click', () => {
  const taskId = parseInt(taskIdInput.value)

  if (!taskId){
    alert('Invalid TaskId!')
      return
  }
  API.getTaskById(taskId)
    .then(task => {
      if (task){
        displayTasks([task])
      } else {
        tasksContainer.innerHTML = `<p>Task with ID ${taskId} not found!</p>`
      }
    })
    .catch(handleError)
})

function displayTasks(tasks: any[]) {
    tasksContainer.innerHTML = `
        <h2>Tasks (${tasks.length})</h2>
        ${tasks.map(task => `
            <div style="border: 1px solid #ccc; padding: 10px; margin: 5px;">
                <h3>${task.title}</h3>
                <p>Status: ${task.status} | Priority: ${task.priority}</p>
                <p>${task.description}</p>
            </div>
        `).join('')}
    `
}

function handleError(error: any) {
    console.error('Error loading tasks:', error)
    tasksContainer.innerHTML = '<p>Error loading tasks</p>'
}