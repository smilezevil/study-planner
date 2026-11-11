import { TOAST_DURATION_MS } from '../constants'
import { useTaskContext } from '../hooks/useTaskContext'
import Toast from './Toast'
import './ToastRegion.scss'

function ToastRegion() {
    const { toast, dismissToast } = useTaskContext()

    return (
        <div className="toast-region">
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