import StepIndicator from './StepIndicator'

export default function Navbar({ step, onNewIdea, onDownloadAll }) {
  return (
    <nav className="bg-white border-b border-gray-200 px-10 py-3 flex items-center justify-between sticky top-0 z-50">
      <span className="text-lg font-medium text-gray-900">
        Startup<span className="text-brand-600">GPT</span>
      </span>

      <div className="flex items-center gap-4">
        {/* Step indicator shown on screens 2, 3 */}
        {(step === 'questions' || step === 'generating') && (
          <StepIndicator step={step} />
        )}

        {/* Results screen actions */}
        {step === 'results' && (
          <>
            <button
              onClick={onNewIdea}
              className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              + New idea
            </button>
            <button
              onClick={onDownloadAll}
              className="text-sm px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors flex items-center gap-2"
            >
              ↓ Download all (ZIP)
            </button>
          </>
        )}

        {/* Home screen links */}
        {step === 'home' && (
          <div className="flex items-center gap-6">
            <a href="#how" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">How it works</a>
            <a href="#examples" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Examples</a>
          </div>
        )}
      </div>
    </nav>
  )
}