import { useState, useEffect } from 'react';

const GALLERY = [

  '/images/2.jpg',
  '/images/1.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
];

const WEDDING = new Date('2026-11-20T14:30:00Z');

function pad(n: number) { return String(n).padStart(2, '0'); }

function getTimeLeft() {
  const diff = Math.max(0, WEDDING.getTime() - Date.now());
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  };
}

function CountUnit({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{
        background: 'rgba(255,255,255,0.7)',
        border: '1px solid rgba(201,168,76,0.35)',
        borderRadius: '12px',
        width: 'clamp(58px,16vw,90px)',
        height: 'clamp(64px,18vw,96px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}>
        <span className="font-heading" style={{
          color: 'var(--color-deep)',
          fontSize: 'clamp(1.4rem,5.5vw,2.6rem)',
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}>{value}</span>
      </div>
      <span className="font-heading" style={{
        color: 'var(--color-gold)',
        fontSize: 'clamp(10px,2.2vw,12px)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
      }}>{label}</span>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime]   = useState(getTimeLeft());
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % GALLERY.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" style={{
      background: 'var(--color-ivory)',
      minHeight: '100svh',
      paddingTop: 'max(4.5rem, calc(56px + 1.5rem))',
      paddingBottom: 'clamp(2rem,5vw,3rem)',
      paddingLeft: 'clamp(0.75rem,4vw,1.5rem)',
      paddingRight: 'clamp(0.75rem,4vw,1.5rem)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(1rem,3vw,2rem)',
    }}>

      {/* Sliding photo gallery */}
      <div style={{
        position: 'relative',
        width: 'min(88vw, 480px)',
        aspectRatio: '4/3',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        border: '1px solid rgba(201,168,76,0.2)',
      }}>
        {GALLERY.map((src, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              transform: `translateX(${(i - slide) * 100}%)`,
              transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform',
            }}
          >
            <img
              src={src}
              alt="Ekta and Ajay"
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
            />
          </div>
        ))}
        {/* Subtle gold overlay at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
          background: 'linear-gradient(to top, rgba(44,26,14,0.3), transparent)',
          pointerEvents: 'none', zIndex: 10,
        }} />
        {/* Dot indicators */}
        <div style={{
          position: 'absolute', bottom: '0.6rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '5px', zIndex: 11,
        }}>
          {GALLERY.map((_, i) => (
            <div key={i} style={{
              width: i === slide ? '18px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === slide ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.35s ease',
            }} />
          ))}
        </div>
      </div>

      {/* "Counting Down to Forever" */}
      <div style={{ textAlign: 'center' }}>
        <h2 className="font-script" style={{
          color: 'var(--color-gold)',
          fontSize: 'clamp(1.8rem,6vw,2.8rem)',
          lineHeight: 1.1,
        }}>
          Counting Down to Forever
        </h2>
        {/* Heart divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.75rem' }}>
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5))' }} />
          <span style={{ color: 'var(--color-gold)', fontSize: '0.85rem', opacity: 0.8 }}>♥</span>
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.5))' }} />
        </div>
      </div>

      {/* Countdown units */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'clamp(0.35rem,1.5vw,1.25rem)',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '480px',
      }}>
        <CountUnit value={String(time.days)}  label="Days"    />
        <span style={{ color: 'var(--color-gold)', fontSize: 'clamp(1.4rem,5vw,2rem)', lineHeight: 1, marginTop: '1.1rem', opacity: 0.7 }}>:</span>
        <CountUnit value={pad(time.hours)}    label="Hours"   />
        <span style={{ color: 'var(--color-gold)', fontSize: 'clamp(1.4rem,5vw,2rem)', lineHeight: 1, marginTop: '1.1rem', opacity: 0.7 }}>:</span>
        <CountUnit value={pad(time.minutes)}  label="Minutes" />
        <span style={{ color: 'var(--color-gold)', fontSize: 'clamp(1.4rem,5vw,2rem)', lineHeight: 1, marginTop: '1.1rem', opacity: 0.7 }}>:</span>
        <CountUnit value={pad(time.seconds)}  label="Seconds" />
      </div>

      {/* Sub-label */}
      <p className="font-heading" style={{
        color: 'rgba(44,26,14,0.75)',
        fontSize: 'clamp(11px,2.8vw,14px)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: '0 1rem',
      }}>
        20 November 2026 · 8:00 PM · Mukund Gardens, Ajmer
      </p>
    </section>
  );
}
