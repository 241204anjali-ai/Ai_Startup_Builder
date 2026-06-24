import json
import re
import asyncio
from app.config import get_settings

settings = get_settings()


def _clean_json(text: str) -> str:
    """Strip accidental markdown code fences before parsing JSON."""
    text = re.sub(r"```json|```", "", text).strip()
    return text


async def call_ai(prompt: str) -> str:
    return await _call_groq(prompt)


from groq import Groq
import asyncio

async def _call_groq(prompt: str) -> str:

    def _sync_call():

        client = Groq(
            api_key=settings.groq_api_key
        )

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7
        )

        return response.choices[0].message.content

    return await asyncio.to_thread(_sync_call)


async def _call_claude(prompt: str) -> str:
    import anthropic

    # Run synchronous anthropic client in a thread so it doesn't block FastAPI
    def _sync_call():
        client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            messages=[{"role": "user", "content": prompt}],
        )
        return response.content[0].text

    return await asyncio.to_thread(_sync_call)


async def _call_gemini(prompt: str) -> str:
    import google.generativeai as genai

    def _sync_call():
        genai.configure(api_key=settings.gemini_api_key)
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)
        return response.text

    return await asyncio.to_thread(_sync_call)


async def generate_questions(idea: str) -> list[dict]:
    """Generate 4 clarifying questions tailored to the idea."""
    from app.prompts.questions_prompt import get_questions_prompt

    prompt = get_questions_prompt(idea)
    raw = await call_ai(prompt)
    cleaned = _clean_json(raw)
    return json.loads(cleaned)


async def generate_business_plan(idea: str, answers: list, feedback: str = "", previous: str = "") -> str:
    from app.prompts.business_plan_prompt import get_business_plan_prompt

    prompt = get_business_plan_prompt(idea, answers, feedback, previous)
    return await call_ai(prompt)


async def generate_pitch_deck(idea: str, answers: list, feedback: str = "", previous: str = "") -> str:
    from app.prompts.pitch_deck_prompt import get_pitch_deck_prompt

    prompt = get_pitch_deck_prompt(idea, answers, feedback, previous)
    raw = await call_ai(prompt)
    return _clean_json(raw)  # return cleaned JSON string — parsed by caller


async def generate_landing_page(idea: str, answers: list, feedback: str = "", previous: str = "") -> str:
    from app.prompts.landing_page_prompt import get_landing_page_prompt

    prompt = get_landing_page_prompt(idea, answers, feedback, previous)
    raw = await call_ai(prompt)
    # Strip any accidental markdown wrapping around HTML
    raw = re.sub(r"```html|```", "", raw).strip()
    return raw


async def generate_marketing(idea: str, answers: list, feedback: str = "", previous: str = "") -> str:
    from app.prompts.marketing_prompt import get_marketing_prompt

    prompt = get_marketing_prompt(idea, answers, feedback, previous)
    return await call_ai(prompt)