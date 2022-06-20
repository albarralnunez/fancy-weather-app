from core.domain.queries.get_current_weather_query import GetCurrentWeatherResponse
from shared.query_bus import QueryHandler
from core.domain.queries.get_current_weather_query import GetCurrentWeatherQuery
from core.domain.weather_client import WeatherClient


class GetCurrentWeatherHandler(QueryHandler):
    def __init__(self, weather_client):
        self.weather_client: WeatherClient = weather_client
    
    async def __call__(self, query: GetCurrentWeatherQuery) -> GetCurrentWeatherResponse:
        return await self.weather_client.get_weather_data(
            coordinates=query.coordinates
        )
