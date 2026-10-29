import type { Task } from '../types/task'
import TaskItem from './TaskItem'
import './TaskList.scss'

interface TaskListProps {
    tasks: Task[]
    hasTasks: boolean
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}

function TaskList({ tasks, hasTasks, onToggle, onDelete }: TaskListProps) {
    if (!hasTasks) {
        return (
            <div className="task-list__empty">
                <p className="task-list__empty-title">Завдань поки немає.</p>
                <p className="task-list__empty-text">Додайте перше навчальне завдання.</p>
            </div>
        )
    }

    if (tasks.length === 0) {
        return (
            <div className="task-list__empty">
                <p className="task-list__empty-title">За цим фільтром завдань немає.</p>
            </div>
        )
    }

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </ul>
    )
}

export default TaskList