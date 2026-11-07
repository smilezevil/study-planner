import { useTaskContext } from '../hooks/useTaskContext'
import './TaskStats.scss'

function TaskStats() {
    const { counts, clearCompleted, resetTasks } = useTaskContext()

    return (
        <section className="task-stats" aria-label="Статистика">
            <div className="task-stats__item">
                <span className="task-stats__value">{counts.all}</span>
                <span className="task-stats__label">Всього</span>
            </div>
            <div className="task-stats__item task-stats__item--completed">
                <span className="task-stats__value">{counts.completed}</span>
                <span className="task-stats__label">Виконано</span>
            </div>
            <div className="task-stats__item task-stats__item--active">
                <span className="task-stats__value">{counts.active}</span>
                <span className="task-stats__label">Не виконано</span>
            </div>

            <div className="task-stats__actions">
                {counts.completed > 0 && (
                    <button
                        type="button"
                        className="task-stats__button task-stats__button--danger"
                        onClick={clearCompleted}
                    >
                        Очистити виконані
                    </button>
                )}
                <button type="button" className="task-stats__button" onClick={resetTasks}>
                    Скинути дані
                </button>
            </div>
        </section>
    )
}

export default TaskStats