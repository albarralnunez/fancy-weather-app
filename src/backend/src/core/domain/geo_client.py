from abc import ABC


class GeoClient(ABC):
    """
    GeoClient class
    """

    def get_location_by_zip_code(self, zip_code: str, country_code: str):
        raise NotImplementedError()
    
    def get_country_by_coordinates(self, lat: float, lon: float):
        raise NotImplementedError()
    