import type { Task } from '../types/task'
import { PRIORITY_LABELS } from '../utils/tasks'
import './TaskItem.scss'

interface TaskItemProps {
    task: Task
}

function TaskItem({ task }: TaskItemProps) {
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
        </li>
    )
}

export default TaskItem