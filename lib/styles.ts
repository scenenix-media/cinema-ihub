// lib/styles.ts

export type CinematicStyle = {
  id: string
  name: string
  description: string
  thumbnail: string // We'll use gradients as placeholders
  promptEnhancement: string
  colorGrade: string
  cameraStyle: string
  lighting: string
  category: 'Commercial' | 'Narrative' | 'Music Video' | 'Documentary' | 'Artistic'
  examples: string[] // Example use cases
  referenceFilm?: string
}

export const cinematicStyles: CinematicStyle[] = [
  {
    id: 'blade-runner-noir',
    name: 'Neo-Noir Cityscape',
    description: 'Blade Runner-inspired cyberpunk aesthetic with neon reflections, rain-slicked streets, and atmospheric haze',
    thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    promptEnhancement: 'Cinematic neo-noir style, blade runner aesthetic, neon lights reflecting on wet surfaces, atmospheric fog, dramatic shadows, cyberpunk color palette with cyan and magenta tones, 2.39:1 anamorphic composition',
    colorGrade: 'Deep shadows, crushed blacks, teal and orange color grading, high contrast',
    cameraStyle: 'Slow dolly push-in, low angle, wide anamorphic lens',
    lighting: 'Practical neon sources, volumetric fog, rim lighting',
    category: 'Narrative',
    examples: ['City establishing shots', 'Night scenes', 'Tech company promos'],
    referenceFilm: 'Blade Runner 2049 (Roger Deakins)'
  },
  {
    id: 'wes-anderson',
    name: 'Symmetrical Pastel',
    description: 'Wes Anderson-inspired perfectly centered compositions with pastel color palettes and whimsical production design',
    thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    promptEnhancement: 'Wes Anderson style cinematography, perfectly symmetrical composition, centered framing, pastel color palette, flat lighting, retro production design, whimsical details, 1.85:1 aspect ratio',
    colorGrade: 'Pastel tones, pink and mint green palette, medium contrast, slightly desaturated',
    cameraStyle: 'Static locked-off shot, perfectly centered subject, frontal perspective',
    lighting: 'Soft even lighting, no harsh shadows, natural ambient light',
    category: 'Artistic',
    examples: ['Product showcases', 'Brand storytelling', 'Quirky commercials'],
    referenceFilm: 'The Grand Budapest Hotel'
  },
  {
    id: 'a24-naturalism',
    name: 'A24 Naturalism',
    description: 'Intimate handheld aesthetic with natural lighting and muted earth tones',
    thumbnail: 'linear-gradient(135deg, #FFD89B 0%, #19547B 100%)',
    promptEnhancement: 'A24 film aesthetic, naturalistic cinematography, golden hour lighting, handheld camera movement, shallow depth of field, earthy color palette, intimate framing, 16mm film grain texture',
    colorGrade: 'Warm earth tones, muted colors, subtle desaturation, soft highlights',
    cameraStyle: 'Handheld with subtle shake, close-up intimate framing, natural movement',
    lighting: 'Natural window light, golden hour sunlight, soft shadows',
    category: 'Narrative',
    examples: ['Character-driven stories', 'Emotional moments', 'Indie film look'],
    referenceFilm: 'Lady Bird, The Florida Project'
  },
  {
    id: 'commercial-luxury',
    name: 'Luxury Commercial',
    description: 'High-end product cinematography with dramatic lighting and premium feel',
    thumbnail: 'linear-gradient(135deg, #000000 0%, #434343 100%)',
    promptEnhancement: 'High-end luxury commercial aesthetic, dramatic side lighting, deep black backgrounds, golden accents, macro detail shots, slow motion reveal, premium feel, studio lighting setup',
    colorGrade: 'Rich blacks, warm golden highlights, high contrast, selective color grading',
    cameraStyle: 'Slow crane movement, macro close-ups, smooth gimbal rotation',
    lighting: 'Hard side light with negative fill, rim lighting, gradient background',
    category: 'Commercial',
    examples: ['Product launches', 'Jewelry/watches', 'Automotive reveals'],
    referenceFilm: 'Apple product commercials'
  },
  {
    id: 'music-video-glitch',
    name: 'Music Video Glitch',
    description: 'High-energy MTV-style with rapid cuts, chromatic aberration, and saturated colors',
    thumbnail: 'linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 90%, #2BFF88 100%)',
    promptEnhancement: 'Music video aesthetic, high saturation, chromatic aberration, glitch effects, neon color palette, dutch angle, rapid camera movement, club lighting, strobe effects',
    colorGrade: 'Highly saturated colors, crushed blacks, vibrant neons, RGB split',
    cameraStyle: 'Handheld with aggressive movement, whip pans, dutch angles',
    lighting: 'Colored gels, practical neon, dynamic club lighting, strobe effects',
    category: 'Music Video',
    examples: ['Music videos', 'Party scenes', 'Fashion promos'],
    referenceFilm: 'Modern hip-hop/pop music videos'
  },
  {
    id: 'documentary-vérité',
    name: 'Documentary Vérité',
    description: 'Authentic documentary style with natural lighting and observational camera work',
    thumbnail: 'linear-gradient(135deg, #3D7EAA 0%, #FFE47A 100%)',
    promptEnhancement: 'Documentary cinema vérité style, natural available lighting, observational camera work, authentic moments, environmental context, reportage aesthetic, real-world texture',
    colorGrade: 'Natural color reproduction, minimal grading, authentic skin tones',
    cameraStyle: 'Handheld observational, medium shots, follows action naturally',
    lighting: 'Available light only, no artificial sources, natural shadows',
    category: 'Documentary',
    examples: ['Documentary features', 'News segments', 'Real estate tours'],
    referenceFilm: 'Planet Earth, Free Solo'
  },
  {
    id: 'sci-fi-pristine',
    name: 'Sci-Fi Pristine',
    description: 'Clean futuristic aesthetic with white minimalism and advanced technology',
    thumbnail: 'linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)',
    promptEnhancement: 'Futuristic sci-fi aesthetic, pristine white environments, minimalist design, advanced technology, clean lines, soft blue accent lighting, clinical precision, 2.39:1 widescreen',
    colorGrade: 'Bright whites, cool blue tones, minimal contrast, clinical feel',
    cameraStyle: 'Smooth motorized camera moves, steady cam, architectural framing',
    lighting: 'Soft overhead panels, edge lighting, blue accent lights, even illumination',
    category: 'Narrative',
    examples: ['Tech product demos', 'Medical/healthcare', 'Future concepts'],
    referenceFilm: 'Her, Ex Machina'
  },
  {
    id: 'thriller-suspense',
    name: 'Psychological Thriller',
    description: 'Tense atmosphere with ominous shadows and unsettling compositions',
    thumbnail: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    promptEnhancement: 'Psychological thriller cinematography, deep shadows, ominous atmosphere, dutch angles, tight framing creating claustrophobia, cold color temperature, suspenseful mood, film noir influence',
    colorGrade: 'Desaturated colors, cool blue/green tones, high contrast shadows',
    cameraStyle: 'Slow push-in creating tension, off-kilter angles, tight close-ups',
    lighting: 'Low key lighting, single source motivation, strong shadows, darkness',
    category: 'Narrative',
    examples: ['Suspense scenes', 'Dark dramas', 'Crime content'],
    referenceFilm: 'Se7en, Zodiac (David Fincher)'
  },
  {
    id: 'fashion-editorial',
    name: 'Fashion Editorial',
    description: 'High-fashion runway aesthetic with dramatic poses and editorial lighting',
    thumbnail: 'linear-gradient(135deg, #FF0844 0%, #FFB199 100%)',
    promptEnhancement: 'High fashion editorial cinematography, dramatic beauty lighting, strong shadows, high contrast black and white or bold colors, geometric compositions, elegant poses, editorial magazine aesthetic',
    colorGrade: 'Either monochrome or bold saturated colors, high contrast, defined shadows',
    cameraStyle: 'Locked off medium shots, slow push-ins, fashion runway angles',
    lighting: 'Beauty dish, hard side light, rim lighting, dramatic shadows',
    category: 'Commercial',
    examples: ['Fashion films', 'Beauty commercials', 'Lifestyle brands'],
    referenceFilm: 'Fashion campaign films'
  },
  {
    id: 'golden-hour-travel',
    name: 'Golden Hour Travel',
    description: 'Wanderlust-inspiring travel cinematography with warm sunset tones',
    thumbnail: 'linear-gradient(135deg, #FDC830 0%, #F37335 100%)',
    promptEnhancement: 'Travel cinematography, golden hour magic hour lighting, warm sunset tones, wide landscape establishing shots, sense of adventure and wanderlust, lens flares, epic vistas, drone perspective',
    colorGrade: 'Warm golden tones, orange and teal, enhanced sunset colors, glowing highlights',
    cameraStyle: 'Sweeping drone shots, slow reveals, wide establishing angles',
    lighting: 'Golden hour sunlight, natural lens flares, warm backlight',
    category: 'Documentary',
    examples: ['Travel content', 'Destination marketing', 'Adventure brands'],
    referenceFilm: 'Planet Earth, travel documentaries'
  }
]

export function getStyleById(id: string) {
  return cinematicStyles.find(s => s.id === id)
}

export function getStylesByCategory(category: CinematicStyle['category']) {
  return cinematicStyles.filter(s => s.category === category)
}