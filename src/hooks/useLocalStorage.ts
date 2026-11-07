import { useEffect, useState } from 'react'

type Validator<T> = (value: unknown) => value is T

function readValue<T>(key: string, initialValue: T, validate?: Validator<T>): T {
    try {
        const raw = localStorage.getItem(key)
        if (raw === null) {
            return initialValue
        }

        const parsed: unknown = JSON.parse(raw)
        if (validate && !validate(parsed)) {
            return initialValue
        }

        return parsed as T
    } catch {
        return initialValue
    }
}

export function useLocalStorage<T>(key: string, initialValue: T, validate?: Validator<T>) {
    const [value, setValue] = useState<T>(() => readValue(key, initialValue, validate))

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch {
            console.error(`Не вдалося зберегти "${key}" в localStorage`)
        }
    }, [key, value])

    return [value, setValue] as const
}