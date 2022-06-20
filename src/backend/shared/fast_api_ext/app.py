from dependency_injector.containers import DeclarativeContainer
from fastapi import APIRouter, FastAPI


def create_app(
    container: DeclarativeContainer,
    routers: list[APIRouter],
    title: str,
    version: str,
    description: str,
    handler_module: str,
) -> FastAPI:
    container.wire(modules=[handler_module])
    app = FastAPI(
        title=title,
        description=description,
        version=version,
        docs_url="/api/docs",
        redoc_url="/api/redoc",
        openapi_url="/api/openapi.json",
    )
    app.container = container  # type: ignore[attr-defined]
    for router in routers:
        app.include_router(router)
    return app
