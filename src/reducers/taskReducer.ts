import type { Task } from '../types/task'

export type LoadStatus = 'loading' | 'success' | 'error'

export interface TaskListState {
    tasks: Task[]
    total: number
    status: LoadStatus
    error: string | null
}

export type TaskListAction =
    | { type: 'loadStart' }
    | { type: 'loadSuccess'; tasks: Task[]; total: number }
    | { type: 'loadError'; error: string }
    | { type: 'added'; task: Task }
    | { type: 'updated'; task: Task }
    | { type: 'removed'; id: number }

export const initialTaskListState: TaskListState = {
    tasks: [],
    total: 0,
    status: 'loading',
    error: null,
}

export function taskReducer(state: TaskListState, action: TaskListAction): TaskListState {
    switch (action.type) {
        case 'loadStart':
            return { ...state, status: 'loading', error: null }

        case 'loadSuccess':
            return { tasks: action.tasks, total: action.total, status: 'success', error: null }

        case 'loadError':
            return { tasks: [], total: 0, status: 'error', error: action.error }

        case 'added': {
            const id = state.tasks.reduce((maxId, task) => Math.max(maxId, task.id + 1), action.task.id)
            return {
                ...state,
                tasks: [{ ...action.task, id }, ...state.tasks],
                total: state.total + 1,
            }
        }

        case 'updated':
            return {
                ...state,
                tasks: state.tasks.map((task) => (task.id === action.task.id ? action.task : task)),
            }

        case 'removed':
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.id),
                total: Math.max(0, state.total - 1),
            }
    }
}