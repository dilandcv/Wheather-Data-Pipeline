import { useEffect, useState, useCallback } from 'react';
import {
  Thermometer,
  Droplets,
  Wind,
  Clock,
} from 'lucide-react';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import SummaryCard from './components/SummaryCard';
import TemperatureChart from './components/TemperatureChart';
import MeasurementsTable from './components/MeasurementsTable';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import EmptyState from './components/EmptyState';
import {
  getLatestWeather,
  getWeatherSummary,
  getWeatherHistory,
} from './services/weatherApi';
import { formatDateTime, formatNumber } from './utils/formatters';
import './App.css';

export default function App() {
  const [latestWeather, setLatestWeather] = useState(null);
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (isManual = false) => {
    if (isManual) {
      setIsRefreshing(true);
      setError(null);
    }

    try {
      const [latestRes, summaryRes, historyRes] = await Promise.all([
        getLatestWeather(),
        getWeatherSummary(),
        getWeatherHistory(),
      ]);

      setLatestWeather(latestRes);
      setSummary(summaryRes);
      setHistory(Array.isArray(historyRes) ? historyRes : []);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.message || 'No se pudieron cargar los datos.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    async function initData() {
      try {
        const [latestRes, summaryRes, historyRes] = await Promise.all([
          getLatestWeather(),
          getWeatherSummary(),
          getWeatherHistory(),
        ]);
        if (!ignore) {
          setLatestWeather(latestRes);
          setSummary(summaryRes);
          setHistory(Array.isArray(historyRes) ? historyRes : []);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Error fetching weather data:', err);
          setError(err.message || 'No se pudieron cargar los datos.');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    initData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleRefresh = useCallback(() => {
    fetchData(true);
  }, []);

  const handleRetry = useCallback(() => {
    setIsLoading(true);
    fetchData(false);
  }, []);

  const hasData =
    latestWeather &&
    latestWeather.timestamp &&
    summary &&
    summary.total_measurements > 0;

  return (
    <div className="dashboard-layout">
      <Header
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <main className="dashboard-main">
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState
            onRetry={handleRetry}
            errorMessage={error}
          />
        ) : !hasData ? (
          <EmptyState onRefresh={handleRefresh} />
        ) : (
          <div className="dashboard-content">
            {/* 1. Tarjetas principales */}
            <section className="metrics-grid" aria-label="Métricas actuales">
              <WeatherCard
                title="Temperatura actual"
                value={formatNumber(latestWeather.temperature, 1)}
                unit="°C"
                icon={Thermometer}
                description="Última lectura registrada en estación"
                variant="temp"
              />

              <WeatherCard
                title="Humedad"
                value={formatNumber(latestWeather.humidity, 1)}
                unit="%"
                icon={Droplets}
                description="Humedad relativa del aire"
                variant="hum"
              />

              <WeatherCard
                title="Velocidad del viento"
                value={formatNumber(latestWeather.wind_speed, 1)}
                unit="km/h"
                icon={Wind}
                description="Velocidad promedio del viento"
                variant="wind"
              />

              <WeatherCard
                title="Última medición"
                value={formatDateTime(latestWeather.timestamp)}
                unit=""
                icon={Clock}
                description="Fecha y hora del último dato procesado"
                variant="time"
              />
            </section>

            {/* 2. Resumen estadístico */}
            <SummaryCard summary={summary} />

            {/* 3. Gráfica histórica */}
            <TemperatureChart history={history} />

            {/* 4. Tabla de mediciones */}
            <MeasurementsTable measurements={history} />
          </div>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>
          Weather Data Pipeline • Datos obtenidos vía Open-Meteo, procesados con Python ETL y PostgreSQL
        </p>
      </footer>
    </div>
  );
}
