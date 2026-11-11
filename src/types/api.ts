export interface ApiTodo {
    id: number
    todo: string
    completed: boolean
    userId: number
}

export interface TodosResponse {
    todos: ApiTodo[]
    total: number
    skip: number
    limit: number
}

export interface CreateTodoDto {
    todo: string
    completed: boolean
    userId: number
}

export type UpdateTodoDto = Partial<Pick<ApiTodo, 'todo' | 'completed'>>