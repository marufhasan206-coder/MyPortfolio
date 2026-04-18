import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d0d0d;
    --surface: #141414;
    --surface2: #1a1a1a;
    --border: #2a2a2a;
    --gold: #c9a84c;
    --gold-dim: #8a6f2e;
    --white: #f0ede8;
    --muted: #6b6660;
    --accent: #e8c56d;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--white);
    font-family: 'Space Mono', monospace;
    overflow-x: hidden;
    cursor: none;
  }

  /* Custom cursor */
  .cursor {
    position: fixed;
    width: 10px; height: 10px;
    background: var(--gold);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s, background 0.2s;
    mix-blend-mode: difference;
  }
  .cursor-ring {
    position: fixed;
    width: 36px; height: 36px;
    border: 1px solid var(--gold);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: all 0.12s ease-out;
    opacity: 0.5;
  }

  /* Nav */
  nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.4rem 4rem;
    background: rgba(13,13,13,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.6rem;
    letter-spacing: 0.12em;
    color: var(--gold);
  }
  .nav-links { display: flex; gap: 2.4rem; }
  .nav-links a {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.25s;
  }
  .nav-links a:hover { color: var(--gold); }

  /* Hero */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 4rem 6rem;
    position: relative;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 70% 40%, rgba(201,168,76,0.07) 0%, transparent 70%),
                radial-gradient(ellipse 50% 50% at 20% 80%, rgba(201,168,76,0.04) 0%, transparent 60%);
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(var(--border) 1px, transparent 1px),
                      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0.3;
  }
  .hero-number {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(8rem, 20vw, 20rem);
    line-height: 0.85;
    color: transparent;
    -webkit-text-stroke: 1px rgba(201,168,76,0.15);
    position: absolute; top: 8rem; right: -2rem;
    pointer-events: none;
    user-select: none;
  }
  .hero-tag {
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.2rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .hero-tag::before {
    content: '';
    display: inline-block;
    width: 40px; height: 1px;
    background: var(--gold);
  }
  .hero-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3.5rem, 9vw, 8rem);
    line-height: 0.9;
    letter-spacing: 0.04em;
    color: var(--white);
  }
  .hero-name span { color: var(--gold); }
  .hero-sub {
    font-family: 'DM Serif Display', serif;
    font-style: italic;
    font-size: clamp(1rem, 2.5vw, 1.6rem);
    color: var(--muted);
    margin-top: 1rem;
  }
  .hero-desc {
    max-width: 500px;
    font-size: 0.75rem;
    line-height: 1.9;
    color: #8a8480;
    margin-top: 1.8rem;
  }
  .hero-cta {
    display: flex; gap: 1.2rem; margin-top: 2.5rem;
    flex-wrap: wrap;
  }
  .btn-primary {
    padding: 0.85rem 2.4rem;
    background: var(--gold);
    color: var(--bg);
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.25s;
    text-decoration: none;
  }
  .btn-primary:hover { background: var(--accent); transform: translateY(-2px); }
  .btn-outline {
    padding: 0.85rem 2.4rem;
    background: transparent;
    color: var(--gold);
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    border: 1px solid var(--gold-dim);
    cursor: pointer;
    transition: all 0.25s;
    text-decoration: none;
  }
  .btn-outline:hover { border-color: var(--gold); background: rgba(201,168,76,0.05); }

  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    font-size: 0.55rem; letter-spacing: 0.25em; color: var(--muted);
    text-transform: uppercase;
  }
  .scroll-line {
    width: 1px; height: 50px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse { 0%,100%{opacity:0.3} 50%{opacity:1} }

  /* Sections */
  section {
    padding: 7rem 4rem;
    position: relative;
  }
  .section-header {
    display: flex; align-items: baseline; gap: 1.5rem;
    margin-bottom: 4rem;
  }
  .section-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 5rem;
    color: transparent;
    -webkit-text-stroke: 1px var(--border);
    line-height: 1;
  }
  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.8rem;
    letter-spacing: 0.08em;
    color: var(--white);
    line-height: 1;
  }
  .section-title span { color: var(--gold); }
  .section-line {
    flex: 1; height: 1px;
    background: linear-gradient(to right, var(--border), transparent);
    margin-bottom: 0.4rem;
  }

  /* About */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: start;
  }
  .about-text p {
    font-size: 0.8rem; line-height: 2; color: #9a9490;
    margin-bottom: 1.2rem;
  }
  .about-stats {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .stat-box {
    background: var(--surface);
    padding: 2rem;
    text-align: center;
  }
  .stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3rem;
    color: var(--gold);
    line-height: 1;
  }
  .stat-label {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 0.4rem;
  }

  /* Timeline */
  .timeline {
    position: relative;
    padding-left: 3rem;
  }
  .timeline::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, var(--gold), var(--gold-dim) 60%, transparent);
  }
  .timeline-item {
    position: relative;
    margin-bottom: 3.5rem;
    opacity: 0;
    transform: translateX(-20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .timeline-item.visible {
    opacity: 1;
    transform: translateX(0);
  }
  .timeline-dot {
    position: absolute;
    left: -3.3rem; top: 0.3rem;
    width: 12px; height: 12px;
    background: var(--gold);
    border-radius: 50%;
    border: 2px solid var(--bg);
    box-shadow: 0 0 0 4px rgba(201,168,76,0.15);
  }
  .timeline-date {
    font-size: 0.6rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.5rem;
  }
  .timeline-org {
    font-family: 'DM Serif Display', serif;
    font-size: 1.3rem;
    color: var(--white);
    margin-bottom: 0.2rem;
  }
  .timeline-role {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.8rem;
  }
  .timeline-desc {
    font-size: 0.75rem;
    line-height: 1.9;
    color: #7a7470;
  }
  .timeline-bullets {
    list-style: none;
    margin-top: 0.6rem;
  }
  .timeline-bullets li {
    font-size: 0.73rem;
    line-height: 1.8;
    color: #7a7470;
    padding-left: 1rem;
    position: relative;
  }
  .timeline-bullets li::before {
    content: '—';
    position: absolute; left: 0;
    color: var(--gold-dim);
  }

  /* Skills */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .skill-chip {
    background: var(--surface);
    padding: 1.2rem 1.5rem;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: var(--muted);
    transition: all 0.25s;
    cursor: default;
    border-left: 2px solid transparent;
  }
  .skill-chip:hover {
    color: var(--gold);
    background: var(--surface2);
    border-left-color: var(--gold);
  }
  .skills-section-label {
    font-size: 0.6rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1rem;
    margin-top: 2.5rem;
  }
  .skills-section-label:first-child { margin-top: 0; }

  /* Projects */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .project-card {
    background: var(--surface);
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    transition: background 0.3s;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease, background 0.3s;
  }
  .project-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .project-card:hover { background: var(--surface2); }
  .project-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(to right, var(--gold), transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  .project-card:hover::before { transform: scaleX(1); }
  .project-course {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold-dim);
    margin-bottom: 0.8rem;
  }
  .project-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.2rem;
    color: var(--white);
    margin-bottom: 0.8rem;
    line-height: 1.3;
  }
  .project-desc {
    font-size: 0.72rem;
    line-height: 1.85;
    color: #6a6460;
  }
  .project-num {
    position: absolute; bottom: 1.5rem; right: 2rem;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3.5rem;
    color: transparent;
    -webkit-text-stroke: 1px var(--border);
    line-height: 1;
  }

  /* Publication */
  .pub-card {
    border: 1px solid var(--border);
    padding: 3rem;
    position: relative;
    background: var(--surface);
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s, transform 0.6s;
  }
  .pub-card.visible { opacity:1; transform:translateY(0); }
  .pub-card::after {
    content: '"';
    font-family: 'DM Serif Display', serif;
    font-size: 12rem;
    color: rgba(201,168,76,0.05);
    position: absolute;
    top: -2rem; right: 1rem;
    line-height: 1;
  }
  .pub-venue {
    font-size: 0.6rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 1rem;
  }
  .pub-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.5rem; color: var(--white);
    line-height: 1.4; margin-bottom: 1rem;
  }
  .pub-doi {
    font-size: 0.65rem; color: var(--muted);
    font-family: 'Space Mono', monospace;
  }

  /* Activities */
  .activities-list { display: flex; flex-direction: column; gap: 1px; }
  .activity-item {
    background: var(--surface);
    padding: 1.8rem 2.5rem;
    display: flex; justify-content: space-between; align-items: flex-start;
    border-left: 2px solid transparent;
    transition: all 0.25s;
    opacity: 0;
    transform: translateX(-15px);
    transition: opacity 0.5s, transform 0.5s, border-color 0.25s, background 0.25s;
  }
  .activity-item.visible { opacity:1; transform:translateX(0); }
  .activity-item:hover { border-left-color: var(--gold); background: var(--surface2); }
  .activity-org {
    font-family: 'DM Serif Display', serif;
    font-size: 1.1rem; color: var(--white);
    margin-bottom: 0.3rem;
  }
  .activity-desc {
    font-size: 0.7rem; color: var(--muted); line-height: 1.7;
  }
  .activity-role {
    font-size: 0.6rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--gold);
    white-space: nowrap; padding-top: 0.2rem;
  }

  /* Contact */
  .contact-inner {
    display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;
  }
  .contact-heading {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1;
    color: var(--white);
    margin-bottom: 1.5rem;
  }
  .contact-heading span { color: var(--gold); }
  .contact-text {
    font-size: 0.75rem; line-height: 2; color: var(--muted);
    margin-bottom: 2rem;
  }
  .contact-links { display: flex; flex-direction: column; gap: 1px; }
  .contact-link {
    display: flex; align-items: center; gap: 1rem;
    padding: 1.2rem 1.8rem;
    background: var(--surface);
    text-decoration: none;
    color: var(--muted);
    font-size: 0.72rem;
    transition: all 0.25s;
    border-left: 2px solid transparent;
  }
  .contact-link:hover { color: var(--gold); border-left-color: var(--gold); background: var(--surface2); }
  .contact-link-icon { font-size: 1rem; width: 1.5rem; text-align: center; }
  .contact-link-label { font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-dim); display: block; margin-bottom: 0.2rem; }

  /* Footer */
  footer {
    padding: 2.5rem 4rem;
    border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 1rem;
  }
  footer span {
    font-size: 0.65rem; letter-spacing: 0.15em;
    color: var(--muted); text-transform: uppercase;
  }

  /* Scroll reveal */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    section { padding: 5rem 1.5rem; }
    .hero { padding: 0 1.5rem 5rem; }
    .about-grid, .contact-inner { grid-template-columns: 1fr; gap: 3rem; }
    .hero-number { font-size: 8rem; right: -1rem; top: 10rem; }
    footer { padding: 2rem 1.5rem; }
  }
