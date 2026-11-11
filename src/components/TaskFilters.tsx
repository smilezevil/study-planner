import { useTaskContext } from '../hooks/useTaskContext'
import type { TaskFilter } from '../types/task'
import { FILTER_LABELS } from '../utils/tasks'
import './TaskFilters.scss'

const FILTERS: TaskFilter[] = ['all', 'completed', 'active']

function TaskFilters() {
    const { filter, setFilter, counts } = useTaskContext()

    return (
        <div className="task-filters">
            <div className="task-filters__buttons" role="group" aria-label="Фільтр завдань">
                {FILTERS.map((value) => (
                    <button
                        key={value}
                        type="button"
                        className={`task-filters__button ${filter === value ? 'task-filters__button--active' : ''}`}
                        aria-pressed={filter === value}
                        onClick={() => setFilter(value)}
                    >
                        {FILTER_LABELS[value]}
                        <span className="task-filters__count">{counts[value]}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default TaskFilters