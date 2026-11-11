import { ApiError } from './errors'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions {
    method?: HttpMethod
    body?: unknown
    signal?: AbortSignal
}

function buildUrl(path: string): string {
    const baseUrl = import.meta.env.VITE_API_URL
    if (!baseUrl) {
        throw new ApiError('Не задано адресу API (VITE_API_URL у файлі .env)')
    }

    return `${baseUrl.replace(/\/$/, '')}${path}`
}

async function readErrorMessage(response: Response): Promise<string> {
    try {
        const data = (await response.json()) as { message?: unknown }
        if (typeof data.message === 'string') {
            return data.message
        }
    } catch {
        return `Помилка запиту: ${response.status}`
    }

    return `Помилка запиту: ${response.status}`
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, signal } = options

    const response = await fetch(buildUrl(path), {
        method,
        signal,
        headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
        body: body === undefined ? undefined : JSON.stringify(body),
    })

    if (!response.ok) {
        throw new ApiError(await readErrorMessage(response), response.status)
    }

    return (await response.json()) as T
}