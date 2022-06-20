from typing import ClassVar
from core.domain.geo import Coordinates

from shared.query_bus.query import Query, QueryResponse


class GetCurrentWeatherQuery(Query):
    query_type: ClassVar[str] = "weather.query.get_current_weather"
    coordinates: Coordinates


class GetCurrentWeatherResponse(QueryResponse):
    """
    Class that represents the current weather
    """

    weather: str
    description: str
    temperature: float
    feels_like: float
    pressure: float
    humidity: float
