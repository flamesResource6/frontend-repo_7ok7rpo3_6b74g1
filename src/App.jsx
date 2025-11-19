import Hero from './components/Hero'
import QuickStats from './components/QuickStats'
import ApplicationForm from './components/ApplicationForm'
import ApplicationList from './components/ApplicationList'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-slate-950">
      <Hero />
      <QuickStats />
      <ApplicationForm />
      <ApplicationList />

      <footer className="max-w-7xl mx-auto px-6 pb-10 text-slate-400 text-sm">
        Built for students, coordinators, HODs, and admins to move faster with transparent approvals.
      </footer>
    </div>
  )
}

export default App
