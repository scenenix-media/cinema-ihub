// lib/video-engines/pika.ts

import { VideoEngineAdapter, VideoGenerationParams, VideoTask } from './types'

const API_TOKEN = process.env.REPLICATE_API_TOKEN
const API_BASE = 'https://api.replicate.com/v1'

export const PikaAdapter: VideoEngineAdapter = {
  name: 'pika',
  maxDuration: 6,
  supportedAspectRatios: ['16:9', '9:16', '1:1'],
  costPerSecond: 0.03,

  async generate(params: VideoGenerationParams): Promise<VideoTask> {
    if (!API_TOKEN) throw new Error('Replicate API token not configured')

    // Using AnimateDiff as Pika-like alternative on Replicate
    const response = await fetch(`${API_BASE}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f',
        input: {
          prompt: params.style 
            ? `${params.prompt}, ${params.style} cinematography`
            : params.prompt,
          motion_module: 'mm_sd_v15_v2',
          num_frames: Math.min(params.duration * 8, 48), // 8 fps
        }
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Pika/Replicate API error: ${error}`)
    }

    const data = await response.json()

    return {
      id: data.id,
      status: 'pending',
      provider: 'pika'
    }
  },

  async getStatus(taskId: string): Promise<VideoTask> {
    if (!API_TOKEN) throw new Error('Replicate API token not configured')

    const response = await fetch(`${API_BASE}/predictions/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get Pika/Replicate status')
    }

    const data = await response.json()

    return {
      id: taskId,
      status: data.status === 'succeeded' ? 'complete'
            : data.status === 'failed' ? 'failed'
            : data.status === 'processing' ? 'processing'
            : 'pending',
      videoUrl: data.output,
      error: data.error,
      provider: 'pika'
    }
  }
}