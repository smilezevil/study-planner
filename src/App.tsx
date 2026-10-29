import { useState } from 'react'
import Header from './components/Header'
import TaskList from './components/TaskList'
import { initialTasks } from './data/initialTasks'
import type { Task } from './types/task'
import './App.scss'

function App() {
    const [tasks] = useState<Task[]>(initialTasks)

    return (
        <div className="app">
            <div className="app__container">
                <Header />
                <TaskList tasks={tasks} />
            </div>
        </div>
    )
}

export default App