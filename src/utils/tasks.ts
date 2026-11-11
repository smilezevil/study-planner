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

export function getTaskCounts(tasks: Task[]): TaskCounts {
    const completed = tasks.filter((task) => task.completed).length

    return {
        all: tasks.length,
        completed,
        active: tasks.length - completed,
    }
}