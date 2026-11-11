import { useEffect } from 'react'
import { useTaskDetails } from '../hooks/useTaskDetails'
import type { Task } from '../types/task'
import { PRIORITY_LABELS } from '../utils/tasks'
import './TaskDetails.scss'

interface TaskDetailsProps {
    id: number
    listTask?: Task
    onClose: () => void
}

function TaskDetails({ id, listTask, onClose }: TaskDetailsProps) {
    const { status, task, error, retry } = useTaskDetails(id, listTask)

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    const shownTask = task && listTask ? { ...task, ...listTask } : task

    return (
        <div className="task-details" onClick={onClose}>
            <div
                className="task-details__dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="task-details-title"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="task-details__header">
                    <h2 id="task-details-title" className="task-details__title">
                        Деталі завдання #{id}
                    </h2>
                    <button
                        type="button"
                        className="task-details__close"
                        onClick={onClose}
                        aria-label="Закрити"
                    >
                        ×
                    </button>
                </div>

                {status === 'loading' && <p className="task-details__state">Завантаження деталей...</p>}

                {status === 'error' && (
                    <div className="task-details__state task-details__state--error" role="alert">
                        <p>{error}</p>
                        <button type="button" className="task-details__retry" onClick={retry}>
                            Спробувати ще
                        </button>
                    </div>
                )}

                {status === 'success' && shownTask && (
                    <dl className="task-details__list">
                        <dt>Назва</dt>
                        <dd>{shownTask.title}</dd>
                        <dt>Опис</dt>
                        <dd>{shownTask.description || 'Опису немає'}</dd>
                        <dt>Категорія</dt>
                        <dd>{shownTask.category}</dd>
                        <dt>Пріоритет</dt>
                        <dd>{PRIORITY_LABELS[shownTask.priority]}</dd>
                        <dt>Стан</dt>
                        <dd>{shownTask.completed ? '✓ Виконано' : 'Не виконано'}</dd>
                        <dt>Джерело</dt>
                        <dd>{shownTask.isLocal ? 'Створено локально' : 'Сервер (DummyJSON)'}</dd>
                    </dl>
                )}
            </div>
        </div>
    )
}

export default TaskDetails