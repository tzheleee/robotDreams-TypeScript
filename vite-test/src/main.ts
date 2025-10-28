import './style.css'
import * as API from './api'
import { Status, Priority, TaskType } from './api'
import { DEF_DESCRIPTION, DEF_PRIORITY, DEF_STATUS, DEF_TITLE } from './constants'
import { validateFormData } from './validation'

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

    <div id="editTaskModal" class="modal" style="display: none">
      <div class="modalContent">
        <h2>Edit Task</h2>
        <form id="editTaskInput">
          <input name="Title" placeholder="Title" required>
          <textarea name="description" placeholder="Description"></textarea>
          <select name="status" required> 
            <option value=""> Select status</option>
            <option value="todo"> To Do </option>
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
          <button type="submit">Save Changes</button>
        </form>
        <button id="closeEditModalBtn">Cancel</button>
      </div>
    </div>

  </div>
`

const loadTasksBtn = document.getElementById('loadTaskBtn') as HTMLButtonElement
const tasksContainer = document.getElementById('tasksContainer') as HTMLDivElement
const findTasksByIdBtn = document.getElementById('findTaskBtn') as HTMLButtonElement
const taskIdInput = document.getElementById('taskIdInput') as HTMLInputElement
const openCreateFormBtm = document.getElementById('openModalBtn') as HTMLButtonElement
const closeCreateFormBtm = document.getElementById('closeModalBtn') as HTMLButtonElement
const taskModal = document.getElementById('taskModal') as HTMLDivElement
const createTaskForm = document.getElementById('createTaskForm') as HTMLFormElement
const deleteTaskBtn = document.getElementById('deleteTaskBtn') as HTMLButtonElement
const deleteTaskIdInput = document.getElementById('deleteTaskIdInput') as HTMLInputElement
const editTaskModal = document.getElementById('editTaskModal') as HTMLFormElement
const editTaskForm = document.getElementById('editTaskInput') as HTMLFormElement;
const closeEditModalBtn = document.getElementById('closeEditModalBtn') as HTMLButtonElement;
let currentEditTask: number | null = null;

loadTasksBtn.addEventListener('click', () =>{

  API.getAllTasks()
    .then(displayTasks)
    .catch(handleError)
})

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

openCreateFormBtm.addEventListener('click', () => {
  taskModal.style.display = 'block'
  hideButtons()
})
closeCreateFormBtm.addEventListener('click', showButtons)

createTaskForm.addEventListener('submit', async(event) => {
  event.preventDefault()

  try{
    const taskData = validateFormData(new FormData(createTaskForm))
    console.log('Form submitted with data:', taskData)

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
    if (!taskId || isNaN(taskId)){
      alert('Invalid TaskId!')
      return
    }
    deleteTask(taskId)
   }
})

editTaskForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  if (!currentEditTask) {
    alert('No task selected for editing!')
    return;
  }

  const formData = new FormData(editTaskForm)
  const updatedTaskData = {
    title: formData.get('Title') as string,
    description: formData.get('description') as string,
    status: formData.get('status') as API.Status,
    priority: formData.get('priority') as API.Priority,
    deadline: formData.get('deadline') as string,
    typeOfTask: 'task' as API.TaskType
  };

  try {
    await API.updateTask(currentEditTask, updatedTaskData as API.TaskDefault);
    editTaskModal.style.display = 'none'
    editTaskForm.reset()
    showButtons()
    
    displayTasks(await API.getAllTasks())
    
    currentEditTask = null
    
  } catch (error) {
    console.error('Error updating task:', error)
    alert('Error updating task!')
  }
});

closeEditModalBtn.addEventListener('click', () => {
  editTaskModal.style.display = 'none';
  showButtons();
  currentEditTask = null;
});

async function deleteTask(taskId: number){
  try{
      await API.deleteTask(taskId)
      console.log(`Task ${taskId} deleted successfully!`)
      deleteTaskIdInput.style.display = 'none'
      deleteTaskIdInput.value = ''

      displayTasks(await API.getAllTasks())
    }
    catch(error) {
      console.error('Error deleting task:', error)
      alert('Error deleting task!')
    }
}

async function openEditForm(taskId: number){
  try{
    const task = await API.getTaskById(taskId)
    currentEditTask = taskId;

    (editTaskModal.querySelector('[name="Title"]') as HTMLInputElement).value = task.title || DEF_TITLE; 
    (editTaskModal.querySelector('[name="description"]') as HTMLTextAreaElement).value = task.description || DEF_DESCRIPTION;
    (editTaskModal.querySelector('[name="status"]') as HTMLSelectElement).value = task.status || DEF_STATUS;
    (editTaskModal.querySelector('[name="priority"]') as HTMLSelectElement).value = task.priority || DEF_PRIORITY;
    if (task.deadline) {
      const deadlineDate = new Date(task.deadline).toISOString().split('T')[0];
      (editTaskModal.querySelector('[name="deadline"]') as HTMLInputElement).value = deadlineDate;
    }
    hideButtons()
    editTaskModal.style.display = 'block'
  } catch (error) {
    console.error('Error loading task for editing:', error)
    alert('Error loading task for editing!')
  }
}

function addTaskEventListeners(){
  document.querySelectorAll('.deleteActualTaskBtn').forEach(btn => {
    btn.addEventListener('click', async (event) => {
      const taskId = parseInt((event.target as HTMLButtonElement).dataset.taskId!)
      const ask = confirm('Are you sure you want to delete this task?')
      if (ask) {
        await deleteTask(taskId)
      }
    })
  })
  document.querySelectorAll('.editTaskBtn').forEach(btn => {
    btn.addEventListener('click', async (event) => {
      const taskId = parseInt((event.target as HTMLButtonElement).dataset.taskId!)
      await openEditForm(taskId)
    })
  })
}

function displayTasks(tasks: any[]) {
  taskModal.style.display = 'none'
  editTaskModal.style.display = 'none'
  showButtons()

  tasksContainer.innerHTML = `
    <h2>Tasks (${tasks.length})</h2>
    ${tasks.map(task => `
      <div style="border: 1px solid #ccc; padding: 10px; margin: 5px;">
        <h3>${task.title}</h3>
        <p>Status: ${task.status} | Priority: ${task.priority}</p>
        <p>${task.description}</p>
        <div class="task-actions">
          <button class="editTaskBtn" data-task-id="${task.id}">Edit</button>
          <button class="deleteActualTaskBtn" data-task-id="${task.id}">Delete</button>
        </div>
      </div>
    `).join('')}
  `
  addTaskEventListeners();
}

function showButtons(){
  loadTasksBtn.style.display = 'block'
  findTasksByIdBtn.style.display = 'block'
  taskIdInput.style.display = 'none'
  tasksContainer.style.display = 'block'
  openCreateFormBtm.style.display = 'block'
  deleteTaskBtn.style.display = 'block'
  deleteTaskIdInput.style.display = 'none'

  taskModal.style.display = 'none'
  editTaskModal.style.display = 'none'
}

function hideButtons(){
  loadTasksBtn.style.display = 'none'
  findTasksByIdBtn.style.display = 'none'
  taskIdInput.style.display = 'none'
  tasksContainer.style.display = 'none'
  openCreateFormBtm.style.display = 'none'
  deleteTaskBtn.style.display = 'none'
  deleteTaskIdInput.style.display = 'none'
}

function handleError(error: any) {
  console.error('Error loading tasks:', error)
  tasksContainer.innerHTML = '<p>Error loading tasks</p>'
}