import { useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskStats from './components/TaskStats'
import TaskFilters from './components/TaskFilters'
import TaskList from './components/TaskList'
import { initialTasks } from './data/initialTasks'
import type { NewTask, Task, TaskFilter } from './types/task'
import { filterTasks, getNextId } from './utils/tasks'
import './App.scss'

function App() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const [filter, setFilter] = useState<TaskFilter>('all')

    const completedCount = tasks.filter((task) => task.completed).length
    const stats = {
        all: tasks.length,
        completed: completedCount,
        active: tasks.length - completedCount,
    }

    const visibleTasks = filterTasks(tasks, filter)

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

                <TaskStats total={stats.all} completed={stats.completed} active={stats.active} />

                <TaskFilters filter={filter} counts={stats} onFilterChange={setFilter} />

                <TaskList
                    tasks={visibleTasks}
                    hasTasks={tasks.length > 0}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    )
}

export default App