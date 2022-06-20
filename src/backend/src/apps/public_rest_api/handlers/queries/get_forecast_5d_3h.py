import logging
from core.domain.geo import Coordinates
from core.domain.queries.get_forecast_5d_3h import GetForecast5d3hQuery, GetForecast5d3hResponse

from fastapi_cache.decorator import cache
from fastapi.params import Depends
from dependency_injector.wiring import Provide, inject

from shared.query_bus.query_bus import QueryBus
from apps.public_rest_api.container import APIContainer
from apps.public_rest_api.router import router

logger = logging.getLogger(__name__)


@router.get(
    "/api/query/get-forecast-5d-3h/",
    response_model=GetForecast5d3hResponse,
    tags=["geo", "query"],
    name="query:get-forecast-5d-3h/",
)
@inject
@cache(expire=10000)
async def get_forecast_5d_3h(
    lat: float,
    lon: float,
    query_bus: QueryBus = Depends(Provide[APIContainer.query_bus]),
):
    response = await query_bus(
        GetForecast5d3hQuery(
            coordinates=Coordinates(lat=lat, lon=lon),
        )
    )
    return response.dict()
