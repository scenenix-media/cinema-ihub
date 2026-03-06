// lib/video-engines/runway.ts

import { VideoEngineAdapter, VideoGenerationParams, VideoTask } from './types'

const API_KEY = process.env.RUNWAY_API_KEY
const API_BASE = 'https://api.runwayml.com/v1'

export const RunwayAdapter: VideoEngineAdapter = {
  name: 'runway',
  maxDuration: 10,
  supportedAspectRatios: ['16:9', '9:16', '1:1'],
  costPerSecond: 0.05,

  async generate(params: VideoGenerationParams): Promise<VideoTask> {
    if (!API_KEY) throw new Error('Runway API key not configured')

    const duration = Math.min(params.duration, this.maxDuration)

    const response = await fetch(`${API_BASE}/image_to_video`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-11-06'
      },
      body: JSON.stringify({
        model: 'gen3a_turbo',
        prompt_text: params.style 
          ? `${params.prompt}, ${params.style} cinematography`
          : params.prompt,
        duration: duration >= 10 ? 10 : 5,
        ratio: params.aspectRatio || '16:9',
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Runway API error: ${error}`)
    }

    const data = await response.json()

    return {
      id: data.id,
      status: 'pending',
      provider: 'runway'
    }
  },

  async getStatus(taskId: string): Promise<VideoTask> {
    if (!API_KEY) throw new Error('Runway API key not configured')

    const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'X-Runway-Version': '2024-11-06'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to get Runway status`)
    }

    const data = await response.json()

    return {
      id: taskId,
      status: data.status === 'SUCCEEDED' ? 'complete' 
            : data.status === 'FAILED' ? 'failed'
            : data.status === 'RUNNING' ? 'processing'
            : 'pending',
      videoUrl: data.output?.[0],
      progress: data.progress ? Math.round(data.progress * 100) : undefined,
      error: data.failure,
      provider: 'runway'
    }
  },

  async cancel(taskId: string) {
    if (!API_KEY) return

    await fetch(`${API_BASE}/tasks/${taskId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'X-Runway-Version': '2024-11-06'
      }
    })
  }
}