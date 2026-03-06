// lib/video-engines/luma.ts

import { VideoEngineAdapter, VideoGenerationParams, VideoTask } from './types'

const API_KEY = process.env.LUMA_API_KEY
const API_BASE = 'https://api.lumalabs.ai/dream-machine/v1'

export const LumaAdapter: VideoEngineAdapter = {
  name: 'luma',
  maxDuration: 5,
  supportedAspectRatios: ['16:9', '9:16', '1:1'],
  costPerSecond: 0.04,

  async generate(params: VideoGenerationParams): Promise<VideoTask> {
    if (!API_KEY) throw new Error('Luma API key not configured')

    const response = await fetch(`${API_BASE}/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: params.style 
          ? `${params.prompt}, ${params.style} cinematography`
          : params.prompt,
        aspect_ratio: params.aspectRatio || '16:9',
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Luma API error: ${error}`)
    }

    const data = await response.json()

    return {
      id: data.id,
      status: 'pending',
      provider: 'luma'
    }
  },

  async getStatus(taskId: string): Promise<VideoTask> {
    if (!API_KEY) throw new Error('Luma API key not configured')

    const response = await fetch(`${API_BASE}/generations/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get Luma status')
    }

    const data = await response.json()

    return {
      id: taskId,
      status: data.state === 'completed' ? 'complete'
            : data.state === 'failed' ? 'failed'
            : 'processing',
      videoUrl: data.assets?.video,
      thumbnailUrl: data.assets?.thumbnail,
      error: data.failure_reason,
      provider: 'luma'
    }
  }
}