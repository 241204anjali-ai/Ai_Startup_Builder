const STATUS_MESSAGES = {
  business_plan: [
    'Analysing the market opportunity...',
    'Writing the executive summary...',
    'Building financial projections...',
    'Finalising competitive landscape...',
  ],
  pitch_deck: [
    'Crafting the problem slide...',
    'Writing market size analysis...',
    'Building the business model slide...',
    'Polishing the final slides...',
  ],
  landing_page: [
    'Writing the hero headline...',
    'Building the features section...',
    'Adding social proof...',
    'Finalising the call to action...',
  ],
  marketing: [
    'Defining your ideal customer...',
    'Identifying top acquisition channels...',
    'Writing the launch checklist...',
    'Setting 90-day milestones...',
  ],
}

const ICONS = {
  business_plan: '📄',
  pitch_deck:    '📊',
  landing_page:  '🌐',
  marketing:     '📣',
}

const LABELS = {
  business_plan: 'Business plan',
  pitch_deck:    'Pitch deck',
  landing_page:  'Landing page',
  marketing:     'Marketing strategy',
}

export default function LoadingCard({ type, done, statusIndex }) {
  const messages = STATUS_MESSAGES[type]
  const safeIndex = statusIndex % messages.length
  const status = done ? 'Completed successfully' : messages[safeIndex]
  const progress = done ? 100 : Math.min(20 + statusIndex * 22, 88)

  return (
    <div className={`rounded-xl border p-5 transition-all duration-500
      ${done ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg
            ${done ? 'bg-green-100' : 'bg-blue-50'}`}
          >
            {ICONS[type]}
          </div>
          <span className={`text-sm font-medium ${done ? 'text-green-800' : 'text-gray-900'}`}>
            {LABELS[type]}
          </span>
        </div>
        {done && (
          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
            ✓ Done
          </span>
        )}
      </div>

      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2 overflow-hidden">
        <div
          className={`h-1.5 rounded-full transition-all duration-700
            ${done ? 'bg-green-500' : 'bg-brand-600'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className={`text-xs ${done ? 'text-green-600' : 'text-gray-400'}`}>
        {status}
      </p>
    </div>
  )
}