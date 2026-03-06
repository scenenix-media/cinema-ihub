// app/dashboard/studio/StudioClient.tsx

'use client'

import { useState } from 'react'
import { cinematicStyles } from '@/lib/styles'
import Link from 'next/link'

const DURATIONS = [
  { value: 5, label: '5 seconds', credits: 2 },
  { value: 8, label: '8 seconds', credits: 4 },
  { value: 10, label: '10 seconds', credits: 4 }
]

const ASPECT_RATIOS = [
  { value: '16:9', label: 'Landscape (16:9)', icon: '📺' },
  { value: '9:16', label: 'Portrait (9:16)', icon: '📱' },
  { value: '1:1', label: 'Square (1:1)', icon: '⬛' }
]

export default function StudioClient({ user }: any) {
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState(cinematicStyles[0].id)
  const [selectedEngine, setSelectedEngine] = useState(user.engines[0] || 'pika')
  const [duration, setDuration] = useState(5)
  const [aspectRatio, setAspectRatio] = useState('16:9')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedStyleData = cinematicStyles.find(s => s.id === selectedStyle)
  const creditCost = DURATIONS.find(d => d.value === duration)?.credits || 2

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style: selectedStyleData?.name,
          aspectRatio,
          duration,
          engine: selectedEngine
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Generation failed')
      }

      // Redirect to history to see generation progress
      window.location.href = '/dashboard/history'

    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      setGenerating(false)
    }
  }

  return (
    <div className="p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-3xl font-light mb-2">Studio</h1>
        <p className="text-zinc-500">Create cinematic AI videos with professional-grade tools</p>
      </div>

      {/* Credits Display */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-4 mb-8 flex items-center justify-between">
        <div>
          <p className="text-zinc-500 text-xs mb-1">Available Credits</p>
          <p className="text-white text-2xl font-light">{user.credits}</p>
        </div>
        <div className="text-right">
          <p className="text-zinc-500 text-xs mb-1">Monthly Limit</p>
          <p className="text-zinc-400 text-lg">{user.monthlyLimit}</p>
        </div>
        {user.credits < creditCost && (
          <Link href="/dashboard/billing">
            <button className="bg-yellow-600 text-black text-xs tracking-widest uppercase px-6 py-2 rounded-sm font-medium hover:bg-yellow-500">
              Get More Credits
            </button>
          </Link>
        )}
      </div>

      {/* Generation Form */}
      <form onSubmit={handleGenerate} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Controls */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Prompt */}
          <div>
            <label className="text-zinc-400 text-xs tracking-wider uppercase mb-2 block">
              Describe Your Vision
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A serene mountain landscape at golden hour, cinematic lighting, 4K quality..."
              className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded-sm text-sm focus:outline-none focus:border-yellow-600 resize-none"
              rows={4}
              required
              minLength={10}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-zinc-600 text-xs">
                Minimum 10 characters. Be specific for best results.
              </p>
              <p className="text-zinc-500 text-xs">{prompt.length} characters</p>
            </div>
          </div>

          {/* Style Selector */}
          <div>
            <label className="text-zinc-400 text-xs tracking-wider uppercase mb-2 block">
              Cinematic Style
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2">
              {cinematicStyles.map(style => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setSelectedStyle(style.id)}
                  className={`text-left p-4 rounded-sm border transition-all ${
                    selectedStyle === style.id
                      ? 'bg-yellow-600/10 border-yellow-600 shadow-lg shadow-yellow-600/20'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  <div
                    className="w-full h-16 rounded-sm mb-2"
                    style={{ background: style.thumbnail }}
                  />
                  <p className="text-white text-sm font-medium mb-1">{style.name}</p>
                  <p className="text-zinc-600 text-xs">{style.category}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Engine Selector */}
          <div>
            <label className="text-zinc-400 text-xs tracking-wider uppercase mb-2 block">
              AI Engine
            </label>
            <select
              value={selectedEngine}
              onChange={(e) => setSelectedEngine(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-yellow-600"
            >
              {user.engines.map((eng: string) => (
                <option key={eng} value={eng}>
                  {eng.charAt(0).toUpperCase() + eng.slice(1)}
                  {eng === 'runway' && ' - Premium Quality'}
                  {eng === 'luma' && ' - High Quality'}
                  {eng === 'pika' && ' - Fast Generation'}
                  {eng === 'veo' && ' - Google AI'}
                </option>
              ))}
            </select>
            <p className="text-zinc-600 text-xs mt-2">
              Available on your {user.plan} plan
            </p>
          </div>

        </div>

        {/* Right Column - Settings & Preview */}
        <div className="space-y-6">
          
          {/* Duration */}
          <div>
            <label className="text-zinc-400 text-xs tracking-wider uppercase mb-2 block">
              Duration
            </label>
            <div className="space-y-2">
              {DURATIONS.map(d => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDuration(d.value)}
                  className={`w-full p-3 rounded-sm border text-left transition-colors ${
                    duration === d.value
                      ? 'bg-yellow-600 border-yellow-600 text-black'
                      : 'bg-zinc-900 border-zinc-800 text-white hover:border-zinc-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{d.label}</span>
                    <span className={`text-xs ${duration === d.value ? 'text-black/70' : 'text-zinc-500'}`}>
                      {d.credits} credits
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div>
            <label className="text-zinc-400 text-xs tracking-wider uppercase mb-2 block">
              Aspect Ratio
            </label>
            <div className="space-y-2">
              {ASPECT_RATIOS.map(ar => (
                <button
                  key={ar.value}
                  type="button"
                  onClick={() => setAspectRatio(ar.value)}
                  className={`w-full p-3 rounded-sm border text-left transition-colors ${
                    aspectRatio === ar.value
                      ? 'bg-yellow-600 border-yellow-600 text-black'
                      : 'bg-zinc-900 border-zinc-800 text-white hover:border-zinc-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{ar.icon}</span>
                    <span className="text-sm font-medium">{ar.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Style Preview */}
          {selectedStyleData && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-4">
              <p className="text-zinc-500 text-xs mb-2">Selected Style</p>
              <p className="text-white text-sm font-medium mb-2">{selectedStyleData.name}</p>
              <p className="text-zinc-400 text-xs mb-3">{selectedStyleData.description}</p>
              {selectedStyleData.referenceFilm && (
                <p className="text-zinc-600 text-xs">
                  Reference: {selectedStyleData.referenceFilm}
                </p>
              )}
            </div>
          )}

          {/* Cost Summary */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-500 text-xs">Cost</span>
              <span className="text-white text-lg font-light">{creditCost} credits</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 text-xs">After generation</span>
              <span className="text-zinc-400 text-sm">{user.credits - creditCost} credits</span>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-sm text-sm">
              {error}
            </div>
          )}

          {/* Generate Button */}
          <button
            type="submit"
            disabled={generating || user.credits < creditCost || prompt.length < 10}
            className="w-full bg-yellow-600 text-black text-sm tracking-widest uppercase py-4 rounded-sm font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? '🎬 Generating...' : `🎬 Generate Video (${creditCost} credits)`}
          </button>

          {user.credits < creditCost && (
            <p className="text-red-400 text-xs text-center">
              Insufficient credits. <Link href="/dashboard/billing" className="text-yellow-600 hover:text-yellow-500">Get more</Link>
            </p>
          )}

        </div>

      </form>

    </div>
  )
}