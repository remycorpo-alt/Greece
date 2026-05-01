import { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Plane,
  Ship,
  MapPin,
  Clock,
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
} from 'lucide-react'

const UNSPLASH = {
  hero: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1920&q=80',
  day2: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=900&q=80',
  day3: 'https://images.unsplash.com/photo-1571406252241-db0280bd38db?w=900&q=80',
  day4: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80',
  day5: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900&q=80',
  day6: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=900&q=80',
  map: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?w=1200&q=80',
}

const MAPS = {
  acropolis: 'https://maps.google.com/?q=Acropolis+Museum+Athens',
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
    'https://maps.google.com/?q=Acropolis+Athens&waypoints=Philopappos+Hill+Athens|Lycabettus+Hill+Athens|Lake+Vouliagmeni|Temple+of+Poseidon+Cape+Sounion',
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function Tag({ children, color = 'blue' }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-800',
    rose: 'bg-rose-100 text-rose-700',
    purple: 'bg-purple-100 text-purple-700',
    sky: 'bg-sky-100 text-sky-700',
  }
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[color]}`}>
      {children}
    </span>
  )
}

function TimelineItem({ time, icon: Icon, label, detail, tag, tagColor, mapUrl }) {
  return (
    <div className="flex gap-3 items-start py-2.5 border-b border-white/10 last:border-0">
      <div className="flex-shrink-0 w-16 text-xs font-mono text-white/60 pt-0.5">{time}</div>
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
        <Icon size={14} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-white leading-snug">{label}</span>
          {tag && <Tag color={tagColor}>{tag}</Tag>}
        </div>
        {detail && <p className="text-xs text-white/65 mt-0.5 leading-relaxed">{detail}</p>}
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-sky-300 hover:text-sky-100 mt-0.5 transition-colors"
          >
            <MapPin size={10} /> View on map
          </a>
        )}
      </div>
    </div>
  )
}

function DayCard({ day, date, title, subtitle, bg, items, accent = 'from-slate-900/80' }) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-3xl overflow-hidden shadow-xl relative"
      style={{ minHeight: 380 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-b ${accent} to-slate-950/95`} />
      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">
              {day}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white mt-0.5 leading-tight">
              {title}
            </h3>
            {subtitle && <p className="text-sm text-white/60 mt-1">{subtitle}</p>}
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold bg-white/15 text-white px-3 py-1 rounded-full">
              {date}
            </span>
          </div>
        </div>
        <div className="flex-1">
          {items.map((item, i) => (
            <TimelineItem key={i} {...item} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function StatCard({ icon: Icon, value, label, color }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center gap-2 border border-slate-100"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div className="text-3xl font-extrabold text-slate-800">{value}</div>
      <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</div>
    </motion.div>
  )
}

function MapStop({ label, icon: Icon, mapUrl }) {
  return (
    <a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-700 transition-all shadow-sm group"
    >
      <Icon size={15} className="text-blue-500 group-hover:text-blue-600 flex-shrink-0" />
      {label}
    </a>
  )
}

function FlightRow({ label, value, mono = false }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`text-sm font-semibold text-slate-800 ${mono ? 'font-mono' : ''}`}>
        {value}
      </span>
    </div>
  )
}

