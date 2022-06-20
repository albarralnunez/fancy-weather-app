from core.domain.queries.get_forecast_5d_3h import GetForecast5d3hQuery, GetForecast5d3hResponse
from shared.query_bus import QueryHandler
from core.domain.weather_client import WeatherClient


class GetForecast5d3hHandler(QueryHandler):
    def __init__(self, weather_client):
        self.weather_client: WeatherClient = weather_client
    
    async def __call__(self, query: GetForecast5d3hQuery) -> GetForecast5d3hResponse:
        return await self.weather_client.get_forecast_5d_3h(
            coordinates=query.coordinates
        )
