import requests


def get_current_weather():
    url = "https://api.open-meteo.com/v1/forecast"

    params = {
        "latitude": 10.9685,
        "longitude": -74.7813,
        "current": "temperature_2m,relative_humidity_2m,wind_speed_10m",
    }

    try:
        response = requests.get(url, params=params, timeout=10)

        print("Status:", response.status_code)

        response.raise_for_status()

    except requests.RequestException as error:
        print(f"Error al consultar la API del clima: {error}")
        return None

    data = response.json()

    return data["current"]

if __name__ == "__main__":
    weather = get_current_weather()
    print(weather)