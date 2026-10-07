def transform_weather_data(current_weather):
    return {
        "timestamp": current_weather["time"],
        "temperature": current_weather["temperature_2m"],
        "humidity": current_weather["relative_humidity_2m"],
        "wind_speed": current_weather["wind_speed_10m"],
    }