import { useEffect, useState } from 'react'

export default function ApplicationList() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [filters, setFilters] = useState({ department_code: '', status: '', category: '' })
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const qs = new URLSearchParams()
      Object.entries(filters).forEach(([k, v]) => { if (v) qs.append(k, v) })
      const res = await fetch(`${baseUrl}/applications?${qs.toString()}`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const onChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value })

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-3 md:items-end md:justify-between">
          <h3 className="text-white text-xl font-semibold">Recent Applications</h3>
          <div className="flex gap-2">
            <input className="bg-slate-800/80 border border-white/10 rounded-lg p-2 text-white" placeholder="Dept Code" name="department_code" value={filters.department_code} onChange={onChange} />
            <select className="bg-slate-800/80 border border-white/10 rounded-lg p-2 text-white" name="status" value={filters.status} onChange={onChange}>
              <option value="">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="forwarded">Forwarded</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select className="bg-slate-800/80 border border-white/10 rounded-lg p-2 text-white" name="category" value={filters.category} onChange={onChange}>
              <option value="">All Types</option>
              <option value="general">General</option>
              <option value="bonafide_certificate">Bonafide</option>
              <option value="leave_request">Leave</option>
              <option value="lab_access">Lab</option>
              <option value="project_approval">Project</option>
            </select>
            <button onClick={load} className="bg-slate-700 hover:bg-slate-600 text-white px-3 rounded-lg">Filter</button>
          </div>
        </div>

        <div className="mt-4 divide-y divide-white/5">
          {loading ? (
            <p className="text-slate-300">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-300">No applications found.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="py-4 flex items-start justify-between">
                <div>
                  <p className="text-white font-medium">{it.title}</p>
                  <p className="text-slate-300 text-sm">{it.student_name} • {it.student_id} • {it.department_code}</p>
                  <p className="text-slate-400 text-xs mt-1">{it.category.replaceAll('_',' ')} • Stage: {it.current_stage}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${it.status === 'approved' ? 'bg-green-500/20 text-green-300' : it.status === 'rejected' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                  {it.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
