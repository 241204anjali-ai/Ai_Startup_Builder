def get_marketing_prompt(idea: str, answers: list, feedback: str = "", previous: str = "") -> str:
    answers_text = "\n".join([f"- {a['question']}: {a['answer']}" for a in answers])

    feedback_section = ""
    if feedback and previous:
        feedback_section = f"""
REVISION INSTRUCTIONS:
The founder has reviewed the previous version and provided this feedback:
"{feedback}"

Apply the feedback carefully. Keep sections not mentioned unchanged.
"""

    return f"""You are an expert growth marketer and startup marketing strategist with experience taking B2B and B2C startups from zero to their first 1000 customers.

Create a complete marketing strategy for the following startup:

IDEA: {idea}

CONTEXT FROM FOUNDER:
{answers_text}
{feedback_section}

Generate a complete marketing strategy with the following sections using exact headers shown:

---
IDEAL CUSTOMER PROFILE (ICP)
Describe the ideal customer in detail. Demographics, psychographics, job title, company size (if B2B), pain points, buying behavior, where they spend time online.

---
POSITIONING STATEMENT
One clear sentence: "For [target customer] who [pain point], [product name] is a [category] that [key benefit] unlike [main alternative] which [their limitation]."

---
KEY MESSAGES
3 core messages this startup should communicate consistently across all channels. Each message in one punchy sentence.

---
TOP 3 ACQUISITION CHANNELS
For each channel explain: why it works for this specific startup, exact tactics to use, expected timeline to see results.

---
CONTENT STRATEGY
5 specific content ideas with titles that would attract the target customer. Include the format (blog post, video, LinkedIn post etc).

---
LAUNCH WEEK CHECKLIST
A practical checklist of 10 actions to take in the first week of launch.

---
90 DAY MILESTONES
Month 1, Month 2, Month 3 goals with specific measurable targets.

---

Rules:
- Be hyper specific to this startup and industry
- Give actionable tactics not generic advice
- Use real platform names, real tactics, real numbers
- Total length 600-900 words
- Do not add sections not listed above"""