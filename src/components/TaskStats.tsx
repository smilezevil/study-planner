import { useTaskContext } from '../hooks/useTaskContext'
import './TaskStats.scss'

function TaskStats() {
    const { total, counts, status } = useTaskContext()
    const isReady = status === 'success'

    return (
        <section className="task-stats" aria-label="Статистика">
            <div className="task-stats__item">
                <span className="task-stats__value">{isReady ? total : '—'}</span>
                <span className="task-stats__label">Всього на сервері</span>
            </div>
            <div className="task-stats__item task-stats__item--completed">
                <span className="task-stats__value">{isReady ? counts.completed : '—'}</span>
                <span className="task-stats__label">Виконано на сторінці</span>
            </div>
            <div className="task-stats__item task-stats__item--active">
                <span className="task-stats__value">{isReady ? counts.active : '—'}</span>
                <span className="task-stats__label">Не виконано на сторінці</span>
            </div>
        </section>
    )
}

export default TaskStats