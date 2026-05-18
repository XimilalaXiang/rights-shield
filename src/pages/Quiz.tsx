import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock, CheckCircle, XCircle, RotateCcw, Play } from 'lucide-react'
import { type QuizQuestion, getRandomQuestions, difficultyConfig } from '../data/quizQuestions'

type GameState = 'intro' | 'playing' | 'result'
type Difficulty = 'easy' | 'medium' | 'hard'

interface AnswerRecord {
  questionId: string
  selectedAnswer: string
  isCorrect: boolean
}

export default function Quiz() {
  const [gameState, setGameState] = useState<GameState>('intro')
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<AnswerRecord[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)

  const startQuiz = useCallback(() => {
    const qs = getRandomQuestions(difficulty)
    setQuestions(qs)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setAnswers([])
    setTimeLeft(difficultyConfig[difficulty].time)
    setIsTimerActive(true)
    setGameState('playing')
  }, [difficulty])

  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isTimerActive, timeLeft])

  const handleTimeout = () => {
    if (selectedAnswer) return
    setIsTimerActive(false)
    setShowExplanation(true)
    setAnswers(prev => [...prev, { questionId: questions[currentIndex].id, selectedAnswer: '', isCorrect: false }])
  }

  const handleSelect = (optionId: string) => {
    if (selectedAnswer || showExplanation) return
    setSelectedAnswer(optionId)
    setIsTimerActive(false)
    setShowExplanation(true)
    const isCorrect = optionId === questions[currentIndex].correctAnswer
    setAnswers(prev => [...prev, { questionId: questions[currentIndex].id, selectedAnswer: optionId, isCorrect }])
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setTimeLeft(difficultyConfig[difficulty].time)
      setIsTimerActive(true)
    } else {
      setGameState('result')
    }
  }

  const correctCount = answers.filter(a => a.isCorrect).length
  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0

  if (gameState === 'intro') {
    return (
      <div className="bg-black min-h-screen w-full pt-20">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02),transparent_60%)]" />
        </div>
        <div className="max-w-3xl mx-auto px-4 py-16 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white text-sm mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-medium text-blue-400/80 tracking-wide">互动测验</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4">
              购车风险 <span className="italic font-light text-neutral-300">检测</span>
            </h1>
            <p className="text-sm text-neutral-500 mt-4">通过情境题检验你的购车维权知识</p>
          </div>

          {/* Difficulty selection */}
          <div className="grid gap-4 sm:grid-cols-3 mb-12">
            {(Object.entries(difficultyConfig) as [Difficulty, typeof difficultyConfig.easy][]).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setDifficulty(key)}
                className={`p-5 rounded-2xl border transition-all text-center ${
                  difficulty === key
                    ? 'border-white/20 bg-white/[0.06]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                }`}
              >
                <div className="text-lg font-bold text-white mb-1">{config.label}</div>
                <div className="text-xs text-neutral-500">{config.count} 题 / 每题 {config.time}s</div>
                <div className="w-2 h-2 rounded-full mx-auto mt-3" style={{ backgroundColor: config.color }} />
              </button>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={startQuiz}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-all"
            >
              <Play className="w-5 h-5" />
              开始检测
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="bg-black min-h-screen w-full pt-20">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02),transparent_60%)]" />
        </div>
        <div className="max-w-2xl mx-auto px-4 py-16 relative z-10 text-center">
          <div className="mb-8">
            <div className={`text-7xl font-bold mb-4 ${score >= 80 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
              {score}分
            </div>
            <p className="text-lg text-white">
              {score >= 80 ? '优秀！你的购车维权意识很强' : score >= 50 ? '不错，但还有提升空间' : '需要加强学习，防范购车陷阱'}
            </p>
            <p className="text-sm text-neutral-500 mt-2">
              {correctCount}/{questions.length} 题正确
            </p>
          </div>

          {/* Answer review */}
          <div className="text-left space-y-4 mb-12">
            {questions.map((q, i) => {
              const answer = answers[i]
              return (
                <div key={q.id} className={`rounded-xl border p-4 ${answer?.isCorrect ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                  <div className="flex items-start gap-2 mb-2">
                    {answer?.isCorrect ? <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
                    <span className="text-sm text-white">{q.question}</span>
                  </div>
                  <p className="text-xs text-neutral-500 pl-6">{q.explanation}</p>
                </div>
              )
            })}
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={() => { setGameState('intro') }} className="px-6 py-3 rounded-xl border border-white/10 text-white text-sm hover:bg-white/5 transition-colors flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> 重新开始
            </button>
            <Link to="/guide" className="px-6 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors">
              查看维权指南
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Playing state
  const currentQ = questions[currentIndex]
  return (
    <div className="bg-black min-h-screen w-full pt-20">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02),transparent_60%)]" />
      </div>
      <div className="max-w-2xl mx-auto px-4 py-10 relative z-10">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs text-neutral-500">{currentIndex + 1} / {questions.length}</span>
          <div className="flex-1 mx-4 h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-white/40 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
          </div>
          <div className={`flex items-center gap-1 text-xs ${timeLeft <= 5 ? 'text-red-400' : 'text-neutral-500'}`}>
            <Clock className="w-3 h-3" />
            {timeLeft}s
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          {currentQ.scenario && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-6">
              <p className="text-sm text-neutral-300 leading-relaxed">{currentQ.scenario}</p>
            </div>
          )}
          <h2 className="text-lg font-semibold text-white">{currentQ.question}</h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQ.options.map(opt => {
            let style = 'border-white/[0.06] bg-white/[0.02] hover:border-white/15'
            if (showExplanation) {
              if (opt.id === currentQ.correctAnswer) {
                style = 'border-green-500/40 bg-green-500/10'
              } else if (opt.id === selectedAnswer && opt.id !== currentQ.correctAnswer) {
                style = 'border-red-500/40 bg-red-500/10'
              } else {
                style = 'border-white/[0.04] bg-white/[0.01] opacity-50'
              }
            } else if (opt.id === selectedAnswer) {
              style = 'border-white/30 bg-white/10'
            }
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-xl border transition-all ${style}`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs text-neutral-400 flex-shrink-0 mt-0.5">
                    {opt.id.toUpperCase()}
                  </span>
                  <span className="text-sm text-neutral-300">{opt.text}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 mb-8">
            <p className="text-sm text-neutral-300 leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        {/* Next button */}
        {showExplanation && (
          <div className="text-center">
            <button onClick={handleNext} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors text-sm">
              {currentIndex < questions.length - 1 ? '下一题' : '查看结果'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
