def get_landing_page_prompt(idea: str, answers: list, feedback: str = "", previous: str = "") -> str:
    answers_text = "\n".join([f"- {a['question']}: {a['answer']}" for a in answers])

    feedback_section = ""
    if feedback and previous:
        feedback_section = f"""
REVISION INSTRUCTIONS:
The founder has reviewed the previous version and provided this feedback:
"{feedback}"

Apply the feedback carefully. Keep sections not mentioned unchanged.
"""

    return f"""You are an expert frontend developer and conversion rate optimization specialist.

Create a complete, beautiful, single-page HTML landing page for the following startup:

IDEA: {idea}

CONTEXT FROM FOUNDER:
{answers_text}
{feedback_section}

Generate a complete HTML page with inline CSS and no external dependencies. The page must include:

1. NAVBAR — logo name on left, one CTA button on right
2. HERO SECTION — compelling headline, subheadline, primary CTA button, secondary link
3. PROBLEM SECTION — 3 pain points with emoji icons in a 3-column grid
4. SOLUTION SECTION — 3 key features with descriptions
5. HOW IT WORKS — 3 numbered steps
6. SOCIAL PROOF — 2 fictional but realistic testimonials
7. CTA SECTION — final call to action with email input
8. FOOTER — company name, tagline, copyright

Design rules:
- Color scheme: professional blue and white (#2563EB primary)
- Font: use system fonts only (font-family: -apple-system, BlinkMacSystemFont, sans-serif)
- Fully responsive — use flexbox and CSS grid
- Clean modern design — generous whitespace
- All text must be specific to this startup — no placeholder text like "Lorem ipsum"

Return ONLY the complete HTML starting with <!DOCTYPE html>
No explanation, no markdown code blocks, just raw HTML."""