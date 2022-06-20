import logging
import aiohttp
from core.domain.queries.get_forecast_5d_3h import GetForecast5d3hResponse, GetWeatherAtTimeResponse
from core.domain.queries.get_current_weather_query import GetCurrentWeatherResponse
from core.domain.geo import Coordinates
from core.domain.weather_client import WeatherClient


logger = logging.getLogger(__name__)

class OpenWeatherWeatherClient(WeatherClient):

    def __init__(
        self,
        api_key: str,
        base_url: str,
        aiohttp_client: aiohttp.ClientSession
    ):
        self.aiohttp_client = aiohttp_client
        self.api_key = api_key
        self.base_url = base_url    
    
    async def _get_json(self, response):
        return await response.json()

    def _map_response_to_current_weather_response(self, response):
        return GetCurrentWeatherResponse(
            weather=response["weather"][0]["main"],
            description=response["weather"][0]["description"],
            temperature=response["main"]["temp"],
            feels_like=response["main"]["feels_like"],
            pressure=response["main"]["pressure"],
            humidity=response["main"]["humidity"],
        )

    def _map_response_to_day_weather_response(self, response):
        return GetWeatherAtTimeResponse(
            time=response["dt"],
            weather=response["weather"][0]["main"],
            description=response["weather"][0]["description"],
            temperature=response["main"]["temp"],
            feels_like=response["main"]["feels_like"],
            pressure=response["main"]["pressure"],
            humidity=response["main"]["humidity"],
        ) 

    async def get_weather_data(self, coordinates: Coordinates) -> GetCurrentWeatherResponse:
        url = f"{self.base_url}/weather?lat={coordinates.lat}&lon={coordinates.lon}&appid={self.api_key}"
        logger.debug(f"url: {url}")
        async with self.aiohttp_client.get(url) as open_weather_response:
            open_weather_json = await self._get_json(open_weather_response)
            logger.debug({url: open_weather_json})
            response =  self._map_response_to_current_weather_response(open_weather_json)
            return response
    
    async def get_forecast_5d_3h(self, coordinates: Coordinates) -> GetForecast5d3hResponse:
        url = f"{self.base_url}/forecast?lat={coordinates.lat}&lon={coordinates.lon}&appid={self.api_key}"
        logger.debug(f"url: {url}")
        async with self.aiohttp_client.get(url) as open_weather_response:
            open_weather_json = await self._get_json(open_weather_response)
            logger.debug({url: open_weather_json})
            response = GetForecast5d3hResponse(
                forecast=list(map(
                    self._map_response_to_day_weather_response,
                    open_weather_json["list"]
                ))
            )
            return response
