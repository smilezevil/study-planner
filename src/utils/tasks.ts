import type { Task, TaskFilter, TaskPriority } from '../types/task'

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
    low: 'Низький',
    medium: 'Середній',
    high: 'Високий',
}

export const FILTER_LABELS: Record<TaskFilter, string> = {
    all: 'Всі',
    completed: 'Виконані',
    active: 'Не виконані',
}

const PRIORITY_WEIGHT: Record<TaskPriority, number> = {
    low: 1,
    medium: 2,
    high: 3,
}

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
    if (filter === 'completed') {
        return tasks.filter((task) => task.completed)
    }

    if (filter === 'active') {
        return tasks.filter((task) => !task.completed)
    }

    return tasks
}

export function searchTasks(tasks: Task[], query: string): Task[] {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
        return tasks
    }

    return tasks.filter((task) => task.title.toLowerCase().includes(normalized))
}

export function sortByPriority(tasks: Task[]): Task[] {
    return tasks.toSorted((a, b) => PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority])
}

export function getNextId(tasks: Task[]): number {
    return tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1
}