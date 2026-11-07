import { initialTasks } from '../data/initialTasks'
import type { NewTask, Task } from '../types/task'
import { getNextId } from '../utils/tasks'

export type DeletionKind = 'single' | 'completed'

export interface PendingDeletion {
    ids: number[]
    kind: DeletionKind
}

export interface TaskState {
    tasks: Task[]
    pendingDeletion: PendingDeletion | null
}

export type TaskAction =
    | { type: 'add'; task: NewTask }
    | { type: 'toggle'; id: number }
    | { type: 'update'; id: number; changes: NewTask }
    | { type: 'requestDelete'; id: number }
    | { type: 'confirmDelete' }
    | { type: 'undoDelete' }
    | { type: 'clearCompleted' }
    | { type: 'reset' }

export function createTaskState(tasks: Task[]): TaskState {
    return { tasks, pendingDeletion: null }
}

function withoutPending(state: TaskState): Task[] {
    const pending = state.pendingDeletion
    if (!pending) {
        return state.tasks
    }

    return state.tasks.filter((task) => !pending.ids.includes(task.id))
}

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
    switch (action.type) {
        case 'add': {
            const task: Task = { ...action.task, id: getNextId(state.tasks), completed: false }
            return { ...state, tasks: [task, ...state.tasks] }
        }

        case 'toggle':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.id ? { ...task, completed: !task.completed } : task,
                ),
            }

        case 'update':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.id ? { ...task, ...action.changes } : task,
                ),
            }

        case 'requestDelete': {
            if (state.pendingDeletion?.ids.includes(action.id)) {
                return state
            }

            return {
                tasks: withoutPending(state),
                pendingDeletion: { ids: [action.id], kind: 'single' },
            }
        }

        case 'clearCompleted': {
            const tasks = withoutPending(state)
            const ids = tasks.filter((task) => task.completed).map((task) => task.id)

            return {
                tasks,
                pendingDeletion: ids.length > 0 ? { ids, kind: 'completed' } : null,
            }
        }

        case 'confirmDelete':
            return { tasks: withoutPending(state), pendingDeletion: null }

        case 'undoDelete':
            return { ...state, pendingDeletion: null }

        case 'reset':
            return createTaskState(initialTasks)
    }
}