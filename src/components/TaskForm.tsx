import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { useTaskContext } from '../hooks/useTaskContext'
import type { Task, TaskPriority } from '../types/task'
import { PRIORITY_LABELS } from '../utils/tasks'
import './TaskForm.scss'

interface TaskFormProps {
    task?: Task
    onDone?: () => void
}

const DEFAULT_CATEGORY = 'Загальне'
const PRIORITIES: TaskPriority[] = ['low', 'medium', 'high']

function TaskForm({ task, onDone }: TaskFormProps) {
    const { addTask, updateTask } = useTaskContext()
    const isEditing = task !== undefined

    const [title, setTitle] = useState(task?.title ?? '')
    const [description, setDescription] = useState(task?.description ?? '')
    const [category, setCategory] = useState(task?.category ?? '')
    const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? 'medium')
    const [error, setError] = useState('')

    const id = useId()

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const trimmedTitle = title.trim()
        if (!trimmedTitle) {
            setError('Введіть назву завдання')
            return
        }

        const values = {
            title: trimmedTitle,
            description: description.trim(),
            category: category.trim() || DEFAULT_CATEGORY,
            priority,
        }

        if (isEditing) {
            updateTask(task.id, values)
            onDone?.()
            return
        }

        addTask(values)
        setTitle('')
        setDescription('')
        setCategory('')
        setPriority('medium')
        setError('')
    }

    return (
        <form
            className={`task-form ${isEditing ? 'task-form--editing' : ''}`}
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="task-form__field task-form__field--wide">
                <label className="task-form__label" htmlFor={`${id}-title`}>
                    Назва *
                </label>
                <input
                    id={`${id}-title`}
                    className={`task-form__input ${error ? 'task-form__input--invalid' : ''}`}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value)
                        if (error) setError('')
                    }}
                    placeholder="Наприклад: Вивчити useState"
                />
                {error && <p className="task-form__error">{error}</p>}
            </div>

            <div className="task-form__field task-form__field--wide">
                <label className="task-form__label" htmlFor={`${id}-description`}>
                    Опис
                </label>
                <textarea
                    id={`${id}-description`}
                    className="task-form__input task-form__input--textarea"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Коротко, що потрібно зробити"
                    rows={2}
                />
            </div>

            <div className="task-form__field">
                <label className="task-form__label" htmlFor={`${id}-category`}>
                    Категорія
                </label>
                <input
                    id={`${id}-category`}
                    className="task-form__input"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    placeholder={DEFAULT_CATEGORY}
                />
            </div>

            <div className="task-form__field">
                <label className="task-form__label" htmlFor={`${id}-priority`}>
                    Пріоритет
                </label>
                <select
                    id={`${id}-priority`}
                    className="task-form__input"
                    value={priority}
                    onChange={(event) => setPriority(event.target.value as TaskPriority)}
                >
                    {PRIORITIES.map((value) => (
                        <option key={value} value={value}>
                            {PRIORITY_LABELS[value]}
                        </option>
                    ))}
                </select>
            </div>

            <div className="task-form__actions">
                {isEditing && (
                    <button type="button" className="task-form__cancel" onClick={onDone}>
                        Скасувати
                    </button>
                )}
                <button type="submit" className="task-form__submit">
                    {isEditing ? 'Зберегти' : 'Додати'}
                </button>
            </div>
        </form>
    )
}

export default TaskForm