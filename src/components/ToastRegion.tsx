import { TOAST_DURATION_MS, UNDO_DELAY_MS } from '../constants'
import { useTaskContext } from '../hooks/useTaskContext'
import Toast from './Toast'
import './ToastRegion.scss'

function ToastRegion() {
    const { tasks, pendingDeletion, undoDelete, toast, dismissToast } = useTaskContext()

    let undoMessage = ''
    if (pendingDeletion?.kind === 'completed') {
        undoMessage = `Буде видалено виконаних завдань: ${pendingDeletion.ids.length}`
    } else if (pendingDeletion) {
        const task = tasks.find((item) => item.id === pendingDeletion.ids[0])
        undoMessage = task ? `Завдання «${task.title}» буде видалено` : 'Завдання буде видалено'
    }

    return (
        <div className="toast-region">
            {pendingDeletion && (
                <Toast
                    key={pendingDeletion.ids.join('-')}
                    message={undoMessage}
                    variant="warning"
                    durationMs={UNDO_DELAY_MS}
                    actionLabel="Скасувати"
                    onAction={undoDelete}
                />
            )}

            {toast && (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    variant={toast.variant}
                    durationMs={TOAST_DURATION_MS}
                    onClose={dismissToast}
                />
            )}
        </div>
    )
}

export default ToastRegion