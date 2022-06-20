from .queries.get_current_weather import get_current_weather_query
from .queries.get_location_by_zip_code import get_location_by_zip_code
from .queries.get_forecast_5d_3h import get_forecast_5d_3h

__all__ = [
    "get_current_weather_query",
    "get_location_by_zip_code",
    "get_forecast_5d_3h"
]
