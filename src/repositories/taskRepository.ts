import { request } from '../api/httpClient'
import type { ApiTodo, CreateTodoDto, TodosResponse, UpdateTodoDto } from '../types/api'
import type { NewTask, Task } from '../types/task'

const DEFAULT_USER_ID = 1

export interface TaskPage {
    tasks: Task[]
    total: number
}

export interface TaskChanges {
    title?: string
    completed?: boolean
}

function toTask(todo: ApiTodo): Task {
    return {
        id: todo.id,
        title: todo.todo,
        description: '',
        completed: todo.completed,
        priority: 'medium',
        category: 'Загальне',
    }
}

function toUpdateDto(changes: TaskChanges): UpdateTodoDto {
    const dto: UpdateTodoDto = {}

    if (changes.title !== undefined) {
        dto.todo = changes.title
    }

    if (changes.completed !== undefined) {
        dto.completed = changes.completed
    }

    return dto
}

export const taskRepository = {
    async getAll(page: number, limit: number, signal?: AbortSignal): Promise<TaskPage> {
        const skip = (page - 1) * limit
        const data = await request<TodosResponse>(`/todos?limit=${limit}&skip=${skip}`, { signal })

        return { tasks: data.todos.map(toTask), total: data.total }
    },

    async getById(id: number, signal?: AbortSignal): Promise<Task> {
        const todo = await request<ApiTodo>(`/todos/${id}`, { signal })
        return toTask(todo)
    },

    async create(task: NewTask): Promise<Task> {
        const body: CreateTodoDto = { todo: task.title, completed: false, userId: DEFAULT_USER_ID }
        const todo = await request<ApiTodo>('/todos/add', { method: 'POST', body })

        return {
            ...toTask(todo),
            description: task.description,
            priority: task.priority,
            category: task.category,
        }
    },

    async update(id: number, changes: TaskChanges): Promise<Task> {
        const todo = await request<ApiTodo>(`/todos/${id}`, {
            method: 'PATCH',
            body: toUpdateDto(changes),
        })

        return toTask(todo)
    },

    async delete(id: number): Promise<void> {
        await request<ApiTodo>(`/todos/${id}`, { method: 'DELETE' })
    },
}