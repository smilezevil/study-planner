import './Header.scss'

interface HeaderProps {
    isDark: boolean
    onToggleTheme: () => void
}

function Header({ isDark, onToggleTheme }: HeaderProps) {
    return (
        <header className="header">
            <div>
                <h1 className="header__title">Study Planner</h1>
                <p className="header__subtitle">Планувальник навчальних завдань</p>
            </div>

            <button
                type="button"
                className="header__theme-button"
                onClick={onToggleTheme}
                aria-label={isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}
            >
                {isDark ? '☀️ Світла' : '🌙 Темна'}
            </button>
        </header>
    )
}

export default Header