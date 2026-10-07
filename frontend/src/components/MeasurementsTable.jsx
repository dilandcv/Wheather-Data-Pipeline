import { useMemo, useState } from 'react';
import { ArrowUpDown, Calendar, Thermometer, Droplets, Wind } from 'lucide-react';
import { formatDateTime, formatNumber } from '../utils/formatters';

export default function MeasurementsTable({ measurements = [] }) {
  const [sortAsc, setSortAsc] = useState(false);

  const sortedData = useMemo(() => {
    return [...measurements].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortAsc ? dateA - dateB : dateB - dateA;
    });
  }, [measurements, sortAsc]);

  if (!measurements || measurements.length === 0) {
    return (
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">Registro de Mediciones</h2>
        </div>
        <div className="table-empty">No hay registros disponibles</div>
      </section>
    );
  }

  return (
    <section className="section-container">
      <div className="section-header">
        <div className="section-title-wrap">
          <h2 className="section-title">Registro de Mediciones</h2>
          <span className="section-meta">
            Últimos registros almacenados en base de datos ({measurements.length} total)
          </span>
        </div>
        <button
          type="button"
          className="btn-table-sort"
          onClick={() => setSortAsc((prev) => !prev)}
          title="Cambiar orden cronológico"
        >
          <ArrowUpDown size={14} />
          <span>{sortAsc ? 'Más antiguos primero' : 'Más recientes primero'}</span>
        </button>
      </div>

      <div className="table-container">
        <table className="measurements-table">
          <thead>
            <tr>
              <th scope="col">
                <div className="th-content">
                  <Calendar size={14} />
                  <span>Fecha</span>
                </div>
              </th>
              <th scope="col">
                <div className="th-content">
                  <Thermometer size={14} />
                  <span>Temperatura</span>
                </div>
              </th>
              <th scope="col">
                <div className="th-content">
                  <Droplets size={14} />
                  <span>Humedad</span>
                </div>
              </th>
              <th scope="col">
                <div className="th-content">
                  <Wind size={14} />
                  <span>Viento</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, idx) => (
              <tr key={item.timestamp || idx}>
                <td className="cell-date font-mono">
                  {formatDateTime(item.timestamp)}
                </td>
                <td className="cell-metric cell-temp">
                  <span className="metric-badge metric-badge--temp">
                    {formatNumber(item.temperature, 1)} °C
                  </span>
                </td>
                <td className="cell-metric cell-hum">
                  <span className="metric-badge metric-badge--hum">
                    {formatNumber(item.humidity, 1)} %
                  </span>
                </td>
                <td className="cell-metric cell-wind">
                  <span className="metric-badge metric-badge--wind">
                    {formatNumber(item.wind_speed, 1)} km/h
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
