from typing import Type

from .query import Query
from .query_handler import QueryHandler


class QueryBus:
    def __init__(self):
        self._registered_handlers: dict[str, QueryHandler] = {}

    def add_handler(self, query_type: Type[Query], handler: QueryHandler):
        self._registered_handlers[query_type.query_type] = handler

    def add_handlers(self, mappings: dict[Type[Query], QueryHandler]):
        for query_type, handler in mappings.items():
            self.add_handler(query_type=query_type, handler=handler)

    async def __call__(self, query: Query):
        query_handler = self._registered_handlers[query.query_type]
        return await query_handler(query)
