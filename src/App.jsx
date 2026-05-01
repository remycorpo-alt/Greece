import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion'
import {
  Plane,
  Ship,
  MapPin,
  Footprints,
  Utensils,
  Camera,
  Waves,
  Sun,
  Mountain,
  Star,
  ChevronDown,
  Info,
  Ticket,
  Wind,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Sunrise,
  Coffee,
  X,
  ExternalLink,
  Route,
} from 'lucide-react'

/* ────────────────────────────────────────────────────────────────
   IMAGES
   ──────────────────────────────────────────────────────────────── */
const IMG = {
  hero: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=2000&q=85',
  heroAlt: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=2000&q=85',
  plaka: 'https://images.unsplash.com/photo-1603566541830-a1b9b5cca42f?w=1200&q=80',
  acropolis: 'https://images.unsplash.com/photo-1571406252241-db0280bd38db?w=1200&q=80',
  vouliagmeni: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
  sounion: 'https://images.unsplash.com/photo-1602940659805-770d1b3b9911?w=1200&q=80',
  mykonos: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200&q=80',
  ferry: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80',
  map: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?w=1600&q=80',
}

const PHOTOS = {
  airport: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80',
  airport2: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
  plaka: 'https://images.unsplash.com/photo-1603566541830-a1b9b5cca42f?w=800&q=80',
  philopappos: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80',
  sense: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  garden: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
  stadium: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=800&q=80',
  museum: 'https://images.unsplash.com/photo-1565060169187-5284a3d20bb9?w=800&q=80',
  acropolis: 'https://images.unsplash.com/photo-1571406252241-db0280bd38db?w=800&q=80',
  aerides: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  brettos: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
  lycabettus: 'https://images.unsplash.com/photo-1608637875620-6c44ef07b101?w=800&q=80',
  riviera: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  vouliagmeni: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&q=80',
  seafood: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80',
  sounion: 'https://images.unsplash.com/photo-1602940659805-770d1b3b9911?w=800&q=80',
  sunrise: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
  koukaki: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800&q=80',
  ferry: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80',
  mykonos: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80',
}

/* ────────────────────────────────────────────────────────────────
   GOOGLE MAPS LINKS
   ──────────────────────────────────────────────────────────────── */
const MAPS = {
  airport: 'https://maps.google.com/?q=Athens+International+Airport',
  acropolis: 'https://maps.google.com/?q=Acropolis+Museum+Athens',
  acropolisSite: 'https://maps.google.com/?q=Acropolis+Athens',
  philopappos: 'https://maps.google.com/?q=Philopappos+Hill+Athens',
  lycabettus: 'https://maps.google.com/?q=Lycabettus+Hill+Athens',
  vouliagmeni: 'https://maps.google.com/?q=Lake+Vouliagmeni+Athens',
  sounion: 'https://maps.google.com/?q=Temple+of+Poseidon+Cape+Sounion',
  sense: 'https://maps.google.com/?q=Sense+Restaurant+Athens',
  aerides: 'https://maps.google.com/?q=Aerides+Restaurant+Plaka+Athens',
  plaka: 'https://maps.google.com/?q=Plaka+Athens',
  stadium: 'https://maps.google.com/?q=Panathenaic+Stadium+Athens',
  brettos: 'https://maps.google.com/?q=Brettos+Bar+Athens',
  koukaki: 'https://maps.google.com/?q=Koukaki+Athens',
  fullRoute:
    'https://www.google.com/maps/dir/Acropolis+Athens/Philopappos+Hill+Athens/Lycabettus+Hill+Athens/Lake+Vouliagmeni/Temple+of+Poseidon+Cape+Sounion',
}

/* ────────────────────────────────────────────────────────────────
   ITINERARY DATA
   ──────────────────────────────────────────────────────────────── */
