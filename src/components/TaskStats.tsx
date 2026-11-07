import { useTaskContext } from '../hooks/useTaskContext'
import './TaskStats.scss'

function TaskStats() {
    const { counts, clearCompleted } = useTaskContext()

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

            {counts.completed > 0 && (
                <button type="button" className="task-stats__clear" onClick={clearCompleted}>
                    Очистити виконані
                </button>
            )}
        </section>
    )
}

export default TaskStats