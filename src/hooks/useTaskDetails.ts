import { useEffect, useState } from 'react'
import { getErrorMessage, isAbortError } from '../api/errors'
import { taskRepository } from '../repositories/taskRepository'
import type { LoadStatus } from '../reducers/taskReducer'
import type { Task } from '../types/task'

interface TaskDetailsState {
    status: LoadStatus
    task: Task | null
    error: string | null
}

const LOADING_STATE: TaskDetailsState = { status: 'loading', task: null, error: null }

export function useTaskDetails(id: number, listTask?: Task) {
    const [state, setState] = useState<TaskDetailsState>(() =>
        listTask?.isLocal ? { status: 'success', task: listTask, error: null } : LOADING_STATE,
    )
    const [reloadKey, setReloadKey] = useState(0)
    const isLocal = listTask?.isLocal ?? false

    useEffect(() => {
        if (isLocal) {
            return
        }

        const controller = new AbortController()

        taskRepository
            .getById(id, controller.signal)
            .then((task) => setState({ status: 'success', task, error: null }))
            .catch((loadError: unknown) => {
                if (isAbortError(loadError)) {
                    return
                }

                setState({ status: 'error', task: null, error: getErrorMessage(loadError) })
            })

        return () => controller.abort()
    }, [id, isLocal, reloadKey])

    function retry() {
        setState(LOADING_STATE)
        setReloadKey((prev) => prev + 1)
    }

    return { ...state, retry }
}