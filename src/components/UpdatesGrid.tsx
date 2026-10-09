import { posts } from '../data/posts';

export default function UpdatesGrid() {
  const gold = 'var(--color-gold)';
  const deep = 'var(--color-deep)';

  return (
    <section id="updates" className="py-24 px-4" style={{ background: 'var(--color-ivory)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-heading text-xs tracking-[0.3em] uppercase mb-3" style={{ color: gold }}>Live Updates</p>
          <h2 className="font-script mb-4" style={{ color: deep, fontSize: 'clamp(3rem,11vw,5.5rem)' }}>Updates from Us</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to right, transparent, ${gold})` }} />
            <span className="text-xl">✦</span>
            <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to left, transparent, ${gold})` }} />
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: `1px dashed ${gold}44` }}>
            <div className="text-5xl mb-4">📸</div>
            <p className="font-heading text-sm tracking-widest uppercase mb-2" style={{ color: gold }}>Coming Soon</p>
            <p className="font-body text-sm opacity-60" style={{ color: deep }}>
              Photos and videos from our celebrations will appear here.
            </p>
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}
          >
            {posts.map((post, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden shadow-md group relative"
                style={{ background: 'var(--color-ivory)' }}
              >
                {post.type === 'image' ? (
                  <img
                    src={post.src}
                    alt={post.caption}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={post.src}
                    className="w-full h-64 object-cover"
                    muted
                    loop
                    playsInline
                    onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
                    onMouseLeave={e => (e.currentTarget as HTMLVideoElement).pause()}
                  />
                )}
                <div className="px-4 py-3">
                  <p className="font-body text-sm" style={{ color: deep }}>{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
