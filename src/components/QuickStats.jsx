import { useEffect, useState } from 'react'

const Stat = ({ label, value }) => (
  <div className="bg-slate-800/60 border border-white/5 rounded-xl p-4">
    <p className="text-slate-300 text-sm">{label}</p>
    <p className="text-white text-2xl font-semibold">{value}</p>
  </div>
)

export default function QuickStats() {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 })
  useEffect(() => {
    // Demo: would fetch summaries from backend later
    setStats({ total: 128, pending: 34, approved: 81 })
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label="Total Applications" value={stats.total} />
        <Stat label="Pending" value={stats.pending} />
        <Stat label="Approved" value={stats.approved} />
      </div>
    </section>
  )
}
