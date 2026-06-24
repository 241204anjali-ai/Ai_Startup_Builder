def process_landing_page(html_content: str) -> str:
    """
    Post-process the AI-generated HTML landing page.
    Ensures it is clean and complete before sending to frontend.
    """
    html = html_content.strip()

    # Ensure it starts with DOCTYPE
    if not html.lower().startswith("<!doctype"):
        html = "<!DOCTYPE html>\n" + html

    return html