// app/generate/GenerateClient.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cinematicStyles } from '@/lib/styles'

type UserPlan = 'free' | 'studio' | 'director' | 'enterprise'

type GenerateClientProps = {
  user?: {
    plan?: UserPlan
    engines?: string[]
  }
}

const STYLES = cinematicStyles.map((s) => s.name)

const CAMERAS = [
  'Static Shot',
  'Slow Dolly',
  'Crane Up',
  'Handheld',
  'Steadicam',
  '360° Orbit',
  'Dutch Tilt',
  'Tracking Shot',
]

const RATIOS = ['16:9', '9:16', '1:1', '2.39:1']

export default function GenerateClient({ user }: GenerateClientProps) {
  const router = useRouter()

  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('Cinematic')
  const [selectedCamera, setSelectedCamera] = useState('Slow Dolly')
  const [selectedRatio, setSelectedRatio] = useState('16:9')
  const [selectedEngine, setSelectedEngine] = useState(user?.engines?.[0] || 'pika')
  const [duration, setDuration] = useState(8)

  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generationId, setGenerationId] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    if (!prompt.trim() || prompt.length < 10) {
      setError('Please enter a prompt with at least 10 characters')
      return
    }

    setError(null)
    setIsGenerating(true)
    setProgress(0)
    setVideoUrl(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style: selectedStyle,
          camera: selectedCamera,
          aspectRatio: selectedRatio,
          duration,
          engine: selectedEngine,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Generation failed')
        setIsGenerating(false)
        return
      }

      setGenerationId(data.generationId)
      console.log('✅ Generation started:', data.generationId)

      const pollInterval = setInterval(async () => {
        try {
          const statusRes = await fetch(`/api/generate/${data.generationId}/status`)
          const statusData = await statusRes.json()

          setProgress(statusData.progress || 0)

          if (statusData.status === 'complete') {
            clearInterval(pollInterval)
            setVideoUrl(statusData.videoUrl)
            setIsGenerating(false)
            console.log('🎉 Video generated:', statusData.videoUrl)
          }

          if (statusData.status === 'failed') {
            clearInterval(pollInterval)
            setError('Generation failed. Please try again.')
            setIsGenerating(false)
          }
        } catch (err) {
          console.error('Status poll error:', err)
        }
      }, 3000)

      setTimeout(() => {
        clearInterval(pollInterval)
        setIsGenerating(false)
        setError('Generation timeout. Please check dashboard.')
      }, 120000)
    } catch (err) {
      console.error('Generate error:', err)
      setError('Something went wrong. Please try again.')
      setIsGenerating(false)
    }
  }

  const availableEngines = user?.engines?.length ? user.engines : ['pika']

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* LEFT PANEL: CONTROLS */}
      <div className="w-80 border-r border-zinc-800 bg-zinc-950 overflow-y-auto p-6 flex flex-col gap-6">
        <div>
          <h2 className="text-white text-lg font-light mb-1">Generation Studio</h2>
          <p className="text-zinc-500 text-xs">Describe your cinematic vision</p>
        </div>

        <div className="h-px bg-zinc-800" />

        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-sm text-xs">
            {error}
          </div>
        )}

        {/* PROMPT */}
        <div>
          <label className="text-zinc-400 text-xs tracking-widest uppercase block mb-2">
            Scene Description
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A lone detective walks rain-slicked streets at midnight, neon signs reflected in puddles..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-sm text-white text-sm p-3 min-h-28 resize-none focus:outline-none focus:border-yellow-600 placeholder:text-zinc-600 leading-relaxed"
            disabled={isGenerating}
          />
          <div className="flex justify-between mt-1">
            <span className="text-zinc-600 text-xs">{prompt.length} chars</span>
            {!isGenerating && (
              <span
                className="text-yellow-600 text-xs cursor-pointer hover:text-yellow-400"
                onClick={() =>
                  setPrompt(
                    'A cinematic shot of a futuristic city skyline at golden hour, camera slowly panning across gleaming skyscrapers'
                  )
                }
              >
                Use example
              </span>
            )}
          </div>
        </div>

        {/* STYLE */}
        <div>
          <label className="text-zinc-400 text-xs tracking-widest uppercase block mb-2">
            Cinematic Style
          </label>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                disabled={isGenerating}
                className={`text-xs px-3 py-1.5 rounded-sm border transition-colors disabled:opacity-50 ${
                  selectedStyle === style
                    ? 'bg-yellow-600 border-yellow-600 text-black font-medium'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* ENGINE SELECTOR */}
        <div>
          <label className="text-zinc-400 text-xs tracking-wider uppercase mb-2 block">
            AI Engine
          </label>
          <select
            value={selectedEngine}
            onChange={(e) => setSelectedEngine(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-yellow-600"
          >
            {availableEngines.map((eng) => (
              <option key={eng} value={eng}>
                {eng.charAt(0).toUpperCase() + eng.slice(1)}
                {eng === 'runway' && ' - Premium Quality'}
                {eng === 'luma' && ' - High Quality'}
                {eng === 'pika' && ' - Fast Generation'}
                {eng === 'veo' && ' - Google AI'}
              </option>
            ))}
          </select>
          <p className="text-zinc-600 text-xs mt-1">
            Available on your {user?.plan || 'free'} plan
          </p>
        </div>

        {/* CAMERA */}
        <div>
          <label className="text-zinc-400 text-xs tracking-widest uppercase block mb-2">
            Camera Movement
          </label>
          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            disabled={isGenerating}
            className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-yellow-600 disabled:opacity-50"
          >
            {CAMERAS.map((cam) => (
              <option key={cam} value={cam}>
                {cam}
              </option>
            ))}
          </select>
        </div>

        {/* ASPECT RATIO */}
        <div>
          <label className="text-zinc-400 text-xs tracking-widest uppercase block mb-2">
            Aspect Ratio
          </label>
          <div className="flex gap-2">
            {RATIOS.map((ratio) => (
              <button
                key={ratio}
                onClick={() => setSelectedRatio(ratio)}
                disabled={isGenerating}
                className={`flex-1 text-xs py-2 rounded-sm border transition-colors disabled:opacity-50 ${
                  selectedRatio === ratio
                    ? 'bg-yellow-600 border-yellow-600 text-black font-medium'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* DURATION */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-zinc-400 text-xs tracking-widest uppercase">Duration</label>
            <span className="text-yellow-500 text-sm font-medium">{duration}s</span>
          </div>
          <input
            type="range"
            min={4}
            max={30}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            disabled={isGenerating}
            className="w-full accent-yellow-600 disabled:opacity-50"
          />
          <div className="flex justify-between mt-1">
            <span className="text-zinc-600 text-xs">4s</span>
            <span className="text-zinc-600 text-xs">30s</span>
          </div>
        </div>

        {/* GENERATE BUTTON */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-zinc-900 border border-zinc-700 text-white text-xs tracking-widest uppercase py-4 rounded-sm hover:border-yellow-600/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-yellow-600 to-transparent" />
          {isGenerating
            ? `◆ Generating... ${Math.round(progress)}%`
            : videoUrl
              ? '◆ Generate Another'
              : '◆ Generate Scene'}
        </button>

        {/* PROGRESS BAR */}
        {isGenerating && (
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-zinc-500 text-xs">
                {progress < 30
                  ? 'PROCESSING PROMPT'
                  : progress < 70
                    ? 'SYNTHESIZING FRAMES'
                    : 'COMPOSITING SCENE'}
              </span>
              <span className="text-yellow-600 text-xs">{Math.round(progress)}%</span>
            </div>
            <div className="h-0.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-yellow-600 to-yellow-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* RIGHT PANEL: CANVAS */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-white text-lg font-light">Preview Canvas</h3>
            <p className="text-zinc-500 text-xs mt-0.5">
              {selectedRatio} · {selectedStyle} · {selectedCamera}
            </p>
          </div>

          {videoUrl && (
            <div className="flex gap-3">
              <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                <button className="text-zinc-400 text-xs tracking-widest uppercase px-4 py-2 border border-zinc-700 rounded-sm hover:border-zinc-500 transition-colors">
                  Open Video
                </button>
              </a>
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-yellow-600 text-black text-xs tracking-widest uppercase px-4 py-2 rounded-sm font-medium hover:bg-yellow-500 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>

        {/* VIDEO CANVAS */}
        <div
          className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden relative"
          style={{
            aspectRatio:
              selectedRatio === '9:16'
                ? '9/16'
                : selectedRatio === '1:1'
                  ? '1/1'
                  : selectedRatio === '2.39:1'
                    ? '2.39/1'
                    : '16/9',
            maxHeight: '520px',
          }}
        >
          {videoUrl ? (
            <video src={videoUrl} controls autoPlay className="w-full h-full object-cover" />
          ) : isGenerating ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-yellow-500 text-sm font-light tracking-wider">
                {progress < 30
                  ? 'Interpreting cinematic intent...'
                  : progress < 60
                    ? 'Synthesizing frame sequences...'
                    : progress < 85
                      ? 'Applying color science...'
                      : 'Finalizing composition...'}
              </p>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center">
                <span className="text-zinc-600 text-xl">◈</span>
              </div>
              <p className="text-zinc-600 text-sm">Your generation will appear here</p>
              <p className="text-zinc-700 text-xs">Describe your scene and press Generate</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}