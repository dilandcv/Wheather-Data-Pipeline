import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ onRetry, errorMessage }) {
  return (
    <div className="status-state status-state--error">
      <div className="status-icon-wrapper status-icon-wrapper--error">
        <AlertCircle size={36} />
      </div>
      <h2 className="status-title">No se pudieron cargar los datos.</h2>
      <p className="status-desc">
        {errorMessage || 'Comprueba que el backend FastAPI esté ejecutándose en http://127.0.0.1:8000.'}
      </p>
      <button type="button" className="btn-retry" onClick={onRetry}>
        <RefreshCw size={16} />
        <span>Volver a intentar</span>
      </button>
    </div>
  );
}
