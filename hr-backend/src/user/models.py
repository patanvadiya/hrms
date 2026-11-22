from sqlalchemy import String, true
from sqlalchemy.orm import Mapped, mapped_column

from src.db.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(String(150), nullable=False)
    email: Mapped[str] = mapped_column(String(254), unique=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True, server_default=true(), nullable=False)
