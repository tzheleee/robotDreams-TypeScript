import { useState } from 'react'
import {CreateTaskForm} from '../components/CreateTaskForm'
import './App.css'

function App() {

  return (
      <div>
        <h1>Task Manager</h1>
        <CreateTaskForm />
      </div>
  )
}

export default App
