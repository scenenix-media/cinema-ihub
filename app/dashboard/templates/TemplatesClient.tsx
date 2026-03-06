// app/dashboard/templates/TemplatesClient.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cinematicStyles } from '@/lib/styles'

type Category = 'all' | 'commercial' | 'narrative' | 'music-video' | 'documentary' | 'artistic'

const TEMPLATE_CATEGORIES = [
  { id: 'all' as Category, name: 'All Templates', icon: '📂' },
  { id: 'commercial' as Category, name: 'Commercial', icon: '💼' },
  { id: 'narrative' as Category, name: 'Narrative', icon: '🎬' },
  { id: 'music-video' as Category, name: 'Music Video', icon: '🎵' },
  { id: 'documentary' as Category, name: 'Documentary', icon: '📹' },
  { id: 'artistic' as Category, name: 'Artistic', icon: '🎨' },
]

const PROMPT_TEMPLATES = [
  {
    id: 1,
    title: 'Product Showcase',
    category: 'commercial' as const,
    prompt: 'A sleek {product} rotating on a white pedestal, dramatic studio lighting with soft shadows, professional product photography style, clean minimalist background, 4K resolution',
    style: 'Luxury Commercial',
    duration: 5,
    preview: 'linear-gradient(135deg, #000000 0%, #434343 100%)',
    tags: ['product', 'commercial', 'studio']
  },
  {
    id: 2,
    title: 'Cinematic Portrait',
    category: 'narrative' as const,
    prompt: 'Close-up portrait of a {character}, golden hour lighting, shallow depth of field, emotional expression, cinematic color grading, soft bokeh background',
    style: 'A24 Naturalism',
    duration: 8,
    preview: 'linear-gradient(135deg, #FFD89B 0%, #19547B 100%)',
    tags: ['portrait', 'cinematic', 'emotion']
  },
  {
    id: 3,
    title: 'Urban Night Scene',
    category: 'narrative' as const,
    prompt: 'Rain-soaked {city} street at night, neon signs reflecting in puddles, atmospheric fog, people with umbrellas walking, cyberpunk aesthetic, moody and dramatic',
    style: 'Neo-Noir Cityscape',
    duration: 10,
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    tags: ['urban', 'night', 'atmospheric']
  },
  {
    id: 4,
    title: 'Music Video Performance',
    category: 'music-video' as const,
    prompt: '{artist} performing on stage, dynamic camera movements, strobe lighting effects, crowd silhouettes, high energy, saturated colors, MTV style',
    style: 'Music Video Glitch',
    duration: 6,
    preview: 'linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 90%, #2BFF88 100%)',
    tags: ['performance', 'music', 'energy']
  },
  {
    id: 5,
    title: 'Nature Documentary',
    category: 'documentary' as const,
    prompt: '{animal} in natural habitat, BBC Earth style cinematography, telephoto lens, golden hour lighting, natural behavior, wildlife documentary aesthetic',
    style: 'Documentary Vérité',
    duration: 8,
    preview: 'linear-gradient(135deg, #3D7EAA 0%, #FFE47A 100%)',
    tags: ['nature', 'wildlife', 'documentary']
  },
  {
    id: 6,
    title: 'Fashion Editorial',
    category: 'commercial' as const,
    prompt: 'High fashion model wearing {outfit}, dramatic beauty lighting, clean white cyclorama, elegant poses, Vogue editorial style, professional studio photography',
    style: 'Fashion Editorial',
    duration: 5,
    preview: 'linear-gradient(135deg, #FF0844 0%, #FFB199 100%)',
    tags: ['fashion', 'editorial', 'beauty']
  },
  {
    id: 7,
    title: 'Travel Destination',
    category: 'documentary' as const,
    prompt: 'Aerial drone shot of {destination}, sweeping landscape reveal, golden hour sunlight, sense of wonder and adventure, travel photography style',
    style: 'Golden Hour Travel',
    duration: 8,
    preview: 'linear-gradient(135deg, #FDC830 0%, #F37335 100%)',
    tags: ['travel', 'aerial', 'landscape']
  },
  {
    id: 8,
    title: 'Abstract Art',
    category: 'artistic' as const,
    prompt: 'Abstract flowing {elements}, vibrant colors morphing and blending, psychedelic patterns, hypnotic movement, experimental art style, 4K detail',
    style: 'Symmetrical Pastel',
    duration: 10,
    preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    tags: ['abstract', 'artistic', 'experimental']
  },
  {
    id: 9,
    title: 'Food Commercial',
    category: 'commercial' as const,
    prompt: 'Extreme close-up of {food}, ingredients falling in slow motion, steam rising, dramatic side lighting, appetizing presentation, high-end food photography',
    style: 'Luxury Commercial',
    duration: 5,
    preview: 'linear-gradient(135deg, #000000 0%, #434343 100%)',
    tags: ['food', 'commercial', 'macro']
  },
  {
    id: 10,
    title: 'Thriller Suspense',
    category: 'narrative' as const,
    prompt: 'Dark hallway with flickering lights, slow dolly push forward, ominous shadows, tense atmosphere, psychological thriller aesthetic, Fincher style',
    style: 'Psychological Thriller',
    duration: 8,
    preview: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    tags: ['thriller', 'suspense', 'dark']
  },
  {
    id: 11,
    title: 'Sci-Fi Technology',
    category: 'narrative' as const,
    prompt: 'Futuristic {technology} in pristine white lab, holographic interfaces, soft blue accent lighting, minimalist design, advanced technology, sci-fi aesthetic',
    style: 'Sci-Fi Pristine',
    duration: 6,
    preview: 'linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)',
    tags: ['sci-fi', 'technology', 'futuristic']
  },
  {
    id: 12,
    title: 'Symmetrical Composition',
    category: 'artistic' as const,
    prompt: 'Perfectly centered {subject} in symmetrical frame, pastel color palette, Wes Anderson style, whimsical details, retro production design, 1.85:1 aspect ratio',
    style: 'Symmetrical Pastel',
    duration: 5,
    preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    tags: ['symmetry', 'artistic', 'whimsical']
  }
]

