from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2

app = FastAPI(title="Weather Analytics API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_connection():
    return psycopg2.connect(
        host="localhost",
        database="weather_analytics",
        user="postgres",
        password="dilandcv"
    )


@app.get("/weather/latest")
def get_latest_weather():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            timestamp,
            temperature,
            humidity,
            wind_speed
        FROM weather_measurements
        ORDER BY timestamp DESC
        LIMIT 1;
    """)

    row = cursor.fetchone()

    cursor.close()
    connection.close()

    if row is None:
        return {"message": "No hay mediciones disponibles"}

    return {
        "timestamp": row[0].isoformat() if hasattr(row[0], "isoformat") else str(row[0]),
        "temperature": float(row[1]),
        "humidity": float(row[2]),
        "wind_speed": float(row[3])
    }


@app.get("/weather/summary")
def get_weather_summary():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            ROUND(AVG(temperature)::numeric, 1) AS avg_temperature,
            ROUND(MAX(temperature)::numeric, 1) AS max_temperature,
            ROUND(MIN(temperature)::numeric, 1) AS min_temperature,
            ROUND(AVG(humidity)::numeric, 1) AS avg_humidity,
            ROUND(AVG(wind_speed)::numeric, 1) AS avg_wind_speed,
            COUNT(*) AS total_measurements
        FROM weather_measurements;
    """)

    row = cursor.fetchone()

    cursor.close()
    connection.close()

    if row is None or row[5] == 0:
        return {
            "avg_temperature": None,
            "max_temperature": None,
            "min_temperature": None,
            "avg_humidity": None,
            "avg_wind_speed": None,
            "total_measurements": 0
        }

    return {
        "avg_temperature": float(row[0]) if row[0] is not None else None,
        "max_temperature": float(row[1]) if row[1] is not None else None,
        "min_temperature": float(row[2]) if row[2] is not None else None,
        "avg_humidity": float(row[3]) if row[3] is not None else None,
        "avg_wind_speed": float(row[4]) if row[4] is not None else None,
        "total_measurements": int(row[5])
    }


@app.get("/weather/history")
def get_weather_history():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            timestamp,
            temperature,
            humidity,
            wind_speed
        FROM weather_measurements
        ORDER BY timestamp ASC;
    """)

    rows = cursor.fetchall()

    cursor.close()
    connection.close()

    return [
        {
            "timestamp": row[0].isoformat() if hasattr(row[0], "isoformat") else str(row[0]),
            "temperature": float(row[1]),
            "humidity": float(row[2]),
            "wind_speed": float(row[3])
        }
        for row in rows
    ]

