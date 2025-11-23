import pytest
from testcontainers.postgres import PostgresContainer
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import get_db
from app.models import Base
from app.main import app
from fastapi.testclient import TestClient


@pytest.fixture(scope="session")
def postgres_container():
    with PostgresContainer("postgres:15") as postgres:
        yield postgres


@pytest.fixture(scope="session")
def db_engine(postgres_container):
    engine = create_engine(postgres_container.get_connection_url())
    Base.metadata.create_all(engine)
    return engine


@pytest.fixture(scope="function")
def db_session(db_engine):
    connection = db_engine.connect()
    transaction = connection.begin()
    yield sessionmaker(bind=connection)()
    transaction.rollback()
    connection.close()


@pytest.fixture(scope="function")
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client


def test_database_connection(db_session):
    """Тест подключения к базе данных"""
    assert db_session is not None
    # Пример проверки - выполнение простого запроса
    result = db_session.execute("SELECT 1")
    assert result.fetchone()[0] == 1