const DAYS = [
  {
    id: 'd1',
    label: 'Day 01',
    date: 'May 2',
    weekday: 'Friday',
    title: 'Arrival & First Steps',
    sub: 'Athens welcomes you home',
    img: IMG.plaka,
    dirUrl: 'https://www.google.com/maps/dir/Athens+International+Airport/Plaka+Athens/Philopappos+Hill+Athens/Sense+Restaurant+Athens',
    items: [
      { time: '11:35', icon: Plane, label: 'Land at Athens Airport', detail: 'Aegean A3855 · Geneva → Athens', tag: 'Flight', mapUrl: MAPS.airport, photo: PHOTOS.airport, place: 'Eleftherios Venizelos' },
      { time: 'PM', icon: MapPin, label: 'Plaka + Anafiotika walk', detail: 'Wander the oldest neighbourhood and the island village hidden on the Acropolis slope.', tag: 'Walk', mapUrl: MAPS.plaka, photo: PHOTOS.plaka, place: 'Plaka, Athens' },
      { time: '18:00', icon: Mountain, label: 'Philopappos Hill at sunset', detail: 'Golden hour with direct Acropolis views.', tag: 'Viewpoint', mapUrl: MAPS.philopappos, photo: PHOTOS.philopappos, place: 'Philopappos Hill' },
      { time: '19:00', icon: Utensils, label: 'Dinner at Sense', detail: 'Booked. Modern Greek cuisine.', tag: 'Booked', mapUrl: MAPS.sense, photo: PHOTOS.sense, place: 'Sense Restaurant' },
    ],
  },
  {
    id: 'd2',
    label: 'Day 02',
    date: 'May 3',
    weekday: 'Saturday',
    title: 'Culture & the Acropolis',
    sub: 'Running, ruins, rooftop drinks',
    img: IMG.acropolis,
    dirUrl: 'https://www.google.com/maps/dir/National+Garden+Athens/Panathenaic+Stadium+Athens/Acropolis+Museum+Athens/Acropolis+Athens/Aerides+Restaurant+Plaka+Athens/Brettos+Bar+Athens',
    items: [
      { time: '07:00', icon: Footprints, label: 'Morning run · 5–7 km', detail: 'National Garden → Panathenaic Stadium → Acropolis perimeter.', tag: 'Run', mapUrl: MAPS.stadium, photo: PHOTOS.stadium, place: 'Panathenaic Stadium' },
      { time: 'Late AM', icon: Camera, label: 'Acropolis Museum', detail: 'World-class exhibition of Parthenon treasures.', tag: 'Culture', mapUrl: MAPS.acropolis, photo: PHOTOS.museum, place: 'Acropolis Museum' },
      { time: '16:45', icon: Star, label: 'Acropolis guided tour', detail: 'Until 18:45. Booked.', tag: 'Booked', mapUrl: MAPS.acropolisSite, photo: PHOTOS.acropolis, place: 'The Acropolis' },
      { time: '19:30', icon: Utensils, label: 'Dinner at Aerides Plaka', detail: 'Booked. Acropolis views from your table.', tag: 'Booked', mapUrl: MAPS.aerides, photo: PHOTOS.aerides, place: 'Aerides Plaka' },
      { time: 'After', icon: Sparkles, label: 'Brettos Bar or rooftop drinks', detail: "Optional. Athens' oldest distillery is steps away.", tag: 'Optional', mapUrl: MAPS.brettos, photo: PHOTOS.brettos, place: 'Brettos Bar' },
    ],
  },
  {
    id: 'd3',
    label: 'Day 03',
    date: 'May 4',
    weekday: 'Sunday',
    title: 'The Athens Riviera',
    sub: 'Mountain run · coastal swim · temple sunset',
    img: IMG.sounion,
    feature: true,
    dirUrl: 'https://www.google.com/maps/dir/Lycabettus+Hill+Athens/Athens+Riviera/Lake+Vouliagmeni/Vouliagmeni+Beach/Temple+of+Poseidon+Cape+Sounion',
    items: [
      { time: '06:30', icon: Sunrise, label: 'Lycabettus Hill run / climb', detail: 'Highest point in Athens. Watch the city wake up.', tag: 'Run', mapUrl: MAPS.lycabettus, photo: PHOTOS.lycabettus, place: 'Lycabettus Hill' },
      { time: 'Morning', icon: Waves, label: 'Drive the Athens Riviera', detail: 'Coastal road south towards Vouliagmeni.', tag: 'Scenic', mapUrl: 'https://maps.google.com/?q=Athens+Riviera', photo: PHOTOS.riviera, place: 'Athens Riviera' },
      { time: 'Late AM', icon: Waves, label: 'Lake Vouliagmeni', detail: 'Thermal lake fed by underground springs. Swim or kayak.', tag: 'Swim', mapUrl: MAPS.vouliagmeni, photo: PHOTOS.vouliagmeni, place: 'Lake Vouliagmeni' },
      { time: 'Noon', icon: Utensils, label: 'Seaside lunch on the Riviera', detail: 'Fresh fish, ouzo, and the open Aegean.', tag: 'Food', mapUrl: 'https://maps.google.com/?q=Vouliagmeni+seafood+restaurants', photo: PHOTOS.seafood, place: 'Riviera waterfront' },
      { time: '16:00', icon: Sun, label: 'Temple of Poseidon · Cape Sounion', detail: 'The crown jewel. 65 km south of Athens. Arrive 45 min before sunset.', tag: 'Must-do', mapUrl: MAPS.sounion, photo: PHOTOS.sounion, place: 'Cape Sounion' },
    ],
  },
  {
    id: 'd4',
    label: 'Day 04',
    date: 'May 5',
    weekday: 'Monday',
    title: 'Last Morning, Then the Ferry',
    sub: 'Farewell Athens, hello Cyclades',
    img: IMG.ferry,
    dirUrl: 'https://www.google.com/maps/dir/Philopappos+Hill+Athens/Koukaki+Athens/Piraeus+Port/Mykonos',
    items: [
      { time: '06:00', icon: Sunrise, label: 'Sunrise run · 4–5 km', detail: 'Philopappos + Acropolis loop. Best light of the trip.', tag: 'Run', mapUrl: MAPS.philopappos, photo: PHOTOS.sunrise, place: 'Philopappos + Acropolis' },
      { time: 'Morning', icon: Coffee, label: 'Breakfast in Koukaki or Plaka', detail: 'Last stroll through the neighbourhood.', mapUrl: MAPS.koukaki, photo: PHOTOS.koukaki, place: 'Koukaki' },
      { time: '17:05', icon: Ship, label: 'Ferry · Paros → Mykonos', detail: 'Reference FH52UX3636VY. Hotel in Mykonos to book.', tag: 'Ferry', mapUrl: 'https://maps.google.com/?q=Mykonos+New+Port', photo: PHOTOS.ferry, place: 'Aegean crossing' },
    ],
  },
  {
    id: 'd5',
    label: 'Day 05',
    date: 'May 6',
    weekday: 'Tuesday',
    title: 'Mykonos → Geneva',
    sub: 'Island morning, homeward flights',
    img: IMG.mykonos,
    dirUrl: 'https://www.google.com/maps/dir/Mykonos+Airport/Athens+International+Airport/Geneva+Airport',
    items: [
      { time: '08:55', icon: Plane, label: 'Mykonos → Athens', detail: 'Aegean Airlines A3373', tag: 'Flight', mapUrl: 'https://maps.google.com/?q=Mykonos+Airport', photo: PHOTOS.mykonos, place: 'Mykonos Airport' },
      { time: '10:40', icon: Plane, label: 'Athens → Geneva', detail: 'EasyJet U21472. Athens Intl Airport.', tag: 'Flight', mapUrl: MAPS.airport, photo: PHOTOS.airport2, place: 'Athens Intl' },
    ],
  },
]