export default function TemplatesClient() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTemplates = PROMPT_TEMPLATES.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  function handleUseTemplate(template: typeof PROMPT_TEMPLATES[0]) {
    // Redirect to generate page with template pre-filled
    const params = new URLSearchParams({
      prompt: template.prompt,
      style: template.style,
      duration: template.duration.toString()
    })
    
    router.push(`/generate?${params.toString()}`)
  }

  return (
    <div className="p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-3xl font-light mb-2">Prompt Templates</h1>
        <p className="text-zinc-500">Pre-made prompts to jumpstart your creative projects</p>
      </div>

      {/* Search & Filter */}
      <div className="mb-8 flex gap-4">
        
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-yellow-600"
          />
        </div>

      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TEMPLATE_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 text-sm rounded-sm border transition-colors ${
              selectedCategory === cat.id
                ? 'bg-yellow-600 border-yellow-600 text-black font-medium'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
            }`}
          >
            <span className="mr-2">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden hover:border-yellow-600/50 transition-all group"
          >
            {/* Preview */}
            <div
              className="aspect-video relative"
              style={{ background: template.preview }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-yellow-600 text-xs rounded-sm border border-yellow-600/30">
                  {template.duration}s
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-white text-lg font-medium mb-2">{template.title}</h3>
              
              <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                {template.prompt.substring(0, 100)}...
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {template.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-zinc-800 text-zinc-500 text-xs rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Style */}
              <div className="mb-4 pb-4 border-b border-zinc-800">
                <p className="text-zinc-600 text-xs mb-1">Style Preset</p>
                <p className="text-yellow-600 text-sm">{template.style}</p>
              </div>

              {/* Action */}
              <button
                onClick={() => handleUseTemplate(template)}
                className="w-full bg-yellow-600 text-black text-xs tracking-widest uppercase py-2 rounded-sm font-medium hover:bg-yellow-500 transition-colors"
              >
                Use Template
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-20">
          <p className="text-zinc-500 mb-4">No templates found</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            className="text-yellow-600 hover:text-yellow-500 text-sm"
          >
            Clear filters
          </button>
        </div>
      )}

    </div>
  )
}