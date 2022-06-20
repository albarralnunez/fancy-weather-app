import logging

from fastapi_cache.decorator import cache
from fastapi.params import Depends
from dependency_injector.wiring import Provide, inject
from core.domain.geo import Coordinates
from core.domain.queries.get_current_weather_query import GetCurrentWeatherQuery, GetCurrentWeatherResponse

from shared.query_bus.query_bus import QueryBus
from apps.public_rest_api.container import APIContainer
from apps.public_rest_api.router import router

logger = logging.getLogger(__name__)


@router.get(
    "/api/query/get-current-weather/",
    response_model=GetCurrentWeatherResponse,
    tags=["weather", "query"],
    name="query:get-current-weather",
)
@inject
@cache(expire=10000)
async def get_current_weather_query(
    lat: float,
    lon: float,
    query_bus: QueryBus = Depends(Provide[APIContainer.query_bus]),
):
    response = await query_bus(
        GetCurrentWeatherQuery(
            coordinates=Coordinates(lat=lat, lon=lon),
        )
    )
    return response.dict()
