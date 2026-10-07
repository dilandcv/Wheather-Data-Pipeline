import {
  Thermometer,
  TrendingUp,
  TrendingDown,
  Droplets,
  Wind,
  Database,
} from 'lucide-react';
import { formatNumber } from '../utils/formatters';

export default function SummaryCard({ summary }) {
  if (!summary) return null;

  const items = [
    {
      id: 'avg_temp',
      label: 'Temperatura promedio',
      value: formatNumber(summary.avg_temperature, 1),
      unit: '°C',
      icon: Thermometer,
      accent: 'amber',
    },
    {
      id: 'max_temp',
      label: 'Temperatura máxima',
      value: formatNumber(summary.max_temperature, 1),
      unit: '°C',
      icon: TrendingUp,
      accent: 'rose',
    },
    {
      id: 'min_temp',
      label: 'Temperatura mínima',
      value: formatNumber(summary.min_temperature, 1),
      unit: '°C',
      icon: TrendingDown,
      accent: 'cyan',
    },
    {
      id: 'avg_hum',
      label: 'Humedad promedio',
      value: formatNumber(summary.avg_humidity, 1),
      unit: '%',
      icon: Droplets,
      accent: 'blue',
    },
    {
      id: 'avg_wind',
      label: 'Viento promedio',
      value: formatNumber(summary.avg_wind_speed, 1),
      unit: 'km/h',
      icon: Wind,
      accent: 'teal',
    },
    {
      id: 'total_count',
      label: 'Total de mediciones',
      value: summary.total_measurements ?? 0,
      unit: 'registros',
      icon: Database,
      accent: 'indigo',
    },
  ];

  return (
    <section className="section-container">
      <div className="section-header">
        <h2 className="section-title">Resumen Estadístico</h2>
        <span className="section-meta">
          Agregaciones calculadas sobre datos históricos en PostgreSQL
        </span>
      </div>

      <div className="summary-grid">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className={`summary-item summary-item--${item.accent}`}>
              <div className="summary-item-header">
                <span className="summary-item-label">{item.label}</span>
                <div className="summary-icon-box">
                  <Icon size={16} />
                </div>
              </div>
              <div className="summary-item-value-row">
                <span className="summary-item-value">{item.value}</span>
                <span className="summary-item-unit">{item.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
