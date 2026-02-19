'use client'

import Navbar from '@/components/Navbar'
import { useState } from 'react'

const STYLES = [
  "Cinematic", "Film Noir", "Epic Drama", "Neo-Realism",
  "Sci-Fi", "Documentary", "Horror", "Western", "Romance", "Anime"
]

const CAMERAS = [
  "Static Shot", "Slow Dolly", "Crane Up", "Handheld",
  "Steadicam", "360° Orbit", "Dutch Tilt", "Tracking Shot"
]

const RATIOS = ["16:9", "9:16", "1:1", "2.39:1"]

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('Cinematic')
  const [selectedCamera, setSelectedCamera] = useState('Slow Dolly')
  const [selectedRatio, setSelectedRatio] = useState('16:9')
  const [duration, setDuration] = useState(8)
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)

  function handleGenerate() {
    if (!prompt.trim()) return
    setIsGenerating(true)
    setIsDone(false)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setIsDone(true)
          return 100
        }
        return prev + Math.random() * 8
      })
    }, 200)
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="flex h-[calc(100vh-73px)]">

        {/* ── LEFT PANEL: CONTROLS ── */}
        <div className="w-80 border-r border-zinc-800 bg-zinc-950 overflow-y-auto p-6 flex flex-col gap-6">

          <div>
            <h2 className="text-white text-lg font-light mb-1">Generation Studio</h2>
            <p className="text-zinc-500 text-xs">Describe your cinematic vision</p>
          </div>

          <div className="h-px bg-zinc-800" />

          {/* PROMPT */}
          <div>
            <label className="text-zinc-400 text-xs tracking-widest uppercase block mb-2">
              Scene Description
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A lone detective walks rain-slicked streets at midnight, neon signs reflected in puddles, deep shadows..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-sm text-white text-sm p-3 min-h-28 resize-none focus:outline-none focus:border-yellow-600 placeholder:text-zinc-600 leading-relaxed"
            />
            <div className="flex justify-between mt-1">
              <span className="text-zinc-600 text-xs">{prompt.length} chars</span>
              <span
                className="text-yellow-600 text-xs cursor-pointer hover:text-yellow-400"
                onClick={() => setPrompt("A lone detective walks rain-slicked streets at midnight, neon signs reflected in puddles, deep shadows, high contrast lighting, tracking shot")}
              >
                Use example
              </span>
            </div>
          </div>

          {/* STYLE */}
          <div>
            <label className="text-zinc-400 text-xs tracking-widest uppercase block mb-2">
              Cinematic Style
            </label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map(style => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`text-xs px-3 py-1.5 rounded-sm border transition-colors ${
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

          {/* CAMERA */}
          <div>
            <label className="text-zinc-400 text-xs tracking-widest uppercase block mb-2">
              Camera Movement
            </label>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-yellow-600"
            >
              {CAMERAS.map(cam => (
                <option key={cam} value={cam}>{cam}</option>
              ))}
            </select>
          </div>

          {/* ASPECT RATIO */}
          <div>
            <label className="text-zinc-400 text-xs tracking-widest uppercase block mb-2">
              Aspect Ratio
            </label>
            <div className="flex gap-2">
              {RATIOS.map(ratio => (
                <button
                  key={ratio}
                  onClick={() => setSelectedRatio(ratio)}
                  className={`flex-1 text-xs py-2 rounded-sm border transition-colors ${
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
              type="range" min={4} max={30} value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-yellow-600"
            />
            <div className="flex justify-between mt-1">
              <span className="text-zinc-600 text-xs">4s</span>
              <span className="text-zinc-600 text-xs">30s</span>
            </div>
          </div>

          {/* CREDITS */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm px-4 py-3 flex justify-between items-center">
            <span className="text-zinc-400 text-xs">Credits remaining</span>
            <span className="text-yellow-500 text-lg font-light">10</span>
          </div>

          {/* GENERATE BUTTON */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-zinc-900 border border-zinc-700 text-white text-xs tracking-widest uppercase py-4 rounded-sm hover:border-yellow-600/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-yellow-600 to-transparent" />
            {isGenerating ? `Generating... ${Math.round(Math.min(progress, 100))}%` : isDone ? '◆ Generate Another' : '◆ Generate Scene'}
          </button>

          {/* PROGRESS BAR */}
          {(isGenerating || isDone) && (
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-zinc-500 text-xs">
                  {isDone ? 'RENDER COMPLETE' : progress < 30 ? 'PROCESSING PROMPT' : progress < 70 ? 'SYNTHESIZING FRAMES' : 'COMPOSITING SCENE'}
                </span>
                <span className="text-yellow-600 text-xs">{Math.round(Math.min(progress, 100))}%</span>
              </div>
              <div className="h-0.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-yellow-600 to-yellow-400 transition-all duration-300"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )}

        </div>

        {/* ── RIGHT PANEL: CANVAS ── */}
        <div className="flex-1 overflow-y-auto p-8">

          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-white text-lg font-light">Preview Canvas</h3>
              <p className="text-zinc-500 text-xs mt-0.5">{selectedRatio} · {selectedStyle} · {selectedCamera}</p>
            </div>
            <div className="flex gap-3">
              <button className="text-zinc-400 text-xs tracking-widest uppercase px-4 py-2 border border-zinc-700 rounded-sm hover:border-zinc-500 transition-colors">Share</button>
              <button className="bg-yellow-600 text-black text-xs tracking-widest uppercase px-4 py-2 rounded-sm font-medium hover:bg-yellow-500 transition-colors">Export</button>
            </div>
          </div>

          {/* VIDEO CANVAS */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden relative"
            style={{ aspectRatio: selectedRatio === '9:16' ? '9/16' : selectedRatio === '1:1' ? '1/1' : selectedRatio === '2.39:1' ? '2.39/1' : '16/9', maxHeight: '520px' }}>

            {isDone ? (
              <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center">
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 6px)' }} />
                <div className="w-14 h-14 rounded-full border border-yellow-600/50 flex items-center justify-center cursor-pointer hover:border-yellow-400 transition-colors">
                  <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px] border-transparent border-l-yellow-500 ml-1" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-green-900/50 text-green-400 text-xs px-2 py-1 rounded border border-green-800">✓ Generated</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="h-0.5 bg-zinc-700 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-yellow-600 w-1/3 rounded-full" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-xs">0:03</span>
                    <span className="text-zinc-500 text-xs">{duration}s</span>
                  </div>
                </div>
              </div>
            ) : isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <p className="text-yellow-500 text-sm font-light tracking-wider">
                  {progress < 30 ? 'Interpreting cinematic intent...' : progress < 60 ? 'Synthesizing frame sequences...' : progress < 85 ? 'Applying color science...' : 'Finalizing composition...'}
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

          {/* RECENT GENERATIONS */}
          <div className="mt-8">
            <h4 className="text-zinc-400 text-xs tracking-widest uppercase mb-4">Recent Generations</h4>
            <div className="grid grid-cols-3 gap-4">
              {[
                { title: "Rain Street Scene", style: "Film Noir" },
                { title: "Desert Sunrise Wide", style: "Epic Drama" },
                { title: "Neon City Timelapse", style: "Sci-Fi" },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden cursor-pointer hover:border-zinc-600 transition-colors">
                  <div className="aspect-video bg-linear-to-br from-zinc-800 to-zinc-900" />
                  <div className="p-3">
                    <p className="text-white text-xs font-medium">{item.title}</p>
                    <p className="text-zinc-500 text-xs mt-1">{item.style}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}