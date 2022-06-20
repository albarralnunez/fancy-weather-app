from .queries.get_current_weather import get_current_weather_query
from .queries.get_location_by_zip_code import get_location_by_zip_code
from .queries.get_forecast_5d_3h import get_forecast_5d_3h
from .queries.get_country_by_coordinates import get_country_by_coordinates

__all__ = [
    "get_current_weather_query",
    "get_location_by_zip_code",
    "get_forecast_5d_3h",
    "get_country_by_coordinates"
]
