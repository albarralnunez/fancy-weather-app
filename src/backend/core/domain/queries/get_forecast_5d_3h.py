from typing import ClassVar
from core.domain.queries.get_current_weather_query import GetCurrentWeatherResponse
from core.domain.geo import Coordinates

from shared.query_bus.query import Query, QueryResponse


class GetForecast5d3hQuery(Query):
    query_type: ClassVar[str] = "weather.query.get_forecast_5d_3h"
    coordinates: Coordinates


class GetWeatherAtTimeResponse(GetCurrentWeatherResponse):
    time: str

class GetForecast5d3hResponse(QueryResponse):

    forecast: list[GetWeatherAtTimeResponse]
