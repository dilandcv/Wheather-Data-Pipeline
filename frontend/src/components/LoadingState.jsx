import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="status-state status-state--loading">
      <div className="status-icon-wrapper">
        <Loader2 className="spinner-icon" size={36} />
      </div>
      <h2 className="status-title">Cargando datos...</h2>
      <p className="status-desc">
        Consultando información meteorológica desde la API
      </p>
    </div>
  );
}
