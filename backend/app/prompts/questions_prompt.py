def get_questions_prompt(idea: str) -> str:
    return f"""You are an expert startup advisor helping a founder build their startup package including a business plan, pitch deck, landing page, and marketing strategy.

A founder has described their startup idea as follows:
"{idea}"

Your job is to generate exactly 4 clarifying questions that will help you build a significantly better startup package for them.

Rules:
- Questions must be specific to THIS idea, not generic
- Each question should unlock information that directly improves one of the 4 outputs
- Questions should be short, clear, and easy to answer in one sentence
- Do not ask questions already answered in the idea description
- Do not ask more than 4 questions

Return ONLY a valid JSON array in this exact format, no explanation, no markdown, no extra text:

[
  {{
    "id": 1,
    "question": "your question here",
    "hint": "a short example answer to guide the user"
  }},
  {{
    "id": 2,
    "question": "your question here",
    "hint": "a short example answer to guide the user"
  }},
  {{
    "id": 3,
    "question": "your question here",
    "hint": "a short example answer to guide the user"
  }},
  {{
    "id": 4,
    "question": "your question here",
    "hint": "a short example answer to guide the user"
  }}
]"""