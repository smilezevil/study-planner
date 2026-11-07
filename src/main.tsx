import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App.tsx'
import { TaskProvider } from './context/TaskProvider'
import { ThemeProvider } from './context/ThemeProvider'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <TaskProvider>
                <App />
            </TaskProvider>
        </ThemeProvider>
    </StrictMode>,
)