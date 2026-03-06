// lib/video-engines/index.ts

import { VideoEngineAdapter, VideoEngine } from './types'
import { RunwayAdapter } from './runway'
import { LumaAdapter } from './luma'
import { PikaAdapter } from './pika'
import { VeoAdapter } from './veo'

export * from './types'

const ENGINES: Record<VideoEngine, VideoEngineAdapter> = {
  runway: RunwayAdapter,
  luma: LumaAdapter,
  pika: PikaAdapter,
  veo: VeoAdapter,
}

export function getEngine(name: VideoEngine): VideoEngineAdapter {
  const engine = ENGINES[name]
  if (!engine) {
    throw new Error(`Unknown video engine: ${name}`)
  }
  return engine
}

export function getAllEngines(): VideoEngineAdapter[] {
  return Object.values(ENGINES)
}

export function getAvailableEngines(): VideoEngine[] {
  // Check which engines have API keys configured
  const available: VideoEngine[] = []
  
  if (process.env.RUNWAY_API_KEY) available.push('runway')
  if (process.env.LUMA_API_KEY) available.push('luma')
  if (process.env.REPLICATE_API_TOKEN) available.push('pika')
  if (process.env.GOOGLE_AI_API_KEY || process.env.GOOGLE_APPLICATION_CREDENTIALS) available.push('veo')
  
  return available
}