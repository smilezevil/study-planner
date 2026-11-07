import { useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskStats from './components/TaskStats'
import TaskFilters from './components/TaskFilters'
import TaskList from './components/TaskList'
import ToastRegion from './components/ToastRegion'
import './App.scss'

function App() {
    const [isDark, setIsDark] = useState(false)

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