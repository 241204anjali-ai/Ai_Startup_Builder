import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useGenerate } from '../hooks/useGenerate'

const EXAMPLE_IDEAS = [
  'Uber for dog walking — an app connecting dog owners with trusted local walkers on-demand',
  'AI tutor for medical students that generates personalized practice questions from lecture notes',
  'B2B expense tracker with AI-powered receipt scanning and automatic accounting integration',
  'Smart home rental platform that matches digital nomads with furnished apartments by the month',
]

export default function HomeScreen({ onNext }) {
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { fetchQuestions } = useGenerate()

  const handleSubmit = async () => {
    if (!idea.trim()) {
      setError('Please describe your startup idea first')
      return
    }
    setError('')
    setLoading(true)
    try {
      const questions = await fetchQuestions(idea.trim())
      onNext(idea.trim(), questions)
    } catch (e) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar step="home" />

      <main className="max-w-3xl mx-auto px-6 pt-16 pb-20">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 text-xs px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium">
            ⚡ Powered by AI
          </span>
        </div>

        {/* Hero */}
        <h1 className="text-4xl font-medium text-gray-900 text-center leading-tight mb-4">
          Turn your idea into a{' '}
          <span className="text-brand-600">complete startup package</span>
        </h1>
        <p className="text-base text-gray-500 text-center mb-10 leading-relaxed">
          Business plan, pitch deck, landing page and marketing strategy —
          generated in minutes. Built for founders, students and hackathons.
        </p>

        {/* Textarea */}
        <div className={`bg-white rounded-xl border-2 p-4 mb-2 transition-colors
          ${error ? 'border-red-300' : 'border-blue-200 focus-within:border-brand-600'}`}
        >
          <label className="block text-xs font-medium text-brand-600 mb-2">
            ✏️ Describe your startup idea
          </label>
          <textarea
            value={idea}
            onChange={e => { setIdea(e.target.value); setError('') }}
            placeholder='e.g. "An AI platform that helps radiologists detect tumors faster using computer vision, targeting private hospitals across the US on a SaaS subscription model..."'
            rows={4}
            className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent resize-none focus:outline-none leading-relaxed"
          />
        </div>
        <p className="text-xs text-gray-400 text-right mb-4">
          The more detail you provide, the better your outputs will be
        </p>

        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

        {/* Example chips */}
        <p className="text-xs text-gray-400 mb-2">Try an example idea:</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {EXAMPLE_IDEAS.map((ex, i) => (
            <button
              key={i}
              onClick={() => setIdea(ex)}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-brand-300 hover:text-brand-600 hover:bg-blue-50 transition-all"
            >
              {ex.split(' — ')[0]}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-brand-600 text-black text-base font-medium hover:bg-brand-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="pulse-dot inline-block w-2 h-2 rounded-full bg-white" />
              Reading your idea...
            </>
          ) : (
            '🚀 Build my startup package — it\'s free'
          )}
        </button>

        {/* Output pills */}
        <div className="flex justify-center flex-wrap gap-2 mt-6">
          {['📄 Business plan PDF', '📊 Pitch deck PPTX', '🌐 Landing page HTML', '📣 Marketing strategy PDF'].map(p => (
            <span key={p} className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500">
              {p}
            </span>
          ))}
        </div>
      </main>
    </div>
  )
}