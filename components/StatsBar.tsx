const stats = [
  { value: "4K",   label: "Resolution" },
  { value: "5",    label: "AI Engines" },
  { value: "200+", label: "Styles" },
  { value: "60fps",label: "Framerate" },
]

export default function StatsBar() {
  return (
    <div className="flex items-center justify-center gap-16 py-16 border-t border-zinc-800">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-16">
          <div className="text-center">
            <div className="text-yellow-500 text-3xl font-light">{stat.value}</div>
            <div className="text-zinc-600 text-xs tracking-widest uppercase mt-1">{stat.label}</div>
          </div>
          {index < stats.length - 1 && (
            <div className="w-px h-8 bg-zinc-800" />
          )}
        </div>
      ))}
    </div>
  )
}