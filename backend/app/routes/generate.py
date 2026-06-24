import asyncio
from fastapi import APIRouter, HTTPException
from app.models.schemas import GenerateRequest, GenerateResponse
from app.services.ai_service import (
    generate_business_plan,
    generate_pitch_deck,
    generate_landing_page,
    generate_marketing,
)

router = APIRouter()


@router.post("/generate", response_model=GenerateResponse)
async def generate_package(request: GenerateRequest):
    """
    Receives idea + answers and runs all 4 generation tasks
    simultaneously using asyncio.gather().
    Returns all 4 outputs once every task completes.
    """
    if not request.idea.strip():
        raise HTTPException(status_code=400, detail="Idea cannot be empty")

    # Convert Pydantic Answer models to plain dicts for prompt functions
    answers = [{"question": a.question, "answer": a.answer} for a in request.answers]

    try:
        # This is the orchestrator — all 4 tasks run in parallel
        business_plan, pitch_deck, landing_page, marketing = await asyncio.gather(
            generate_business_plan(request.idea, answers),
            generate_pitch_deck(request.idea, answers),
            generate_landing_page(request.idea, answers),
            generate_marketing(request.idea, answers),
        )

        return GenerateResponse(
            business_plan=business_plan,
            pitch_deck=pitch_deck,
            landing_page=landing_page,
            marketing=marketing,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")