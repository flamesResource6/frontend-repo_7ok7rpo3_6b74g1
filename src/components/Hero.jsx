import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col items-start justify-end pb-10 text-white">
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            College Digital Application Management System
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/80 max-w-2xl">
            Submit, track, route, and approve student applications entirely online. Real-time status, role-based actions, department filters, and reports.
          </p>
        </div>
      </div>
    </section>
  )
}
