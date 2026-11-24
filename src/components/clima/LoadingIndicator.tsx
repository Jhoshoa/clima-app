interface LoadingIndicatorProps {
    message?: string;
}

export function LoadingIndicator({ message = "Cargando datos del clima..." }: LoadingIndicatorProps) {
    return (
        <div className="loading-indicator">
            <p>{message}</p>
        </div>
    )
}
