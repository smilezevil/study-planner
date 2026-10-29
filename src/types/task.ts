export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
    id: number
    title: string
    description: string
    completed: boolean
    priority: TaskPriority
    category: string
}

export type NewTask = Omit<Task, 'id' | 'completed'>

export type TaskFilter = 'all' | 'completed' | 'active'