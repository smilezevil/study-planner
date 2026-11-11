import { useEffect } from 'react'
import Header from './components/Header'
import Pagination from './components/Pagination'
import TaskDetails from './components/TaskDetails'
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
    const { tasks, counts, status, selectedTaskId, closeDetails } = useTaskContext()
    const selectedTask = tasks.find((task) => task.id === selectedTaskId)

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

            {selectedTaskId !== null && (
                <TaskDetails
                    key={selectedTaskId}
                    id={selectedTaskId}
                    listTask={selectedTask}
                    onClose={closeDetails}
                />
            )}

            <ToastRegion />
        </div>
    )
}

export default App