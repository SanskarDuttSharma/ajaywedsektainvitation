import { useRef, useState, useEffect } from 'react';
import type { Event } from '../data/events';

const NUMS    = ['01', '02', '03', '04', '05'];
const ACCENTS = ['#C9A84C', '#D4A017', '#C4795A', '#D4748C', '#8A5C6E'];
const BG      = ['#FDF6EC', '#FAF3E8', '#FFF5EE', '#FFF9F0', '#F5EEE8'];

// Bottom decorative images per event index ('' = no bottom image)
const BOTTOM_IMGS = [
  '/images/RingCeremonyBottom.png',        // 0 Ring Ceremony
  '/images/HaldiCarnivalBottom.png',       // 1 Haldi Carnival
  '/images/MahendiBottomImage.png',       // 2 Mahendi
  '/images/SangeetBottomImage.png',       // 3 Sangeet
  '/images/WeddingBottom.png',            // 4 The Wedding
];

// ── Haldi Carnival ─────────────────────────────────────────────────────────────
function HaldiEffect() {
  const dots = Array.from({ length: 22 }).map((_, i) => ({
    left:  ((i * 19 + 5)  % 94) + 3,
    top:   ((i * 31 + 11) % 70) + 15,
    size:  3 + (i % 6),
    delay: (i * 0.35) % 4,
    dur:   2.8 + (i % 4) * 0.4,
    color: i % 3 === 0 ? '#F5C842' : i % 3 === 1 ? '#E8A020' : '#F0D060',
  }));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
      {dots.map((d, i) => (
        <div key={i} style={{
          position:'absolute',
          left:`${d.left}%`, top:`${d.top}%`,
          width:`${d.size}px`, height:`${d.size}px`,
          borderRadius:'50%',
          background: d.color,
          opacity: 0,
          animation:`haldiFloat ${d.dur}s ease-out ${d.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

// ── Sangeet ────────────────────────────────────────────────────────────────────
function SangeetEffect() {
  const notes  = ['♪','♫','♩','♬','♪','♫'];
  const colors = ['#D4748C','#C9A84C','#8A9E7B','#D4748C','#E8C97A','#C9A84C'];
  const items  = Array.from({ length: 18 }).map((_, i) => ({
    left:  ((i * 23 + 8) % 90) + 5,
    note:  i % 2 === 0 ? notes[i % notes.length] : null,
    size:  i % 2 === 0 ? 14 + (i % 4) * 3 : 4 + (i % 5),
    color: colors[i % colors.length],
    delay: (i * 0.28) % 4.5,
    dur:   2.5 + (i % 5) * 0.5,
  }));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
      {items.map((d, i) => (
        <div key={i} style={{
          position:'absolute',
          left:`${d.left}%`,
          bottom: d.note ? `${((i * 13) % 30) + 5}%` : `${((i * 17) % 40) + 10}%`,
          fontSize: d.note ? `${d.size}px` : undefined,
          width:  d.note ? undefined : `${d.size}px`,
          height: d.note ? undefined : `${d.size}px`,
          borderRadius: d.note ? undefined : '50%',
          background: d.note ? undefined : d.color,
          color: d.note ? d.color : undefined,
          opacity: 0,
          animation:`noteRise ${d.dur}s ease-out ${d.delay}s infinite`,
          lineHeight: 1,
        }}>
          {d.note}
        </div>
      ))}
    </div>
  );
}

// ── The Wedding ────────────────────────────────────────────────────────────────
function WeddingEffect() {
  const petals = Array.from({ length: 14 }).map((_, i) => ({
    left:  ((i * 17 + 7) % 90) + 5,
    size:  12 + (i % 5) * 4,
    delay: (i * 0.55) % 6,
    dur:   6 + (i % 4),
    dx:    ((i % 5) - 2) * 40,
    emoji: i % 3 === 0 ? '🌸' : i % 3 === 1 ? '🌺' : '✿',
  }));
  const stars = Array.from({ length: 12 }).map((_, i) => ({
    left: ((i * 31 + 11) % 90) + 5,
    top:  ((i * 19 + 7)  % 80) + 10,
    size: 3 + (i % 4),
    delay: i * 0.6,
    dur:   2 + (i % 3),
  }));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
      {petals.map((p, i) => (
        <div key={`p${i}`} style={{
          position:'absolute',
          left:`${p.left}%`, top:'-20px',
          fontSize:`${p.size}px`,
          ['--dx' as string]: `${p.dx}px`,
          opacity: 0,
          animation:`petalDrift ${p.dur}s ease-in ${p.delay}s infinite`,
        }}>
          {p.emoji}
        </div>
      ))}
      {stars.map((s, i) => (
        <div key={`s${i}`} style={{
          position:'absolute',
          left:`${s.left}%`, top:`${s.top}%`,
          width:`${s.size}px`, height:`${s.size}px`,
          borderRadius:'50%',
          background:'#E8C97A',
          animation:`starTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

function EventEffectLayer({ index, accent }: { index: number; accent: string }) {
  if (index === 1) return <HaldiEffect />;
  if (index === 3) return <SangeetEffect />;
  if (index === 4) return <WeddingEffect />;
  return null;
}

interface Props {
  event: Event;
  index: number;
  total: number;
}

export default function EventPage({ event: ev, index: i, total }: Props) {
  const accent = ACCENTS[i] ?? ev.color;
  const bg     = BG[i] ?? '#FDF6EC';

  // Visibility for image animations
  const [imgVisible, setImgVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setImgVisible(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Calendar badge
  const gcalDate  = ev.gcalStart.slice(0, 8);
  const dateObj   = new Date(+gcalDate.slice(0,4), +gcalDate.slice(4,6) - 1, +gcalDate.slice(6,8));
  const monthAbbr = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const dayNum    = gcalDate.slice(6, 8);


  // Top padding — reserve space for decorative top images per event
  const paddingTop =
    i === 0 ? 'clamp(5rem, 14vw, 11rem)'   // RingCeremony — push content below top flower image
    : i === 1 ? 'clamp(5rem, 14vw, 11rem)' // HaldiTopAndLeftRight corners
    : i === 2 ? 'clamp(6rem, 20vw, 14rem)' // Mahendi — MahendiTop center arch
    : i === 3 ? 'clamp(5rem, 14vw, 11rem)'  // SangeetTopLeft corner
    : i === 4 ? 'clamp(5rem, 14vw, 11rem)' // WeddingTopRightLeft corners
    : 'clamp(3rem, 7vw, 6rem)';

  // Shared animation style helper
  const imgStyle = (delay = 0, extra: React.CSSProperties = {}): React.CSSProperties => ({
    opacity: imgVisible ? 1 : 0,
    transform: imgVisible ? 'translateY(0)' : 'translateY(38px)',
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
    ...extra,
  });

  return (
    <section
      ref={sectionRef}
      id={i === 0 ? 'festivities' : `event-${i}`}
      style={{
        backgroundColor: bg,
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle dot texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, ${accent}18 1px, transparent 1px)`,
        backgroundSize: '36px 36px',
      }} />

      {/* Event-specific ambient effect */}
      <EventEffectLayer index={i} accent={accent} />

      {/* Ring Ceremony (0): top ticker image */}
      {i === 0 && (
        <img
          src="/images/RingCeremonyTop.png"
          alt="" aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: 'auto',
            pointerEvents: 'none', zIndex: 1, mixBlendMode: 'multiply',
            opacity: imgVisible ? 1 : 0,
            transform: imgVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.9s ease 0.05s, transform 0.9s ease 0.05s',
          }}
        />
      )}

      {/* Haldi (1): full-width top image */}
      {i === 1 && (
        <img
          src="/images/HaldiTop.png"
          alt="" aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: 'auto',
            pointerEvents: 'none', zIndex: 1, mixBlendMode: 'multiply',
            opacity: imgVisible ? 1 : 0,
            transform: imgVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.9s ease 0.05s, transform 0.9s ease 0.05s',
          }}
        />
      )}

      {/* Mahendi (2): same top arch as Ring Ceremony */}
      {i === 2 && (
        <img
          src="/images/MahendiTop.png"
          alt="" aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: 'auto',
            pointerEvents: 'none', zIndex: 1, mixBlendMode: 'multiply',
            opacity: imgVisible ? 1 : 0,
            transform: imgVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.9s ease 0.05s, transform 0.9s ease 0.05s',
          }}
        />
      )}

      {/* Sangeet (3): top-left corner image */}
      {i === 3 && (
        <img
          src="/images/SangeetTopLeft.png"
          alt="" aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0,
            width: 'clamp(70px, 18vw, 110px)', height: 'auto',
            pointerEvents: 'none', zIndex: 1, mixBlendMode: 'multiply',
            opacity: imgVisible ? 1 : 0,
            transform: imgVisible ? 'translateX(0)' : 'translateX(-24px)',
            transition: 'opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s',
          }}
        />
      )}

      {/* Wedding (4): full-width top image */}
      {i === 4 && (
        <img
          src="/images/WeddingTop.png"
          alt="" aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: 'auto',
            pointerEvents: 'none', zIndex: 1, mixBlendMode: 'multiply',
            opacity: imgVisible ? 1 : 0,
            transform: imgVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.9s ease 0.05s, transform 0.9s ease 0.05s',
          }}
        />
      )}

      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: `linear-gradient(to right, ${accent}, ${accent}60)`,
      }} />

      {/* Page counter */}
      <p className="font-heading" style={{
        position: 'absolute', top: '1.5rem', right: '1.75rem',
        fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
        color: accent, opacity: 0.6, zIndex: 2,
      }}>
        {NUMS[i]} / {String(total).padStart(2, '0')}
      </p>

      {/* ── Main content — flex:1 so it takes all space above the image ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: `${paddingTop} clamp(3rem,10vw,5rem) clamp(1.5rem,3vw,2.5rem)`,
        position: 'relative',
        zIndex: 2,
      }}>

        {/* Event name */}
        <h2 style={{
          fontFamily: '"Great Vibes", cursive',
          fontSize: 'clamp(2.5rem,8.5vw,4.5rem)',
          color: 'var(--color-deep)', lineHeight: 1.05,
          textAlign: 'center', padding: '0 0.5em', marginBottom: '0.4rem',
        }}>
          {ev.name}
        </h2>

        {/* Quote */}
        <p className="font-body" style={{
          fontStyle: 'italic', fontSize: 'clamp(12px,2.7vw,15px)',
          color: 'var(--color-deep)', opacity: 0.55,
          textAlign: 'center', maxWidth: '260px',
          marginBottom: 'clamp(1rem,3vw,1.5rem)',
        }}>
          "{ev.quote}"
        </p>

        {/* Gold divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          width: '100%', maxWidth: '260px', marginBottom: 'clamp(1rem,2.5vw,1.75rem)',
        }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${accent}60)` }} />
          <span style={{ color: accent, fontSize: '0.65rem', opacity: 0.7 }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${accent}60)` }} />
        </div>

        {/* Detail rows */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
          width: '100%', maxWidth: '260px', marginBottom: 'clamp(1rem,3vw,1.5rem)',
        }}>
          {/* Date & Time */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '52px', borderRadius: '9px', overflow: 'hidden', boxShadow: `0 2px 10px ${accent}35` }}>
              <div style={{ background: accent, textAlign: 'center', padding: '4px 0', fontSize: '9px', letterSpacing: '0.12em', color: '#fff', fontFamily: '"Cinzel", serif' }}>{monthAbbr}</div>
              <div style={{ background: `${accent}18`, textAlign: 'center', padding: '5px 0 6px', fontSize: '23px', fontWeight: 700, color: 'var(--color-deep)', fontFamily: '"Cinzel", serif', lineHeight: 1 }}>{dayNum}</div>
            </div>
            <div>
              <p className="font-heading" style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, marginBottom: '4px' }}>Date & Time</p>
              <p className="font-body" style={{ fontSize: 'clamp(14px,3.1vw,17px)', color: 'var(--color-deep)', fontWeight: 500, margin: 0 }}>{ev.dateLabel}</p>
              <p className="font-body" style={{ fontSize: 'clamp(12px,2.6vw,15px)', color: 'var(--color-deep)', opacity: 0.6, margin: 0 }}>{ev.timeLabel}</p>
            </div>
          </div>

          {/* Venue */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '52px', display: 'flex', justifyContent: 'center', paddingTop: '2px' }}>
              <a href={ev.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '26px', lineHeight: 1, textDecoration: 'none' }}>📍</a>
            </div>
            <div>
              <p className="font-heading" style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, marginBottom: '4px' }}>Venue</p>
              <p className="font-body" style={{ fontSize: 'clamp(14px,3.1vw,17px)', color: 'var(--color-deep)', fontWeight: 500, margin: 0 }}>{ev.venue}</p>
              <p className="font-body" style={{ fontSize: 'clamp(12px,2.6vw,15px)', color: 'var(--color-deep)', opacity: 0.5, margin: 0, lineHeight: 1.5 }}>{ev.address}</p>
            </div>
          </div>

          {/* Dress code */}
          {ev.dressCode && (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '52px', display: 'flex', justifyContent: 'center', paddingTop: '2px' }}>
              <span style={{ fontSize: '26px' }}>👗</span>
            </div>
            <div>
              <p className="font-heading" style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, marginBottom: '4px' }}>Dress Code</p>
              <p className="font-body" style={{ fontSize: 'clamp(14px,3.1vw,17px)', color: 'var(--color-deep)', margin: 0 }}>{ev.dressCode}</p>
            </div>
          </div>
          )}
        </div>


      </div>{/* end content */}

      {/* ── Bottom image: pushed to bottom with marginTop auto ── */}
      {BOTTOM_IMGS[i] && (
        <img
          src={BOTTOM_IMGS[i]}
          alt="" aria-hidden="true"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            flexShrink: 0,
            pointerEvents: 'none',
            mixBlendMode: 'multiply',
            opacity: imgVisible ? 1 : 0,
            transition: 'opacity 1s ease 0.15s',
          }}
        />
      )}

      {/* Bottom accent bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(to right, ${accent}30, ${accent}60, ${accent}30)`,
        zIndex: 2,
      }} />
    </section>
  );
}
