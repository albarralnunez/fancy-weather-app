import abc
from pydantic import BaseModel


class Query(BaseModel, abc.ABC):
    """ Class that represents the query"""

    @property
    @abc.abstractmethod
    def query_type(self) -> str:
        """Return the message type"""

class QueryResponse(BaseModel, abc.ABC):
    """ Class that represents the query response"""
