def get_pitch_deck_prompt(idea: str, answers: list, feedback: str = "", previous: str = "") -> str:
    answers_text = "\n".join([f"- {a['question']}: {a['answer']}" for a in answers])

    feedback_section = ""
    if feedback and previous:
        feedback_section = f"""
REVISION INSTRUCTIONS:
The founder has reviewed the previous version and provided this feedback:
"{feedback}"

Apply the feedback carefully. Keep slides not mentioned in the feedback unchanged.
"""

    return f"""You are an expert pitch deck consultant who has helped startups raise over $500M in funding.

Create a 10-slide pitch deck for the following startup:

IDEA: {idea}

CONTEXT FROM FOUNDER:
{answers_text}
{feedback_section}

Generate exactly 10 slides in the following structure.
Return ONLY a valid JSON array, no markdown, no explanation:

[
  {{
    "slide_number": 1,
    "title": "slide title",
    "heading": "main heading text for the slide",
    "body": "2-3 bullet points separated by newlines",
    "speaker_note": "what the founder should say while showing this slide"
  }}
]

The 10 slides must be in this exact order:
1. Cover — company name, tagline, founder name
2. Problem — the painful problem being solved
3. Solution — how this startup solves it
4. Product — what it actually is, key features
5. Market size — TAM SAM SOM with numbers
6. Business model — how money is made
7. Traction — early wins, pilots, users (or roadmap if pre-launch)
8. Competition — landscape and differentiation
9. Team — founder background and why them
10. The ask — funding amount or launch goal

Rules:
- Each slide body should be 2-4 bullet points maximum
- Bullet points should be punchy — under 12 words each
- Speaker notes should be 2-3 sentences
- Be specific with numbers where possible
- Return ONLY the JSON array, nothing else"""