import { initialTasks } from '../data/initialTasks'
import type { Task } from '../types/task'

const TASKS_STORAGE_KEY = 'study-planner:tasks'
const PRIORITIES: unknown[] = ['low', 'medium', 'high']

function isTask(value: unknown): value is Task {
    if (typeof value !== 'object' || value === null) {
        return false
    }

    const task = value as Record<string, unknown>

    return (
        typeof task.id === 'number' &&
        typeof task.title === 'string' &&
        typeof task.description === 'string' &&
        typeof task.completed === 'boolean' &&
        typeof task.category === 'string' &&
        PRIORITIES.includes(task.priority)
    )
}

export interface LoadedTasks {
    tasks: Task[]
    isCorrupted: boolean
}

export function loadTasks(): LoadedTasks {
    try {
        const raw = localStorage.getItem(TASKS_STORAGE_KEY)
        if (raw === null) {
            return { tasks: initialTasks, isCorrupted: false }
        }

        const parsed: unknown = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.every(isTask)) {
            return { tasks: parsed, isCorrupted: false }
        }

        return { tasks: initialTasks, isCorrupted: true }
    } catch {
        return { tasks: initialTasks, isCorrupted: true }
    }
}

export function saveTasks(tasks: Task[]): boolean {
    try {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
        return true
    } catch {
        return false
    }
}