from pydantic import BaseModel
from typing import Optional


# ── Request models ──────────────────────────────────────────

class QuestionsRequest(BaseModel):
    idea: str


class Answer(BaseModel):
    id: int
    question: str
    answer: str


class GenerateRequest(BaseModel):
    idea: str
    answers: list[Answer]


class RegenerateRequest(BaseModel):
    idea: str
    answers: list[Answer]
    output_type: str  # "business_plan" | "pitch_deck" | "landing_page" | "marketing"
    feedback: Optional[str] = ""
    previous_content: Optional[str] = ""


# ── Response models ─────────────────────────────────────────

class Question(BaseModel):
    id: int
    question: str
    hint: str


class QuestionsResponse(BaseModel):
    questions: list[Question]


class GenerateResponse(BaseModel):
    business_plan: str   # raw text content
    pitch_deck: str      # JSON string of slides
    landing_page: str    # raw HTML string
    marketing: str       # raw text content


class RegenerateResponse(BaseModel):
    output_type: str
    content: str