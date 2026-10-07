from ingestion.weather_api import get_current_weather
from pipeline.transform import transform_weather_data
from pipeline.validate import validate_weather
from pipeline.load import load_weather_data


current_weather = get_current_weather()

weather_data = transform_weather_data(current_weather)


if validate_weather(weather_data):
    print("Datos válidos")
    print(weather_data)

    load_weather_data(weather_data)

else:
    print("Datos inválidos")