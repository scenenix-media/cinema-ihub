// lib/video-engines/types.ts

export type VideoEngine = 'runway' | 'luma' | 'pika' | 'veo'

export type VideoGenerationParams = {
  prompt: string
  duration: number
  aspectRatio: '16:9' | '9:16' | '1:1'
  style?: string
  resolution?: string
}

export type VideoTask = {
  id: string
  status: 'pending' | 'processing' | 'complete' | 'failed'
  videoUrl?: string
  thumbnailUrl?: string
  progress?: number
  error?: string
  provider: VideoEngine
}

export interface VideoEngineAdapter {
  name: VideoEngine
  generate(params: VideoGenerationParams): Promise<VideoTask>
  getStatus(taskId: string): Promise<VideoTask>
  cancel?(taskId: string): Promise<void>
  
  maxDuration: number
  supportedAspectRatios: string[]
  costPerSecond: number
}