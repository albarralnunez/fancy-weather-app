import aiohttp
from dependency_injector import containers , providers, resources

from .stub_open_weather_geo_client import OpenWeatherGeoClientStub
from .open_weather_geo_client import  OpenWeatherGeoClient


async def init_aiohttp_client():
    async with aiohttp.ClientSession() as client:
        yield client 


class OpenWeatherGeoClientContainer(containers.DeclarativeContainer):
    config = providers.Configuration()
    config.open_weather_api_key.from_env("OPEN_WEATHER_API_KEY")
    config.open_weather_geo_base_url.from_env(
        "OPEN_WEATHER_GEO_BASE_URL",
        "http://api.openweathermap.org/geo/1.0"
    )

    aiohttp_client = providers.Resource(init_aiohttp_client)

    client = providers.Singleton(
        OpenWeatherGeoClient,
        api_key=config.open_weather_api_key,
        base_url=config.open_weather_geo_base_url,
        aiohttp_client=aiohttp_client
    )

    # client = providers.Singleton(
    #     OpenWeatherGeoClientStub,
    # )