export default function App() {
  const itineraryRef = useRef(null)

  const scrollToItinerary = () =>
    itineraryRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${UNSPLASH.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/50 to-slate-950/80" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Greece Trip · May 2–6
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold text-white leading-none tracking-tight mb-4"
          >
            Athens
            <span className="block text-sky-300">Adventure</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-white/75 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10"
          >
            Morning runs, hilltop viewpoints, coastal swims, Acropolis culture,
            sunset dinners and the Aegean island connection.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={scrollToItinerary}
              className="bg-white text-slate-900 font-bold px-7 py-3 rounded-full shadow-lg hover:bg-sky-50 transition-all"
            >
              View Itinerary
            </button>
            <a
              href={MAPS.fullRoute}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 backdrop-blur-sm border border-white/30 text-white font-bold px-7 py-3 rounded-full hover:bg-white/25 transition-all"
            >
              Open Trip Map
            </a>
          </motion.div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
          onClick={scrollToItinerary}
          className="absolute bottom-8 z-10 text-white/60 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </motion.button>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* ── STATS ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Trip at a Glance
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Footprints} value="3" label="Morning Runs" color="bg-emerald-500" />
            <StatCard icon={Mountain} value="4" label="Major Viewpoints" color="bg-violet-500" />
            <StatCard icon={Utensils} value="2" label="Booked Dinners" color="bg-amber-500" />
            <StatCard icon={Sun} value="1" label="Epic Coastal Sunset" color="bg-rose-500" />
          </div>
        </motion.section>

        {/* ── MAP SECTION ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Trip Map</h2>
            <p className="text-slate-500 mt-1">Key stops across the Athens area and beyond.</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative rounded-3xl overflow-hidden shadow-xl mb-6"
            style={{ height: 280 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${UNSPLASH.map})` }}
            />
            <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
              <a
                href={MAPS.fullRoute}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-slate-900 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-sky-50 transition-all flex items-center gap-2"
              >
                <MapPin size={18} className="text-rose-500" />
                Open Full Route in Google Maps
              </a>
            </div>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {[
              { label: 'Acropolis Museum', icon: Camera, mapUrl: MAPS.acropolis },
              { label: 'Philopappos Hill', icon: Mountain, mapUrl: MAPS.philopappos },
              { label: 'Lycabettus Hill', icon: Mountain, mapUrl: MAPS.lycabettus },
              { label: 'Lake Vouliagmeni', icon: Waves, mapUrl: MAPS.vouliagmeni },
              { label: 'Temple of Poseidon', icon: Sun, mapUrl: MAPS.sounion },
              { label: 'Sense Restaurant', icon: Utensils, mapUrl: MAPS.sense },
              { label: 'Aerides Plaka', icon: Utensils, mapUrl: MAPS.aerides },
              { label: 'Panathenaic Stadium', icon: Star, mapUrl: MAPS.stadium },
            ].map((stop) => (
              <motion.div key={stop.label} variants={fadeUp}>
                <MapStop {...stop} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── ITINERARY ── */}
        <section ref={itineraryRef}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-slate-800">Day-by-Day Schedule</h2>
            <p className="text-slate-500 mt-1">Five days of culture, movement, and Mediterranean magic.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* DAY 1 – May 2 */}
            <DayCard
              day="Day 1"
              date="May 2"
              title="Arrival & First Steps"
              subtitle="Athens welcomes you"
              bg={UNSPLASH.day2}
              accent="from-indigo-950/85"
              items={[
                {
                  time: '11:35',
                  icon: Plane,
                  label: 'Land at Athens Airport',
                  detail: 'Flight A3855 · Aegean Geneva → Athens',
                  tag: 'Flight',
                  tagColor: 'blue',
                  mapUrl: 'https://maps.google.com/?q=Athens+International+Airport',
                },
                {
                  time: 'Afternoon',
                  icon: MapPin,
                  label: 'Plaka + Anafiotika Walk',
                  detail: 'Wander the oldest neighbourhood and the island-village hidden on the Acropolis slope.',
                  tag: 'Walk',
                  tagColor: 'green',
                  mapUrl: MAPS.plaka,
                },
                {
                  time: '18:00',
                  icon: Mountain,
                  label: 'Philopappos Hill Sunset',
                  detail: 'Golden hour hike with direct Acropolis views.',
                  tag: 'Viewpoint',
                  tagColor: 'amber',
                  mapUrl: MAPS.philopappos,
                },
                {
                  time: '19:00',
                  icon: Utensils,
                  label: 'Dinner at Sense',
                  detail: 'Booked. Modern Greek cuisine.',
                  tag: 'Booked',
                  tagColor: 'rose',
                  mapUrl: MAPS.sense,
                },
              ]}
            />

            {/* DAY 2 – May 3 */}
            <DayCard
              day="Day 2"
              date="May 3"
              title="Culture & the Acropolis"
              subtitle="Running, ruins, and rooftop drinks"
              bg={UNSPLASH.day3}
              accent="from-sky-950/85"
              items={[
                {
                  time: '07:00',
                  icon: Footprints,
                  label: 'Morning Run ~5–7 km',
                  detail: 'National Garden → Panathenaic Stadium → Acropolis perimeter loop.',
                  tag: 'Run',
                  tagColor: 'green',
                  mapUrl: MAPS.stadium,
                },
                {
                  time: 'Late AM',
                  icon: Camera,
                  label: 'Acropolis Museum',
                  detail: 'World-class exhibition of Parthenon treasures.',
                  tag: 'Culture',
                  tagColor: 'purple',
                  mapUrl: MAPS.acropolis,
                },
                {
                  time: '16:45',
                  icon: Star,
                  label: 'Acropolis Tour',
                  detail: 'Guided visit until 18:45. Booked.',
                  tag: 'Booked',
                  tagColor: 'rose',
                  mapUrl: 'https://maps.google.com/?q=Acropolis+Athens',
                },
                {
                  time: '19:30',
                  icon: Utensils,
                  label: 'Dinner at Aerides Plaka',
                  detail: 'Booked. Classic Plaka setting with Acropolis views.',
                  tag: 'Booked',
                  tagColor: 'rose',
                  mapUrl: MAPS.aerides,
                },
                {
                  time: 'After',
                  icon: Star,
                  label: 'Brettos Bar or rooftop drinks',
                  detail: "Optional. Athens' oldest distillery is steps away.",
                  tag: 'Optional',
                  tagColor: 'sky',
                  mapUrl: MAPS.brettos,
                },
              ]}
            />

            {/* DAY 3 – May 4 – ADVENTURE DAY full-width */}
            <motion.div variants={fadeUp} className="md:col-span-2">
              <div
                className="rounded-3xl overflow-hidden shadow-2xl relative"
                style={{ minHeight: 440 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${UNSPLASH.day4})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-950/90 via-slate-900/80 to-slate-950/95" />
                <div className="relative z-10 p-6 md:p-10">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                        Day 3 · The Big One
                      </span>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                        Athens Riviera & Cape Sounion
                      </h3>
                      <p className="text-white/60 mt-1">
                        Mountain run → coastal swim → breathtaking temple sunset
                      </p>
                    </div>
                    <span className="text-sm font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-4 py-1.5 rounded-full">
                      May 4 · Adventure Day
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-10">
                    {[
                      {
                        time: '06:30',
                        icon: Mountain,
                        label: 'Lycabettus Hill Run/Climb',
                        detail: 'Highest point in Athens. Watch the city wake up.',
                        tag: 'Run',
                        tagColor: 'green',
                        mapUrl: MAPS.lycabettus,
                      },
                      {
                        time: 'Morning',
                        icon: Waves,
                        label: 'Athens Riviera Drive',
                        detail: 'Head south along the coast towards Vouliagmeni.',
                        tag: 'Scenic',
                        tagColor: 'sky',
                      },
                      {
                        time: 'Late AM',
                        icon: Waves,
                        label: 'Lake Vouliagmeni',
                        detail: 'Thermal lake fed by underground springs. Swim or kayak.',
                        tag: 'Swim',
                        tagColor: 'blue',
                        mapUrl: MAPS.vouliagmeni,
                      },
                      {
                        time: 'Noon',
                        icon: Utensils,
                        label: 'Seaside Lunch',
                        detail: 'Fresh fish on the Riviera waterfront.',
                        tag: 'Food',
                        tagColor: 'amber',
                      },
                      {
                        time: '16:00',
                        icon: Sun,
                        label: '★ Temple of Poseidon Sunset',
                        detail: 'Cape Sounion — the crown jewel of the trip. 65 km south of Athens.',
                        tag: 'Must-do',
                        tagColor: 'rose',
                        mapUrl: MAPS.sounion,
                      },
                    ].map((item, i) => (
                      <TimelineItem key={i} {...item} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* DAY 4 – May 5 */}
            <DayCard
              day="Day 4"
              date="May 5"
              title="Last Morning & Ferry"
              subtitle="Farewell Athens → Hello Mykonos"
              bg={UNSPLASH.day5}
              accent="from-teal-950/85"
              items={[
                {
                  time: '06:00',
                  icon: Footprints,
                  label: 'Sunrise Run ~4–5 km',
                  detail: 'Philopappos Hill + Acropolis loop. Best light of the trip.',
                  tag: 'Run',
                  tagColor: 'green',
                  mapUrl: MAPS.philopappos,
                },
                {
                  time: 'Morning',
                  icon: MapPin,
                  label: 'Breakfast in Koukaki or Plaka',
                  detail: 'Last stroll through the neighbourhood.',
                  mapUrl: MAPS.koukaki,
                },
                {
                  time: '17:05',
                  icon: Ship,
                  label: 'Ferry: Paros → Mykonos',
                  detail: 'Ref: FH52UX3636VY. Book hotel in Mykonos.',
                  tag: 'Ferry',
                  tagColor: 'blue',
                },
              ]}
            />

            {/* DAY 5 – May 6 */}
            <DayCard
              day="Day 5"
              date="May 6"
              title="Mykonos → Geneva"
              subtitle="Island morning, homeward flights"
              bg={UNSPLASH.day6}
              accent="from-rose-950/80"
              items={[
                {
                  time: '08:55',
                  icon: Plane,
                  label: 'Mykonos → Athens',
                  detail: 'Aegean Airlines A3373',
                  tag: 'Flight',
                  tagColor: 'blue',
                },
                {
                  time: '10:40',
                  icon: Plane,
                  label: 'Athens → Geneva',
                  detail: 'EasyJet U21472 · Athens Intl Airport',
                  tag: 'Flight',
                  tagColor: 'blue',
                  mapUrl: 'https://maps.google.com/?q=Athens+International+Airport',
                },
              ]}
            />
          </motion.div>
        </section>

        {/* ── FLIGHTS & LOGISTICS ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Flights & Logistics</h2>
            <p className="text-slate-500 mt-1">All reference numbers in one place.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Outbound */}
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-2xl shadow-md border border-slate-100 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plane size={16} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-800">Outbound · May 2</h3>
              </div>
              <FlightRow label="Flight" value="A3855" mono />
              <FlightRow label="Route" value="Geneva → Athens" />
              <FlightRow label="Arrival" value="11:35" />
              <FlightRow label="Airport" value="Eleftherios Venizelos" />
              <FlightRow label="Check-in Somerset" value="ABHNM5" mono />
              <FlightRow label="Check-in Remy" value="A3855" mono />
            </motion.div>

            {/* Return */}
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-2xl shadow-md border border-slate-100 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Plane size={16} className="text-rose-600 rotate-180" />
                </div>
                <h3 className="font-bold text-slate-800">Return · May 6</h3>
              </div>
              <FlightRow label="Leg 1" value="A3373 MYK→ATH" mono />
              <FlightRow label="Departure" value="08:55" />
              <FlightRow label="Leg 2" value="U21472 ATH→GVA" mono />
              <FlightRow label="Departure" value="10:40" />
              <FlightRow label="Airport" value="Eleftherios Venizelos" />
              <FlightRow label="Check-in Somerset" value="KC4PBWV" mono />
              <FlightRow label="Check-in Remy" value="KC4PBWV" mono />
            </motion.div>

            {/* Ferry */}
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-2xl shadow-md border border-slate-100 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Ship size={16} className="text-teal-600" />
                </div>
                <h3 className="font-bold text-slate-800">Ferry · May 5</h3>
              </div>
              <FlightRow label="Route" value="Paros → Mykonos" />
              <FlightRow label="Departure" value="17:05" />
              <FlightRow label="Reference" value="FH52UX3636VY" mono />
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                <strong>Reminder:</strong> Book Mykonos hotel for the night of May 5.
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ── GUEST TIPS ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="pb-8"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Guest Tips</h2>
            <p className="text-slate-500 mt-1">Everything you need to know before you go.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Footprints,
                color: 'bg-emerald-50 border-emerald-200',
                iconColor: 'text-emerald-600',
                title: 'Running Shoes',
                body: 'Bring trail or hybrid running shoes with good grip — Philopappos and Lycabettus paths are uneven cobblestone.',
              },
              {
                icon: Sun,
                color: 'bg-amber-50 border-amber-200',
                iconColor: 'text-amber-600',
                title: 'Beat the Heat',
                body: 'Morning runs start early (6–7am) to avoid both heat and crowds. Temperatures rise quickly in May.',
              },
              {
                icon: Waves,
                color: 'bg-sky-50 border-sky-200',
                iconColor: 'text-sky-600',
                title: 'May 4 — Adventure Day',
                body: 'Pack swimwear, sunscreen, a light layer for the breeze at Cape Sounion, and comfortable walking shoes.',
              },
              {
                icon: Star,
                color: 'bg-rose-50 border-rose-200',
                iconColor: 'text-rose-600',
                title: 'Temple of Poseidon',
                body: 'Cape Sounion sunset is the must-do highlight of the trip. Arrive 45 min before sunset for the best light.',
              },
              {
                icon: Info,
                color: 'bg-violet-50 border-violet-200',
                iconColor: 'text-violet-600',
                title: 'Acropolis Tickets',
                body: 'Entry is included in the guided tour booking. Bring ID. No large bags allowed inside.',
              },
              {
                icon: Wind,
                color: 'bg-slate-50 border-slate-200',
                iconColor: 'text-slate-600',
                title: 'Ferry Essentials',
                body: 'Arrive at the port at least 45 minutes before departure. Keep the ferry reference handy: FH52UX3636VY.',
              },
              {
                icon: Ticket,
                color: 'bg-indigo-50 border-indigo-200',
                iconColor: 'text-indigo-600',
                title: 'Check-in Reminder',
                body: 'Somerset: ABHNM5 (outbound) / KC4PBWV (return). Remy: A3855 (outbound) / KC4PBWV (return).',
              },
              {
                icon: MapPin,
                color: 'bg-teal-50 border-teal-200',
                iconColor: 'text-teal-600',
                title: 'Base Neighbourhood',
                body: 'Koukaki is the ideal base — 10 min walk to the Acropolis, packed with cafés and local restaurants.',
              },
            ].map((tip) => (
              <motion.div
                key={tip.title}
                variants={fadeUp}
                className={`flex gap-4 p-4 rounded-2xl border ${tip.color}`}
              >
                <div className={`flex-shrink-0 mt-0.5 ${tip.iconColor}`}>
                  <tip.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{tip.title}</h4>
                  <p className="text-slate-600 text-sm mt-0.5 leading-relaxed">{tip.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-white/50 text-center text-xs py-6">
        Athens Adventure · May 2–6 &nbsp;·&nbsp; Safe travels ✈
      </footer>
    </div>
  )
}
