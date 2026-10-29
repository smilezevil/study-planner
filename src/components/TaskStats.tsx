import './TaskStats.scss'

interface TaskStatsProps {
    total: number
    completed: number
    active: number
    onClearCompleted: () => void
}

function TaskStats({ total, completed, active, onClearCompleted }: TaskStatsProps) {
    return (
        <section className="task-stats" aria-label="Статистика">
            <div className="task-stats__item">
                <span className="task-stats__value">{total}</span>
                <span className="task-stats__label">Всього</span>
            </div>
            <div className="task-stats__item task-stats__item--completed">
                <span className="task-stats__value">{completed}</span>
                <span className="task-stats__label">Виконано</span>
            </div>
            <div className="task-stats__item task-stats__item--active">
                <span className="task-stats__value">{active}</span>
                <span className="task-stats__label">Не виконано</span>
            </div>

            {completed > 0 && (
                <button type="button" className="task-stats__clear" onClick={onClearCompleted}>
                    Очистити виконані
                </button>
            )}
        </section>
    )
}

export default TaskStats