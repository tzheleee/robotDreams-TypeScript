import './style.css'
import * as API from './api'
import { Status, Priority, TaskType } from './api';


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1> Task Manager </h1>
    <div class="taskManager">
      <button id="findTaskBtn" type="button"> Find task by ID </button>
      <input type="number" id="taskIdInput" style="display: none" placeholder="Enter task ID">
      <button id="openModalBtn" type="button" >Create Task</button>
      <button id="loadTaskBtn" type="button"> Load all tasks </button>
      <button id="deleteTaskBtn" type="button"> Delete task </button>
      <input type="number" id="deleteTaskIdInput" style="display: none" placeholder="Enter task ID">
    </div>

    <div id="tasksContainer">
    </div>

    <div id="taskModal" class="modal" style="display: none">
      <div class="modalContent">
        <h2>Create new Task</h2>
        <form id="createTaskForm">
          <input name="title" placeholder="Title" required>
          <textarea name="description" placeholder="Description"></textarea>
          <select name="status" required> 
            <option value=""> Select status</option>
            <option value="toDo"> To Do </option>
            <option value="in_progress"> In Progress </option>
            <option value="done"> Done </option>
          </select>
          <select name="priority" required>
            <option value=""> Select Priority </option>
            <option value="low"> Low </option>
            <option value="medium"> Medium </option>
            <option value="high">High </option>
          </select>
          <input type="date" name="deadline">
          <button type="submit">Create Task</button>
        </form>
        <button id="closeModalBtn">Close</button>
      </div>
    </div>

  </div>
`

const loadTasksBtn = document.getElementById('loadTaskBtn') as HTMLButtonElement
const tasksContainer = document.getElementById('tasksContainer') as HTMLDivElement
const findTasksByIdBtn = document.getElementById('findTaskBtn') as HTMLButtonElement
const taskIdInput = document.getElementById('taskIdInput') as HTMLInputElement;
const openCreateFormBtm = document.getElementById('openModalBtn') as HTMLButtonElement
const closeCreateFormBtm = document.getElementById('closeModalBtn') as HTMLButtonElement
const taskModal = document.getElementById('taskModal') as HTMLDivElement
const createTaskForm = document.getElementById('createTaskForm') as HTMLFormElement
const deleteTaskBtn = document.getElementById('deleteTaskBtn') as HTMLButtonElement
const deleteTaskIdInput = document.getElementById('deleteTaskIdInput') as HTMLInputElement;


loadTasksBtn.addEventListener('click', () =>
  API.getAllTasks()
    .then(displayTasks)
    .catch(handleError)
)

findTasksByIdBtn.addEventListener('click', () => {
  taskIdInput.style.display = 'block'
  taskIdInput.focus()
})

taskIdInput.addEventListener('keypress', (event) =>{
  if(event.key === 'Enter'){
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
        taskIdInput.style.display = 'none'
        })
      .catch(handleError)
    }
  }
)

openCreateFormBtm.addEventListener('click', hideButtons)
closeCreateFormBtm.addEventListener('click', showButtons)

createTaskForm.addEventListener('submit', async(event) => {
  event.preventDefault()

  const formData = new FormData(createTaskForm)
  const taskData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    status: formData.get('status') as API.Status,
    priority: formData.get('priority') as API.Priority,
    deadline: formData.get('deadline') as string,
    typeOfTask: 'task' as API.TaskType
  }
  console.log('Form submitted with data:', taskData)

  try{
    await API.createTask(taskData)
    taskModal.style.display = 'none'
    createTaskForm.reset()
    showButtons()
    displayTasks(await API.getAllTasks())
    
  }
  catch(error) {
    console.error('Error creating task:', error)
    alert('Error creating task!')
  }
})

deleteTaskBtn.addEventListener('click',() => {
  deleteTaskIdInput.style.display = 'block'
  deleteTaskIdInput.focus()
})

deleteTaskIdInput.addEventListener('keypress', async (event) => {
  if (event.key === 'Enter'){
    const taskId = parseInt(deleteTaskIdInput.value)
    if (!taskId){
      alert('Invalid TaskId!')
        return
    }
    try{
      await API.deleteTask(taskId)
      console.log(`Task ${taskId} deleted successfully!`)
      deleteTaskIdInput.style.display = 'none'
      deleteTaskIdInput.value = ''
    }
    catch(error) {
      console.error('Error deleting task:', error)
      alert('Error deleting task!')
     }
   }
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

function showButtons(){
  taskModal.style.display = 'none'
  loadTasksBtn.style.display = 'block'
  findTasksByIdBtn.style.display = 'block'
  taskIdInput.style.display = 'block'
  tasksContainer.style.display = 'block'
  openCreateFormBtm.style.display = 'block'
}

function hideButtons(){
  taskModal.style.display = 'block'
  loadTasksBtn.style.display = 'none'
  findTasksByIdBtn.style.display = 'none'
  taskIdInput.style.display = 'none'
  tasksContainer.style.display = 'none'
  openCreateFormBtm.style.display = 'none'
}

function handleError(error: any) {
  console.error('Error loading tasks:', error)
  tasksContainer.innerHTML = '<p>Error loading tasks</p>'
}