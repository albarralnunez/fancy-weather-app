import logging

from fastapi_cache.decorator import cache
from fastapi.params import Depends
from dependency_injector.wiring import Provide, inject
from core.domain.queries.get_location import GetLocationByZipCodeQuery, GetLocationByZipCodeResponse

from shared.query_bus.query_bus import QueryBus
from apps.public_rest_api.container import APIContainer
from apps.public_rest_api.router import router

logger = logging.getLogger(__name__)


@router.get(
    "/api/query/get-location-by-zip-code/",
    response_model=GetLocationByZipCodeResponse,
    tags=["geo", "query"],
    name="query:get-location-by-zip-code",
)
@inject
@cache(expire=10000)
async def get_location_by_zip_code(
    zip_code: str,
    country_code: str,
    query_bus: QueryBus = Depends(Provide[APIContainer.query_bus]),
):
    response = await query_bus(
        GetLocationByZipCodeQuery(
           zip_code=zip_code,
           country_code=country_code
        )
    )
    return response.dict()
