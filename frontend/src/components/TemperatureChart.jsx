import { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { formatChartTime, formatDateTime } from '../utils/formatters';

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-chart-tooltip">
        <p className="tooltip-time">{data.formattedFull}</p>
        <div className="tooltip-row">
          <span className="tooltip-label">Temperatura:</span>
          <span className="tooltip-value tooltip-value--temp">
            {data.temperature} °C
          </span>
        </div>
        <div className="tooltip-row">
          <span className="tooltip-label">Humedad:</span>
          <span className="tooltip-value">{data.humidity} %</span>
        </div>
        <div className="tooltip-row">
          <span className="tooltip-label">Viento:</span>
          <span className="tooltip-value">{data.wind_speed} km/h</span>
        </div>
      </div>
    );
  }
  return null;
}

export default function TemperatureChart({ history = [] }) {
  const chartData = useMemo(() => {
    return history.map((item) => ({
      ...item,
      formattedTime: formatChartTime(item.timestamp),
      formattedFull: formatDateTime(item.timestamp),
    }));
  }, [history]);

  if (!chartData || chartData.length === 0) {
    return (
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">Evolución de Temperatura</h2>
        </div>
        <div className="chart-empty">No hay datos históricos disponibles</div>
      </section>
    );
  }

  // Calculate min and max for nicely padded Y-axis
  const temperatures = chartData.map((d) => d.temperature);
  const minTemp = Math.floor(Math.min(...temperatures) - 1);
  const maxTemp = Math.ceil(Math.max(...temperatures) + 1);

  return (
    <section className="section-container">
      <div className="section-header">
        <div className="section-title-wrap">
          <h2 className="section-title">Historial de Temperatura</h2>
          <span className="section-meta">
            Evolución térmica cronológica ({chartData.length} mediciones)
          </span>
        </div>
        <div className="chart-legend-badge">
          <TrendingUp size={14} className="legend-icon" />
          <span>Temperatura (°C)</span>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={chartData}
              margin={{ top: 16, right: 24, left: -10, bottom: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="formattedTime"
                stroke="#64748b"
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis
                domain={[minTemp, maxTemp]}
                stroke="#64748b"
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
                unit="°C"
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="temperature"
                name="Temperatura"
                stroke="#ea580c"
                strokeWidth={2.5}
                connectNulls
                isAnimationActive={false}
                dot={{
                  r: 4,
                  fill: '#ea580c',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: '#ea580c',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
