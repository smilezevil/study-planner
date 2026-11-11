import { useEffect } from 'react'
import Header from './components/Header'
import Pagination from './components/Pagination'
import TaskFilters from './components/TaskFilters'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskStats from './components/TaskStats'
import ToastRegion from './components/ToastRegion'
import { useTaskContext } from './hooks/useTaskContext'
import { useTheme } from './hooks/useTheme'
import './App.scss'

function App() {
    const { theme } = useTheme()
    const { counts, status } = useTaskContext()

    useEffect(() => {
        if (status !== 'success') {
            document.title = 'Study Planner'
            return
        }

        const word = counts.active === 1 ? 'task' : 'tasks'
        document.title = `Study Planner — ${counts.active} active ${word}`
    }, [counts.active, status])

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
                <Pagination />
            </div>

            <ToastRegion />
        </div>
    )
}

export default App