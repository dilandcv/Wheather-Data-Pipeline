import psycopg2


def load_weather_data(weather_data):
    connection = psycopg2.connect(
        host="localhost",
        database="weather_analytics",
        user="postgres",
        password="dilandcv"
    )

    cursor = connection.cursor()

    query = """
        INSERT INTO weather_measurements
        (timestamp, temperature, humidity, wind_speed)
        VALUES (%s, %s, %s, %s)
        ON CONFLICT (timestamp) DO NOTHING
    """

    cursor.execute(
        query,
        (
            weather_data["timestamp"],
            weather_data["temperature"],
            weather_data["humidity"],
            weather_data["wind_speed"],
        )
    )

    if cursor.rowcount == 1:
     print("Dato guardado en PostgreSQL")
    else:
        print("Medición ya existente; no se insertó duplicado")

    connection.commit()

    cursor.close()
    connection.close()
