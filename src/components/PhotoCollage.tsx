import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function PhotoCollage() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/photos')
      .then(r => r.json())
      .then((urls: string[]) => {
        setPhotos(urls);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && photos.length && gridRef.current) {
      gsap.fromTo(
        gridRef.current.querySelectorAll('img'),
        { opacity: 0, scale: 0.92, y: 20 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, [loading, photos]);

  return (
    <section
      style={{
        minHeight: '100svh',
        height: '100svh',
        background: 'var(--color-ivory)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          paddingTop: 'clamp(2rem, 5vh, 3.5rem)',
          paddingBottom: 'clamp(1rem, 2.5vh, 2rem)',
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
            letterSpacing: '0.25em',
            color: 'var(--color-gold)',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}
        >
          US. SO FAR
        </p>
        <h2
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            color: 'var(--color-deep)',
            fontWeight: 400,
            lineHeight: 1.2,
          }}
        >
          our little album
        </h2>
        <div
          style={{
            width: '40px',
            height: '2px',
            background: 'var(--color-gold)',
            margin: '0.8rem auto 0',
            opacity: 0.6,
          }}
        />
      </div>

      {/* Grid */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'clamp(0.5rem, 2vw, 1.2rem) clamp(1rem, 4vw, 3rem)',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--color-gold-light) transparent',
        }}
      >
        {loading ? (
          <div
            style={{
              columns: '3 160px',
              gap: '10px',
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '100%',
                  height: `${140 + (i % 3) * 60}px`,
                  borderRadius: '12px',
                  background: 'var(--color-ivory-dark)',
                  marginBottom: '10px',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'var(--color-gold)',
              fontFamily: 'Karla, sans-serif',
              fontSize: '1rem',
              opacity: 0.7,
            }}
          >
            No photos yet.
          </div>
        ) : (
          <div
            ref={gridRef}
            style={{
              columns: '3 160px',
              gap: '10px',
            }}
          >
            {photos.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Memory ${i + 1}`}
                onClick={() => setLightbox(url)}
                className="collage-photo"
                style={{
                  width: '100%',
                  display: 'block',
                  borderRadius: '12px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  objectFit: 'cover',
                  opacity: 0,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(44,26,14,0.88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'zoom-out',
          }}
        >
          <img
            src={lightbox}
            alt="Full view"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: '16px',
              objectFit: 'contain',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            }}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @media (hover: hover) {
          .collage-photo:hover {
            transform: scale(1.02);
            box-shadow: 0 8px 24px rgba(44,26,14,0.15);
          }
        }
        .collage-photo:active {
          transform: scale(0.97);
          box-shadow: 0 2px 8px rgba(44,26,14,0.1);
        }
      `}</style>
    </section>
  );
}
