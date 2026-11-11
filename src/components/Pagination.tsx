import { useTaskContext } from '../hooks/useTaskContext'
import './Pagination.scss'

function Pagination() {
    const { page, totalPages, status, goToPage } = useTaskContext()
    const isLoading = status === 'loading'

    if (status === 'error') {
        return null
    }

    return (
        <nav className="pagination" aria-label="Сторінки">
            <button
                type="button"
                className="pagination__button"
                onClick={() => goToPage(page - 1)}
                disabled={isLoading || page <= 1}
            >
                ← Попередня
            </button>

            <span className="pagination__info">
        Сторінка {page} з {totalPages}
      </span>

            <button
                type="button"
                className="pagination__button"
                onClick={() => goToPage(page + 1)}
                disabled={isLoading || page >= totalPages}
            >
                Наступна →
            </button>
        </nav>
    )
}

export default Pagination