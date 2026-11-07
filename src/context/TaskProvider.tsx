import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import type { ReactNode } from 'react'
import { UNDO_DELAY_MS } from '../constants'
import { initialTasks } from '../data/initialTasks'
import { createTaskState, taskReducer } from '../reducers/taskReducer'
import type { NewTask, TaskFilter } from '../types/task'
import { getTaskCounts } from '../utils/tasks'
import { TaskContext } from './TaskContext'
import type { TaskContextValue } from './TaskContext'

interface TaskProviderProps {
    children: ReactNode
}

export function TaskProvider({ children }: TaskProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTasks, createTaskState)
    const [filter, setFilter] = useState<TaskFilter>('all')
    const [search, setSearch] = useState('')
    const [isSortedByPriority, setIsSortedByPriority] = useState(false)

    const { tasks, pendingDeletion } = state
    const counts = useMemo(() => getTaskCounts(tasks), [tasks])

    useEffect(() => {
        if (!pendingDeletion) {
            return
        }

        const timerId = setTimeout(() => dispatch({ type: 'confirmDelete' }), UNDO_DELAY_MS)
        return () => clearTimeout(timerId)
    }, [pendingDeletion])

    const addTask = useCallback((task: NewTask) => {
        dispatch({ type: 'add', task })
    }, [])

    const updateTask = useCallback((id: number, changes: NewTask) => {
        dispatch({ type: 'update', id, changes })
    }, [])

    const toggleTask = useCallback((id: number) => {
        dispatch({ type: 'toggle', id })
    }, [])

    const requestDelete = useCallback((id: number) => {
        dispatch({ type: 'requestDelete', id })
    }, [])

    const undoDelete = useCallback(() => {
        dispatch({ type: 'undoDelete' })
    }, [])

    const clearCompleted = useCallback(() => {
        dispatch({ type: 'clearCompleted' })
    }, [])

    const resetTasks = useCallback(() => {
        dispatch({ type: 'reset' })
        setFilter('all')
        setSearch('')
    }, [])

    const value = useMemo<TaskContextValue>(
        () => ({
            tasks,
            counts,
            pendingDeletion,
            filter,
            setFilter,
            search,
            setSearch,
            isSortedByPriority,
            setIsSortedByPriority,
            addTask,
            updateTask,
            toggleTask,
            requestDelete,
            undoDelete,
            clearCompleted,
            resetTasks,
        }),
        [
            tasks,
            counts,
            pendingDeletion,
            filter,
            search,
            isSortedByPriority,
            addTask,
            updateTask,
            toggleTask,
            requestDelete,
            undoDelete,
            clearCompleted,
            resetTasks,
        ],
    )

    return <TaskContext value={value}>{children}</TaskContext>
}