const TAG_STYLES = {
  Flight:    'bg-[var(--color-azure)]/10 text-[var(--color-azure)] border-[var(--color-azure)]/20',
  Ferry:     'bg-[var(--color-azure)]/10 text-[var(--color-azure)] border-[var(--color-azure)]/20',
  Booked:    'bg-[var(--color-clay)]/15 text-[var(--color-clay-deep)] border-[var(--color-clay)]/30',
  Run:       'bg-[var(--color-olive)]/15 text-[var(--color-olive)] border-[var(--color-olive)]/30',
  Walk:      'bg-[var(--color-olive)]/10 text-[var(--color-olive)] border-[var(--color-olive)]/20',
  Viewpoint: 'bg-amber-500/15 text-amber-700 border-amber-500/25',
  Culture:   'bg-violet-500/10 text-violet-700 border-violet-500/20',
  Optional:  'bg-[var(--color-ink)]/5 text-[var(--color-ink-muted)] border-[var(--color-ink)]/10',
  Scenic:    'bg-sky-500/10 text-sky-700 border-sky-500/20',
  Food:      'bg-[var(--color-clay)]/10 text-[var(--color-clay-deep)] border-[var(--color-clay)]/20',
  Swim:      'bg-cyan-500/10 text-cyan-700 border-cyan-500/20',
  'Must-do': 'bg-[var(--color-clay)] text-[var(--color-paper)] border-[var(--color-clay-deep)]',
}

/* ────────────────────────────────────────────────────────────────
   SMALL COMPONENTS
   ──────────────────────────────────────────────────────────────── */

function Tag({ children }) {
  const cls = TAG_STYLES[children] || TAG_STYLES.Optional
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-[0.08em] px-2 py-[3px] rounded-full border ${cls}`}>
      {children}
    </span>
  )
}

function CopyChip({ value, label }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async (e) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }
  return (
    <button
      onClick={onCopy}
      className="group inline-flex items-center gap-1.5 font-mono text-[13px] font-medium text-[var(--color-ink)] bg-[var(--color-paper-2)] hover:bg-[var(--color-paper-3)] border border-[var(--color-line)] px-2.5 py-1 rounded-md transition-colors"
      aria-label={`Copy ${label || value}`}
    >
      {value}
      <span className="text-[var(--color-ink-muted)] group-hover:text-[var(--color-clay)] transition-colors">
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </span>
    </button>
  )
}

function Counter({ to, duration = 1.4 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (t) => {
      const p = Math.min((t - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * to))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])
  return <span ref={ref}>{val}</span>
}

function TimelineItem({ time, icon: Icon, label, detail, tag, mapUrl, dark = false }) {
  const muted = dark ? 'text-white/55' : 'text-[var(--color-ink-muted)]'
  const ink = dark ? 'text-white' : 'text-[var(--color-ink)]'
  const bubble = dark ? 'bg-white/10 border-white/15' : 'bg-[var(--color-paper-2)] border-[var(--color-line)]'
  const link = dark ? 'text-[var(--color-clay-soft)] hover:text-white' : 'text-[var(--color-clay-deep)] hover:text-[var(--color-clay)]'
  const border = dark ? 'border-white/10' : 'border-[var(--color-line)]/60'

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4 }}
      className={`flex gap-3 items-start py-3 border-b last:border-0 ${border}`}
    >
      <div className={`flex-shrink-0 w-14 text-[11px] font-mono ${muted} pt-1 tabular-nums`}>{time}</div>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full ${bubble} border flex items-center justify-center`}>
        <Icon size={14} className={dark ? 'text-white' : 'text-[var(--color-clay)]'} />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-[14px] font-semibold leading-snug ${ink}`}>{label}</span>
          {tag && <Tag>{tag}</Tag>}
        </div>
        {detail && <p className={`text-[13px] mt-0.5 leading-relaxed ${muted}`}>{detail}</p>}
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 text-[11px] font-medium mt-1 transition-colors ${link}`}
          >
            <MapPin size={10} /> View on map
          </a>
        )}
      </div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────
   APP
   ──────────────────────────────────────────────────────────────── */

