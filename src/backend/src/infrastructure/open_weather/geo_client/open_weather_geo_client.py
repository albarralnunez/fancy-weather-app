import logging

import aiohttp
from core.domain.queries.get_country_by_coordinates import GetCountryByCoordinatesResponse
from core.domain.queries.get_location import GetLocationByZipCodeResponse
from core.domain.geo import Coordinates
from core.domain.geo_client import GeoClient


logger = logging.getLogger(__name__)

class OpenWeatherGeoClient(GeoClient):

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

    async def get_location_by_zip_code(self, zip_code: str, country_code: str) -> GetLocationByZipCodeResponse:
        url = f"{self.base_url}/zip?zip={zip_code},{country_code}&appid={self.api_key}"
        logger.debug(f"url: {url}")
        async with self.aiohttp_client.get(url) as open_weather_response:       
            open_weather_json = await self._get_json(open_weather_response)
            logger.debug({url: open_weather_json})
            response = GetLocationByZipCodeResponse(
                name=open_weather_json["name"],
                zip_code=open_weather_json["zip"],
                coordinates=Coordinates(
                    lat=open_weather_json["lat"],
                    lon=open_weather_json["lon"]
                ),
                country_code=open_weather_json["country"]
            )
            return response

    async def get_country_by_coordinates(self, lat: float, lon: float) -> GetCountryByCoordinatesResponse:
        url = f"{self.base_url}/reverse?lat={lat}&lon={lon}&limit=1&appid={self.api_key}"
        logger.debug(f"url: {url}")
        async with self.aiohttp_client.get(url) as open_weather_response:       
            open_weather_json = await self._get_json(open_weather_response)
            logger.debug({url: open_weather_json})
            response = GetCountryByCoordinatesResponse(
                country_name=open_weather_json[0]["name"],
                country_code=open_weather_json[0]["country"]
            )
            return response