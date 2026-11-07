import { useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Theme } from '../types/theme'
import { ThemeContext } from './ThemeContext'

const THEME_STORAGE_KEY = 'study-planner:theme'

function isTheme(value: unknown): value is Theme {
    return value === 'light' || value === 'dark'
}

interface ThemeProviderProps {
    children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useLocalStorage<Theme>(THEME_STORAGE_KEY, 'light', isTheme)

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }, [setTheme])

    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

    return <ThemeContext value={value}>{children}</ThemeContext>
}