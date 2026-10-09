import { useState } from 'react';

const WHATSAPP = '919116736541';

export default function RSVP() {
  const [name,      setName]      = useState('');
  const [attending, setAttending] = useState('');
  const [message,   setMessage]   = useState('');
  const [sent,      setSent]      = useState(false);

  const send = () => {
    const text = [
      `Hello! RSVP for Ekta & Ajay's Wedding 💍`,
      ``,
      `Name: ${name}`,
      `Attending: ${attending || 'Not specified'}`,
      message ? `Message: ${message}` : '',
      ``,
      `#EktaAndAjayBecomeEkay`,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(201,168,76,0.35)',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    color: 'var(--color-deep)',
    fontFamily: '"Karla", sans-serif',
    fontSize: '14px',
    outline: 'none',
  };

  const labelStyle = {
    fontFamily: '"Cinzel", serif',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-deep)',
    fontWeight: 600,
    marginBottom: '0.4rem',
    display: 'block',
  };

  const gold = 'var(--color-gold)';

  if (sent) return (
    <section id="rsvp" style={{
      backgroundColor: 'var(--color-cream)',
      backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.15) 1px, transparent 1px), radial-gradient(circle, rgba(44,26,14,0.04) 1px, transparent 1px)`,
      backgroundSize: '80px 80px, 40px 40px',
      backgroundPosition: '0 0, 20px 20px',
      padding: 'clamp(3rem,8vw,5rem) 1rem', textAlign: 'center',
    }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h2 className="font-script" style={{ color: gold, fontSize: 'clamp(2.4rem,9vw,3.8rem)', marginBottom: '0.75rem' }}>
          Thank you, {name}!
        </h2>
        <p className="font-body" style={{ color: 'var(--color-deep)', opacity: 0.65, fontSize: '15px', lineHeight: 1.7 }}>
          {attending === 'yes'
            ? "We can't wait to celebrate with you! Your response has been sent via WhatsApp."
            : "We'll miss you! Thank you for letting us know."}
        </p>
        <button
          onClick={() => { setSent(false); setName(''); setAttending(''); setMessage(''); }}
          style={{
            marginTop: '2rem', padding: '0.6rem 1.5rem', borderRadius: '999px',
            border: `1.5px solid ${gold}`, background: 'transparent', color: gold,
            fontFamily: '"Cinzel", serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >Edit Response</button>
      </div>
    </section>
  );

  return (
    <section id="rsvp" style={{
      backgroundColor: 'var(--color-cream)',
      backgroundImage: `
        radial-gradient(circle, rgba(201,168,76,0.15) 1px, transparent 1px),
        radial-gradient(circle, rgba(44,26,14,0.04) 1px, transparent 1px)`,
      backgroundSize: '80px 80px, 40px 40px',
      backgroundPosition: '0 0, 20px 20px',
      padding: 'clamp(3rem,8vw,5rem) clamp(1rem,5vw,2rem)',
    }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,5vw,3rem)' }}>
          <p className="font-heading" style={{ color: gold, fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            Kindly Reply
          </p>
          <h2 className="font-script" style={{ color: 'var(--color-deep)', fontSize: 'clamp(3rem,11vw,5rem)' }}>
            RSVP
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
            <div style={{ height: '1px', width: '60px', background: `linear-gradient(to right, transparent, ${gold})` }} />
            <span style={{ color: gold, opacity: 0.7 }}>♥</span>
            <div style={{ height: '1px', width: '60px', background: `linear-gradient(to left, transparent, ${gold})` }} />
          </div>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Name */}
          <div>
            <label style={labelStyle}>Your Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Attending */}
          <div>
            <label style={labelStyle}>
              <span style={{ marginRight: '0.35rem' }}>👤</span> Will you be attending?
            </label>
            <select
              value={attending}
              onChange={e => setAttending(e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              <option value="" style={{ background: 'var(--color-ivory-dark)' }}>Select…</option>
              <option value="yes"   style={{ background: 'var(--color-ivory-dark)' }}>🎉 Yes, I'll be there!</option>
              <option value="no"    style={{ background: 'var(--color-ivory-dark)' }}>😔 Unfortunately no</option>
              <option value="maybe" style={{ background: 'var(--color-ivory-dark)' }}>🤔 Maybe</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label style={labelStyle}>Your Message</label>
            <textarea
              placeholder="Write your wishes…"
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            />
          </div>

          {/* Submit */}
          <button
            disabled={!name.trim() || !attending}
            onClick={send}
            style={{
              width: '100%',
              padding: '0.9rem 1rem',
              borderRadius: '8px',
              background: 'var(--color-deep)',
              color: 'var(--color-ivory)',
              fontFamily: '"Cinzel", serif',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              opacity: (!name.trim() || !attending) ? 0.4 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            Send Message
          </button>

          <p className="font-body" style={{ textAlign: 'center', fontSize: '11px', color: 'var(--color-deep)', opacity: 0.35, marginTop: '-0.5rem' }}>
            Sends via WhatsApp to Ekta & Ajay
          </p>
        </div>
      </div>
    </section>
  );
}
