import { useState, useRef, useEffect } from 'react';
import { events } from '../data/events';

const NUMS    = ['01', '02', '03', '04'];
const ACCENT  = ['#C9A84C', '#D4A017', '#D4748C', '#8A9E7B'];
const CARD_BG = ['#FDF6EC', '#FAF3E8', '#FFF9F0', '#F5EEE8'];
const ILLUS   = ['💍', '🌼', '🎶', '🌸'];

export default function EventsSlider() {
  const [current, setCurrent]   = useState(0);
  const touchStartY             = useRef(0);
  const isThrottled             = useRef(false);
  const sliderRef               = useRef<HTMLDivElement>(null);
  const total                   = events.length;

  const goTo = (i: number) => setCurrent(Math.max(0, Math.min(total - 1, i)));

  const throttledGoTo = (i: number) => {
    if (isThrottled.current) return;
    goTo(i);
    isThrottled.current = true;
    setTimeout(() => { isThrottled.current = false; }, 700);
  };

  /* ── Wheel / trackpad vertical scroll ── */
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const down = e.deltaY > 20;
      const up   = e.deltaY < -20;
      // Only intercept when there's a next/prev slide — otherwise let page scroll
      if (down && current < total - 1) { e.preventDefault(); throttledGoTo(current + 1); }
      if (up   && current > 0)         { e.preventDefault(); throttledGoTo(current - 1); }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [current, total]);

  /* ── Touch swipe vertical ── */
  const onTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 48) diff > 0 ? throttledGoTo(current + 1) : throttledGoTo(current - 1);
  };

  const gold = 'var(--color-gold)';
  const deep = 'var(--color-deep)';

  return (
    <section id="festivities" style={{ background: 'var(--color-ivory-dark)', padding: 'clamp(2.5rem,6vw,4rem) 0 0' }}>

      {/* ── Section header ── */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem,3vw,2.5rem)', padding: '0 1rem' }}>
        <p className="font-heading" style={{ color: gold, fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
          Join us for
        </p>
        <h2 className="font-script" style={{ color: deep, fontSize: 'clamp(3rem,10vw,5rem)', lineHeight: 1.05 }}>
          The Festivities
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '0.6rem' }}>
          <div style={{ height: '1px', width: '70px', background: `linear-gradient(to right, transparent, ${gold})` }} />
          <span style={{ color: gold }}>✦</span>
          <div style={{ height: '1px', width: '70px', background: `linear-gradient(to left, transparent, ${gold})` }} />
        </div>
      </div>

      {/* ── Vertical slider window ── */}
      <div
        ref={sliderRef}
        style={{ height: '72svh', overflow: 'hidden', position: 'relative' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Track — moves vertically */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transform: `translateY(-${current * 100}%)`,
          transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}>
          {events.map((ev, i) => {
            const accent = ACCENT[i];
            return (
              <div
                key={i}
                style={{ height: '100%', flexShrink: 0, padding: '0.5rem clamp(1rem,5vw,4rem)', overflowY: 'auto' }}
              >
                {/* ── Card ── */}
                <div style={{
                  background: CARD_BG[i],
                  borderRadius: '22px',
                  maxWidth: '860px',
                  margin: '0 auto',
                  height: '100%',
                  boxShadow: `0 6px 32px rgba(0,0,0,0.07), 0 0 0 1.5px ${accent}22`,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Top accent bar */}
                  <div style={{ height: '4px', background: `linear-gradient(to right, ${accent}, ${accent}60)`, flexShrink: 0 }} />

                  {/* Card body */}
                  <div style={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: 'clamp(1rem,3vw,2rem)',
                    padding: 'clamp(1.25rem,3.5vw,2.5rem)',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}>
                    {/* ── Left: content ── */}
                    <div style={{ minWidth: 0 }}>
                      {/* Number + name */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span style={{
                          width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                          background: accent, color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: '"Cinzel", serif', fontSize: '12px', fontWeight: 600,
                        }}>
                          {NUMS[i]}
                        </span>
                        <h3 className="font-heading" style={{ color: accent, fontSize: 'clamp(1.1rem,3.5vw,1.8rem)', margin: 0 }}>
                          {ev.name}
                        </h3>
                      </div>

                      {/* Quote */}
                      <p className="font-body" style={{ fontStyle: 'italic', fontSize: 'clamp(11px,2.2vw,14px)', color: deep, opacity: 0.6, marginBottom: '1rem' }}>
                        "{ev.quote}"
                      </p>

                      {/* Detail rows */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.25rem' }}>
                        {/* Date */}
                        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>📅</span>
                          <div>
                            <p className="font-heading" style={{ fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: deep, opacity: 0.4, marginBottom: '1px' }}>Date & Time</p>
                            <p className="font-body" style={{ fontSize: 'clamp(11px,2.2vw,13px)', color: deep, fontWeight: 500, margin: 0 }}>{ev.dateLabel}</p>
                            <p className="font-body" style={{ fontSize: 'clamp(10px,2vw,12px)', color: deep, opacity: 0.65, margin: 0 }}>{ev.timeLabel}</p>
                          </div>
                        </div>

                        {/* Venue */}
                        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>📍</span>
                          <div>
                            <p className="font-heading" style={{ fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: deep, opacity: 0.4, marginBottom: '1px' }}>Venue</p>
                            <p className="font-body" style={{ fontSize: 'clamp(11px,2.2vw,13px)', color: deep, fontWeight: 500, margin: 0 }}>{ev.venue}</p>
                            <p className="font-body" style={{ fontSize: 'clamp(10px,1.8vw,11px)', color: deep, opacity: 0.5, margin: 0, lineHeight: 1.4 }}>{ev.address}</p>
                          </div>
                        </div>

                        {/* Dress code */}
                        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>👗</span>
                          <div>
                            <p className="font-heading" style={{ fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: deep, opacity: 0.4, marginBottom: '1px' }}>Dress Code</p>
                            <p className="font-body" style={{ fontSize: 'clamp(11px,2.2vw,13px)', color: deep, margin: 0 }}>{ev.dressCode}</p>
                          </div>
                        </div>
                      </div>

                      {/* CTA buttons */}
                      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <a
                          href={ev.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '7px 15px', borderRadius: '999px',
                            border: `1.5px solid ${accent}`, color: accent,
                            fontFamily: '"Cinzel", serif', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase',
                            textDecoration: 'none',
                          }}
                        >
                          📍 View Location
                        </a>
                        <a
                          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ev.name + ' — Ekta & Ajay')}&dates=${ev.gcalStart}/${ev.gcalEnd}&details=${encodeURIComponent(ev.quote)}&location=${encodeURIComponent(ev.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '7px 15px', borderRadius: '999px',
                            background: accent, color: '#fff',
                            fontFamily: '"Cinzel", serif', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase',
                            textDecoration: 'none',
                          }}
                        >
                          📅 Add to Calendar
                        </a>
                      </div>
                    </div>

                    {/* ── Right: illustration ── */}
                    <div style={{
                      width: 'clamp(80px,16vw,150px)',
                      height: 'clamp(80px,16vw,150px)',
                      borderRadius: '50%',
                      background: `${accent}10`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 'clamp(2.2rem,6vw,4.5rem)',
                      flexShrink: 0,
                      position: 'relative',
                    }}>
                      <span role="img" aria-hidden="true">{ILLUS[i]}</span>
                      <div style={{ position: 'absolute', inset: '-7px', borderRadius: '50%', border: `1.5px dashed ${accent}30`, pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', inset: '-14px', borderRadius: '50%', border: `1px dashed ${accent}15`, pointerEvents: 'none' }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Vertical dot indicators (right side) ── */}
        <div style={{
          position: 'absolute', right: 'clamp(0.4rem,1.5vw,1rem)', top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          zIndex: 10,
        }}>
          {events.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Event ${i + 1}`}
              style={{
                width: '8px',
                height: i === current ? '28px' : '8px',
                borderRadius: '4px', padding: 0,
                background: i === current ? ACCENT[current] : `${ACCENT[current]}35`,
                border: 'none', cursor: 'pointer',
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </div>

        {/* ── Up / Down arrow buttons ── */}
        {current > 0 && (
          <button
            onClick={() => goTo(current - 1)}
            aria-label="Previous event"
            style={{
              position: 'absolute', top: '0.75rem', left: '50%', transform: 'translateX(-50%)',
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)', border: `1px solid ${ACCENT[current]}40`,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '18px', color: ACCENT[current], zIndex: 10,
            }}
          >↑</button>
        )}
        {current < total - 1 && (
          <button
            onClick={() => goTo(current + 1)}
            aria-label="Next event"
            style={{
              position: 'absolute', bottom: '0.75rem', left: '50%', transform: 'translateX(-50%)',
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)', border: `1px solid ${ACCENT[current]}40`,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '18px', color: ACCENT[current], zIndex: 10,
            }}
          >↓</button>
        )}
      </div>

      {/* ── Swipe hint ── */}
      <p className="font-heading" style={{
        textAlign: 'center',
        padding: '0.75rem 1rem',
        fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
        color: gold, opacity: 0.5,
      }}>
        {current < total - 1 ? '↕ Swipe up to see next event' : '✦ All events listed above'}
      </p>
    </section>
  );
}
