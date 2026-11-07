import { useEffect, useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskStats from './components/TaskStats'
import TaskFilters from './components/TaskFilters'
import TaskList from './components/TaskList'
import ToastRegion from './components/ToastRegion'
import { useTaskContext } from './hooks/useTaskContext'
import './App.scss'

function App() {
    const [isDark, setIsDark] = useState(false)
    const { counts } = useTaskContext()

    useEffect(() => {
        const word = counts.active === 1 ? 'task' : 'tasks'
        document.title = `Study Planner — ${counts.active} active ${word}`
    }, [counts.active])

    return (
        <div className={`app ${isDark ? 'app--dark' : ''}`}>
            <div className="app__container">
                <Header isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />

                <section className="app__panel">
                    <h2 className="app__panel-title">Нове завдання</h2>
                    <TaskForm />
                </section>

                <TaskStats />
                <TaskFilters />
                <TaskList />
            </div>

            <ToastRegion />
        </div>
    )
}

export default App