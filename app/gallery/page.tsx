import Navbar from '@/components/Navbar'

const videos = [
  { title: "Midnight Boulevard",     author: "D. Navarro", style: "Film Noir",    likes: "892",  views: "12.4k", span: "col-span-2 row-span-2" },
  { title: "Desert Mirage",          author: "L. Chen",    style: "Epic Drama",   likes: "634",  views: "8.2k",  span: "" },
  { title: "Neo Tokyo 2087",         author: "K. Tanaka",  style: "Sci-Fi",       likes: "1.8k", views: "21k",   span: "" },
  { title: "The Last Harvest",       author: "M. Osei",    style: "Drama",        likes: "412",  views: "5.1k",  span: "" },
  { title: "Salt Flats Solstice",    author: "P. Rivers",  style: "Documentary",  likes: "551",  views: "7.8k",  span: "col-span-2" },
  { title: "Forgotten Station",      author: "R. Moreau",  style: "Neo-Realism",  likes: "288",  views: "3.4k",  span: "" },
  { title: "Crimson Reverie",        author: "S. Abebe",   style: "Experimental", likes: "703",  views: "9.0k",  span: "" },
]

const gradients = [
  "from-zinc-900 to-stone-900",
  "from-slate-900 to-blue-950",
  "from-zinc-900 to-zinc-800",
  "from-stone-900 to-amber-950",
  "from-zinc-900 to-zinc-950",
  "from-slate-900 to-slate-800",
  "from-zinc-800 to-stone-800",
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-16">

        {/* HEADER */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-2 border border-yellow-600/30 bg-yellow-600/10 text-yellow-500 text-xs tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              Community Showcase
            </div>
            <h1 className="text-5xl font-light text-white">
              The Gallery
              <br />
              <span className="italic text-yellow-500 text-4xl">of Cinema</span>
            </h1>
          </div>
          <div className="text-right">
            <p className="text-zinc-500 text-sm mb-4">2,400+ community works</p>
            <button className="bg-zinc-900 text-white text-xs tracking-widest uppercase px-5 py-3 border border-zinc-700 rounded-sm hover:border-zinc-500 transition-colors">
              Submit Your Work
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {["All", "Film Noir", "Epic Drama", "Sci-Fi", "Documentary", "Neo-Realism", "Experimental"].map((f, i) => (
            <button key={f} className={`text-xs px-4 py-2 rounded-sm border transition-colors ${
              i === 0
                ? 'bg-zinc-800 text-white border-zinc-600'
                : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
            }`}>
              {f}
            </button>
          ))}
          <select className="ml-auto bg-zinc-900 border border-zinc-700 text-zinc-400 text-xs px-3 py-2 rounded-sm focus:outline-none">
            <option>Most Liked</option>
            <option>Most Viewed</option>
            <option>Newest</option>
          </select>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-3 auto-rows-[240px]">
          {videos.map((video, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-sm cursor-pointer group ${video.span}`}
            >
              {/* VIDEO THUMBNAIL */}
              <div className={`absolute inset-0 bg-linear-to-br ${gradients[i % gradients.length]}`} />

              {/* SCANLINES EFFECT */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 6px)' }}
              />

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/65 transition-all duration-400 flex items-end p-5">
                <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white font-light text-base mb-1">{video.title}</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-zinc-300 text-xs">{video.author}</span>
                    <div className="w-1 h-1 rounded-full bg-yellow-500" />
                    <span className="text-yellow-400 text-xs">{video.style}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-zinc-400 text-xs">♥ {video.likes}</span>
                    <span className="text-zinc-400 text-xs">◉ {video.views}</span>
                  </div>
                </div>
              </div>

              {/* PLAY INDICATOR */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-l-[8px] border-transparent border-l-white ml-0.5" />
              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE */}
        <div className="text-center mt-16">
          <button className="text-zinc-400 text-xs tracking-widest uppercase px-8 py-3 border border-zinc-700 rounded-sm hover:border-zinc-500 hover:text-white transition-colors">
            Load More Works
          </button>
        </div>

      </div>
    </div>
  )
}