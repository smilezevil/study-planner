import type { Task, TaskCounts, TaskFilter, TaskPriority } from '../types/task'

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

export function isTaskFilter(value: unknown): value is TaskFilter {
    return value === 'all' || value === 'completed' || value === 'active'
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

export function getVisibleTasks(
    tasks: Task[],
    filter: TaskFilter,
    search: string,
    isSortedByPriority: boolean,
): Task[] {
    const result = searchTasks(filterTasks(tasks, filter), search)
    return isSortedByPriority ? sortByPriority(result) : result
}

export function getTaskCounts(tasks: Task[]): TaskCounts {
    const completed = tasks.filter((task) => task.completed).length

    return {
        all: tasks.length,
        completed,
        active: tasks.length - completed,
    }
}

export function getNextId(tasks: Task[]): number {
    return tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1
}