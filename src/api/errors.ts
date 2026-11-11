export class ApiError extends Error {
    readonly status: number | null

    constructor(message: string, status: number | null = null) {
        super(message)
        this.name = 'ApiError'
        this.status = status
    }
}

export function isAbortError(error: unknown): boolean {
    return error instanceof DOMException && error.name === 'AbortError'
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof ApiError) {
        if (error.status === null) {
            return error.message
        }

        if (error.status === 404) {
            return 'Завдання не знайдено на сервері'
        }

        if (error.status >= 500) {
            return 'Сервер тимчасово недоступний. Спробуйте пізніше'
        }

        return error.message
    }

    if (error instanceof TypeError) {
        return 'Не вдалося з’єднатися з сервером. Перевірте інтернет'
    }

    if (error instanceof Error) {
        return error.message
    }

    return 'Сталася невідома помилка'
}