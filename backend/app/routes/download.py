from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel
from app.services.pdf_service import text_to_pdf
from app.services.pptx_service import json_to_pptx

router = APIRouter()


class PDFRequest(BaseModel):
    content: str
    title: str


class PPTXRequest(BaseModel):
    slides_json: str


@router.post("/download/pdf")
async def download_pdf(request: PDFRequest):
    """Convert plain text content into a downloadable PDF."""
    try:
        pdf_bytes = text_to_pdf(request.content, request.title)
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{request.title.lower().replace(" ", "_")}.pdf"'}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(e)}")


@router.post("/download/pptx")
async def download_pptx(request: PPTXRequest):
    """Convert pitch deck JSON into a downloadable .pptx file."""
    try:
        pptx_bytes = json_to_pptx(request.slides_json)
        return Response(
            content=pptx_bytes,
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            headers={"Content-Disposition": 'attachment; filename="pitch_deck.pptx"'}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PPTX generation failed: {str(e)}")