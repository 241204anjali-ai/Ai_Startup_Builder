from fastapi import APIRouter, HTTPException
from app.models.schemas import RegenerateRequest, RegenerateResponse
from app.services.ai_service import (
    generate_business_plan,
    generate_pitch_deck,
    generate_landing_page,
    generate_marketing,
)

router = APIRouter()

# Map output_type string to its generator function
GENERATORS = {
    "business_plan": generate_business_plan,
    "pitch_deck": generate_pitch_deck,
    "landing_page": generate_landing_page,
    "marketing": generate_marketing,
}


@router.post("/regenerate", response_model=RegenerateResponse)
async def regenerate_output(request: RegenerateRequest):
    """
    Regenerates a single output based on user feedback.
    Only the requested output_type is regenerated —
    the other 3 outputs remain unchanged.
    """
    if request.output_type not in GENERATORS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid output_type. Must be one of: {list(GENERATORS.keys())}"
        )

    answers = [{"question": a.question, "answer": a.answer} for a in request.answers]
    generator = GENERATORS[request.output_type]

    try:
        content = await generator(
            request.idea,
            answers,
            feedback=request.feedback or "",
            previous=request.previous_content or "",
        )

        return RegenerateResponse(
            output_type=request.output_type,
            content=content,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Regeneration failed: {str(e)}")