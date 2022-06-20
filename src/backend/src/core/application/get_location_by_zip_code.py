from shared.query_bus.query_handler import QueryHandler

from core.domain.queries.get_location import GetLocationByZipCodeQuery, GetLocationByZipCodeResponse
from core.domain.geo_client import GeoClient


class GetLocationByZipCodeHandler(QueryHandler):
    def __init__(self, geo_client):
        self.geo_client: GeoClient = geo_client
    
    async def __call__(self, query: GetLocationByZipCodeQuery) -> GetLocationByZipCodeResponse:
        return await self.geo_client.get_location_by_zip_code(
            zip_code=query.zip_code,
            country_code=query.country_code
        )
