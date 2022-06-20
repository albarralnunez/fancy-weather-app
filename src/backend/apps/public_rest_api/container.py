from dependency_injector.containers import DeclarativeContainer

from dependency_injector.providers import Container, Resource
from infrastructure.open_weather.geo_client.container import OpenWeatherGeoClientContainer
from core.container import ApplicationContainer
from infrastructure.open_weather.weather_client.container import OpenWeatherWeatherClientContainer

from shared.fast_api_ext.container import APIConfigContainer
from shared.query_bus.query_bus import QueryBus

def init_query_bus(command_mappings) -> QueryBus:
    query_bus = QueryBus()
    query_bus.add_handlers(mappings=command_mappings)
    return query_bus


class APIContainer(DeclarativeContainer):
    config_contaier = Container(APIConfigContainer)

    weather_client = Container(OpenWeatherWeatherClientContainer)
    geo_client = Container(OpenWeatherGeoClientContainer) 

    application_container = Container(
        ApplicationContainer,
        weather_client=weather_client.client,
        geo_client=geo_client.client
    )

    query_bus = Resource(init_query_bus, application_container.query_mappings)
