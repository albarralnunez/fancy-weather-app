from abc import ABC, abstractmethod

from .query import Query, QueryResponse


class QueryHandler(ABC):
    @abstractmethod
    def __call__(self, query: Query) -> QueryResponse:
        """Handle the query"""
        raise NotImplementedError
