"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Track = {
  title: string;
  desc: string;
  badge: string;
  border: string;
  glow: string;
  icon: string;
};

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "tracks", label: "Tracks" },
      { id: "timeline", label: "Timeline" },
      { id: "prizes", label: "Prizes" },
      { id: "register", label: "Register" },
    ],
    []
  );

  // ✅ UPDATED TRACK TOPICS
  const tracks: Track[] = useMemo(
    () => [
      {
        title: "Education & Skill Development",
        desc: "Build tools and platforms to enhance learning, training, accessibility, and skill development.",
        badge: "Education",
        border: "border-red-500/30",
        glow: "shadow-red-500/20",
        icon: "fa-graduation-cap",
      },
      {
        title: "Disaster Management & Resilience",
        desc: "Create systems for disaster preparedness, early warning, response, and recovery.",
        badge: "Disaster",
        border: "border-purple-500/30",
        glow: "shadow-purple-500/20",
        icon: "fa-triangle-exclamation",
      },
      {
        title: "Renewable Energy & Energy Efficiency",
        desc: "Design systems for solar, wind, bioenergy, and efficient energy usage.",
        badge: "Energy",
        border: "border-red-500/30",
        glow: "shadow-red-500/20",
        icon: "fa-solar-panel",
      },
      {
        title: "AI for Post-harvest Management",
        desc: "Predict storage needs and reduce spoilage with AI monitoring systems.",
        badge: "Post-harvest",
        border: "border-purple-500/30",
        glow: "shadow-purple-500/20",
        icon: "fa-warehouse",
      },
      {
        title: "Open Innovation",
        desc: "Bring any original tech/AI idea that solves a real-world problem — creativity is unlimited.",
        badge: "Open",
        border: "border-red-500/30",
        glow: "shadow-red-500/20",
        icon: "fa-lightbulb",
      },
    ],
    []
  );

  const timeline = useMemo(
    () => [
      {
        icon: "1",
        color: "from-red-500 to-orange-600",
        title: "Website Launch",
        time: "Feb 8",
        text: "InfernoX 1.0 website goes live and the event officially opens.",
        border: "border-red-500/30",
        titleColor: "text-red-400",
      },
      {
        icon: "2",
        color: "from-purple-500 to-pink-600",
        title: "Registrations",
        time: "Feb 8 – Feb 28",
        text: "Teams register and confirm participation before the deadline.",
        border: "border-purple-500/30",
        titleColor: "text-purple-400",
      },
      {
        icon: "3",
        color: "from-green-500 to-teal-600",
        title: "Proposal Submission",
        time: "Feb 8 – Mar 10",
        text: "Teams submit a clear problem statement and a proposed solution plan.",
        border: "border-green-500/30",
        titleColor: "text-green-400",
      },
      {
        icon: "4",
        color: "from-orange-500 to-red-600",
        title: "Proposal Review & Shortlisting",
        time: "Mar 10 – Mar 22",
        text: "Proposals are reviewed and shortlisted for the presentations.",
        border: "border-orange-500/30",
        titleColor: "text-orange-400",
      },
      {
        icon: "I",
        color: "from-blue-500 to-cyan-600",
        title: "Phase I (Final) — Proposal Presentation",
        time: "Mar 31",
        text: "Shortlisted teams present their proposal to the panel.",
        border: "border-blue-500/30",
        titleColor: "text-blue-400",
      },
      {
        icon: "II",
        color: "from-yellow-500 to-orange-600",
        title: "Phase II (Final Day) — Project Demonstration",
        time: "Expected: May 30 – Jun 5",
        text: "Finalists demo a working solution and compete for awards.",
        border: "border-yellow-500/30",
        titleColor: "text-yellow-400",
      },
    ],
    []
  );

  // Prizes (NEW)
  const prizes = useMemo(
    () => [
      {
        title: "Champion",
        subtitle: "Overall Winner",
        icon: "fa-trophy",
        color: "from-yellow-400 to-orange-500",
        border: "border-yellow-500/30",
      },
      {
        title: "1st Runner-up",
        subtitle: "Second Place",
        icon: "fa-medal",
        color: "from-purple-500 to-pink-600",
        border: "border-purple-500/30",
      },
      {
        title: "2nd Runner-up",
        subtitle: "Third Place",
        icon: "fa-award",
        color: "from-red-500 to-orange-600",
        border: "border-red-500/30",
      },
      {
        title: "Participation Certificate",
        subtitle: "All Phase I shortlisted finalists",
        icon: "fa-certificate",
        color: "from-green-500 to-teal-600",
        border: "border-green-500/30",
      },
    ],
    []
  );

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 96;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top, behavior: "smooth" });
    setMobileOpen(false);
  };

  useEffect(() => {
    // Loading bar simulation
    const loadingBar = document.getElementById("loadingBar") as HTMLDivElement | null;
    if (loadingBar) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        loadingBar.style.width = `${progress}%`;
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            loadingBar.style.display = "none";
          }, 500);
        }
      }, 80);
    }

    // Navbar shadow on scroll (NO hiding)
    const nav = document.querySelector("nav") as HTMLElement | null;

    const updateNavbar = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (nav) {
        nav.style.transform = "translateY(0)";
        nav.style.transition = "box-shadow 0.25s ease";
        if (scrollTop > 30) nav.classList.add("shadow-2xl", "shadow-red-500/20");
        else nav.classList.remove("shadow-2xl", "shadow-red-500/20");
      }
    };

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    // Scroll reveal
    const revealEls = document.querySelectorAll(".scroll-reveal");
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => revealObs.observe(el));

    // Flame particles
    const flamesContainer = document.getElementById("flames-container");
    if (flamesContainer) {
      flamesContainer.innerHTML = "";
      const numParticles = 20;

      for (let i = 0; i < numParticles; i++) {
        const p = document.createElement("div");
        p.className = "flame-particle";
        p.style.left = `${Math.random() * 100}%`;
        p.style.animationDelay = `${Math.random() * 3}s`;
        p.style.animationDuration = `${3 + Math.random() * 2}s`;
        flamesContainer.appendChild(p);
      }
    }

    // Timeline slide in
    const timelineItems = document.querySelectorAll("#timeline .timeline-item");
    const timelineObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("timeline-in");
        });
      },
      { threshold: 0.1 }
    );
    timelineItems.forEach((item) => timelineObs.observe(item));

    return () => {
      window.removeEventListener("scroll", updateNavbar);
      revealObs.disconnect();
      timelineObs.disconnect();
    };
  }, []);

  return (
    <main className="text-white">
      <div className="loading-bar" id="loadingBar" />
      <div id="flames-container" className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            {/* Left: InfernoX */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 group"
              aria-label="Go to top"
            >
              <div className="relative h-8 w-36 sm:h-9 sm:w-40 transition-transform duration-300 group-hover:scale-105">
                <Image src="/infernox-logo.png" alt="InfernoX 1.0" fill priority className="object-contain" />
              </div>
            </button>

            {/* Center: Links */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollToId(l.id)}
                  className="text-gray-200/90 hover:text-red-300 transition-all duration-300 text-[14px] font-medium relative
                    after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0
                    after:bg-gradient-to-r after:from-red-500 after:to-orange-400
                    after:origin-bottom-right after:transition-transform after:duration-300
                    hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Right: Logos */}
            <div className="flex items-center gap-2">
              <div className="relative w-14 h-8 rounded-md border border-white/20 shadow-sm shadow-black/30 overflow-hidden flex items-center justify-center">
                <Image src="/lnbtilogo.png" alt="LNBTI" fill className="object-contain p-1" />
              </div>
              <div className="relative w-11 h-8 rounded-md bg-white/5 border border-white/10 shadow-sm shadow-black/20 overflow-hidden flex items-center justify-center">
                <Image src="/roboticsclub.png" alt="Robotics Club" fill className="object-contain p-1" />
              </div>
            </div>

            {/* Mobile */}
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="md:hidden text-red-300 hover:text-orange-300 transition-colors"
              aria-label="Toggle menu"
            >
              <i className={`fas ${mobileOpen ? "fa-times" : "fa-bars"} text-xl`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${mobileOpen ? "block animate-slideDown" : "hidden"} md:hidden bg-slate-950/75 backdrop-blur-xl border-t border-white/10 shadow-2xl shadow-black/30`}
        >
          <div className="px-4 pt-4 pb-4 space-y-3">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className="block w-full text-left text-gray-100/90 hover:text-red-300 hover:bg-white/5 transition-all duration-300 py-2 px-3 rounded-lg"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-32 flame-bg">
        <div className="scan-line" />

        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
          <div className="absolute top-20 left-10 w-3 h-3 bg-red-500 rounded-full pulse-glow" />
          <div
            className="absolute top-40 right-20 w-3 h-3 bg-purple-500 rounded-full pulse-glow"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute bottom-40 left-1/4 w-3 h-3 bg-orange-500 rounded-full pulse-glow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-3 h-3 bg-red-400 rounded-full pulse-glow"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10 scroll-reveal">
          <div className="mb-6">
            <div className="inline-block px-6 py-2 bg-red-500/10 rounded-lg backdrop-blur-sm border border-red-500/30 neon-border">
              <span className="text-red-400 font-medium text-sm tracking-wide orbitron">
                ROBOTICS CLUB OF LNBTI PRESENTS
              </span>
            </div>
          </div>

          <h1 className="text-7xl md:text-9xl font-black mb-8 orbitron">
            <span className="text-gradient-animated fire-text">InfernoX</span>
            <span className="text-white drop-shadow-2xl"> 1.0</span>
          </h1>

          <p className="text-3xl md:text-4xl mb-6 font-bold">
            <span className="text-red-400">Inter-School</span>{" "}
            <span className="text-purple-400">Hackathon</span>{" "}
            <span className="text-orange-400">Competition</span>
          </p>

          <p className="text-xl md:text-2xl mb-12 text-gray-300">
            Spark. Build. Burn with <span className="text-red-400 font-bold">Brilliance</span>
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12 text-lg">
            <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-red-500/30 glow-box floating">
              <i className="fas fa-calendar-alt text-red-400" />
              <span>Finals: May 30 – Jun 5</span>
            </div>
            <div
              className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-500/30 glow-box floating"
              style={{ animationDelay: "0.5s" }}
            >
              <i className="fas fa-clock text-purple-400" />
              <span>Multi-Phase Event</span>
            </div>
            <div
              className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-500/30 glow-box floating"
              style={{ animationDelay: "1s" }}
            >
              <i className="fas fa-map-marker-alt text-orange-400" />
              <span>LNBTI Campus</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => scrollToId("register")}
              className="btn-inferno px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">
                <i className="fas fa-rocket mr-2" />
                Register Your Team
              </span>
            </button>

            <button
              onClick={() => scrollToId("about")}
              className="border-2 border-red-400 px-10 py-4 rounded-full font-bold text-lg hover:bg-red-400/10 transition-all duration-300 relative overflow-hidden group btn-inferno"
            >
              <span className="relative z-10">
                <i className="fas fa-fire mr-2" />
                Learn More
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-4 hero-gradient relative flame-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-red-400 font-semibold text-sm uppercase tracking-widest orbitron">
              Ignite Your Coding Skills
            </span>
            <h2 className="text-5xl font-bold mt-4 mb-6 orbitron">
              What is <span className="text-gradient-animated">InfernoX 1.0</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                <span className="text-red-400 font-bold">InfernoX 1.0</span> is an inter-school hackathon built around
                real problem-solving — not just random projects.
              </p>

              <div className="grid gap-4 mt-8">
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-red-500/20 glow-box">
                  <h3 className="text-xl font-bold orbitron text-red-400 mb-2">Problem we’re solving</h3>
                  <p className="text-gray-300">
                    Students often build projects without a real problem focus, so ideas don’t translate into impact.
                  </p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 glow-box">
                  <h3 className="text-xl font-bold orbitron text-purple-400 mb-2">Our solution</h3>
                  <p className="text-gray-300">
                    A structured, multi-phase hackathon: register • submit a proposal • get shortlisted • present • build
                    and demo a working solution.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center bg-red-500/20 backdrop-blur-md p-4 rounded-xl border border-red-500/30 glow-box">
                  <div className="text-3xl font-bold text-red-400 mb-1 orbitron">50+</div>
                  <div className="text-gray-200 text-sm">Teams</div>
                </div>
                <div className="text-center bg-purple-500/20 backdrop-blur-md p-4 rounded-xl border border-purple-500/30 glow-box">
                  <div className="text-3xl font-bold text-purple-400 mb-1 orbitron">2</div>
                  <div className="text-gray-200 text-sm">Phases</div>
                </div>
                <div className="text-center bg-red-500/10 backdrop-blur-md p-4 rounded-xl border border-red-500/30 glow-box">
                  <div className="text-3xl font-bold text-red-300 mb-1 orbitron">5</div>
                  <div className="text-gray-200 text-sm">Competitive Tracks</div>
                </div>
              </div>
            </div>

            <div className="relative group scroll-reveal">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-purple-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />

              <div className="relative rounded-3xl overflow-hidden border-2 border-red-500/30 neon-border card-3d">
                <div className="relative w-full h-96">
                  <Image src="/hackathon.png" alt="Students collaborating during a hackathon" fill priority className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-red-400 mb-3 orbitron">Build with Purpose</h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-gray-100">
                      Problem
                    </span>
                    <span className="text-purple-300/90">•</span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-gray-100">
                      Proposal
                    </span>
                    <span className="text-purple-300/90">•</span>
                    <span className="px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-gray-100">
                      Demo
                    </span>
                  </div>

                  <p className="text-gray-200/80 text-sm mt-3">Collaborate, iterate, and ship something real—together.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section id="tracks" className="py-24 px-4 hero-gradient relative flame-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 scroll-reveal">
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-widest orbitron">
              Choose Your Battlefield
            </span>
            <h2 className="text-5xl font-bold mt-4 mb-4 orbitron">
              Competetive <span className="text-gradient-animated">Tracks</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Pick one track and build an AI solution with real-world value.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {tracks.map((t) => (
              <div
                key={t.title}
                className={`scroll-reveal bg-gray-800/45 backdrop-blur-sm p-7 rounded-2xl border ${t.border} glow-box card-3d
                  w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[420px]`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/25 to-purple-500/25 border border-red-500/20 flex items-center justify-center">
                    <i className={`fas ${t.icon} text-red-300`} />
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-900/50 border border-purple-500/20 text-gray-200">
                    {t.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold mt-4 orbitron text-red-200">{t.title}</h3>
                <p className="text-gray-300 mt-3 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center scroll-reveal">
            <button
              onClick={() => scrollToId("register")}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/15 transition"
            >
              <i className="fas fa-arrow-down text-purple-300" />
              <span className="font-semibold">Register for a Track</span>
            </button>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-24 px-4 hero-gradient relative flame-bg">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-red-400 font-semibold text-sm uppercase tracking-widest orbitron">
              Official Schedule
            </span>
            <h2 className="text-5xl font-bold mt-4 mb-6 orbitron">
              Event <span className="text-gradient-animated">Timeline</span>
            </h2>
            <p className="text-gray-300 text-xl">
              From <span className="text-red-400 font-semibold">launch</span> •{" "}
              <span className="text-purple-400 font-semibold">proposal</span> •{" "}
              <span className="text-red-300 font-semibold">finals</span>
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-purple-500 to-orange-500 rounded-full" />

            <div className="space-y-12">
              {timeline.map((t, idx) => (
                <div key={idx} className="flex gap-8 items-start relative timeline-item">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${t.color} rounded-2xl flex items-center justify-center text-sm font-bold orbitron flex-shrink-0 z-10 pulse-glow`}
                  >
                    {t.icon}
                  </div>

                  <div className={`flex-1 bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border ${t.border} glow-box`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                      <h3 className={`text-2xl font-bold orbitron ${t.titleColor}`}>{t.title}</h3>
                      <span className="text-xs px-3 py-1 rounded-full bg-gray-900/50 border border-red-500/20 text-gray-200">
                        {t.time}
                      </span>
                    </div>
                    <p className="text-gray-300">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section id="prizes" className="py-24 px-4 hero-gradient relative flame-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 scroll-reveal">
            <span className="text-red-400 font-semibold text-sm uppercase tracking-widest orbitron">Awards</span>
            <h2 className="text-5xl font-bold mt-4 mb-4 orbitron">
              Prizes & <span className="text-gradient-animated">Recognition</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Finalists shortlisted from <span className="text-purple-300 font-semibold">Phase I</span> will all receive a{" "}
              <span className="text-red-300 font-semibold">Participation Certificate</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {prizes.map((p) => (
              <div
                key={p.title}
                className={`scroll-reveal bg-gray-800/45 backdrop-blur-sm p-7 rounded-2xl border ${p.border} glow-box card-3d`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl shadow-lg shadow-black/25`}
                >
                  <i className={`fas ${p.icon}`} />
                </div>
                <h3 className="text-xl font-bold mt-4 orbitron text-purple-100">{p.title}</h3>
                <p className="text-gray-300 mt-2">{p.subtitle}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center scroll-reveal">
            <button
              onClick={() => scrollToId("register")}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 transition"
            >
              <i className="fas fa-fire text-red-300" />
              <span className="font-semibold">Join & Compete</span>
            </button>
          </div>
        </div>
      </section>

      {/* Register */}
      <section id="register" className="py-16 px-4 hero-gradient relative flame-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 scroll-reveal">
            <span className="text-red-400 font-semibold text-sm uppercase tracking-widest orbitron">
              Join the Battle
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-3 orbitron">
              Register Your <span className="text-gradient-animated">Team</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg">Secure your spot in the inferno</p>
          </div>

          <div className="relative scroll-reveal">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-500/25 via-orange-500/10 to-purple-500/20 blur-xl" />
            <div className="relative rounded-3xl border border-red-500/25 bg-gradient-to-br from-red-500/10 via-gray-900/30 to-purple-500/10 p-6 md:p-8 overflow-hidden">
              <div className="pointer-events-none absolute -top-24 left-[-25%] h-48 w-[55%] rotate-12 bg-white/10 blur-2xl opacity-30" />

              <div className="grid lg:grid-cols-3 gap-6 items-stretch">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 flex flex-col h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl flex items-center justify-center text-xl pulse-glow shadow-lg shadow-red-500/15 flex-shrink-0">
                      <i className="fas fa-fire" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl md:text-2xl font-bold orbitron text-red-300 leading-tight">
                        Team Registration
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">
                        Teams of <span className="text-white font-semibold">2–5</span> • Open to all school students
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-red-500/15 border border-red-500/25 text-gray-100 text-xs">
                      FREE
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-gray-100 text-xs">
                      Limited Spots
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-200 text-xs">
                      Deadline: Feb 28
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-black/20 border border-white/10 py-2 px-1">
                      <div className="text-xs font-bold text-red-300 orbitron">2–5</div>
                      <div className="text-[11px] text-gray-300">Members</div>
                    </div>
                    <div className="rounded-xl bg-black/20 border border-white/10 py-2 px-1">
                      <div className="text-xs font-bold text-purple-300 orbitron">5</div>
                      <div className="text-[11px] text-gray-300">Tracks</div>
                    </div>
                    <div className="rounded-xl bg-black/20 border border-white/10 py-2 px-1">
                      <div className="text-xs font-bold text-orange-300 orbitron">2</div>
                      <div className="text-[11px] text-gray-300">Phases</div>
                    </div>
                  </div>

                  <div className="mt-auto pt-2 text-xs text-gray-400 italic border-t border-white/10">
                    <i className="fas fa-lightbulb text-yellow-300/70 mr-1" /> No registration fee
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-list-check text-red-300 text-sm" />
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-red-300 orbitron">Requirements</h4>
                  </div>

                  <ul className="grid sm:grid-cols-1 gap-2 text-gray-300 text-sm flex-grow">
                    {["2–5 students (same school)", "Laptop(s) for the team", "Basic coding knowledge", "School ID verification"].map(
                      (item) => (
                        <li key={item} className="flex items-start gap-2 rounded-xl bg-black/20 border border-white/10 px-3 py-2.5">
                          <i className="fas fa-check text-red-300 mt-0.5 text-xs flex-shrink-0" />
                          <span className="text-xs md:text-sm leading-tight">{item}</span>
                        </li>
                      )
                    )}
                  </ul>

                  <div className="mt-3 text-[11px] text-gray-400 bg-black/30 rounded-lg px-3 py-2 border border-white/5">
                    <i className="fas fa-plug mr-1 text-red-300/70" /> Tip: Bring charger
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-info-circle text-purple-300" />
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-purple-300 orbitron mb-1">How it works</h4>
                      <p className="text-gray-300 text-xs md:text-sm">Register, choose a track, and submit your proposal.</p>
                    </div>
                  </div>

                  <div className="grid gap-2 text-sm flex-grow">
                    {[
                      { n: "1", t: "Register your team" },
                      { n: "2", t: "Pick a track" },
                      { n: "3", t: "Submit proposal" },
                    ].map((s) => (
                      <div key={s.n} className="flex items-center gap-3 rounded-xl bg-black/20 border border-white/10 px-3 py-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500/60 to-purple-500/60 flex items-center justify-center text-xs font-bold orbitron flex-shrink-0">
                          {s.n}
                        </div>
                        <span className="text-gray-200/90 text-xs md:text-sm">{s.t}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/register"
                    className="mt-4 block text-center btn-inferno px-6 py-3 rounded-full font-bold text-sm md:text-base hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <i className="fas fa-rocket mr-2" />
                    Register Now
                  </Link>

                  <div className="mt-3 rounded-xl bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-white/10 px-3 py-2.5 text-xs text-gray-300">
                    <i className="fas fa-certificate text-red-300 mr-1" />
                    <span className="text-gray-100 font-semibold">Phase 1 finalists</span> get{" "}
                    <span className="text-red-300 font-semibold ml-1">Certificate</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center text-[11px] text-gray-400 border-t border-white/10 pt-3">
                <i className="fas fa-clock mr-1 text-purple-300/70" />
                Registration deadline: <span className="text-white font-medium">February 28, 2024</span> • Don&apos;t miss out!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/70 backdrop-blur-xl border-t border-white/10 shadow-2xl shadow-black/30">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="relative h-8 w-32">
                  <Image src="/infernox-logo.png" alt="InfernoX" fill className="object-contain" />
                </div>
              </div>

              <p className="text-gray-300/85 text-sm mt-2 max-w-md">
                Sri Lanka&apos;s premier inter-school hackathon — empowering students to build impactful solutions through structured
                problem-solving.
              </p>

              <div className="mt-3 inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-200/90">
                Organized by Robotics Club of LNBTI
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-sm">
                <button onClick={() => scrollToId("about")} className="text-gray-200/85 hover:text-red-300 transition">
                  About
                </button>
                <button onClick={() => scrollToId("tracks")} className="text-gray-200/85 hover:text-red-300 transition">
                  Tracks
                </button>
                <button onClick={() => scrollToId("timeline")} className="text-gray-200/85 hover:text-red-300 transition">
                  Timeline
                </button>
                <button onClick={() => scrollToId("prizes")} className="text-gray-200/85 hover:text-red-300 transition">
                  Prizes
                </button>
                <button onClick={() => scrollToId("register")} className="text-gray-200/85 hover:text-red-300 transition">
                  Register
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-14 h-8 rounded-md bg-white/95 border border-white/20 overflow-hidden">
                  <Image src="/lnbtilogo.png" alt="LNBTI" fill className="object-contain p-1" />
                </div>
                <span className="text-xs text-gray-400">×</span>
                <div className="relative w-9 h-9 rounded-md bg-white/5 border border-white/10 overflow-hidden">
                  <Image src="/roboticsclub.png" alt="Robotics Club" fill className="object-contain p-1" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} InfernoX 1.0. All rights reserved.</p>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">Version 1.0.0</span>
              <span className="text-gray-600">|</span>
              <span className="text-xs bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent font-semibold">
                #InfernoX
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
