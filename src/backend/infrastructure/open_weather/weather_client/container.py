import aiohttp
from dependency_injector import containers , providers, resources

from .stub_open_weather_weather_client import OpenWeatherWeatherClientStub
from .open_weather_weather_client import  OpenWeatherWeatherClient


async def init_aiohttp_client():
    async with aiohttp.ClientSession() as client:
        yield client 


class OpenWeatherWeatherClientContainer(containers.DeclarativeContainer):
    config = providers.Configuration()
    config.open_weather_api_key.from_env("OPEN_WEATHER_API_KEY")
    config.open_weather_weather_base_url.from_env(
        "OPEN_WEATHER_WEATHER_BASE_URL",
        "https://api.openweathermap.org/data/2.5"
    )

    aiohttp_client = providers.Resource(init_aiohttp_client)

    client = providers.Singleton(
        OpenWeatherWeatherClient,
        api_key=config.open_weather_api_key,
        base_url=config.open_weather_weather_base_url,
        aiohttp_client=aiohttp_client
    )
    # client = providers.Singleton(
    #     OpenWeatherWeatherClientStub,
    # )