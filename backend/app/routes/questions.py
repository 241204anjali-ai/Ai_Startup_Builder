from fastapi import APIRouter, HTTPException
from app.models.schemas import QuestionsRequest, QuestionsResponse, Question
from app.services.ai_service import generate_questions

router = APIRouter()


@router.post("/questions", response_model=QuestionsResponse)
async def get_questions(request: QuestionsRequest):
    """
    Receives the startup idea and returns 4 AI-generated
    clarifying questions tailored to that specific idea.
    """
    if not request.idea.strip():
        raise HTTPException(status_code=400, detail="Idea cannot be empty")

    try:
        questions_data = await generate_questions(request.idea)
        questions = [Question(**q) for q in questions_data]
        return QuestionsResponse(questions=questions)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate questions: {str(e)}")