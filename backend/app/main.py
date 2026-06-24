from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.routes import questions, generate, regenerate, download

settings = get_settings()

app = FastAPI(
    title="StartupGPT API",
    description="AI-powered startup package generator",
    version="1.0.0",
)

# ── CORS ────────────────────────────────────────────────────
# Allows the React frontend to call this API from a different origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ──────────────────────────────────────────────────
app.include_router(questions.router, prefix="/api")
app.include_router(generate.router, prefix="/api")
app.include_router(regenerate.router, prefix="/api")
app.include_router(download.router, prefix="/api")


@app.get("/")
def health_check():
    return {
        "status": "running",
        "ai_provider": settings.ai_provider,
        "version": "1.0.0",
    }