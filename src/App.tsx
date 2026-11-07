import { useEffect } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskStats from './components/TaskStats'
import TaskFilters from './components/TaskFilters'
import TaskList from './components/TaskList'
import ToastRegion from './components/ToastRegion'
import { useTaskContext } from './hooks/useTaskContext'
import { useTheme } from './hooks/useTheme'
import './App.scss'

function App() {
    const { theme } = useTheme()
    const { counts } = useTaskContext()

    useEffect(() => {
        const word = counts.active === 1 ? 'task' : 'tasks'
        document.title = `Study Planner — ${counts.active} active ${word}`
    }, [counts.active])

    return (
        <div className={`app ${theme === 'dark' ? 'app--dark' : ''}`}>
            <div className="app__container">
                <Header />

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