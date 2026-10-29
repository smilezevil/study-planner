import { useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { initialTasks } from './data/initialTasks'
import type { NewTask, Task } from './types/task'
import { getNextId } from './utils/tasks'
import './App.scss'

function App() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)

    function handleAdd(newTask: NewTask) {
        setTasks((prev) => [{ ...newTask, id: getNextId(prev), completed: false }, ...prev])
    }

    function handleToggle(id: number) {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
        )
    }

    function handleDelete(id: number) {
        setTasks((prev) => prev.filter((task) => task.id !== id))
    }

    return (
        <div className="app">
            <div className="app__container">
                <Header />

                <section className="app__panel">
                    <h2 className="app__panel-title">Нове завдання</h2>
                    <TaskForm onAdd={handleAdd} />
                </section>

                <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
            </div>
        </div>
    )
}

export default App