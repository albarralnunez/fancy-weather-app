import logging
from core.domain.queries.get_current_weather_query import GetCurrentWeatherResponse
from core.domain.geo import Coordinates
from core.domain.weather_client import WeatherClient


logger = logging.getLogger(__name__)

class OpenWeatherWeatherClientStub(WeatherClient):

    async def get_weather_data(self, coordinates: Coordinates) -> GetCurrentWeatherResponse:
        response = GetCurrentWeatherResponse(
            weather="Clouds",
            description="overcast clouds",
            temperature=294.44,
            feels_like=294.97,
            pressure=1004,
            humidity=90
        )
        return response
