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

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
    if (filter === 'completed') {
        return tasks.filter((task) => task.completed)
    }

    if (filter === 'active') {
        return tasks.filter((task) => !task.completed)
    }

    return tasks
}

export function getNextId(tasks: Task[]): number {
    return tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1
}