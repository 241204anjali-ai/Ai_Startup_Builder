import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import QuestionsScreen from './screens/QuestionsScreen'
import GeneratingScreen from './screens/GeneratingScreen'
import ResultsScreen from './screens/ResultsScreen'

// The 4 possible states of the app
// home → questions → generating → results
export default function App() {
  const [step, setStep] = useState('home')

  // Shared state passed between screens
  const [idea, setIdea] = useState('')
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [results, setResults] = useState(null)

  const goHome = () => {
    setStep('home')
    setIdea('')
    setQuestions([])
    setAnswers([])
    setResults(null)
  }

  return (
    <div className="min-h-screen">
      {step === 'home' && (
        <HomeScreen
          onNext={(ideaText, fetchedQuestions) => {
            setIdea(ideaText)
            setQuestions(fetchedQuestions)
            setStep('questions')
          }}
        />
      )}

      {step === 'questions' && (
        <QuestionsScreen
          idea={idea}
          questions={questions}
          onNext={(submittedAnswers) => {
            setAnswers(submittedAnswers)
            setStep('generating')
          }}
          onBack={goHome}
        />
      )}

      {step === 'generating' && (
        <GeneratingScreen
          idea={idea}
          answers={answers}
          onDone={(generatedResults) => {
            setResults(generatedResults)
            setStep('results')
          }}
        />
      )}

      {step === 'results' && (
        <ResultsScreen
          idea={idea}
          answers={answers}
          results={results}
          onNewIdea={goHome}
        />
      )}
    </div>
  )
}
