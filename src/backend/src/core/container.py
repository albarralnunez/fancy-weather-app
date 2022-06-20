from dependency_injector import containers, providers

from dependency_injector.providers import Factory
from core.application.get_country_by_coordinates import GetCountryByCoordinatesQueryHandler
from core.domain.queries.get_country_by_coordinates import GetCountryByCoordinatesQuery
from core.application.get_current_weather_handler import GetCurrentWeatherHandler
from core.application.get_forecast_5d_3h import GetForecast5d3hHandler
from core.domain.queries.get_forecast_5d_3h import GetForecast5d3hQuery
from core.domain.geo_client import GeoClient
from core.application.get_location_by_zip_code import GetLocationByZipCodeHandler
from core.domain.queries.get_location import GetLocationByZipCodeQuery

from core.domain.queries.get_current_weather_query import GetCurrentWeatherQuery
from core.domain.weather_client import WeatherClient

class ApplicationContainer(containers.DeclarativeContainer):

    weather_client = providers.AbstractSingleton(WeatherClient)
    geo_client = providers.AbstractSingleton(GeoClient)

    query_mappings = providers.Dict(
        {
            GetCurrentWeatherQuery: Factory(
                GetCurrentWeatherHandler, weather_client=weather_client
            ),
            GetForecast5d3hQuery: Factory(
                GetForecast5d3hHandler, weather_client=weather_client
            ),
            GetLocationByZipCodeQuery: Factory(
                GetLocationByZipCodeHandler, geo_client=geo_client
            ),
            GetCountryByCoordinatesQuery: Factory(
                GetCountryByCoordinatesQueryHandler, geo_client=geo_client
            )
            
        }
    )
