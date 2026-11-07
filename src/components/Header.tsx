import { useTheme } from '../hooks/useTheme'
import './Header.scss'

function Header() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <header className="header">
            <div>
                <h1 className="header__title">Study Planner</h1>
                <p className="header__subtitle">Планувальник навчальних завдань</p>
            </div>

            <button
                type="button"
                className="header__theme-button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}
            >
                {isDark ? '☀️ Світла' : '🌙 Темна'}
            </button>
        </header>
    )
}

export default Header