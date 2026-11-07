import { useTaskContext } from '../hooks/useTaskContext'
import type { Task } from '../types/task'
import { PRIORITY_LABELS } from '../utils/tasks'
import './TaskItem.scss'

interface TaskItemProps {
    task: Task
    isPending: boolean
}

function TaskItem({ task, isPending }: TaskItemProps) {
    const { toggleTask, requestDelete } = useTaskContext()

    const modifiers = [
        task.completed ? 'task-item--completed' : '',
        isPending ? 'task-item--pending' : '',
    ].join(' ')

    return (
        <li className={`task-item ${modifiers}`}>
            <div className="task-item__content">
                <h3 className="task-item__title">{task.title}</h3>
                {task.description && <p className="task-item__description">{task.description}</p>}

                <div className="task-item__meta">
                    <span className="task-item__badge task-item__badge--category">{task.category}</span>
                    <span className={`task-item__badge task-item__badge--${task.priority}`}>
            {PRIORITY_LABELS[task.priority]}
          </span>
                    <span className="task-item__status">
            {isPending ? 'Буде видалено' : task.completed ? '✓ Виконано' : 'Не виконано'}
          </span>
                </div>
            </div>

            <div className="task-item__actions">
                <button
                    type="button"
                    className="task-item__button task-item__button--toggle"
                    onClick={() => toggleTask(task.id)}
                    disabled={isPending}
                >
                    {task.completed ? 'Повернути' : 'Виконати'}
                </button>
                <button
                    type="button"
                    className="task-item__button task-item__button--delete"
                    onClick={() => requestDelete(task.id)}
                    disabled={isPending}
                >
                    Видалити
                </button>
            </div>
        </li>
    )
}

export default TaskItem