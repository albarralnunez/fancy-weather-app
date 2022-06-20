from core.domain.queries.get_country_by_coordinates import GetCountryByCoordinatesQuery, GetCountryByCoordinatesResponse
from shared.query_bus.query_handler import QueryHandler

from core.domain.geo_client import GeoClient


class GetCountryByCoordinatesQueryHandler(QueryHandler):
    def __init__(self, geo_client):
        self.geo_client: GeoClient = geo_client
    
    async def __call__(self, query: GetCountryByCoordinatesQuery) -> GetCountryByCoordinatesResponse:
        return await self.geo_client.get_country_by_coordinates(
            lat=query.coordinates.lat,
            lon=query.coordinates.lon
        )
