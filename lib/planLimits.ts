// lib/planLimits.ts

export type PlanType = 'free' | 'studio' | 'director' | 'enterprise'

export const PLAN_LIMITS = {
  free: {
    credits: 10,
    monthlyLimit: 10,
    storageLimit: 2000, // 2GB in MB
    resolution: '720p',
    engines: ['pika'],
    stylePresetsLimit: 10,
    projectsLimit: 3,
    apiAccess: false,
    customLUTImport: false,
    reviewPortal: false,
    prioritySupport: false,
    teamSeats: 1,
    whiteLabel: false,
  },
  studio: {
    credits: 100,
    monthlyLimit: 100,
    storageLimit: 50000, // 50GB in MB
    resolution: '1080p',
    engines: ['pika', 'runway'],
    stylePresetsLimit: 50,
    projectsLimit: null, // unlimited
    apiAccess: false,
    customLUTImport: false,
    reviewPortal: false,
    prioritySupport: false,
    teamSeats: 1,
    whiteLabel: false,
  },
  director: {
    credits: 500,
    monthlyLimit: 500,
    storageLimit: 200000, // 200GB in MB
    resolution: '4K',
    engines: ['pika', 'runway', 'kling', 'luma'],
    stylePresetsLimit: 200,
    projectsLimit: null, // unlimited
    apiAccess: true,
    customLUTImport: true,
    reviewPortal: true,
    prioritySupport: true,
    teamSeats: 5,
    whiteLabel: false,
  },
  enterprise: {
    credits: 999999,
    monthlyLimit: 999999,
    storageLimit: 999999999, // unlimited
    resolution: '8K+',
    engines: ['pika', 'runway', 'kling', 'luma', 'custom'],
    stylePresetsLimit: 999,
    projectsLimit: null, // unlimited
    apiAccess: true,
    customLUTImport: true,
    reviewPortal: true,
    prioritySupport: true,
    teamSeats: 999,
    whiteLabel: true,
  },
} as const

export function getPlanLimits(plan: PlanType) {
  return PLAN_LIMITS[plan]
}

export function canUserAccessFeature(user: { plan: string }, feature: keyof typeof PLAN_LIMITS.free) {
  const planLimits = PLAN_LIMITS[user.plan as PlanType] || PLAN_LIMITS.free
  return planLimits[feature]
}