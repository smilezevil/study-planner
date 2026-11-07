export type ToastVariant = 'success' | 'error' | 'info' | 'warning'

export interface ToastMessage {
    id: number
    message: string
    variant: ToastVariant
}