from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.core.settings import settings

engine = create_engine(settings.DB_CONNECTION)
SessionLocal = sessionmaker(bind=engine)


def get_db():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
