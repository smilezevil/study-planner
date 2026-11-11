export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
    id: number
    title: string
    description: string
    completed: boolean
    priority: TaskPriority
    category: string
    isLocal?: boolean
}

export type NewTask = Omit<Task, 'id' | 'completed' | 'isLocal'>

export type TaskFilter = 'all' | 'completed' | 'active'

export type TaskCounts = Record<TaskFilter, number>