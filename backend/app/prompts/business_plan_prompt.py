def get_business_plan_prompt(idea: str, answers: list, feedback: str = "", previous: str = "") -> str:
    answers_text = "\n".join([f"- {a['question']}: {a['answer']}" for a in answers])

    feedback_section = ""
    if feedback and previous:
        feedback_section = f"""
REVISION INSTRUCTIONS:
The founder has reviewed the previous version and provided this feedback:
"{feedback}"

Previous version for reference:
{previous}

Apply the feedback carefully. Keep everything that was not mentioned in the feedback unchanged.
"""

    return f"""You are an expert business consultant and startup advisor with experience helping founders raise seed funding.

Generate a comprehensive business plan for the following startup:

IDEA: {idea}

CONTEXT FROM FOUNDER:
{answers_text}
{feedback_section}

Generate a complete business plan with the following sections. Use the exact section headers shown below.

---
EXECUTIVE SUMMARY
Write 2-3 paragraphs summarizing the entire business plan. Cover the problem, solution, market opportunity, and ask.

---
PROBLEM
Describe the specific problem this startup solves. Include who experiences this problem and how painful it is. 2-3 paragraphs.

---
SOLUTION
Describe the product or service clearly. Explain how it solves the problem better than alternatives. 2-3 paragraphs.

---
TARGET MARKET
Define the TAM (Total Addressable Market), SAM (Serviceable Addressable Market), and SOM (Serviceable Obtainable Market) with realistic estimated figures.

---
BUSINESS MODEL
Explain exactly how the company makes money. Pricing structure, revenue streams, unit economics.

---
COMPETITIVE LANDSCAPE
Name 3-4 real or likely competitors. Explain the key differentiator of this startup. Include a brief competitive advantage summary.

---
GO TO MARKET STRATEGY
Describe the launch plan. First 90 days, first year milestones. Key acquisition channels.

---
FINANCIAL PROJECTIONS
Provide Year 1, Year 2, Year 3 projections for revenue, customers, and key expenses. Present as realistic estimates given the business model.

---
THE ASK
If the goal is fundraising, state the raise amount, what it will be used for, and expected runway. If the goal is launching, state launch milestones instead.

---

Rules:
- Be specific — use numbers, percentages, and real market data where possible
- Write in a professional but engaging tone
- Each section should be substantive — minimum 2 paragraphs
- Do not add any sections not listed above
- Do not add any preamble or closing remarks outside the sections
- Total length should be 800-1200 words"""