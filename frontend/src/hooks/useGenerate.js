const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export function useGenerate() {

  const fetchQuestions = async (idea) => {
    const res = await fetch(`${API_URL}/api/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea }),
    })
    if (!res.ok) throw new Error('Failed to fetch questions')
    const data = await res.json()
    return data.questions
  }

  const generatePackage = async (idea, answers) => {
    const res = await fetch(`${API_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea, answers }),
    })
    if (!res.ok) throw new Error('Generation failed')
    return await res.json()
  }

  const regenerateOutput = async (idea, answers, outputType, feedback, previousContent) => {
    const res = await fetch(`${API_URL}/api/regenerate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idea,
        answers,
        output_type: outputType,
        feedback,
        previous_content: previousContent,
      }),
    })
    if (!res.ok) throw new Error('Regeneration failed')
    return await res.json()
  }

  return { fetchQuestions, generatePackage, regenerateOutput }
}