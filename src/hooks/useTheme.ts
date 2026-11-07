import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import type { ThemeContextValue } from '../context/ThemeContext'

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme потрібно використовувати всередині ThemeProvider')
    }

    return context
}