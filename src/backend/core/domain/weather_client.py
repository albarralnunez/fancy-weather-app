

from core.domain.geo import Coordinates
from abc import ABC


class WeatherClient(ABC):

    async def get_weather_data(self, coordinates: Coordinates):
        raise NotImplementedError

    async def get_forecast_5d_3h(self, coordinates: Coordinates):
        raise NotImplementedError