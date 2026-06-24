from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # AI provider — switch between "gemini" and "claude"
    ai_provider: str = "groq"

    # API keys
    groq_api_key: str = ""
    anthropic_api_key: str = ""

    # CORS
    frontend_url: str = "http://localhost:5173"

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()