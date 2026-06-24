import { useEffect, useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import LoadingCard from '../components/LoadingCard'
import { useGenerate } from '../hooks/useGenerate'

const OUTPUT_TYPES = ['business_plan', 'pitch_deck', 'landing_page', 'marketing']

export default function GeneratingScreen({ idea, answers, onDone }) {
  const [statusIndexes, setStatusIndexes] = useState({ business_plan: 0, pitch_deck: 0, landing_page: 0, marketing: 0 })
  const [done, setDone] = useState({ business_plan: false, pitch_deck: false, landing_page: false, marketing: false })
  const [elapsed, setElapsed] = useState(0)
  const [error, setError] = useState('')
  const { generatePackage } = useGenerate()
  const startTimeRef = useRef(Date.now())
  const calledRef = useRef(false)

  // Tick the elapsed timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Cycle status messages while generating
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndexes(prev => ({
        business_plan: prev.business_plan + 1,
        pitch_deck:    prev.pitch_deck + 1,
        landing_page:  prev.landing_page + 1,
        marketing:     prev.marketing + 1,
      }))
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // Fire the generation API call once
  useEffect(() => {
    if (calledRef.current) return
    calledRef.current = true

    generatePackage(idea, answers)
      .then(results => {
        // Mark all as done simultaneously
        setDone({ business_plan: true, pitch_deck: true, landing_page: true, marketing: true })

        // Brief pause so user sees all-green state, then transition
        setTimeout(() => onDone(results), 1200)
      })
      .catch(e => {
        setError('Generation failed. Please go back and try again.')
      })
  }, [])

  const allDone = Object.values(done).every(Boolean)

  return (
    <div className="min-h-screen">
      <Navbar step="generating" />

      <main className="max-w-3xl mx-auto px-6 pt-12 pb-20 screen-enter">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">
            ✨ Building your startup package
          </h2>
          <p className="text-sm text-gray-500">
            All 4 documents are generating simultaneously — usually takes 20–40 seconds
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-8">
          {OUTPUT_TYPES.map(type => (
            <LoadingCard
              key={type}
              type={type}
              done={done[type]}
              statusIndex={statusIndexes[type]}
            />
          ))}
        </div>

        <div className="text-center">
          {allDone ? (
            <p className="text-sm font-medium text-green-600">
              🎉 Your startup package is ready! Loading results...
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              ⏱ {elapsed} seconds elapsed — hang tight
            </p>
          )}
        </div>
      </main>
    </div>
  )
}