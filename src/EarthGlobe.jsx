import { useEffect, useMemo, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import { motion } from 'framer-motion'
import { Sparkles, RotateCcw, MapPin } from 'lucide-react'

/* ─── Coordinates ──────────────────────────────────────────────── */
const STOPS = {
  geneva:       { lat: 46.2044, lng: 6.1432,  name: 'Geneva' },
  airport:      { lat: 37.9364, lng: 23.9445, name: 'Athens Airport' },
  plaka:        { lat: 37.9722, lng: 23.7300, name: 'Plaka & Anafiotika' },
  philopappos:  { lat: 37.9683, lng: 23.7212, name: 'Philopappos Hill' },
  sense:        { lat: 37.9719, lng: 23.7270, name: 'Sense Restaurant' },
  garden:       { lat: 37.9728, lng: 23.7367, name: 'National Garden' },
  stadium:      { lat: 37.9683, lng: 23.7414, name: 'Panathenaic Stadium' },
  museum:       { lat: 37.9683, lng: 23.7286, name: 'Acropolis Museum' },
  acropolis:    { lat: 37.9715, lng: 23.7257, name: 'The Acropolis' },
  aerides:      { lat: 37.9742, lng: 23.7290, name: 'Aerides Plaka' },
  brettos:      { lat: 37.9710, lng: 23.7308, name: 'Brettos Bar' },
  lycabettus:   { lat: 37.9836, lng: 23.7448, name: 'Lycabettus Hill' },
  riviera:      { lat: 37.8500, lng: 23.7800, name: 'Athens Riviera' },
  vouliagmeni:  { lat: 37.8133, lng: 23.7891, name: 'Lake Vouliagmeni' },
  beach:        { lat: 37.8175, lng: 23.7728, name: 'Vouliagmeni Beach' },
  sounion:      { lat: 37.6500, lng: 24.0250, name: 'Cape Sounion · Poseidon' },
  koukaki:      { lat: 37.9650, lng: 23.7237, name: 'Koukaki' },
  paros:        { lat: 37.0853, lng: 25.1525, name: 'Paros Port' },
  mykonos:      { lat: 37.4467, lng: 25.3289, name: 'Mykonos' },
  mykonosAir:   { lat: 37.4351, lng: 25.3486, name: 'Mykonos Airport' },
}

/* ─── Per-day routes ───────────────────────────────────────────── */
const DAY_ROUTES = [
  {
    id: 'd1',
    label: 'Day 01',
    date: 'May 2',
    title: 'Geneva → Athens',
    blurb: 'Land in Athens, walk Plaka, sunset on Philopappos, dinner at Sense.',
    color: '#5A8FA8',
    altitude: 0.95,
    centre: { lat: 42, lng: 15 },
    stops: ['geneva', 'airport', 'plaka', 'philopappos', 'sense'],
    arcAlt: 0.2,
  },
  {
    id: 'd2',
    label: 'Day 02',
    date: 'May 3',
    title: 'Culture & the Acropolis',
    blurb: 'Morning run, museum, guided Acropolis tour, dinner in Plaka.',
    color: '#8B6FB8',
    altitude: 0.18,
    centre: { lat: 37.97, lng: 23.74 },
    stops: ['garden', 'stadium', 'museum', 'acropolis', 'aerides', 'brettos'],
    arcAlt: 0.02,
  },
  {
    id: 'd3',
    label: 'Day 03',
    date: 'May 4',
    title: 'The Athens Riviera',
    blurb: 'Lycabettus run, coastal swim at Vouliagmeni, sunset at Cape Sounion.',
    color: '#CC785C',
    altitude: 0.4,
    centre: { lat: 37.82, lng: 23.92 },
    stops: ['lycabettus', 'riviera', 'vouliagmeni', 'beach', 'sounion'],
    arcAlt: 0.08,
    feature: true,
  },
  {
    id: 'd4',
    label: 'Day 04',
    date: 'May 5',
    title: 'Last Morning, Then the Ferry',
    blurb: 'Sunrise run, Koukaki breakfast, ferry across the Aegean.',
    color: '#6B7A4F',
    altitude: 0.55,
    centre: { lat: 37.7, lng: 24.5 },
    stops: ['philopappos', 'koukaki', 'paros', 'mykonos'],
    arcAlt: 0.15,
  },
  {
    id: 'd5',
    label: 'Day 05',
    date: 'May 6',
    title: 'Mykonos → Geneva',
    blurb: 'Island morning, Athens layover, homeward to Geneva.',
    color: '#C97386',
    altitude: 1.3,
    centre: { lat: 42, lng: 17 },
    stops: ['mykonosAir', 'airport', 'geneva'],
    arcAlt: 0.25,
  },
]

function buildArcs(route) {
  const arcs = []
  for (let i = 0; i < route.stops.length - 1; i++) {
    const a = STOPS[route.stops[i]]
    const b = STOPS[route.stops[i + 1]]
    arcs.push({
      startLat: a.lat,
      startLng: a.lng,
      endLat: b.lat,
      endLng: b.lng,
      color: route.color,
      arcAlt: route.arcAlt,
    })
  }
  return arcs
}

function buildPoints(route) {
  return route.stops.map((s, i) => ({
    ...STOPS[s],
    color: route.color,
    idx: i + 1,
    isStart: i === 0,
    isEnd: i === route.stops.length - 1,
  }))
}

const HTMLPin = (color) => `
  <div style="
    transform: translate(-50%, -100%);
    background: ${color};
    color: #F5F1EA;
    padding: 4px 8px;
    border-radius: 999px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: nowrap;
    box-shadow: 0 4px 14px rgba(0,0,0,0.4);
    border: 1.5px solid rgba(245,241,234,0.3);
    pointer-events: none;
  ">`

export default function EarthGlobe() {
  const globeRef = useRef(null)
  const containerRef = useRef(null)
  const transitionTimers = useRef([])
  const [size, setSize] = useState({ w: 640, h: 640 })
  const [activeId, setActiveId] = useState('d3')
  const [hasZoomed, setHasZoomed] = useState(false)
  const [routesVisible, setRoutesVisible] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const route = useMemo(() => DAY_ROUTES.find((d) => d.id === activeId), [activeId])
  const arcs = useMemo(() => (routesVisible ? buildArcs(route) : []), [route, routesVisible])
  const points = useMemo(() => (routesVisible ? buildPoints(route) : []), [route, routesVisible])

  const clearTimers = () => {
    transitionTimers.current.forEach(clearTimeout)
    transitionTimers.current = []
  }
  const after = (ms, fn) => {
    const t = setTimeout(fn, ms)
    transitionTimers.current.push(t)
    return t
  }

  const stopRotation = () => {
    const g = globeRef.current
    if (!g) return
    const controls = g.controls()
    controls.autoRotate = false
  }

  /* Responsive sizing */
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      const h = Math.min(Math.max(w * 0.85, 460), 720)
      setSize({ w, h })
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  /* Cinematic intro: rotate, fly to Greece, reveal routes */
  useEffect(() => {
    const g = globeRef.current
    if (!g) return
    const controls = g.controls()
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.7
    controls.enableZoom = false
    controls.enableDamping = true
    controls.dampingFactor = 0.15

    g.pointOfView({ lat: 20, lng: -40, altitude: 2.4 }, 0)

    const playIntro = () => {
      if (hasZoomed) return
      setHasZoomed(true)
      const r = DAY_ROUTES.find((d) => d.id === activeId)

      controls.autoRotateSpeed = 1.6
      // 1) Pre-roll spin
      after(1100, () => {
        controls.autoRotate = false
        // 2) Cinematic fly: high pass → settle low
        g.pointOfView({ lat: r.centre.lat + 6, lng: r.centre.lng, altitude: Math.max(r.altitude * 1.6, 1.2) }, 1700)
      })
      after(2700, () => {
        g.pointOfView({ ...r.centre, altitude: r.altitude }, 1800)
      })
      // 3) Reveal arcs once we're settled
      after(4500, () => setRoutesVisible(true))
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && playIntro()),
      { threshold: 0.35 }
    )
    if (containerRef.current) io.observe(containerRef.current)
    return () => {
      io.disconnect()
      clearTimers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Reframe on day change — hard stop rotation, fade arcs, pull back, zoom in, fade arcs back */
  useEffect(() => {
    if (!hasZoomed || !globeRef.current) return
    const g = globeRef.current
    clearTimers()
    stopRotation()
    setTransitioning(true)
    setRoutesVisible(false)

    // Pull back slightly so the new framing reads
    const lift = Math.max(route.altitude * 1.45, route.altitude + 0.25)
    g.pointOfView({ lat: route.centre.lat, lng: route.centre.lng, altitude: lift }, 700)

    after(750, () => {
      g.pointOfView({ ...route.centre, altitude: route.altitude }, 1500)
    })
    after(2200, () => {
      setRoutesVisible(true)
      setTransitioning(false)
    })
  }, [activeId, route, hasZoomed])

  const replay = () => {
    clearTimers()
    setRoutesVisible(false)
    setTransitioning(true)
    setHasZoomed(false)
    const g = globeRef.current
    if (!g) return
    const controls = g.controls()
    controls.autoRotate = true
    controls.autoRotateSpeed = 1.4
    g.pointOfView({ lat: 20, lng: -40, altitude: 2.4 }, 1300)
    after(1500, () => {
      setHasZoomed(true)
      controls.autoRotate = false
      g.pointOfView({ lat: route.centre.lat + 6, lng: route.centre.lng, altitude: Math.max(route.altitude * 1.6, 1.2) }, 1700)
    })
    after(3300, () => g.pointOfView({ ...route.centre, altitude: route.altitude }, 1700))
    after(5100, () => {
      setRoutesVisible(true)
      setTransitioning(false)
    })
  }

  return (
    <section className="relative bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(204,120,92,0.18) 0%, transparent 55%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-20 md:py-28">
        <div className="mb-10 grid md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-7">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-clay-soft)] mb-3">
              Live · The journey from above
            </div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
              Earth, then{' '}
              <span className="italic font-light text-[var(--color-clay-soft)]">Greece</span>
              <span className="text-[var(--color-clay)]">.</span>
            </h2>
            <p className="mt-4 text-white/65 max-w-xl text-[15px] leading-relaxed">
              Watch the planet spin into focus on the Aegean. Toggle a day below to trace its
              route — runs, drives, ferries and flights — across the same map your shoes will know.
            </p>
          </div>

          <div className="md:col-span-5 flex md:justify-end">
            <button
              onClick={replay}
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-white/80 hover:text-white border border-white/20 hover:border-[var(--color-clay)] hover:bg-white/5 px-4 py-2.5 rounded-full transition-colors"
            >
              <RotateCcw size={13} /> Replay intro
            </button>
          </div>
        </div>

        {/* Globe container */}
        <div
          ref={containerRef}
          className="relative w-full rounded-3xl overflow-hidden border border-white/10 bg-[#06070A]"
          style={{ height: size.h }}
        >
          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
            }}
          />
          {/* Top fade for overlay legibility */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none z-[1]"
            style={{
              background:
                'linear-gradient(to top, rgba(6,7,10,0.55) 0%, transparent 100%)',
            }}
          />
          <Globe
            ref={globeRef}
            width={size.w}
            height={size.h}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            atmosphereColor="#CC785C"
            atmosphereAltitude={0.25}
            enablePointerInteraction={!transitioning}
            arcsData={arcs}
            arcColor="color"
            arcStroke={0.65}
            arcAltitude="arcAlt"
            arcDashLength={0.5}
            arcDashGap={0.2}
            arcDashAnimateTime={2400}
            arcDashInitialGap={(d, i) => i}
            arcsTransitionDuration={500}
            pointsData={points}
            pointLat="lat"
            pointLng="lng"
            pointColor="color"
            pointAltitude={0.014}
            pointRadius={(d) => (d.isStart || d.isEnd ? 0.7 : 0.45)}
            pointLabel={(d) =>
              `${HTMLPin(route.color)}${String(d.idx).padStart(2, '0')} · ${d.name}</div>`
            }
            pointsTransitionDuration={600}
            ringsData={routesVisible ? points : []}
            ringLat="lat"
            ringLng="lng"
            ringColor={(d) => () => d.color}
            ringMaxRadius={(d) => (d.isStart || d.isEnd ? 3.2 : 1.6)}
            ringPropagationSpeed={(d) => (d.isStart || d.isEnd ? 1.4 : 0.9)}
            ringRepeatPeriod={(d) => (d.isStart || d.isEnd ? 1500 : 2400)}
            ringAltitude={0.011}
          />

          {/* Active day overlay */}
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: transitioning ? 0.55 : 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute left-4 right-4 md:left-6 bottom-4 md:bottom-6 md:max-w-sm bg-[var(--color-ink)]/85 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 pointer-events-none z-[2]"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ background: route.color }} />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
                {route.label} · {route.date}
              </span>
              {route.feature && (
                <span className="text-[9px] font-mono uppercase tracking-[0.18em] bg-[var(--color-clay)] text-[var(--color-paper)] px-2 py-[2px] rounded-full flex items-center gap-1">
                  <Sparkles size={9} /> Feature
                </span>
              )}
            </div>
            <div className="font-serif text-xl md:text-2xl leading-tight">{route.title}</div>
            <p className="text-[13px] text-white/65 mt-1.5 leading-relaxed">{route.blurb}</p>
            <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/40 mt-3">
              {route.stops.length} stops
            </div>
          </motion.div>

          {/* Status hint */}
          <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/45 flex items-center gap-1.5 z-[2]">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: transitioning || !hasZoomed ? 'var(--color-clay)' : route.color,
                animation: transitioning || !hasZoomed ? 'pulse 1.6s ease-in-out infinite' : 'none',
              }}
            />
            {!hasZoomed ? 'Locating Greece…' : transitioning ? 'Reframing…' : 'Locked on'}
          </div>
        </div>

        {/* Day toggle */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {DAY_ROUTES.map((d) => {
            const active = activeId === d.id
            return (
              <button
                key={d.id}
                onClick={() => setActiveId(d.id)}
                className={`group relative text-left p-4 rounded-2xl border transition-all overflow-hidden ${
                  active
                    ? 'bg-white/8 border-[color:var(--btn)]'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/5'
                }`}
                style={{ '--btn': d.color }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-transform"
                    style={{
                      background: d.color,
                      transform: active ? 'scale(1.5)' : 'scale(1)',
                    }}
                  />
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/55">
                    {d.label}
                  </span>
                </div>
                <div className="font-serif text-sm md:text-base leading-tight text-white">
                  {d.title}
                </div>
                <div className="text-[10px] font-mono text-white/40 mt-1">{d.date}</div>
                {active && (
                  <motion.span
                    layoutId="activeDayBar"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: d.color }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">
          <MapPin size={12} className="text-[var(--color-clay)]" />
          Drag to rotate · Hover stops for names
        </div>
      </div>
    </section>
  )
}
