import { useState } from 'react'
import { useTaskContext } from '../hooks/useTaskContext'
import type { Task } from '../types/task'
import { PRIORITY_LABELS } from '../utils/tasks'
import TaskForm from './TaskForm'
import './TaskItem.scss'

interface TaskItemProps {
    task: Task
}

function TaskItem({ task }: TaskItemProps) {
    const { toggleTask, deleteTask, openDetails } = useTaskContext()
    const [isEditing, setIsEditing] = useState(false)
    const [isConfirming, setIsConfirming] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete() {
        setIsDeleting(true)
        const isDeleted = await deleteTask(task.id)
        if (!isDeleted) {
            setIsDeleting(false)
            setIsConfirming(false)
        }
    }

    if (isEditing) {
        return (
            <li className="task-item task-item--editing">
                <TaskForm task={task} onDone={() => setIsEditing(false)} />
            </li>
        )
    }

    const modifiers = [
        task.completed ? 'task-item--completed' : '',
        isDeleting ? 'task-item--pending' : '',
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
            {isDeleting ? 'Видалення...' : task.completed ? '✓ Виконано' : 'Не виконано'}
          </span>
                </div>
            </div>

            {isConfirming ? (
                <div className="task-item__actions task-item__actions--confirm">
                    <span className="task-item__confirm-text">Видалити завдання?</span>
                    <button
                        type="button"
                        className="task-item__button task-item__button--delete"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        Так, видалити
                    </button>
                    <button
                        type="button"
                        className="task-item__button"
                        onClick={() => setIsConfirming(false)}
                        disabled={isDeleting}
                    >
                        Ні
                    </button>
                </div>
            ) : (
                <div className="task-item__actions">
                    <button
                        type="button"
                        className="task-item__button task-item__button--toggle"
                        onClick={() => toggleTask(task.id)}
                    >
                        {task.completed ? 'Повернути' : 'Виконати'}
                    </button>
                    <button
                        type="button"
                        className="task-item__button task-item__button--edit"
                        onClick={() => openDetails(task.id)}
                    >
                        Деталі
                    </button>
                    <button
                        type="button"
                        className="task-item__button task-item__button--edit"
                        onClick={() => setIsEditing(true)}
                    >
                        Редагувати
                    </button>
                    <button
                        type="button"
                        className="task-item__button task-item__button--delete"
                        onClick={() => setIsConfirming(true)}
                    >
                        Видалити
                    </button>
                </div>
            )}
        </li>
    )
}

export default TaskItem