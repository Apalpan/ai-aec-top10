import { useContext } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { SlideNumContext } from './components/Deck'
import Figure from './components/Figure'
import StatCard from './components/StatCard'
import { ConceptLadder } from './components/Visuals'
import { ParadoxGap } from './components/Showcase'
import AecodeLogo from './components/AecodeLogo'
import type { SlideDef } from './components/Deck'
import type { Figure as Fig } from './lib/chartOptions'
import global from '../data/global.json'
import sources from '../data/sources.json'
import worldRaw from '../data/world.json'

const W: any = worldRaw
const PDF = `${import.meta.env.BASE_URL}Informe-IA-AEC-2026.pdf`
const st = (i: number): CSSProperties => ({ ['--i' as any]: i })

function Head({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  const num = useContext(SlideNumContext)
  return (
    <header className="s-head up" style={st(0)}>
      <p className="eyebrow">{num && <span className="idx">{num}</span>} {eyebrow}</p>
      <h2 className="s-title">{title}</h2>
      <div className="kicker-line" />
      {lead && <p className="lead">{lead}</p>}
    </header>
  )
}

function Insights({ items }: { items: ReactNode[] }) {
  return <ul className="insights compact">{items.map((t, i) => <li key={i}>{t}</li>)}</ul>
}

function SourceNote({ children }: { children: ReactNode }) {
  return <p className="src-note up" style={st(4)}><b>Fuente:</b> {children}</p>
}

function SignalGrid({ items }: { items: Array<{ k: string; t: string; d: string; tag?: string }> }) {
  return (
    <div className="signal-grid up" style={st(1)}>
      {items.map((it, i) => (
        <article className="signal-card" key={it.t} style={st(i + 1)}>
          <span className="signal-k">{it.k}</span>
          <h3>{it.t}</h3>
          <p>{it.d}</p>
          {it.tag && <b>{it.tag}</b>}
        </article>
      ))}
    </div>
  )
}

function ProcessFlow({ items }: { items: Array<{ t: string; d: string }> }) {
  return (
    <div className="process-flow up" style={st(1)}>
      {items.map((it, i) => (
        <div className="process-node" key={it.t} style={st(i + 1)}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <h3>{it.t}</h3>
          <p>{it.d}</p>
        </div>
      ))}
    </div>
  )
}

// ─── SLIDE 1: PORTADA ────────────────────────────────────────────────────────
function Cover() {
  const { meta } = global as any
  return (
    <div className="cover">
      <AecodeLogo className="cover-mark up" style={st(0)} />
      <p className="cover-eyebrow up" style={st(1)}>{meta.edition} · AI Construction Summit 2026</p>
      <h1 className="cover-title up" style={st(2)}>
        Estado actual de la <span className="grad">Inteligencia Artificial</span><br />y oportunidad en AEC
      </h1>
      <p className="cover-lead up" style={st(3)}>
        Las 10 diapositivas esenciales: qué cambió en la IA, qué significan los datos actuales y cómo convertir ese conocimiento en habilidad y acción en arquitectura, ingeniería y construcción.
      </p>
      <div className="cover-meta up" style={st(4)}>
        <span className="chip">Datos verificados 2026</span>
        <span className="chip">AI Construction Summit</span>
        <span className="chip">Radar AECODE</span>
        <span className="chip">10 slides · resumen ejecutivo</span>
      </div>
      <div className="cover-hud up" style={st(5)} aria-hidden="true">
        <span className="ch-item"><b className="tnum">2×</b> cómputo cada 6 meses</span>
        <span className="ch-sep" />
        <span className="ch-item"><b className="tnum">1000 M</b> usuarios de ChatGPT</span>
        <span className="ch-sep" />
        <span className="ch-item"><b className="tnum">84,8%</b> exposición en Arq./Ing.</span>
        <span className="ch-sep" />
        <span className="ch-item live"><span className="ch-dot" /> datos verificados 2026</span>
      </div>
    </div>
  )
}

// ─── SLIDE 2: HILO CONDUCTOR ──────────────────────────────────────────────────
function NarrativaSlide() {
  const items = [
    { k: '01', t: 'Qué cambió', d: 'La IA pasó de responder texto a razonar, ver, crear, programar y usar herramientas.', tag: 'Capacidad' },
    { k: '02', t: 'Por qué importa', d: 'La adopción masiva ya empezó, pero la captura de valor sigue en pilotos.', tag: 'Productividad' },
    { k: '03', t: 'Dónde está AEC', d: 'El sector tiene gran mercado, baja productividad y datos desaprovechados.', tag: 'Brecha' },
    { k: '04', t: 'Qué hacer', d: 'Pasar de prompts sueltos a workflows con validación, trazabilidad y evidencia.', tag: 'Sistema' },
  ]
  return (
    <>
      <Head eyebrow="Hilo conductor" title="Una historia clara: de asombro a criterio operativo"
        lead="Esta presentación no es un desfile de herramientas. Es una forma de entender la IA como infraestructura de trabajo y como nueva habilidad profesional." />
      <SignalGrid items={items} />
    </>
  )
}

// ─── SLIDE 3: VELOCIDAD DE ADOPCIÓN ──────────────────────────────────────────
function AdopcionSlide() {
  const r = W.reach
  return (
    <>
      <Head eyebrow="Velocidad de adopción" title={W.adoptionSpeed.title}
        lead="La IA generativa se adoptó a una velocidad inédita. Esto obliga a los profesionales a aprender criterio antes de que el mercado lo exija por defecto." />
      <div className="slide-two up" style={st(1)}>
        <Figure fig={W.adoptionSpeed as Fig} height={290} />
        <div className="grid stat-col">{r.stats.slice(0, 4).map((s: any, i: number) => <StatCard key={i} {...s} />)}</div>
      </div>
    </>
  )
}

// ─── SLIDE 4: PARADOJA AEC ────────────────────────────────────────────────────
function ParadojaSlide() {
  return (
    <>
      <Head eyebrow="Punto de partida" title="La paradoja del AEC"
        lead="El sector que más construye el mundo sigue atrapado en baja productividad, información fragmentada y adopción desigual de tecnología." />
      <ParadoxGap />
    </>
  )
}

// ─── SLIDE 5: BENCHMARKS ─────────────────────────────────────────────────────
function BenchmarksSlide() {
  return (
    <>
      <Head eyebrow="Capacidad medida" title={W.benchmarks.title}
        lead="Un benchmark es un examen estándar. Sirve para ver progreso, no para escoger herramienta a ciegas. El mensaje: la frontera sube rápido." />
      <div className="up" style={st(1)}><Figure fig={W.benchmarks as Fig} height={360} /></div>
    </>
  )
}

// ─── SLIDE 6: CONCEPTOS CLAVE ─────────────────────────────────────────────────
function ConceptosSlide() {
  return (
    <>
      <Head eyebrow="Lenguaje mínimo" title={W.concepts.title}
        lead="Distinguir niveles evita errores: no se gobierna igual un chatbot, un asistente, un agente o un workflow de negocio." />
      <ConceptLadder items={W.concepts.items} />
      <SourceNote>{W.concepts.source}</SourceNote>
    </>
  )
}

// ─── SLIDE 7: BRECHA AEC ─────────────────────────────────────────────────────
function BrechaAecSlide() {
  return (
    <>
      <Head eyebrow="Brecha AEC" title={W.aecGap.title}
        lead="AEC tiene una exposición alta a IA en tareas técnicas, pero uso real desigual. Esa distancia es la oportunidad de formación, consultoría y producto." />
      <div className="up" style={st(1)}><Figure fig={W.aecGap as Fig} height={320} /></div>
    </>
  )
}

// ─── SLIDE 8: MAPA DE CASOS DE USO AEC ───────────────────────────────────────
function UsecaseMapSlide() {
  const areas = [
    ['Diseño', 'conceptos, referencias, criterios, narrativa, opciones'],
    ['Ingeniería', 'revisión técnica, cálculos auxiliares, normas, reportes'],
    ['Costos', 'metrados, comparativos, supuestos, sensibilidad'],
    ['Planificación', 'riesgos, secuencias, restricciones, lookahead'],
    ['Obra', 'fotos, avance, seguridad, calidad, incidencias'],
    ['Comercial', 'propuestas, presentaciones, memoria de oportunidades'],
  ]
  return (
    <>
      <Head eyebrow="Mapa de aplicación" title="Dónde entra la IA en el ciclo AEC"
        lead="La IA no es una sola herramienta. Es una capa que puede asistir tareas repetitivas, comparativas, documentales, creativas y analíticas en cada fase del proyecto." />
      <div className="usecase-grid up" style={st(1)}>
        {areas.map(([t, d], i) => <article key={t} style={st(i + 1)}><span>{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></article>)}
      </div>
    </>
  )
}

// ─── SLIDE 9: DIEZ IDEAS CLAVE ────────────────────────────────────────────────
function TakeawaysSlide() {
  return (
    <>
      <Head eyebrow="Diez ideas para recordar" title="La IA no se domina por entusiasmo: se domina por criterio"
        lead="Si el público recuerda estas ideas, la masterclass cumplió su función." />
      <div className="takeaways up" style={st(1)}>
        {[
          'No hay mejor modelo universal; hay mejor modelo para una tarea.',
          'La IA generativa crea; la predictiva estima; la agéntica ejecuta pasos.',
          'El prompt profesional es una especificación de trabajo.',
          'Razonar más no garantiza verdad: siempre valida.',
          'Sin datos organizados, no hay IA escalable.',
          'AEC tiene alta exposición y baja adopción: oportunidad clara.',
          'La obra necesita evidencia, no solo texto bonito.',
          'El humano sigue siendo responsable del criterio técnico.',
          'La ventaja aparece al convertir IA en workflow.',
          'La habilidad debe practicarse, evidenciarse y certificarse.',
        ].map((t, i) => <span key={t} style={st(i + 1)}>{String(i + 1).padStart(2, '0')} · {t}</span>)}
      </div>
    </>
  )
}

// ─── SLIDE 10: CIERRE ────────────────────────────────────────────────────────
function ClosingSlide() {
  return (
    <div className="closing">
      <AecodeLogo className="cover-mark up" style={st(0)} />
      <p className="closing-eyebrow up" style={st(1)}>{(global as any).meta.event}</p>
      <p className="bigquote-text up" style={st(2)}>
        No gana quien abre ChatGPT. <span className="hl">Gana quien convierte la IA en sistema de trabajo verificable.</span>
      </p>
      <div className="closing-cta up" style={st(3)}>
        <a className="btn btn-cta" href={PDF} target="_blank" rel="noopener" download><span aria-hidden="true">↓</span> Descargar informe</a>
        <a className="btn" href="mailto:apalpan@genplusdesign.com">apalpan@genplusdesign.com</a>
      </div>
    </div>
  )
}

export const slides: SlideDef[] = [
  { id: 'cover',       num: '',   title: 'Portada',                    node: <Cover /> },
  { id: 'narrativa',   num: '01', title: 'Hilo conductor',             node: <NarrativaSlide /> },
  { id: 'adopcion',    num: '02', title: 'Velocidad de adopción',      node: <AdopcionSlide /> },
  { id: 'paradoja',    num: '03', title: 'La paradoja del AEC',        node: <ParadojaSlide /> },
  { id: 'benchmarks',  num: '04', title: 'Capacidad medida',           node: <BenchmarksSlide /> },
  { id: 'conceptos',   num: '05', title: 'Chatbot → agente → workflow',node: <ConceptosSlide /> },
  { id: 'brecha-aec',  num: '06', title: 'Brecha potencial vs uso AEC',node: <BrechaAecSlide /> },
  { id: 'usecase-map', num: '07', title: 'Mapa de casos de uso AEC',   node: <UsecaseMapSlide /> },
  { id: 'takeaways',   num: '08', title: 'Diez ideas para recordar',   node: <TakeawaysSlide /> },
  { id: 'cierre',      num: '',   title: 'Cierre',                     node: <ClosingSlide /> },
]
