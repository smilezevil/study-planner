import { useTaskContext } from '../hooks/useTaskContext'
import { filterTasks } from '../utils/tasks'
import TaskItem from './TaskItem'
import './TaskList.scss'

function TaskList() {
    const { tasks, status, error, filter, retry } = useTaskContext()

    if (status === 'loading') {
        return (
            <div className="task-list__state" role="status">
                <span className="task-list__spinner" aria-hidden="true" />
                <p className="task-list__state-title">Завантаження...</p>
            </div>
        )
    }

    if (status === 'error') {
        return (
            <div className="task-list__state task-list__state--error" role="alert">
                <p className="task-list__state-title">Помилка завантаження.</p>
                <p className="task-list__state-text">{error}</p>
                <button type="button" className="task-list__retry" onClick={retry}>
                    Спробувати ще
                </button>
            </div>
        )
    }

    if (tasks.length === 0) {
        return (
            <div className="task-list__state">
                <p className="task-list__state-title">Завдань не знайдено.</p>
                <p className="task-list__state-text">Додайте перше навчальне завдання.</p>
            </div>
        )
    }

    const visibleTasks = filterTasks(tasks, filter)

    if (visibleTasks.length === 0) {
        return (
            <div className="task-list__state">
                <p className="task-list__state-title">На цій сторінці за цим фільтром завдань немає.</p>
            </div>
        )
    }

    return (
        <ul className="task-list">
            {visibleTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    )
}

export default TaskList