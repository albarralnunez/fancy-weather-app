import logging
from core.domain.queries.get_location import GetLocationByZipCodeResponse
from core.domain.queries.get_current_weather_query import GetCurrentWeatherResponse
from core.domain.geo import Coordinates
from core.domain.weather_client import WeatherClient


logger = logging.getLogger(__name__)

class OpenWeatherGeoClientStub(WeatherClient):

    async def get_location_by_zip_code(self, zip_code: str, country_code: str) -> GetLocationByZipCodeResponse:
        response = GetLocationByZipCodeResponse(
            name="Beverly Hills",
            zip_code="90210",
            coordinates=Coordinates(
                lat=34.0901,
                lon=-118.4065
            ),
            country_code="US"
        )
        return response