export default function App() {
  const itineraryRef = useRef(null)
  const mapRef = useRef(null)
  const logRef = useRef(null)
  const tipsRef = useRef(null)
  const [activeDay, setActiveDay] = useState('d1')
  const [hoveredStop, setHoveredStop] = useState(null)
  const [openDayId, setOpenDayId] = useState(null)
  const openDay = DAYS.find((d) => d.id === openDayId)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpenDayId(null)
    if (openDayId) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openDayId])

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveDay(e.target.dataset.day)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    document.querySelectorAll('[data-day]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      {/* ── SCROLL PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--color-clay)] origin-left z-50"
        style={{ scaleX }}
      />

      {/* ── STICKY NAV ── */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-[var(--color-paper)]/80 border-b border-[var(--color-line)]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-4">
          <a href="#top" className="font-serif text-lg font-semibold tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-clay)]" />
            Athens · May 2–6
          </a>
          <div className="hidden md:flex items-center gap-1">
            {[
              ['Itinerary', itineraryRef],
              ['Map', mapRef],
              ['Logistics', logRef],
              ['Tips', tipsRef],
            ].map(([label, ref]) => (
              <button
                key={label}
                onClick={() => scrollTo(ref)}
                className="text-[13px] font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-clay)] px-3 py-1.5 rounded-full hover:bg-[var(--color-paper-2)] transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
          <a
            href={MAPS.fullRoute}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-semibold bg-[var(--color-ink)] text-[var(--color-paper)] px-3.5 py-1.5 rounded-full hover:bg-[var(--color-clay)] transition-colors"
          >
            Trip map <ArrowRight size={13} />
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="top" className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-12 md:pt-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid md:grid-cols-12 gap-8 items-end"
          >
            <div className="md:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                  Greece Trip · Spring 2026
                </span>
                <span className="h-px flex-1 bg-[var(--color-line)]" />
              </div>
              <h1 className="font-serif text-[58px] md:text-[96px] leading-[0.92] tracking-[-0.03em] font-medium">
                Athens
                <br />
                <span className="italic font-light text-[var(--color-clay)]">adventure</span>
                <span className="text-[var(--color-clay)]">.</span>
              </h1>
              <p className="mt-7 text-[17px] md:text-[19px] text-[var(--color-ink-soft)] leading-[1.55] max-w-xl">
                Morning runs through ancient marble. Hilltop viewpoints at golden hour.
                Coastal swims in turquoise water. The Acropolis up close, sunset dinners,
                and the Aegean island connection.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo(itineraryRef)}
                  className="group inline-flex items-center gap-2 bg-[var(--color-ink)] text-[var(--color-paper)] font-semibold text-[14px] px-6 py-3.5 rounded-full hover:bg-[var(--color-clay)] transition-all"
                >
                  View itinerary
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <a
                  href={MAPS.fullRoute}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-transparent border border-[var(--color-ink)]/20 text-[var(--color-ink)] font-semibold text-[14px] px-6 py-3.5 rounded-full hover:border-[var(--color-clay)] hover:text-[var(--color-clay)] transition-all"
                >
                  <MapPin size={15} /> Open trip map
                </a>
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="relative aspect-[4/5] rounded-[28px] overflow-hidden ink-shadow"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center scale-110"
                  style={{ backgroundImage: `url(${IMG.hero})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/40 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-[var(--color-paper)]">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-80 mb-1">
                    Featured viewpoint
                  </div>
                  <div className="font-serif text-2xl leading-tight">Cape Sounion at sunset</div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="absolute -left-4 -top-4 md:-left-8 md:-top-6 bg-[var(--color-paper-2)] border border-[var(--color-line)] rounded-2xl px-4 py-3 ink-shadow rotate-[-3deg]"
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-muted)]">Duration</div>
                <div className="font-serif text-2xl leading-tight">5 days</div>
              </motion.div>
            </div>
          </motion.div>

          {/* STATS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-line)]/70 rounded-2xl overflow-hidden border border-[var(--color-line)]"
          >
            {[
              { v: 3, l: 'Morning runs', icon: Footprints },
              { v: 4, l: 'Major viewpoints', icon: Mountain },
              { v: 2, l: 'Booked dinners', icon: Utensils },
              { v: 1, l: 'Epic coastal sunset', icon: Sun },
            ].map((s) => (
              <motion.div
                key={s.l}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="bg-[var(--color-paper)] hover:bg-[var(--color-paper-2)] transition-colors p-5 md:p-6 group"
              >
                <s.icon size={18} className="text-[var(--color-clay)] mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-serif text-5xl md:text-6xl leading-none tracking-tight">
                  <Counter to={s.v} />
                </div>
                <div className="mt-2 text-[12px] font-mono uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
                  {s.l}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ITINERARY ── */}
      <section ref={itineraryRef} className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
          <SectionHeading
            kicker="01 — The schedule"
            title="Five days, mile by mile"
            description="Tap a day to jump to it. Each card opens onto a full timeline with map links."
          />

          {/* Day pills */}
          <div className="sticky top-14 z-30 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3 mb-6 bg-[var(--color-paper)]/85 backdrop-blur border-b border-[var(--color-line)]/50">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="hidden md:inline text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mr-1">
                Tap to open journey →
              </span>
              {DAYS.map((d) => {
                const active = activeDay === d.id
                return (
                  <button
                    key={d.id}
                    onClick={() => setOpenDayId(d.id)}
                    className={`flex-shrink-0 group relative px-4 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-[var(--color-ink)] text-[var(--color-paper)]'
                        : 'bg-[var(--color-paper-2)] text-[var(--color-ink-soft)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]'
                    }`}
                  >
                    <span className="font-mono opacity-70">{d.label.replace('Day ', '')}</span>
                    {d.date}
                    <MapPin size={11} className="opacity-60 group-hover:opacity-100" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Day cards */}
          <div className="space-y-6">
            {DAYS.map((d, idx) => (
              <DayBlock key={d.id} day={d} index={idx} onOpen={() => setOpenDayId(d.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section ref={mapRef} className="relative bg-[var(--color-paper-2)] border-y border-[var(--color-line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
          <SectionHeading
            kicker="02 — Geography"
            title="Where it all happens"
            description="Eight key stops across Athens, the Riviera, and Cape Sounion."
          />

          <div className="grid md:grid-cols-12 gap-6">
            <motion.a
              href={MAPS.fullRoute}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7 relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[480px] ink-shadow group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${IMG.map})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ink)]/35 to-[var(--color-ink)]/65" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M 18 25 Q 30 32, 35 42 T 48 55 Q 60 62, 70 75"
                  stroke="#F5F1EA"
                  strokeWidth="0.4"
                  strokeDasharray="1.2 1.2"
                  fill="none"
                  opacity="0.7"
                />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-[var(--color-paper)]">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-80 mb-2">
                  Open in Google Maps
                </div>
                <div className="font-serif text-3xl md:text-4xl leading-tight">Full route, eight stops</div>
                <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold opacity-90 group-hover:opacity-100">
                  Plan your route <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>

            <div className="md:col-span-5 grid grid-cols-1 gap-2">
              {[
                { label: 'Acropolis Museum', icon: Camera, mapUrl: MAPS.acropolis, day: 'Day 02' },
                { label: 'Philopappos Hill', icon: Mountain, mapUrl: MAPS.philopappos, day: 'Day 01' },
                { label: 'Lycabettus Hill', icon: Mountain, mapUrl: MAPS.lycabettus, day: 'Day 03' },
                { label: 'Lake Vouliagmeni', icon: Waves, mapUrl: MAPS.vouliagmeni, day: 'Day 03' },
                { label: 'Temple of Poseidon', icon: Sun, mapUrl: MAPS.sounion, day: 'Day 03 ★' },
                { label: 'Sense Restaurant', icon: Utensils, mapUrl: MAPS.sense, day: 'Day 01' },
                { label: 'Aerides Plaka', icon: Utensils, mapUrl: MAPS.aerides, day: 'Day 02' },
                { label: 'Panathenaic Stadium', icon: Star, mapUrl: MAPS.stadium, day: 'Day 02' },
              ].map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredStop(s.label)}
                  onMouseLeave={() => setHoveredStop(null)}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="group flex items-center gap-3 px-4 py-3 bg-[var(--color-paper)] hover:bg-[var(--color-paper-3)] border border-[var(--color-line)] rounded-xl transition-all hover:border-[var(--color-clay)]/40"
                >
                  <div className="w-9 h-9 rounded-full bg-[var(--color-paper-3)] group-hover:bg-[var(--color-clay)] group-hover:text-[var(--color-paper)] text-[var(--color-clay)] flex items-center justify-center transition-colors">
                    <s.icon size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold leading-tight">{s.label}</div>
                    <div className="text-[11px] font-mono text-[var(--color-ink-muted)] mt-0.5">
                      {s.day}
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-[var(--color-ink-muted)] group-hover:text-[var(--color-clay)] group-hover:translate-x-0.5 transition-all" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGISTICS ── */}
      <section ref={logRef} className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
          <SectionHeading
            kicker="03 — Logistics"
            title="Flights, ferry, references"
            description="Tap any reference code to copy it instantly."
          />

          <div className="grid md:grid-cols-3 gap-5">
            <LogCard icon={Plane} accent="azure" label="Outbound" date="May 2">
              <Row k="Flight" v={<span className="font-mono">A3855</span>} />
              <Row k="Route" v="Geneva → Athens" />
              <Row k="Arrival" v="11:35" />
              <Row k="Airport" v="Eleftherios Venizelos" />
              <RowCopy k="Check-in · Somerset" code="ABHNM5" />
              <RowCopy k="Check-in · Remy" code="A3855" />
            </LogCard>

            <LogCard icon={Plane} accent="clay" label="Return" date="May 6" iconRotate>
              <Row k="Leg 1" v={<span className="font-mono">A3373 · MYK → ATH</span>} />
              <Row k="Departure" v="08:55" />
              <Row k="Leg 2" v={<span className="font-mono">U21472 · ATH → GVA</span>} />
              <Row k="Departure" v="10:40" />
              <RowCopy k="Check-in · Somerset" code="KC4PBWV" />
              <RowCopy k="Check-in · Remy" code="KC4PBWV" />
            </LogCard>

            <LogCard icon={Ship} accent="olive" label="Ferry" date="May 5">
              <Row k="Route" v="Paros → Mykonos" />
              <Row k="Departure" v="17:05" />
              <RowCopy k="Reference" code="FH52UX3636VY" />
              <div className="mt-4 p-3.5 bg-[var(--color-clay)]/10 border border-[var(--color-clay)]/25 rounded-xl">
                <div className="flex items-start gap-2">
                  <Info size={14} className="text-[var(--color-clay-deep)] mt-0.5 flex-shrink-0" />
                  <p className="text-[12px] leading-relaxed text-[var(--color-ink-soft)]">
                    <strong className="text-[var(--color-ink)]">Reminder.</strong> Book a hotel in Mykonos for the night of May 5.
                  </p>
                </div>
              </div>
            </LogCard>
          </div>
        </div>
      </section>

      {/* ── TIPS ── */}
      <section ref={tipsRef} className="relative bg-[var(--color-ink)] text-[var(--color-paper)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-24">
          <div className="mb-12">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-clay-soft)] mb-3">
              04 — Before you go
            </div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight">
              Eight things <span className="italic font-light text-[var(--color-clay-soft)]">to know</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Footprints, title: 'Running shoes', body: 'Bring trail or hybrid shoes with grip — Philopappos and Lycabettus paths are uneven cobblestone.' },
              { icon: Sunrise, title: 'Beat the heat', body: 'Morning runs start at 6–7 am to avoid heat and crowds. May warms up fast.' },
              { icon: Waves, title: 'May 4 essentials', body: 'Swimwear, sunscreen, a light layer for the breeze at Cape Sounion, comfortable walking shoes.' },
              { icon: Star, title: 'Sounion sunset', body: 'The crown jewel of the trip. Arrive 45 minutes before sunset for the best light on the columns.' },
              { icon: Ticket, title: 'Acropolis ticket', body: 'Entry is included in your guided tour. Bring photo ID. No large bags inside.' },
              { icon: Wind, title: 'Ferry boarding', body: 'Arrive at the port 45 minutes before departure. Reference: FH52UX3636VY.' },
              { icon: MapPin, title: 'Stay in Koukaki', body: 'Ten minutes from the Acropolis, packed with cafés and local restaurants.' },
              { icon: Sparkles, title: 'Bonus tip', body: 'Brettos in Plaka is the oldest distillery in Athens — try a thyme liqueur after dinner.' },
            ].map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.05 }}
                className="group relative p-5 rounded-2xl border border-white/10 hover:border-[var(--color-clay)]/60 hover:bg-white/5 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-clay)]/20 group-hover:bg-[var(--color-clay)] text-[var(--color-clay-soft)] group-hover:text-[var(--color-paper)] flex items-center justify-center mb-4 transition-colors">
                  <tip.icon size={17} />
                </div>
                <h4 className="font-serif text-xl leading-tight">{tip.title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-white/70">{tip.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[var(--color-paper-2)] border-t border-[var(--color-line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-clay)]" />
            <span className="font-serif text-lg font-medium">Athens Adventure</span>
            <span className="text-[var(--color-ink-muted)] text-sm">· May 2–6</span>
          </div>
          <div className="text-[12px] font-mono uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
            Safe travels — καλό ταξίδι
          </div>
        </div>
      </footer>

      {/* ── JOURNEY MODAL ── */}
      <AnimatePresence>
        {openDay && <JourneyModal day={openDay} onClose={() => setOpenDayId(null)} />}
      </AnimatePresence>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
   ──────────────────────────────────────────────────────────────── */

function SectionHeading({ kicker, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12 max-w-2xl"
    >
      <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-clay)] mb-3">
        {kicker}
      </div>
      <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight font-medium">
        {title}
        <span className="text-[var(--color-clay)]">.</span>
      </h2>
      {description && (
        <p className="mt-5 text-[var(--color-ink-soft)] text-[16px] leading-relaxed">{description}</p>
      )}
    </motion.div>
  )
}

function DayBlock({ day, index, onOpen }) {
  const [open, setOpen] = useState(true)
  const isFeature = day.feature

  return (
    <motion.article
      data-day={day.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-3xl overflow-hidden border ${
        isFeature
          ? 'border-[var(--color-clay)]/30 ink-shadow'
          : 'border-[var(--color-line)] bg-[var(--color-paper-2)]/40'
      }`}
    >
      <div className="grid md:grid-cols-12">
        {/* Image side — clickable to open journey */}
        <button
          onClick={onOpen}
          className={`relative md:col-span-5 ${isFeature ? 'md:col-span-6' : ''} aspect-[5/3] md:aspect-auto md:min-h-[340px] text-left group overflow-hidden cursor-pointer`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ backgroundImage: `url(${day.img})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--color-ink)]/75 via-[var(--color-ink)]/30 to-transparent" />
          <div className="absolute top-5 left-5 flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] bg-[var(--color-paper)]/90 backdrop-blur text-[var(--color-ink)] px-3 py-1 rounded-full">
              {day.label}
            </span>
            {isFeature && (
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] bg-[var(--color-clay)] text-[var(--color-paper)] px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles size={10} /> The big one
              </span>
            )}
          </div>
          <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] bg-[var(--color-clay)] text-[var(--color-paper)] px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <MapPin size={11} /> Open journey
            </span>
          </div>
          <div className="absolute bottom-5 left-5 right-5 text-[var(--color-paper)]">
            <div className="text-[11px] font-mono uppercase tracking-widest opacity-80">
              {day.weekday} · {day.date}
            </div>
            <h3 className="font-serif text-3xl md:text-4xl leading-tight mt-1">{day.title}</h3>
            <p className="text-[14px] opacity-85 mt-1">{day.sub}</p>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold mt-3 text-[var(--color-clay-soft)] group-hover:text-white transition-colors">
              View {day.items.length}-stop journey
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </button>

        {/* Timeline side */}
        <div className={`md:col-span-7 ${isFeature ? 'md:col-span-6' : ''} p-6 md:p-8 ${
          isFeature ? 'bg-[var(--color-ink)] text-[var(--color-paper)]' : 'bg-[var(--color-paper)]'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`text-[11px] font-mono uppercase tracking-[0.15em] ${
              isFeature ? 'text-[var(--color-clay-soft)]' : 'text-[var(--color-ink-muted)]'
            }`}>
              {day.items.length} stops
            </div>
            <button
              onClick={() => setOpen((o) => !o)}
              className={`text-[11px] font-mono uppercase tracking-wider flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                isFeature ? 'text-white/70 hover:bg-white/10' : 'text-[var(--color-ink-muted)] hover:bg-[var(--color-paper-2)]'
              }`}
            >
              {open ? 'Collapse' : 'Expand'}
              <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {day.items.map((it, i) => (
                  <TimelineItem key={i} {...it} dark={isFeature} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  )
}

function LogCard({ icon: Icon, accent, label, date, children, iconRotate }) {
  const accents = {
    azure: 'bg-[var(--color-azure)]/15 text-[var(--color-azure)]',
    clay: 'bg-[var(--color-clay)]/15 text-[var(--color-clay-deep)]',
    olive: 'bg-[var(--color-olive)]/15 text-[var(--color-olive)]',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      className="bg-[var(--color-paper-2)] border border-[var(--color-line)] rounded-2xl p-6 ink-shadow hover:border-[var(--color-clay)]/40 transition-colors"
    >
      <div className="flex items-center justify-between mb-5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accents[accent]}`}>
          <Icon size={18} className={iconRotate ? 'rotate-180' : ''} />
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">{label}</div>
          <div className="font-serif text-lg leading-tight">{date}</div>
        </div>
      </div>
      <div className="space-y-0">{children}</div>
    </motion.div>
  )
}

function Row({ k, v }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[var(--color-line)]/60 last:border-0 gap-3">
      <span className="text-[12px] text-[var(--color-ink-muted)]">{k}</span>
      <span className="text-[13px] font-medium text-[var(--color-ink)] text-right">{v}</span>
    </div>
  )
}

function RowCopy({ k, code }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[var(--color-line)]/60 last:border-0 gap-3">
      <span className="text-[12px] text-[var(--color-ink-muted)]">{k}</span>
      <CopyChip value={code} label={k} />
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────
   JOURNEY MODAL — animated route map with photo cards
   ──────────────────────────────────────────────────────────────── */

function JourneyModal({ day, onClose }) {
  const isFeature = day.feature
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-stretch md:items-center justify-center p-0 md:p-6 bg-[var(--color-ink)]/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[var(--color-paper)] md:rounded-3xl overflow-hidden ink-shadow my-auto"
      >
        {/* HERO STRIP */}
        <div className="relative h-56 md:h-72 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${day.img})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-paper)] via-[var(--color-ink)]/30 to-[var(--color-ink)]/40" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--color-paper)]/90 backdrop-blur hover:bg-[var(--color-paper)] flex items-center justify-center text-[var(--color-ink)] transition-colors shadow-lg"
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-6 left-6 right-6 text-[var(--color-paper)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] bg-[var(--color-paper)]/90 text-[var(--color-ink)] px-3 py-1 rounded-full">
                {day.label}
              </span>
              {isFeature && (
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] bg-[var(--color-clay)] text-[var(--color-paper)] px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={10} /> The big one
                </span>
              )}
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-80">
                {day.weekday} · {day.date}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl leading-[0.95] tracking-tight">
              {day.title}
            </h2>
            <p className="text-[14px] opacity-85 mt-1.5">{day.sub}</p>
          </div>
        </div>

        {/* JOURNEY */}
        <div className="px-5 md:px-10 pt-2 pb-8">
          <div className="flex items-center justify-between py-4 border-b border-[var(--color-line)]/60 mb-6">
            <div className="flex items-center gap-2 text-[var(--color-ink-soft)]">
              <Route size={15} className="text-[var(--color-clay)]" />
              <span className="text-[12px] font-mono uppercase tracking-[0.15em]">
                {day.items.length}-stop journey
              </span>
            </div>
            <a
              href={day.dirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-clay-deep)] hover:text-[var(--color-clay)] transition-colors"
            >
              Open in Google Maps <ExternalLink size={12} />
            </a>
          </div>

          <Journey items={day.items} />

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={day.dirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 min-w-[240px] inline-flex items-center justify-between gap-3 bg-[var(--color-ink)] text-[var(--color-paper)] px-5 py-4 rounded-2xl hover:bg-[var(--color-clay)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--color-clay)] group-hover:bg-[var(--color-paper)]/20 flex items-center justify-center">
                  <Route size={16} />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] opacity-70">
                    Full day route
                  </div>
                  <div className="font-serif text-lg leading-tight">Open driving directions</div>
                </div>
              </div>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={onClose}
              className="px-5 py-4 rounded-2xl border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-2)] transition-colors text-[13px] font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Journey({ items }) {
  return (
    <div className="relative">
      {/* Vertical animated path */}
      <svg
        className="absolute left-[27px] top-2 bottom-2 w-[2px] hidden sm:block"
        viewBox="0 0 2 100"
        preserveAspectRatio="none"
      >
        <motion.line
          x1="1" y1="0" x2="1" y2="100"
          stroke="var(--color-clay)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>

      <ol className="space-y-4">
        {items.map((it, i) => {
          const Icon = it.icon
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
              className="relative grid grid-cols-[56px_1fr] gap-4 items-stretch"
            >
              {/* Number node */}
              <div className="relative">
                <div className="sticky top-2 w-14 h-14 rounded-full bg-[var(--color-paper)] border-2 border-[var(--color-clay)] flex flex-col items-center justify-center text-[var(--color-clay-deep)] shadow-md">
                  <Icon size={14} className="mb-0.5" />
                  <span className="text-[10px] font-mono font-bold tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Card */}
              <div className="bg-[var(--color-paper-2)] hover:bg-[var(--color-paper-3)]/60 transition-colors rounded-2xl border border-[var(--color-line)] overflow-hidden flex flex-col sm:flex-row">
                {it.photo && (
                  <div className="relative sm:w-44 md:w-52 flex-shrink-0 aspect-[4/3] sm:aspect-auto sm:min-h-[140px] overflow-hidden">
                    <img
                      src={it.photo}
                      alt={it.label}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  </div>
                )}
                <div className="flex-1 p-4 md:p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-mono font-semibold text-[var(--color-clay-deep)] tabular-nums">
                      {it.time}
                    </span>
                    {it.tag && <Tag>{it.tag}</Tag>}
                  </div>
                  <h4 className="font-serif text-xl leading-tight text-[var(--color-ink)]">
                    {it.label}
                  </h4>
                  {it.place && (
                    <div className="mt-0.5 text-[11px] font-mono uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
                      {it.place}
                    </div>
                  )}
                  {it.detail && (
                    <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-ink-soft)]">
                      {it.detail}
                    </p>
                  )}
                  {it.mapUrl && (
                    <a
                      href={it.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-clay-deep)] hover:text-[var(--color-clay)] mt-3 transition-colors"
                    >
                      <MapPin size={12} /> View on map
                      <ArrowRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
