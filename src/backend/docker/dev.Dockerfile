FROM python:3.10.5 as python-base

WORKDIR /workspace

RUN pip install poetry

COPY ./poetry.lock ./pyproject.toml ./

RUN poetry install

CMD ["poetry", "run", "python", "src/public_rest_api.py"]
