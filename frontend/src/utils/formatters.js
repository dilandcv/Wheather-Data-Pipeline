/**
 * Formatea una fecha/hora ISO a formato legible local
 * @param {string} isoString
 * @returns {string}
 */
export function formatDateTime(isoString) {
  if (!isoString) return '--';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;

  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

/**
 * Formatea solo la hora para los ejes de gráficas (HH:mm)
 * @param {string} isoString
 * @returns {string}
 */
export function formatChartTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;

  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

/**
 * Formatea un número asegurando decimales especificados
 * @param {number|null|undefined} value
 * @param {number} decimals
 * @returns {string}
 */
export function formatNumber(value, decimals = 1) {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return '--';
  }
  return Number(value).toFixed(decimals);
}