`;

const useScrollReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .timeline-item, .project-card, .activity-item, .pub-card");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

export default function Portfolio() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useScrollReveal();

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX + "px"; cursorRef.current.style.top = e.clientY + "px"; }
      if (ringRef.current) { ringRef.current.style.left = e.clientX + "px"; ringRef.current.style.top = e.clientY + "px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{style}</style>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      {/* NAV */}
      <nav>
        <div className="nav-logo">Maruf.</div>
        <div className="nav-links">
          {["About","Education","Experience","Projects","Skills","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="about" style={{paddingTop:"6rem"}}>
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-number">IPE</div>
        <div className="reveal" style={{transitionDelay:"0.1s"}}>
          <div className="hero-tag">Industrial &amp; Production Engineer · BUET</div>
        </div>
        <div className="reveal" style={{transitionDelay:"0.2s"}}>
          <h1 className="hero-name">A.S.M.<br /><span>Maruf</span><br />Hasan</h1>
        </div>
        <div className="reveal" style={{transitionDelay:"0.35s"}}>
          <p className="hero-sub">Engineering design &amp; operations research</p>
        </div>
        <div className="reveal" style={{transitionDelay:"0.45s"}}>
          <p className="hero-desc">
            Final-year IPE student at BUET with hands-on industrial experience, published research, and a passion for building things that work — from simulation models to physical prototypes.
          </p>
        </div>
        <div className="reveal" style={{transitionDelay:"0.55s"}}>
          <div className="hero-cta">
            <a className="btn-primary" href="#contact">Get in Touch</a>
            <a className="btn-outline" href="#projects">View Projects</a>
          </div>
        </div>
        <div className="hero-scroll"><div className="scroll-line" /><span>Scroll</span></div>
      </section>

      {/* ABOUT STATS */}
      <section style={{paddingTop:"0", paddingBottom:"7rem"}}>
        <div className="about-grid reveal">
          <div className="about-text">
            <p>
              Highly motivated final-year student at Bangladesh University of Engineering and Technology,
              majoring in Industrial and Production Engineering with a CGPA of 3.10/4.00.
            </p>
            <p>
              My interests span engineering design, supply chain management, operations research,
              quality management, and data analysis — always with a focus on improving operational performance
              and contributing innovative solutions to real-world problems.
            </p>
            <p>
              I've had the privilege of working as an Industrial Trainee at Nestlé Bangladesh PLC,
              published research at an international IEOM conference, and led teams across multiple
              engineering and entrepreneurship clubs at BUET.
            </p>
          </div>
          <div>
            <div className="about-stats">
              {[
                { num: "3.10", label: "CGPA / 4.00" },
                { num: "5.0", label: "HSC GPA" },
                { num: "31%", label: "Glue reduction at Nestlé" },
                { num: "3+", label: "Club directorships" },
              ].map(s => (
                <div className="stat-box" key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="section-header reveal">
          <div className="section-num">01</div>
          <h2 className="section-title">Edu<span>cation</span></h2>
          <div className="section-line" />
        </div>
        <div className="timeline">
          {[
            {
              date: "Jan 2022 — Ongoing",
              org: "Bangladesh University of Engineering and Technology",
              role: "B.Sc. · Industrial and Production Engineering",
              desc: "CGPA: 3.10 / 4.00 — Pursuing a rigorous engineering degree focused on industrial systems, operations research, manufacturing processes, and supply chain management.",
              bullets: [],
            },
            {
              date: "Jul 2018 — Jun 2020",
              org: "Cantonment Public School and College, Rangpur",
              role: "Higher Secondary Certificate (HSC)",
              desc: "GPA: 5.00 / 5.00 — Achieved a perfect score in the Higher Secondary Certificate examination.",
              bullets: [],
            },
          ].map((item, i) => (
            <div className="timeline-item" key={i} style={{transitionDelay: `${i * 0.15}s`}}>
              <div className="timeline-dot" />
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-org">{item.org}</div>
              <div className="timeline-role">{item.role}</div>
              <div className="timeline-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-header reveal">
          <div className="section-num">02</div>
          <h2 className="section-title">Exper<span>ience</span></h2>
          <div className="section-line" />
        </div>
        <div className="timeline">
          <div className="timeline-item" style={{transitionDelay:"0.1s"}}>
            <div className="timeline-dot" />
            <div className="timeline-date">Nov 2025 — Dec 2025</div>
            <div className="timeline-org">Nestlé Bangladesh PLC</div>
            <div className="timeline-role">Industrial Trainee · Sreepur, Gazipur</div>
            <ul className="timeline-bullets">
              <li>Analyzed reprocessing inefficiencies across multiple noodle lines by conducting shift-based, point-wise data collection.</li>
              <li>Monitored line efficiency and OPRPs while observing end-to-end manufacturing processes across Noodle, Cereal, and Infant Formula plants.</li>
              <li>Optimized glue consumption through shop-floor trials, achieving a 31% reduction in glue usage.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PUBLICATION */}
      <section id="publication">
        <div className="section-header reveal">
          <div className="section-num">03</div>
          <h2 className="section-title">Publi<span>cation</span></h2>
          <div className="section-line" />
        </div>
        <div className="pub-card">
          <div className="pub-venue">7th IEOM Bangladesh International Conference · March 2025</div>
          <div className="pub-title">Aerodynamic Performance Analysis of NACA 4415 Airfoil Incorporating Gurney and Bionic Flap: A Steady-State Numerical Analysis</div>
          <div className="pub-doi">DOI: 10.46254/BA07.20240040</div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-header reveal">
          <div className="section-num">04</div>
          <h2 className="section-title">Pro<span>jects</span></h2>
          <div className="section-line" />
        </div>
        <div className="projects-grid">
          {[
            {
              course: "Product Design I & II",
              title: "Multi-Purpose Plumbing Machine",
              desc: "Led the team to develop a 3D model, then structurally analyzed it to manufacture a physical prototype capable of performing plumbing operations like cutting and threading simultaneously.",
              num: "01"
            },
            {
              course: "Engineering Graphics",
              title: "3D Model of Cement Mixture Concrete Truck",
              desc: "Designed a realistic 3D model of a Cement Mixture Concrete Truck using SolidWorks software, focusing on accurate geometric representation and assembly.",
              num: "02"
            },
            {
              course: "CAD / CAM",
              title: "Automated Greenhouse Management System",
              desc: "IoT-based project that analyzes real-time sensor data to automatically activate water valves and grow lights as needed, reducing manual intervention in greenhouse operations.",
              num: "03"
            },
          ].map((p, i) => (
            <div className="project-card" key={i} style={{transitionDelay: `${i * 0.12}s`}}>
              <div className="project-course">{p.course}</div>
              <div className="project-title">{p.title}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-num">{p.num}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-header reveal">
          <div className="section-num">05</div>
          <h2 className="section-title">Sk<span>ills</span></h2>
          <div className="section-line" />
        </div>
        <div className="reveal">
          <div className="skills-section-label">Software &amp; Tools</div>
          <div className="skills-grid">
            {["Catia","ANSYS Workbench","Arena","SolidWorks","MATLAB","Simio","C","Python","Adobe Photoshop","Adobe Illustrator","Adobe Premiere Pro","MS Office Suite"].map(s => (
              <div className="skill-chip" key={s}>{s}</div>
            ))}
          </div>
          <div className="skills-section-label" style={{marginTop:"2.5rem"}}>Soft Skills</div>
          <div className="skills-grid">
            {["Critical Thinking","Leadership","Teamwork","Time Management","Negotiation"].map(s => (
              <div className="skill-chip" key={s}>{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section id="activities">
        <div className="section-header reveal">
          <div className="section-num">06</div>
          <h2 className="section-title">Activi<span>ties</span></h2>
          <div className="section-line" />
        </div>
        <div className="activities-list">
          {[
            { org: "BUET Entrepreneurship Development Club (BEDC)", role: "Director", desc: "Organized multiple programs and led the Organizing & Logistics Team." },
            { org: "Association of Industrial & Production Engineers (AIPE)", role: "Assistant Secretary", desc: "Actively participated in several fests, picnics, and competitions." },
            { org: "IEOM BUET Student Chapter", role: "Director", desc: "Organized several workshops and interactive learning sessions." },
          ].map((a, i) => (
            <div className="activity-item" key={i} style={{transitionDelay: `${i * 0.12}s`}}>
              <div>
                <div className="activity-org">{a.org}</div>
                <div className="activity-desc">{a.desc}</div>
              </div>
              <div className="activity-role">{a.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-inner">
          <div className="reveal">
            <h2 className="contact-heading">Let's<br /><span>Connect</span></h2>
            <p className="contact-text">
              Open to internships, research collaborations, and full-time opportunities in industrial engineering, operations research, and supply chain management.
            </p>
            <div className="contact-links">
              <a className="contact-link" href="tel:+8801773971226">
                <span className="contact-link-icon">📞</span>
                <div>
                  <span className="contact-link-label">Phone</span>
                  +880 1773-971226
                </div>
              </a>
              <a className="contact-link" href="mailto:marufhasan206@gmail.com">
                <span className="contact-link-icon">✉</span>
                <div>
                  <span className="contact-link-label">Email</span>
                  marufhasan206@gmail.com
                </div>
              </a>
              <a className="contact-link" href="https://www.linkedin.com/in/a-s-m-maruf-hasan-837aa8229" target="_blank" rel="noreferrer">
                <span className="contact-link-icon">🔗</span>
                <div>
                  <span className="contact-link-label">LinkedIn</span>
                  a-s-m-maruf-hasan-837aa8229
                </div>
              </a>
            </div>
          </div>
          <div className="reveal" style={{transitionDelay:"0.2s"}}>
            <div style={{border:"1px solid var(--border)", padding:"3rem", background:"var(--surface)"}}>
              <div style={{fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.5rem"}}>Reference</div>
              <div style={{fontFamily:"'DM Serif Display', serif", fontSize:"1.4rem", color:"var(--white)", marginBottom:"0.3rem"}}>Dr. Sayed Mithun Ali</div>
              <div style={{fontSize:"0.7rem", color:"var(--muted)", lineHeight:"1.8"}}>
                Professor, Department of IPE<br/>
                Bangladesh University of Engineering and Technology (BUET)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span>© 2025 A.S.M. Maruf Hasan</span>
        <span>Industrial &amp; Production Engineering · BUET</span>
      </footer>
    </>
  );
}
