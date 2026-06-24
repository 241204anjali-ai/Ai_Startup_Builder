const STEPS = [
  { id: 1, label: 'Idea' },
  { id: 2, label: 'Questions' },
  { id: 3, label: 'Generating' },
  { id: 4, label: 'Results' },
]

const STEP_MAP = {
  home:       1,
  questions:  2,
  generating: 3,
  results:    4,
}

export default function StepIndicator({ step }) {
  const current = STEP_MAP[step] || 1

  return (
    <div className="flex items-center gap-2">
      {STEPS.map((s, i) => {
        const done   = s.id < current
        const active = s.id === current

        return (
          <div key={s.id} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all
                ${done   ? 'bg-brand-600 text-white' : ''}
                ${active ? 'bg-blue-50 text-brand-700 border-2 border-brand-600' : ''}
                ${!done && !active ? 'bg-gray-100 text-gray-400 border border-gray-200' : ''}
              `}
            >
              {done ? '✓' : s.id}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-6 h-px ${done ? 'bg-brand-600' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}