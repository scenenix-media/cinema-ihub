const stats = [
  { label: 'Total Videos',  value: '284', sub: '+12 this month'    },
  { label: 'Storage Used',  value: '48 GB', sub: 'of 200 GB'      },
  { label: 'Watch Time',    value: '1.2k hrs', sub: 'all projects' },
  { label: 'Credits Left',  value: '47',  sub: 'resets in 14 days' },
]

const projects = [
  { name: 'Noir City Series',     count: 24, status: 'active',   updated: 'Today'      },
  { name: 'Desert Campaign',      count: 18, status: 'active',   updated: 'Yesterday'  },
  { name: 'Product Launch Reel',  count: 8,  status: 'review',   updated: '3 days ago' },
]

const history = [
  { title: 'Rain-slicked boulevard at midnight', style: 'Film Noir',   dur: '12s', res: '4K',    status: 'done'   },
  { title: 'Golden wheat field, drone flyover',  style: 'Epic Drama',  dur: '8s',  res: '1080p', status: 'done'   },
  { title: 'Neon market, handheld chase',        style: 'Documentary', dur: '20s', res: '4K',    status: 'done'   },
  { title: 'Abandoned station at dawn',          style: 'Neo-Realism', dur: '10s', res: '1080p', status: 'review' },
]

export default function DashboardPage() {
  return (
    <div className="p-8">

      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-white text-2xl font-light">Good afternoon, Amara</h1>
        <p className="text-zinc-500 text-sm mt-1">Here what is happening in your studio.</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-sm p-5 hover:border-zinc-600 transition-colors">
            <div className="text-zinc-400 text-xs tracking-widest uppercase mb-3">{stat.label}</div>
            <div className="text-white text-3xl font-light mb-1">{stat.value}</div>
            <div className="text-zinc-600 text-xs">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* RECENT PROJECTS */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-sm tracking-widest uppercase">Recent Projects</h2>
          <button className="text-zinc-400 text-xs border border-zinc-700 px-3 py-1.5 rounded-sm hover:border-zinc-500 hover:text-white transition-colors">
            New Project
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-600 transition-colors cursor-pointer">
              <div className="aspect-video bg-linear-to-br from-zinc-800 to-zinc-900" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-white text-sm font-medium">{p.name}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-sm ${
                    p.status === 'active'
                      ? 'bg-green-900/50 text-green-400 border border-green-800'
                      : 'bg-yellow-900/50 text-yellow-400 border border-yellow-800'
                  }`}>
                    {p.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 text-xs">{p.count} videos</span>
                  <span className="text-zinc-600 text-xs">{p.updated}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GENERATION HISTORY TABLE */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-sm tracking-widest uppercase">Generation History</h2>
          <div className="flex gap-2">
            {['All', '4K', 'This Month'].map(f => (
              <button key={f} className="text-zinc-400 text-xs border border-zinc-700 px-3 py-1.5 rounded-sm hover:border-zinc-500 hover:text-white transition-colors first:bg-zinc-800 first:text-white first:border-zinc-600">
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden">
          {/* TABLE HEADER */}
          <div className="grid grid-cols-5 px-5 py-3 border-b border-zinc-800 bg-zinc-800/50">
            {['Title', 'Style', 'Duration', 'Resolution', 'Status'].map(h => (
              <div key={h} className="text-zinc-500 text-xs tracking-widest uppercase">{h}</div>
            ))}
          </div>
          {/* TABLE ROWS */}
          {history.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-5 px-5 py-4 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/30 transition-colors cursor-pointer items-center"
            >
              <div className="text-white text-sm truncate pr-4">{row.title}</div>
              <div className="text-zinc-400 text-sm">{row.style}</div>
              <div className="text-zinc-400 text-sm">{row.dur}</div>
              <div className="text-zinc-400 text-sm">{row.res}</div>
              <span className={`text-xs px-2 py-1 rounded-sm w-fit ${
                row.status === 'done'
                  ? 'bg-green-900/40 text-green-400 border border-green-800'
                  : 'bg-yellow-900/40 text-yellow-400 border border-yellow-800'
              }`}>
                {row.status === 'done' ? 'Rendered' : 'In Review'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}