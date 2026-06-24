import { useState } from 'react'
import Navbar from '../components/Navbar'
import OutputCard from '../components/OutputCard'
import { downloadAll } from '../utils/download'
import { useGenerate } from '../hooks/useGenerate'

const OUTPUT_TYPES = ['business_plan', 'pitch_deck', 'landing_page', 'marketing']

export default function ResultsScreen({ idea, answers, results, onNewIdea }) {
  const [outputs, setOutputs] = useState(results)
  const [regeneratingType, setRegeneratingType] = useState(null)
  const { regenerateOutput } = useGenerate()

  const handleRegenerate = async (type, feedback, previousContent) => {
    setRegeneratingType(type)
    try {
      const data = await regenerateOutput(idea, answers, type, feedback, previousContent)
      setOutputs(prev => ({ ...prev, [type]: data.content }))
    } catch (e) {
      alert('Regeneration failed. Please try again.')
    } finally {
      setRegeneratingType(null)
    }
  }

  const handleDownloadAll = async () => {
    await downloadAll(outputs)
  }

  return (
    <div className="min-h-screen">
      <Navbar
        step="results"
        onNewIdea={onNewIdea}
        onDownloadAll={handleDownloadAll}
      />

      <main className="max-w-5xl mx-auto px-6 pt-8 pb-20 screen-fade-in">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-900">
            ✅ Your startup package is ready
          </h2>
          <span className="text-xs text-gray-400">
            Download each file below or use "Download all" above
          </span>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {OUTPUT_TYPES.map(type => (
            <div key={type} className="relative">
              {regeneratingType === type && (
                <div className="absolute inset-0 bg-white bg-opacity-80 rounded-xl z-10 flex items-center justify-center">
                  <div className="text-sm text-brand-600 flex items-center gap-2">
                    <span className="pulse-dot inline-block w-2 h-2 rounded-full bg-brand-600" />
                    Regenerating...
                  </div>
                </div>
              )}
              <OutputCard
                type={type}
                content={outputs[type]}
                idea={idea}
                answers={answers}
                onRegenerate={handleRegenerate}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}