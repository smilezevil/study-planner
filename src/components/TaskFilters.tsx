import type { TaskFilter } from '../types/task'
import { FILTER_LABELS } from '../utils/tasks'
import './TaskFilters.scss'

interface TaskFiltersProps {
    filter: TaskFilter
    counts: Record<TaskFilter, number>
    search: string
    sortByPriority: boolean
    onFilterChange: (filter: TaskFilter) => void
    onSearchChange: (value: string) => void
    onSortChange: (value: boolean) => void
}

const FILTERS: TaskFilter[] = ['all', 'completed', 'active']

function TaskFilters({
                         filter,
                         counts,
                         search,
                         sortByPriority,
                         onFilterChange,
                         onSearchChange,
                         onSortChange,
                     }: TaskFiltersProps) {
    return (
        <div className="task-filters">
            <div className="task-filters__buttons" role="group" aria-label="Фільтр завдань">
                {FILTERS.map((value) => (
                    <button
                        key={value}
                        type="button"
                        className={`task-filters__button ${filter === value ? 'task-filters__button--active' : ''}`}
                        aria-pressed={filter === value}
                        onClick={() => onFilterChange(value)}
                    >
                        {FILTER_LABELS[value]}
                        <span className="task-filters__count">{counts[value]}</span>
                    </button>
                ))}
            </div>

            <div className="task-filters__tools">
                <input
                    type="search"
                    className="task-filters__search"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Пошук за назвою..."
                    aria-label="Пошук за назвою"
                />
                <label className="task-filters__sort">
                    <input
                        type="checkbox"
                        checked={sortByPriority}
                        onChange={(event) => onSortChange(event.target.checked)}
                    />
                    Спочатку важливі
                </label>
            </div>
        </div>
    )
}

export default TaskFilters