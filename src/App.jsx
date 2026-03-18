import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#1a1a2e",
  text: "#f4f0ff",
  sub: "#9490b0",
  pink: "#FF5BA3",
  blue: "#5B8DEF",
  green: "#3DD68C",
  yellow: "#FFD84D",
  orange: "#FF8A4C",
  purple: "#A478F2",
  cyan: "#4DE4E4",
};

/* ── MOSAIC CARDS ────────────────────────────── */
/* Replace the video paths below with your actual video files */
/* e.g. "/videos/neon-pulse.mp4" or "https://your-cdn.com/videos/neon-pulse.mp4" */
const MOSAIC = [
  { title: "Neon Pulse", client: "Spotify", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/994ca8d9ec4448fc5ff252c0dd150c90/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2F994ca8d9ec4448fc5ff252c0dd150c90%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#2d1b4e" },
  { title: "Fluid State", client: "Nike", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/af333d7c4932d79de3c01b2d0e195c3c/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2Faf333d7c4932d79de3c01b2d0e195c3c%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#1b3a5c" },
  { title: "Chromatic", client: "Adobe", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/08c9e764e6817d650d5020ec2243ad50/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2F08c9e764e6817d650d5020ec2243ad50%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#5c3a1b" },
  { title: "Data Bloom", client: "Tesla", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/9d4db0290887548bc14016ffec181468/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2F9d4db0290887548bc14016ffec181468%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#1b4e3a" },
  { title: "Synth Wave", client: "Apple", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/6b9fa15d8d322c2cb8f4fd5536f280c9/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2F6b9fa15d8d322c2cb8f4fd5536f280c9%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#3a1b5c" },
  { title: "Geo Grid", client: "Airbnb", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/3c730d510148e3d42460ab529879f3fe/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2F3c730d510148e3d42460ab529879f3fe%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#5c1b2d" },
  { title: "Holo Type", client: "Google", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/abed34ed592e28c0c2684450823c7d39/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2Fabed34ed592e28c0c2684450823c7d39%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#1b4e5c" },
  { title: "Prism", client: "Meta", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/512071acc96ef9ebc1c36933c13b1781/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2F512071acc96ef9ebc1c36933c13b1781%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#2d1b5c" },
  { title: "Kinetic", client: "Netflix", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/0bb6b0e87f76df5fcd0d74d9b455f895/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2F0bb6b0e87f76df5fcd0d74d9b455f895%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#5c1b1b" },
  { title: "Morph", client: "Discord", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/457a71481fe069c6a720a71f43da28c1/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2F457a71481fe069c6a720a71f43da28c1%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#2d4e1b" },
  { title: "Ripple", client: "Figma", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/705a78f6949cf950090fa99e50dabeb3/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2F705a78f6949cf950090fa99e50dabeb3%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#1b3050" },
  { title: "Echo", client: "Snap", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/a2e48eaeed0e816c79fcd8daf2d61de4/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2Fa2e48eaeed0e816c79fcd8daf2d61de4%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#5c2d1b" },
  { title: "Bloom", client: "Pinterest", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/d1033977533b3a720b4791238f5119f5/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2Fd1033977533b3a720b4791238f5119f5%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#4e1b5c" },
  { title: "Nova", client: "Shopify", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/f38abc9f7c3d9aeecbc7d1b8ff30782d/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2Ff38abc9f7c3d9aeecbc7d1b8ff30782d%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#3a5c1b" },
  { title: "Drift", client: "Slack", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/0350a55f5fbf204911aa7d76dae836b7/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2F0350a55f5fbf204911aa7d76dae836b7%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#1b2050" },
  { title: "Spark", client: "TikTok", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/d6a4d633b7c678fd2bebb292713f914c/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2Fd6a4d633b7c678fd2bebb292713f914c%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#5c1b4e" },
  { title: "Pulse", client: "X", video: "https://customer-2qq5swrnyq0tcvng.cloudflarestream.com/43cfa0ad37b69fc04856a675333da02b/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-2qq5swrnyq0tcvng.cloudflarestream.com%2F43cfa0ad37b69fc04856a675333da02b%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600", bg: "#1a1a3a" },
];

const NUM_COLS = 4;
const COLUMNS = Array.from({ length: NUM_COLS }, (_, ci) => {
  const cards = MOSAIC.filter((_, i) => i % NUM_COLS === ci);
  return [...cards, ...cards, ...cards, ...cards];
});

/* ── OTHER DATA ──────────────────────────────── */
const TEAM = [
  { name: "Alex Rivera", role: "Creative Director", color: C.pink },
  { name: "Jordan Kim", role: "Motion Designer", color: C.blue },
  { name: "Sam Okafor", role: "Video Editor", color: C.green },
  { name: "Maya Chen", role: "Graphic Designer", color: C.yellow },
];

const STORE_ITEMS = [
  { id: 1, name: "Motion Template Pack", price: 49, color: C.pink, tag: "BEST SELLER" },
  { id: 2, name: "LUT Collection Vol.1", price: 29, color: C.blue, tag: "NEW" },
  { id: 3, name: "Brand Kit Starter", price: 79, color: C.green, tag: "POPULAR" },
  { id: 4, name: "Texture Pack 500+", price: 35, color: C.yellow, tag: "" },
  { id: 5, name: "Sound FX Bundle", price: 39, color: C.purple, tag: "NEW" },
  { id: 6, name: "Social Media Kit", price: 59, color: C.orange, tag: "" },
];

const CLIENTS = ["Insomniac", "EDC", "Beyond Wonderland", "Tomorrowland", "Kaskade", "Day Trip", "Nocturnal Wonderland", "Rolling Loud", "Okeechobee"];

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

/* ── NAV ─────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
      zIndex: 100, display: "flex", alignItems: "center", gap: 4,
      padding: "6px 6px 6px 12px", maxWidth: "calc(100vw - 24px)",
      background: scrolled ? "rgba(26,26,46,0.85)" : "rgba(26,26,46,0.4)",
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      borderRadius: 60, border: "1px solid rgba(255,255,255,0.08)",
      transition: "all 0.4s",
    }}>
      <span style={{
        fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: 20,
        marginRight: 4, letterSpacing: "-0.5px",
      }}>
        <span style={{
          background: `linear-gradient(90deg, ${C.pink}, ${C.yellow}, ${C.cyan}, ${C.green}, ${C.purple}, ${C.pink})`,
          backgroundSize: "300% 100%",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "gradientShift 4s ease-in-out infinite",
        }}>Lifebeats</span>
      </span>
      {[
        { label: "Work", href: "#work", bg: "#5B9CF2", color: "#fff" },
        { label: "About", href: "#about", bg: "#FF6B9D", color: "#fff" },
      ].map(l => (
        <a key={l.label} href={l.href} style={{
          padding: "6px 12px", borderRadius: 30, fontSize: 14,
          fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
          background: l.bg, color: l.color,
          textDecoration: "none", transition: "all 0.3s", whiteSpace: "nowrap",
        }}
        onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
        onMouseLeave={e => e.target.style.transform = "scale(1)"}
        >{l.label}</a>
      ))}
      <a href="#contact" style={{
        padding: "6px 16px", borderRadius: 30, background: "#A478F2", color: "#fff",
        fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
        textDecoration: "none", transition: "transform 0.3s", whiteSpace: "nowrap",
      }}
      onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
      onMouseLeave={e => e.target.style.transform = "scale(1)"}
      >Let's Talk</a>
    </nav>
  );
}

/* ── MOSAIC CARD ─────────────────────────────── */
function MosaicCard({ card }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [posterVisible, setPosterVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { rootMargin: "800px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isCloudflare = card.video && card.video.includes("cloudflarestream.com");
  const posterUrl = isCloudflare ? (() => {
    try { return new URL(card.video).searchParams.get("poster"); } catch { return null; }
  })() : null;

  return (
    <div ref={ref} style={{
      width: "100%", aspectRatio: "4/5", borderRadius: 14,
      background: card.bg, position: "relative", overflow: "hidden",
      flexShrink: 0,
    }}>
      {isCloudflare && active && (
        <iframe
          src={card.video}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          onLoad={() => setTimeout(() => setPosterVisible(false), 800)}
          style={{
            position: "absolute", inset: -2,
            width: "calc(100% + 4px)", height: "calc(100% + 4px)",
            border: "none", pointerEvents: "none",
          }}
        />
      )}
      {posterUrl && (
        <img src={posterUrl} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", pointerEvents: "none",
          opacity: posterVisible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }} />
      )}
    </div>
  );
}

/* ── HERO — FULL SCREEN MOSAIC + OVERLAY ─────── */
function HeroMosaic() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);

  const colRefs = useRef([]);
  useEffect(() => {
    const offsets = COLUMNS.map(() => 0);
    const speeds = COLUMNS.map((_, i) => 1 / ((22 + i * 3) * 60));
    const initialized = COLUMNS.map(() => false);
    let raf;
    const animate = () => {
      colRefs.current.forEach((el, i) => {
        if (!el) return;
        const copyHeight = el.scrollHeight / 4;
        if (!initialized[i]) {
          if (i % 2 === 1) offsets[i] = -copyHeight;
          initialized[i] = true;
        }
        const goingDown = i % 2 === 1;
        if (goingDown) {
          offsets[i] += speeds[i] * copyHeight;
          if (offsets[i] >= 0) offsets[i] -= copyHeight;
        } else {
          offsets[i] -= speeds[i] * copyHeight;
          if (offsets[i] <= -copyHeight) offsets[i] += copyHeight;
        }
        el.style.transform = `translate3d(0, ${offsets[i]}px, 0)`;
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="work" style={{
      position: "relative", width: "100%", height: "100dvh",
      overflow: "hidden", background: C.bg,
      margin: 0, padding: 0,
    }}>
      {/* Mosaic grid behind everything */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${NUM_COLS}, 1fr)`,
        gap: 3,
        margin: 0, padding: 0,
      }}>
        {COLUMNS.map((col, ci) => (
          <div key={ci} ref={el => colRefs.current[ci] = el} style={{
            display: "flex", flexDirection: "column", gap: 3,
            willChange: "transform",
          }}>
            {col.map((card, i) => (
              <MosaicCard key={`${ci}-${i}`} card={card} />
            ))}
          </div>
        ))}
      </div>

      {/* Dark gradient overlay — center focus */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: `
          radial-gradient(ellipse 70% 55% at 50% 50%, rgba(26,26,46,0.78) 0%, rgba(26,26,46,0.45) 60%, rgba(26,26,46,0.82) 100%),
          linear-gradient(to bottom, rgba(26,26,46,0.5) 0%, rgba(26,26,46,0.25) 30%, rgba(26,26,46,0.25) 70%, rgba(26,26,46,0.88) 100%)
        `,
        pointerEvents: "none",
      }} />

      {/* Content overlay */}
      <div style={{
        position: "relative", zIndex: 2,
        height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "0 24px",
      }}>
        {/* Logo / badge */}
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease 0.2s",
          marginBottom: 28,
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "10px 24px", borderRadius: 40,
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontFamily: "'Baloo 2', cursive", fontSize: 18, fontWeight: 800,
            letterSpacing: "-1px",
          }}>
            <span style={{
              background: `linear-gradient(90deg, ${C.pink}, ${C.yellow}, ${C.cyan}, ${C.green}, ${C.purple}, ${C.pink})`,
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "gradientShift 4s ease-in-out infinite",
            }}>LIFEBEATS</span>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Baloo 2', cursive",
          fontSize: "clamp(40px, 6.5vw, 88px)",
          fontWeight: 800, lineHeight: 1.05, color: "#fff",
          margin: "0 0 12px", letterSpacing: "-2px",
          maxWidth: 800,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease 0.35s",
          textShadow: "0 4px 40px rgba(0,0,0,0.4)",
        }}>
          We make pixels<br />
          do <span style={{
            background: `linear-gradient(90deg, ${C.pink}, ${C.yellow}, ${C.cyan}, ${C.green}, ${C.purple}, ${C.pink})`,
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "gradientShift 4s ease-in-out infinite",
            filter: "brightness(1.3)",
          }}>impossible</span> things.
        </h1>

        {/* Buttons */}
        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          marginTop: 20,
          opacity: loaded ? 1 : 0, transition: "all 0.8s ease 0.5s",
        }}>
          <a href="#about" style={{
            padding: "16px 40px", borderRadius: 50,
            background: "#fff", color: C.bg,
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16,
            textDecoration: "none", transition: "all 0.3s",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            pointerEvents: "auto",
          }}
          onMouseEnter={e => e.target.style.transform = "scale(1.06) translateY(-2px)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
          >View Our Work</a>
          <a href="#contact" style={{
            padding: "16px 40px", borderRadius: 50,
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#fff",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16,
            textDecoration: "none", transition: "all 0.3s",
            pointerEvents: "auto",
          }}
          onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.18)"; e.target.style.transform = "scale(1.04)"; }}
          onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.transform = "scale(1)"; }}
          >Create With Us</a>
        </div>
      </div>
    </section>
  );
}

/* ── MARQUEE ─────────────────────────────────── */
function MarqueeSection() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <div style={{ overflow: "hidden", padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{
        display: "flex", gap: 14, whiteSpace: "nowrap",
        animation: "marquee 30s linear infinite", width: "max-content",
      }}>
        {row.map((c, i) => (
          <div key={i} style={{
            padding: "10px 26px", borderRadius: 40,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
            color: C.sub, flexShrink: 0,
          }}>{c}</div>
        ))}
      </div>
    </div>
  );
}

/* ── ABOUT ───────────────────────────────────── */
function About() {
  return (
    <section id="about" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <Reveal>
        <div style={{
          borderRadius: 32, padding: "60px 48px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center",
        }}>
          <div>
            <div style={{
              display: "inline-block", padding: "6px 16px", borderRadius: 30,
              background: `${C.green}18`, border: `1px solid ${C.green}28`,
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700,
              color: C.green, letterSpacing: "1px", marginBottom: 20,
            }}>ABOUT US</div>
            <h2 style={{
              fontFamily: "'Baloo 2', cursive", fontSize: "clamp(28px,3vw,44px)",
              fontWeight: 800, color: C.text, margin: "0 0 16px", lineHeight: 1.1,
            }}>Obsessed with motion,<br />color & storytelling.</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.sub, lineHeight: 1.7, margin: "0 0 12px" }}>
              Lifebeats is a design agency that partners with brands who want to stand out — not blend in. We bring stories to life through motion.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.sub, lineHeight: 1.7, margin: "0 0 28px" }}>
              From concept to final render, we handle motion graphics, cinematic video, and visual identity with meticulous craft.
            </p>
            <div style={{ display: "flex", gap: 32 }}>
              {[["50+", "Projects", C.pink], ["12", "Awards", C.blue], ["8yr", "Experience", C.green]].map(([n, l, c]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 32, fontWeight: 800, color: c, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.sub, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {TEAM.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div style={{
                  borderRadius: 22, padding: 24,
                  background: `${t.color}0A`, border: `1.5px solid ${t.color}1A`,
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", cursor: "default",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"; e.currentTarget.style.borderColor = t.color + "40"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.borderColor = t.color + "1A"; }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 14,
                    background: `${t.color}20`, display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Baloo 2', cursive", fontSize: 20, fontWeight: 800,
                    color: t.color, marginBottom: 14,
                  }}>{t.name[0]}</div>
                  <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 2 }}>{t.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.sub }}>{t.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── STORE ────────────────────────────────────── */
function Store() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="store" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            display: "inline-block", padding: "6px 16px", borderRadius: 30,
            background: `${C.yellow}18`, border: `1px solid ${C.yellow}28`,
            fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700,
            color: C.yellow, letterSpacing: "1px", marginBottom: 16,
          }}>SHOP</div>
          <h2 style={{
            fontFamily: "'Baloo 2', cursive", fontSize: "clamp(36px,5vw,60px)",
            fontWeight: 800, color: C.text, margin: "0 0 8px",
          }}>Creative Resources</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.sub, maxWidth: 440, margin: "0 auto" }}>
            Premium templates, presets, and asset packs crafted by our team.
          </p>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {STORE_ITEMS.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.06}>
            <div
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRadius: 24, padding: 28, position: "relative", overflow: "hidden",
                background: "rgba(255,255,255,0.04)",
                border: `1.5px solid ${hovered === item.id ? item.color + "40" : "rgba(255,255,255,0.06)"}`,
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                transform: hovered === item.id ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hovered === item.id ? `0 16px 40px ${item.color}14` : "none",
                cursor: "pointer",
              }}>
              <div style={{
                position: "absolute", top: -20, right: -20,
                width: 120, height: 120, borderRadius: "50%", background: `${item.color}0A`,
                transition: "transform 0.5s", transform: hovered === item.id ? "scale(1.4)" : "scale(1)",
              }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                {item.tag && (
                  <div style={{
                    display: "inline-block", padding: "4px 12px", borderRadius: 20,
                    background: `${item.color}18`, fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10, fontWeight: 700, color: item.color, letterSpacing: "0.5px", marginBottom: 16,
                  }}>{item.tag}</div>
                )}
                {!item.tag && <div style={{ height: 28 }} />}
                <div style={{
                  width: 48, height: 48, borderRadius: 16,
                  background: `${item.color}18`, display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 18, transition: "transform 0.3s",
                  transform: hovered === item.id ? "scale(1.1) rotate(6deg)" : "scale(1)",
                }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: item.color, opacity: 0.7 }} />
                </div>
                <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 16, lineHeight: 1.2 }}>{item.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 26, fontWeight: 800, color: C.text }}>${item.price}</div>
                  <div style={{
                    padding: "10px 22px", borderRadius: 30,
                    background: hovered === item.id ? item.color : "rgba(255,255,255,0.06)",
                    color: hovered === item.id ? "#fff" : C.sub,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, transition: "all 0.3s",
                  }}>Add to Cart</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── CONTACT ─────────────────────────────────── */
function Contact() {
  const [focused, setFocused] = useState(null);
  const inp = (field) => ({
    width: "100%", padding: "16px 20px", borderRadius: 18,
    border: `1.5px solid ${focused === field ? C.pink + "50" : "rgba(255,255,255,0.08)"}`,
    background: "rgba(255,255,255,0.04)", color: C.text,
    fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none",
    transition: "all 0.3s", boxSizing: "border-box",
    boxShadow: focused === field ? `0 0 20px ${C.pink}12` : "none",
  });
  return (
    <section id="contact" style={{ padding: "80px 24px 50px", maxWidth: 640, margin: "0 auto" }}>
      <Reveal>
        <div style={{
          borderRadius: 32, padding: "52px 44px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{
              fontFamily: "'Baloo 2', cursive", fontSize: "clamp(32px,4vw,48px)",
              fontWeight: 800, color: C.text, margin: "0 0 8px",
            }}>Let's create<br />something <span style={{ color: C.pink }}>together</span>.</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.sub, lineHeight: 1.6 }}>
              Drop us a message and we'll get back to you within 24 hours.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <input placeholder="Your Name" style={inp("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
              <input placeholder="Email" style={inp("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
            </div>
            <input placeholder="Subject" style={inp("sub")} onFocus={() => setFocused("sub")} onBlur={() => setFocused(null)} />
            <textarea placeholder="Tell us about your project..." rows={4} style={{ ...inp("msg"), resize: "vertical" }} onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)} />
            <button style={{
              width: "100%", padding: "16px", borderRadius: 50, border: "none",
              background: C.pink, color: "#fff", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700,
              transition: "all 0.3s", boxShadow: `0 6px 24px ${C.pink}30`,
            }}
            onMouseEnter={e => e.target.style.transform = "scale(1.02)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >Send Message</button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── FOOTER ──────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      padding: "40px 24px 28px", maxWidth: 1100, margin: "0 auto",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
    }}>
      <span style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: 18, color: C.sub }}>
        <span style={{ color: C.pink }}>L</span>ifebeats
      </span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.sub }}>
        © 2026 Lifebeats. All rights reserved.
      </span>
      <div style={{ display: "flex", gap: 20 }}>
        {["Instagram", "Dribbble", "Behance", "Twitter"].map(s => (
          <a key={s} href="#" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.sub,
            textDecoration: "none", transition: "color 0.3s",
          }}
          onMouseEnter={e => e.target.style.color = C.text}
          onMouseLeave={e => e.target.style.color = C.sub}
          >{s}</a>
        ))}
      </div>
    </footer>
  );
}

/* ── MAIN ────────────────────────────────────── */
export default function Lifebeats() {
  return (
    <div style={{ minHeight: "100vh", color: C.text, background: C.bg, width: "100%", margin: 0, padding: 0, overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #root, #__next, #app { width: 100%; margin: 0; padding: 0; overflow-x: hidden; }
        body { background: ${C.bg}; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${C.pink}30; color: #fff; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
        input::placeholder, textarea::placeholder { color: ${C.sub}; opacity: 0.6; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translate3d(0, -25%, 0); }
          100% { transform: translate3d(0, 0%, 0); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>

      <Nav />
      <HeroMosaic />
      <MarqueeSection />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}