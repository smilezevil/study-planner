import type { Task } from '../types/task'
import { PRIORITY_LABELS } from '../utils/tasks'
import './TaskItem.scss'

interface TaskItemProps {
    task: Task
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    return (
        <li className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
            <div className="task-item__content">
                <h3 className="task-item__title">{task.title}</h3>
                {task.description && <p className="task-item__description">{task.description}</p>}

                <div className="task-item__meta">
                    <span className="task-item__badge task-item__badge--category">{task.category}</span>
                    <span className={`task-item__badge task-item__badge--${task.priority}`}>
            {PRIORITY_LABELS[task.priority]}
          </span>
                    <span className="task-item__status">
            {task.completed ? '✓ Виконано' : 'Не виконано'}
          </span>
                </div>
            </div>

            <div className="task-item__actions">
                <button
                    type="button"
                    className="task-item__button task-item__button--toggle"
                    onClick={() => onToggle(task.id)}
                >
                    {task.completed ? 'Повернути' : 'Виконати'}
                </button>
                <button
                    type="button"
                    className="task-item__button task-item__button--delete"
                    onClick={() => onDelete(task.id)}
                >
                    Видалити
                </button>
            </div>
        </li>
    )
}

export default TaskItem