export default function WeatherCard({
  title,
  value,
  unit = '',
  icon: Icon,
  description = null,
  variant = 'neutral',
}) {
  return (
    <article className={`weather-card weather-card--${variant}`}>
      <div className="card-top">
        <span className="card-label">{title}</span>
        {Icon && (
          <div className="card-icon-wrapper">
            <Icon size={18} className="card-icon" />
          </div>
        )}
      </div>
      <div className="card-main">
        <span className="card-value">{value}</span>
        {unit && <span className="card-unit">{unit}</span>}
      </div>
      {description && <p className="card-footer">{description}</p>}
    </article>
  );
}
