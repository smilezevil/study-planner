import type { ToastVariant } from '../types/toast'
import './Toast.scss'

interface ToastProps {
    message: string
    variant: ToastVariant
    durationMs?: number
    actionLabel?: string
    onAction?: () => void
    onClose?: () => void
}

function Toast({ message, variant, durationMs, actionLabel, onAction, onClose }: ToastProps) {
    return (
        <div className={`toast toast--${variant}`} role="status" aria-live="polite">
            <p className="toast__message">{message}</p>

            {actionLabel && onAction && (
                <button type="button" className="toast__action" onClick={onAction}>
                    {actionLabel}
                </button>
            )}

            {onClose && (
                <button type="button" className="toast__close" onClick={onClose} aria-label="Закрити">
                    ×
                </button>
            )}

            {durationMs !== undefined && (
                <span className="toast__progress" style={{ animationDuration: `${durationMs}ms` }} />
            )}
        </div>
    )
}

export default Toast