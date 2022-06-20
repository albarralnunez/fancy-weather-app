import uvicorn
import aioredis
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend


from shared.fast_api_ext.app import create_app
from apps.public_rest_api.container import APIContainer
from apps.public_rest_api.router import router


import logging


container = APIContainer()

app = create_app(
    title="Fancy Weather Public API",
    description="Fancy Weather Public API",
    version="0.0.1",
    container=container,
    routers=[router],
    handler_module="apps.public_rest_api.handlers",
)

@app.on_event("startup")
async def startup():
    redis =  aioredis.from_url("redis://redis", encoding="utf8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")


if __name__ == "__main__":
    log_level = logging.getLevelName(container.config_contaier.config.log_level())
    logging.basicConfig(format="%(asctime)s - %(message)s", level=log_level)
    uvicorn.run(
        app,
        host=container.config_contaier.config.host(),
        port=container.config_contaier.config.port(),
        log_level=log_level
    )
