import { Inbox, RefreshCw } from 'lucide-react';

export default function EmptyState({ onRefresh }) {
  return (
    <div className="status-state status-state--empty">
      <div className="status-icon-wrapper status-icon-wrapper--empty">
        <Inbox size={36} />
      </div>
      <h2 className="status-title">No hay mediciones disponibles.</h2>
      <p className="status-desc">
        La base de datos PostgreSQL aún no contiene registros meteorológicos. Espera a la próxima ejecución del pipeline o ejecuta el script de ingesta.
      </p>
      {onRefresh && (
        <button type="button" className="btn-retry" onClick={onRefresh}>
          <RefreshCw size={16} />
          <span>Actualizar</span>
        </button>
      )}
    </div>
  );
}
