"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 80; // navbar height
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

    // Navbar hide/show + shadow
    const nav = document.querySelector("nav") as HTMLElement | null;
    let lastScrollTop = 0;
    let ticking = false;

    const updateNavbar = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (nav) {
        if (scrollTop > 50) nav.classList.add("shadow-2xl", "shadow-red-500/20");
        else nav.classList.remove("shadow-2xl", "shadow-red-500/20");

        if (scrollTop > lastScrollTop && scrollTop > 500) {
          nav.style.transform = "translateY(-100%)";
        } else {
          nav.style.transform = "translateY(0)";
        }
        nav.style.transition = "transform 0.3s ease";
      }

      lastScrollTop = scrollTop;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

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
      window.removeEventListener("scroll", onScroll);
      revealObs.disconnect();
      timelineObs.disconnect();
    };
  }, []);

  return (
    <main className="text-white">
      {/* Loading Bar */}
      <div className="loading-bar" id="loadingBar" />

      {/* Flame Particles Container */}
      <div id="flames-container" className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3"
              aria-label="Go to top"
            >
              <div className="relative h-10 w-40 sm:h-11 sm:w-48">
                <Image src="/infernox-logo.png" alt="InfernoX 1.0" fill priority className="object-contain" />
              </div>
            </button>

            <div className="hidden md:flex space-x-8">
              {navLinks.map((l) => (
                <button key={l.id} onClick={() => scrollToId(l.id)} className="hover:text-red-400 transition">
                  {l.label}
                </button>
              ))}
            </div>

            <button onClick={() => setMobileOpen((s) => !s)} className="md:hidden text-red-400" aria-label="Toggle menu">
              <i className={`fas ${mobileOpen ? "fa-times" : "fa-bars"} text-2xl`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${mobileOpen ? "block" : "hidden"} md:hidden bg-gray-900/95 backdrop-blur-lg`}>
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className="block w-full text-left hover:text-red-400 transition py-2"
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
                    A structured, multi-phase hackathon: register → submit a proposal → get shortlisted → present → build
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
                <div className="text-center bg-orange-500/20 backdrop-blur-md p-4 rounded-xl border border-orange-500/30 glow-box">
                  <div className="text-3xl font-bold text-orange-400 mb-1 orbitron">6</div>
                  <div className="text-gray-200 text-sm">Tracks</div>
                </div>
              </div>
            </div>

            {/* ✅ REAL HACKATHON PHOTO CARD (put image in /public/hackathon.png) */}
            <div className="relative group scroll-reveal">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-purple-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />

              <div className="relative rounded-3xl overflow-hidden border-2 border-red-500/30 neon-border card-3d">
                <div className="relative w-full h-96">
                  <Image
                    src="/hackathon.png"
                    alt="Students collaborating during a hackathon"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-red-400 mb-3 orbitron">Build with Purpose</h3>

                  {/* ✅ Replaces arrow text with a clean “pill steps” row */}
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

                  <p className="text-gray-200/80 text-sm mt-3">
                    Collaborate, iterate, and ship something real—together.
                  </p>
                </div>
              </div>
            </div>
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

            {/* ✅ Replace arrow in subtitle too */}
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

      {/* Register */}
      <section id="register" className="py-24 px-4 hero-gradient relative flame-bg">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-red-400 font-semibold text-sm uppercase tracking-widest orbitron">Join the Battle</span>
            <h2 className="text-5xl font-bold mt-4 mb-6 orbitron">
              Register Your <span className="text-gradient-animated">Team</span>
            </h2>
            <p className="text-gray-300 text-xl">Secure your spot in the inferno</p>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-purple-500/10 p-10 rounded-3xl border-2 border-red-500/30 neon-border scroll-reveal">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl floating hexagon pulse-glow">
                <i className="fas fa-fire" />
              </div>
              <h3 className="text-3xl font-bold mb-4 orbitron text-red-400">Team Registration</h3>
              <p className="text-gray-300 text-lg">Teams of 2-4 members | Open to all school students</p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-red-500/20">
                <h4 className="text-lg font-bold text-red-400 mb-3 orbitron">What You Need:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <i className="fas fa-check text-red-400 mr-3" />
                    Team of 2-4 students from the same school
                  </li>
                  <li>
                    <i className="fas fa-check text-red-400 mr-3" />
                    Laptop for each team member
                  </li>
                  <li>
                    <i className="fas fa-check text-red-400 mr-3" />
                    Basic coding knowledge in any language
                  </li>
                  <li>
                    <i className="fas fa-check text-red-400 mr-3" />
                    Passion for innovation and problem-solving
                  </li>
                  <li>
                    <i className="fas fa-check text-red-400 mr-3" />
                    School ID for verification
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-red-500/20 to-purple-500/20 p-6 rounded-xl border border-purple-500/30">
                <div className="flex items-start gap-4">
                  <i className="fas fa-info-circle text-purple-400 text-2xl mt-1" />
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 mb-2">Registration Info</h4>
                    <p className="text-gray-300 text-sm">
                      Registration closes <span className="text-white font-semibold">Feb 28</span>. Limited spots — first
                      come, first served!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/register"
                className="inline-block btn-inferno px-12 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 mb-4"
              >
                <i className="fas fa-rocket mr-2" />
                Register Your Team Now
              </Link>
              <p className="text-gray-400 text-sm">Registration is completely FREE</p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Simple Footer (red + purple accents, no color change) */}
      <footer className="bg-gray-950/80 border-t border-red-500/20">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-white font-semibold orbitron">
                InfernoX <span className="text-red-400">1.0</span>{" "}
                <span className="text-purple-400">Hackathon</span>
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Organized by <span className="text-red-400 font-semibold">Robotics Club of LNBTI</span>
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <button onClick={() => scrollToId("about")} className="text-gray-300 hover:text-red-400 transition">
                About
              </button>
              <span className="text-purple-500/60">•</span>
              <button onClick={() => scrollToId("timeline")} className="text-gray-300 hover:text-purple-400 transition">
                Timeline
              </button>
              <span className="text-purple-500/60">•</span>
              <button onClick={() => scrollToId("register")} className="text-gray-300 hover:text-red-400 transition">
                Register
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} InfernoX 1.0 • All rights reserved
          </div>
        </div>
      </footer>
    </main>
  );
}
