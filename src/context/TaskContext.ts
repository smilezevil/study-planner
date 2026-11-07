import { createContext } from 'react'
import type { PendingDeletion } from '../reducers/taskReducer'
import type { NewTask, Task, TaskCounts, TaskFilter } from '../types/task'

export interface TaskContextValue {
    tasks: Task[]
    counts: TaskCounts
    pendingDeletion: PendingDeletion | null
    filter: TaskFilter
    setFilter: (filter: TaskFilter) => void
    search: string
    setSearch: (value: string) => void
    isSortedByPriority: boolean
    setIsSortedByPriority: (value: boolean) => void
    addTask: (task: NewTask) => void
    updateTask: (id: number, changes: NewTask) => void
    toggleTask: (id: number) => void
    requestDelete: (id: number) => void
    undoDelete: () => void
    clearCompleted: () => void
    resetTasks: () => void
}

export const TaskContext = createContext<TaskContextValue | null>(null)