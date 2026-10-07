import { RefreshCw, CloudSun } from 'lucide-react';

export default function Header({ onRefresh, isRefreshing }) {
  return (
    <header className="dashboard-header">
      <div className="header-brand">
        <div className="header-icon-container">
          <CloudSun className="header-icon" size={28} />
        </div>
        <div>
          <h1 className="header-title">Weather Analytics</h1>
          <p className="header-subtitle">
            Visualización y análisis de mediciones meteorológicas en tiempo real
          </p>
        </div>
      </div>
      <div className="header-actions">
        <button
          type="button"
          className="btn-refresh"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Actualizar datos"
        >
          <RefreshCw
            size={16}
            className={`refresh-icon ${isRefreshing ? 'spin' : ''}`}
          />
          <span>{isRefreshing ? 'Actualizando...' : 'Actualizar'}</span>
        </button>
      </div>
    </header>
  );
}
