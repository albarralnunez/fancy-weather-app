from typing import ClassVar
from core.domain.geo import Coordinates

from shared.query_bus.query import Query, QueryResponse


class GetCountryByCoordinatesQuery(Query):
    query_type: ClassVar[str] = "geo.query.get_country_by_coordinates"
    coordinates: Coordinates


class GetCountryByCoordinatesResponse(QueryResponse):
    country_name: str
    country_code: str
