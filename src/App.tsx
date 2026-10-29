import { useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskStats from './components/TaskStats'
import TaskFilters from './components/TaskFilters'
import TaskList from './components/TaskList'
import { initialTasks } from './data/initialTasks'
import type { NewTask, Task, TaskFilter } from './types/task'
import { filterTasks, getNextId, searchTasks, sortByPriority } from './utils/tasks'
import './App.scss'

function App() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const [filter, setFilter] = useState<TaskFilter>('all')
    const [search, setSearch] = useState('')
    const [isSortedByPriority, setIsSortedByPriority] = useState(false)
    const [isDark, setIsDark] = useState(false)

    const completedCount = tasks.filter((task) => task.completed).length
    const stats = {
        all: tasks.length,
        completed: completedCount,
        active: tasks.length - completedCount,
    }

    const filteredTasks = searchTasks(filterTasks(tasks, filter), search)
    const visibleTasks = isSortedByPriority ? sortByPriority(filteredTasks) : filteredTasks

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

    function handleClearCompleted() {
        setTasks((prev) => prev.filter((task) => !task.completed))
    }

    return (
        <div className={`app ${isDark ? 'app--dark' : ''}`}>
            <div className="app__container">
                <Header isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />

                <section className="app__panel">
                    <h2 className="app__panel-title">Нове завдання</h2>
                    <TaskForm onAdd={handleAdd} />
                </section>

                <TaskStats
                    total={stats.all}
                    completed={stats.completed}
                    active={stats.active}
                    onClearCompleted={handleClearCompleted}
                />

                <TaskFilters
                    filter={filter}
                    counts={stats}
                    search={search}
                    sortByPriority={isSortedByPriority}
                    onFilterChange={setFilter}
                    onSearchChange={setSearch}
                    onSortChange={setIsSortedByPriority}
                />

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