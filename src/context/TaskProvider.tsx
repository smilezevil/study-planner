import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import type { ReactNode } from 'react'
import { getErrorMessage, isAbortError } from '../api/errors'
import { PAGE_SIZE, TOAST_DURATION_MS } from '../constants'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { initialTaskListState, taskReducer } from '../reducers/taskReducer'
import { taskRepository } from '../repositories/taskRepository'
import type { NewTask, TaskFilter } from '../types/task'
import type { ToastMessage, ToastVariant } from '../types/toast'
import { getTaskCounts, isTaskFilter } from '../utils/tasks'
import { TaskContext } from './TaskContext'
import type { TaskContextValue } from './TaskContext'

const FILTER_STORAGE_KEY = 'study-planner:filter'

interface TaskProviderProps {
    children: ReactNode
}

function createToast(message: string, variant: ToastVariant = 'success'): ToastMessage {
    return { id: Date.now(), message, variant }
}

export function TaskProvider({ children }: TaskProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskListState)
    const [page, setPage] = useState(1)
    const [reloadKey, setReloadKey] = useState(0)
    const [filter, setFilter] = useLocalStorage<TaskFilter>(FILTER_STORAGE_KEY, 'all', isTaskFilter)
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
    const [toast, setToast] = useState<ToastMessage | null>(null)

    const { tasks, total, status, error } = state
    const counts = useMemo(() => getTaskCounts(tasks), [tasks])
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

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
        const controller = new AbortController()

        taskRepository
            .getAll(page, PAGE_SIZE, controller.signal)
            .then((result) => dispatch({ type: 'loadSuccess', tasks: result.tasks, total: result.total }))
            .catch((loadError: unknown) => {
                if (isAbortError(loadError)) {
                    return
                }

                dispatch({ type: 'loadError', error: getErrorMessage(loadError) })
            })

        return () => controller.abort()
    }, [page, reloadKey])

    const goToPage = useCallback(
        (nextPage: number) => {
            if (nextPage === page || nextPage < 1 || nextPage > totalPages) {
                return
            }

            dispatch({ type: 'loadStart' })
            setPage(nextPage)
        },
        [page, totalPages],
    )

    const retry = useCallback(() => {
        dispatch({ type: 'loadStart' })
        setReloadKey((prev) => prev + 1)
    }, [])

    const openDetails = useCallback((id: number) => setSelectedTaskId(id), [])
    const closeDetails = useCallback(() => setSelectedTaskId(null), [])

    const createTask = useCallback(
        async (newTask: NewTask) => {
            try {
                const created = await taskRepository.create(newTask)
                dispatch({ type: 'added', task: { ...created, isLocal: true } })
                showToast(`Завдання «${created.title}» створено`)
                return true
            } catch (createError) {
                showToast(getErrorMessage(createError), 'error')
                return false
            }
        },
        [showToast],
    )

    const updateTask = useCallback(
        async (id: number, changes: NewTask) => {
            const current = tasks.find((task) => task.id === id)
            if (!current) {
                return false
            }

            try {
                if (!current.isLocal) {
                    await taskRepository.update(id, { title: changes.title })
                }

                dispatch({ type: 'updated', task: { ...current, ...changes } })
                showToast('Зміни збережено')
                return true
            } catch (updateError) {
                showToast(getErrorMessage(updateError), 'error')
                return false
            }
        },
        [tasks, showToast],
    )

    const toggleTask = useCallback(
        async (id: number) => {
            const current = tasks.find((task) => task.id === id)
            if (!current) {
                return
            }

            const next = { ...current, completed: !current.completed }
            dispatch({ type: 'updated', task: next })

            if (current.isLocal) {
                return
            }

            try {
                await taskRepository.update(id, { completed: next.completed })
            } catch (toggleError) {
                dispatch({ type: 'updated', task: current })
                showToast(`Не вдалося змінити стан: ${getErrorMessage(toggleError)}`, 'error')
            }
        },
        [tasks, showToast],
    )

    const deleteTask = useCallback(
        async (id: number) => {
            const current = tasks.find((task) => task.id === id)
            if (!current) {
                return false
            }

            try {
                if (!current.isLocal) {
                    await taskRepository.delete(id)
                }

                dispatch({ type: 'removed', id })
                setSelectedTaskId((prev) => (prev === id ? null : prev))
                showToast('Завдання видалено')
                return true
            } catch (deleteError) {
                showToast(getErrorMessage(deleteError), 'error')
                return false
            }
        },
        [tasks, showToast],
    )

    const value = useMemo<TaskContextValue>(
        () => ({
            tasks,
            total,
            status,
            error,
            counts,
            page,
            totalPages,
            goToPage,
            retry,
            filter,
            setFilter,
            selectedTaskId,
            openDetails,
            closeDetails,
            toast,
            dismissToast,
            createTask,
            updateTask,
            toggleTask,
            deleteTask,
        }),
        [
            tasks,
            total,
            status,
            error,
            counts,
            page,
            totalPages,
            goToPage,
            retry,
            filter,
            setFilter,
            selectedTaskId,
            openDetails,
            closeDetails,
            toast,
            dismissToast,
            createTask,
            updateTask,
            toggleTask,
            deleteTask,
        ],
    )

    return <TaskContext value={value}>{children}</TaskContext>
}