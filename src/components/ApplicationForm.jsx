import { useState } from 'react'

export default function ApplicationForm() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    student_id: '',
    student_name: '',
    student_email: '',
    department_code: '',
    category: 'general',
    title: '',
    description: ''
  })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${baseUrl}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, attachments: [] })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Submission failed')
      setMessage(`Submitted successfully. ID: ${data.id}`)
      setForm({ student_id: '', student_name: '', student_email: '', department_code: '', category: 'general', title: '', description: '' })
    } catch (err) {
      setMessage(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
        <h2 className="text-white text-2xl font-semibold">Submit an Application</h2>
        <p className="text-slate-300 text-sm mt-1">Students can file requests like bonafide certificates, leave, lab access, etc.</p>
        <form onSubmit={submit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="bg-slate-800/80 border border-white/10 rounded-lg p-3 text-white" placeholder="Student ID" name="student_id" value={form.student_id} onChange={onChange} required />
          <input className="bg-slate-800/80 border border-white/10 rounded-lg p-3 text-white" placeholder="Full Name" name="student_name" value={form.student_name} onChange={onChange} required />
          <input type="email" className="bg-slate-800/80 border border-white/10 rounded-lg p-3 text-white" placeholder="Email" name="student_email" value={form.student_email} onChange={onChange} required />
          <input className="bg-slate-800/80 border border-white/10 rounded-lg p-3 text-white" placeholder="Department Code (e.g., CSE)" name="department_code" value={form.department_code} onChange={onChange} required />
          <select className="bg-slate-800/80 border border-white/10 rounded-lg p-3 text-white" name="category" value={form.category} onChange={onChange}>
            <option value="general">General</option>
            <option value="bonafide_certificate">Bonafide Certificate</option>
            <option value="leave_request">Leave Request</option>
            <option value="lab_access">Lab Access</option>
            <option value="project_approval">Project Approval</option>
          </select>
          <input className="bg-slate-800/80 border border-white/10 rounded-lg p-3 text-white" placeholder="Title" name="title" value={form.title} onChange={onChange} required />
          <textarea className="bg-slate-800/80 border border-white/10 rounded-lg p-3 text-white md:col-span-2" rows={4} placeholder="Description" name="description" value={form.description} onChange={onChange} required />

          <div className="md:col-span-2 flex items-center gap-3">
            <button disabled={loading} className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold px-5 py-2 rounded-lg transition">
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
            {message && <span className="text-slate-200 text-sm">{message}</span>}
          </div>
        </form>
      </div>
    </section>
  )
}
