from typing import ClassVar
from core.domain.geo import Coordinates

from shared.query_bus.query import Query, QueryResponse


class GetLocationByZipCodeQuery(Query):
    query_type: ClassVar[str] = "geo.query.get_location_by_zip_code"
    zip_code: str
    country_code: str


class GetLocationByZipCodeResponse(QueryResponse):
    zip_code: str
    name: str
    coordinates: Coordinates
    country_code: str
