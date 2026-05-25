import Image from 'next/image';

/**
 * A calm desktop browser-window frame that holds a real BSVibe app screenshot.
 * Per the founder: marketing never re-mocks the product UI — it embeds the
 * genuine app screens. The frame chrome is token-driven so it works in
 * light and dark.
 */
export default function BrowserFrame({
  src,
  alt,
  caption,
  width = 1024,
  height = 720,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          borderRadius: 12,
          border: '1px solid var(--border)',
          backgroundColor: 'var(--surface)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-pop)',
        }}
      >
        {/* Title bar with traffic-light dots */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '10px 14px',
            borderBottom: '1px solid var(--border)',
            backgroundColor: 'var(--surface-2)',
          }}
        >
          <span style={dot} />
          <span style={dot} />
          <span style={dot} />
        </div>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 1024px"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
      {caption && (
        <figcaption
          style={{
            marginTop: 12,
            textAlign: 'center',
            fontSize: '0.8125rem',
            color: 'var(--text-faint)',
            letterSpacing: '-0.01em',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const dot: React.CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: 'var(--border-strong)',
  display: 'inline-block',
};
