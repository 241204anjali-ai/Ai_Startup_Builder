const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Triggers a file download in the browser.
 * For PDF and PPTX we hit the backend to get the binary file.
 * For HTML we download the string directly.
 */
export async function downloadFile(type, content) {
  if (type === 'landing_page') {
    // HTML — download content directly as a file
    const blob = new Blob([content], { type: 'text/html' })
    triggerDownload(blob, 'landing_page.html')
    return
  }

  if (type === 'business_plan' || type === 'marketing') {
    // PDF — send text to backend, get PDF bytes back
    const res = await fetch(`${API_URL}/api/download/pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        title: type === 'business_plan' ? 'Business Plan' : 'Marketing Strategy',
      }),
    })
    const blob = await res.blob()
    const filename = type === 'business_plan' ? 'business_plan.pdf' : 'marketing_strategy.pdf'
    triggerDownload(blob, filename)
    return
  }

  if (type === 'pitch_deck') {
    // PPTX — send JSON slides to backend, get pptx bytes back
    const res = await fetch(`${API_URL}/api/download/pptx`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slides_json: content }),
    })
    const blob = await res.blob()
    triggerDownload(blob, 'pitch_deck.pptx')
    return
  }
}

export async function downloadAll(results) {
  // Download each file sequentially
  for (const [type, content] of Object.entries(results)) {
    if (content) {
      await downloadFile(type, content)
      // Small delay between downloads to avoid browser blocking
      await new Promise(r => setTimeout(r, 400))
    }
  }
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}