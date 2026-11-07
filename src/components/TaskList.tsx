import { useTaskContext } from '../hooks/useTaskContext'
import { getVisibleTasks } from '../utils/tasks'
import TaskItem from './TaskItem'
import './TaskList.scss'

function TaskList() {
    const { tasks, filter, search, isSortedByPriority, pendingDeletion } = useTaskContext()

    if (tasks.length === 0) {
        return (
            <div className="task-list__empty">
                <p className="task-list__empty-title">Завдань поки немає.</p>
                <p className="task-list__empty-text">Додайте перше навчальне завдання.</p>
            </div>
        )
    }

    const visibleTasks = getVisibleTasks(tasks, filter, search, isSortedByPriority)

    if (visibleTasks.length === 0) {
        return (
            <div className="task-list__empty">
                <p className="task-list__empty-title">За цим фільтром завдань немає.</p>
            </div>
        )
    }

    return (
        <ul className="task-list">
            {visibleTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    isPending={pendingDeletion?.ids.includes(task.id) ?? false}
                />
            ))}
        </ul>
    )
}

export default TaskList