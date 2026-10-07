def validate_weather(data):
    temperature = data["temperature"]
    humidity = data["humidity"]
    wind_speed = data["wind_speed"]
    timestamp = data["timestamp"]

    if temperature is None:
        return False

    if not -50 <= temperature <= 60:
        return False

    if humidity is None or not 0 <= humidity <= 100:
        return False

    if wind_speed is None or wind_speed < 0:
        return False

    if timestamp is None:
        return False

    return True