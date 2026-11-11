import { createContext } from 'react'
import type { LoadStatus } from '../reducers/taskReducer'
import type { NewTask, Task, TaskCounts, TaskFilter } from '../types/task'
import type { ToastMessage } from '../types/toast'

export interface TaskContextValue {
    tasks: Task[]
    total: number
    status: LoadStatus
    error: string | null
    counts: TaskCounts
    page: number
    totalPages: number
    goToPage: (page: number) => void
    retry: () => void
    filter: TaskFilter
    setFilter: (filter: TaskFilter) => void
    selectedTaskId: number | null
    openDetails: (id: number) => void
    closeDetails: () => void
    toast: ToastMessage | null
    dismissToast: () => void
    createTask: (task: NewTask) => Promise<boolean>
    updateTask: (id: number, changes: NewTask) => Promise<boolean>
    toggleTask: (id: number) => Promise<void>
    deleteTask: (id: number) => Promise<boolean>
}

export const TaskContext = createContext<TaskContextValue | null>(null)