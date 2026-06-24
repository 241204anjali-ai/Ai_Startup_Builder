import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function QuestionsScreen({ idea, questions, onNext, onBack }) {
  const [answers, setAnswers] = useState(
    questions.map(q => ({ id: q.id, question: q.question, answer: '' }))
  )

  const setAnswer = (id, value) => {
    setAnswers(prev => prev.map(a => a.id === id ? { ...a, answer: value } : a))
  }

  const answeredCount = answers.filter(a => a.answer.trim()).length
  const canProceed = answeredCount >= 2

  const handleSubmit = () => {
    if (!canProceed) return
    onNext(answers)
  }

  const handleSkip = () => {
    // Submit with empty answers
    onNext(answers.map(a => ({ ...a, answer: a.answer || 'Not specified' })))
  }

  return (
    <div className="min-h-screen">
      <Navbar step="questions" />

      <main className="max-w-3xl mx-auto px-6 pt-10 pb-20 screen-enter">
        {/* Idea preview strip */}
        <div className="bg-blue-50 border-l-4 border-brand-600 rounded-r-xl px-4 py-3 mb-8">
          <p className="text-xs text-gray-400 mb-1">Your idea</p>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{idea}</p>
        </div>

        <h2 className="text-xl font-medium text-gray-900 mb-2">
          A few quick questions
        </h2>
        <p className="text-sm text-gray-500 mb-7">
          These help us build a much better package for your specific idea.
          Answer at least 2 to continue.
        </p>

        {/* 2x2 question grid */}
        <div className="grid grid-cols-2 gap-4 mb-7">
          {questions.map((q, i) => (
            <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-medium text-brand-600 mb-1">Question {i + 1} of {questions.length}</p>
              <p className="text-sm font-medium text-gray-900 mb-3 leading-snug">{q.question}</p>
              <input
                type="text"
                value={answers[i]?.answer || ''}
                onChange={e => setAnswer(q.id, e.target.value)}
                placeholder={q.hint}
                className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent"
              />
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <p className="text-xs text-gray-400 text-center mb-4">
          {answeredCount} of {questions.length} answered
          {answeredCount >= 2 ? ' — ready to generate!' : ' — answer at least 2 to continue'}
        </p>

        <button
          onClick={handleSubmit}
          disabled={!canProceed}
          className="w-full py-3.5 rounded-xl bg-brand-600 text-white text-base font-medium hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ✨ Generate my startup package
        </button>

        <button
          onClick={handleSkip}
          className="block w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-3 transition-colors"
        >
          Skip questions and generate with idea only
        </button>
      </main>
    </div>
  )
}