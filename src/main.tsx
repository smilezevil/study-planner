import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App.tsx'
import { TaskProvider } from './context/TaskProvider'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TaskProvider>
            <App />
        </TaskProvider>
    </StrictMode>,
)