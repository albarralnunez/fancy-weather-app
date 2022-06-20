from typing import Optional
from pydantic import BaseModel


class Coordinates(BaseModel):
    """
    Class that represents the coordinates of a location
    """
    lat: float
    lon: float
