const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

/**
 * Helper to perform fetch requests with error handling
 */
async function fetchFromApi(endpoint) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error en la petición ${endpoint}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Obtiene la última medición meteorológica registrada
 * @returns {Promise<{timestamp: string, temperature: number, humidity: number, wind_speed: number} | {message: string}>}
 */
export async function getLatestWeather() {
  return fetchFromApi('/weather/latest');
}

/**
 * Obtiene el resumen estadístico de todas las mediciones
 * @returns {Promise<{avg_temperature: number|null, max_temperature: number|null, min_temperature: number|null, avg_humidity: number|null, avg_wind_speed: number|null, total_measurements: number}>}
 */
export async function getWeatherSummary() {
  return fetchFromApi('/weather/summary');
}

/**
 * Obtiene el historial de mediciones ordenado cronológicamente
 * @returns {Promise<Array<{timestamp: string, temperature: number, humidity: number, wind_speed: number}>>}
 */
export async function getWeatherHistory() {
  return fetchFromApi('/weather/history');
}
