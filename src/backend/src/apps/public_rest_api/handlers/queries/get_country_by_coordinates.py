import logging

from fastapi_cache.decorator import cache
from fastapi.params import Depends
from dependency_injector.wiring import Provide, inject
from core.domain.geo import Coordinates
from core.domain.queries.get_country_by_coordinates import GetCountryByCoordinatesQuery, GetCountryByCoordinatesResponse


from shared.query_bus.query_bus import QueryBus
from apps.public_rest_api.container import APIContainer
from apps.public_rest_api.router import router

logger = logging.getLogger(__name__)


@router.get(
    "/api/query/get-country-by-coordinates/",
    response_model=GetCountryByCoordinatesResponse,
    tags=["geo", "query"],
    name="query:get-country-by-coordinates",
)
@inject
@cache(expire=10000)
async def get_country_by_coordinates(
    lat: float,
    lon: float,
    query_bus: QueryBus = Depends(Provide[APIContainer.query_bus]),
):
    response = await query_bus(
        GetCountryByCoordinatesQuery(
            coordinates=Coordinates(lat=lat, lon=lon),
        )
    )
    return response.dict()
