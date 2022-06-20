from dependency_injector import containers, providers


class APIConfigContainer(containers.DeclarativeContainer):

    config = providers.Configuration()
    config.host.from_env("API_HOST", "0.0.0.0")
    config.port.from_env("API_PORT", as_=int, default=8083)
    config.log_level.from_env("API_LOG_LEVEL", "DEBUG")
    # config.log_level.from_env("API_LOG_LEVEL", "warning")
