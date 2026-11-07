import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import type { ReactNode } from 'react'
import { TOAST_DURATION_MS, UNDO_DELAY_MS } from '../constants'
import { initialTasks } from '../data/initialTasks'
import { createTaskState, taskReducer } from '../reducers/taskReducer'
import type { NewTask, TaskFilter } from '../types/task'
import type { ToastMessage, ToastVariant } from '../types/toast'
import { getTaskCounts } from '../utils/tasks'
import { TaskContext } from './TaskContext'
import type { TaskContextValue } from './TaskContext'

interface TaskProviderProps {
    children: ReactNode
}

function createToast(message: string, variant: ToastVariant = 'success'): ToastMessage {
    return { id: Date.now(), message, variant }
}

export function TaskProvider({ children }: TaskProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTasks, createTaskState)
    const [filter, setFilter] = useState<TaskFilter>('all')
    const [search, setSearch] = useState('')
    const [isSortedByPriority, setIsSortedByPriority] = useState(false)
    const [toast, setToast] = useState<ToastMessage | null>(null)

    const { tasks, pendingDeletion } = state
    const counts = useMemo(() => getTaskCounts(tasks), [tasks])

    const showToast = useCallback((message: string, variant?: ToastVariant) => {
        setToast(createToast(message, variant))
    }, [])

    const dismissToast = useCallback(() => setToast(null), [])

    useEffect(() => {
        if (!toast) {
            return
        }

        const timerId = setTimeout(() => setToast(null), TOAST_DURATION_MS)
        return () => clearTimeout(timerId)
    }, [toast])

    useEffect(() => {
        if (!pendingDeletion) {
            return
        }

        const timerId = setTimeout(() => {
            dispatch({ type: 'confirmDelete' })
            showToast(
                pendingDeletion.kind === 'completed'
                    ? `Видалено виконаних завдань: ${pendingDeletion.ids.length}`
                    : 'Завдання видалено',
            )
        }, UNDO_DELAY_MS)

        return () => clearTimeout(timerId)
    }, [pendingDeletion, showToast])

    const addTask = useCallback(
        (task: NewTask) => {
            dispatch({ type: 'add', task })
            showToast(`Завдання «${task.title}» додано`)
        },
        [showToast],
    )

    const updateTask = useCallback(
        (id: number, changes: NewTask) => {
            if (pendingDeletion?.ids.includes(id)) {
                showToast('Не можна редагувати завдання, яке буде видалено', 'error')
                return
            }

            dispatch({ type: 'update', id, changes })
            showToast('Зміни збережено')
        },
        [pendingDeletion, showToast],
    )

    const toggleTask = useCallback((id: number) => {
        dispatch({ type: 'toggle', id })
    }, [])

    const requestDelete = useCallback((id: number) => {
        dispatch({ type: 'requestDelete', id })
    }, [])

    const undoDelete = useCallback(() => {
        dispatch({ type: 'undoDelete' })
        showToast('Видалення скасовано', 'info')
    }, [showToast])

    const clearCompleted = useCallback(() => {
        if (counts.completed === 0) {
            showToast('Немає виконаних завдань', 'error')
            return
        }

        dispatch({ type: 'clearCompleted' })
    }, [counts.completed, showToast])

    const resetTasks = useCallback(() => {
        dispatch({ type: 'reset' })
        setFilter('all')
        setSearch('')
        showToast('Дані скинуто до початкових', 'info')
    }, [showToast])

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
            toast,
            dismissToast,
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
            toast,
            dismissToast,
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