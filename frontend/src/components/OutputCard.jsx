import { useState } from 'react'
import { downloadFile } from '../utils/download'

const CONFIG = {
  business_plan: { label: 'Business plan',     icon: '📄', ext: 'PDF',  badge: 'bg-blue-50 text-blue-700' },
  pitch_deck:    { label: 'Pitch deck',         icon: '📊', ext: 'PPTX', badge: 'bg-purple-50 text-purple-700' },
  landing_page:  { label: 'Landing page',       icon: '🌐', ext: 'HTML', badge: 'bg-teal-50 text-teal-700' },
  marketing:     { label: 'Marketing strategy', icon: '📣', ext: 'PDF',  badge: 'bg-orange-50 text-orange-700' },
}

export default function OutputCard({ type, content, idea, answers, onRegenerate }) {
  const [feedback, setFeedback] = useState('')
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const cfg = CONFIG[type]

  const handleDownload = () => {
    downloadFile(type, content)
  }

  const handleRegenerate = async () => {
    if (isRegenerating) return
    setIsRegenerating(true)
    await onRegenerate(type, feedback, content)
    setFeedback('')
    setIsRegenerating(false)
  }

  // Show first 300 chars as preview for text content
  const previewText = typeof content === 'string' && !content.startsWith('<!DOCTYPE')
    ? content.slice(0, 300) + '...'
    : null

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4 screen-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-lg">
            {cfg.icon}
          </div>
          <span className="text-sm font-medium text-gray-900">{cfg.label}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${cfg.badge}`}>
          {cfg.ext}
        </span>
      </div>

      {/* Preview area */}
      <div className="bg-gray-50 rounded-lg p-3 min-h-20 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setShowPreview(!showPreview)}
      >
        {previewText ? (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-4">
            {showPreview ? content.slice(0, 800) + '...' : previewText}
          </p>
        ) : (
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded w-full" />
            <div className="h-2 bg-gray-200 rounded w-4/5" />
            <div className="h-2 bg-gray-200 rounded w-3/5" />
            <div className="h-2 bg-gray-200 rounded w-full" />
            <p className="text-xs text-gray-400 mt-2">Click to expand preview</p>
          </div>
        )}
      </div>

      {/* Landing page iframe preview */}
      {type === 'landing_page' && showPreview && (
        <div className="rounded-lg border border-gray-200 overflow-hidden" style={{ height: 300 }}>
          <iframe
            srcDoc={content}
            title="Landing page preview"
            className="w-full h-full border-0 scale-75 origin-top-left"
            style={{ width: '133%', height: '400px', transform: 'scale(0.75)', transformOrigin: 'top left' }}
            sandbox="allow-same-origin"
          />
        </div>
      )}

      {/* Actions row */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleDownload}
          className="text-xs px-3 py-2 rounded-lg border-2 border-brand-600 text-brand-600 hover:bg-blue-50 transition-colors flex items-center gap-1.5 whitespace-nowrap font-medium"
        >
          ↓ Download {cfg.ext}
        </button>

        <input
          type="text"
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleRegenerate()}
          placeholder="Type feedback to refine..."
          className="flex-1 text-xs px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent"
        />

        <button
          onClick={handleRegenerate}
          disabled={isRegenerating}
          className="text-xs px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200 transition-colors flex items-center gap-1.5 whitespace-nowrap disabled:opacity-50"
        >
          {isRegenerating ? '...' : '↺ Redo'}
        </button>
      </div>
    </div>
  )
}