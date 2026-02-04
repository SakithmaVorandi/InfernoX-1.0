"use client";

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

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 80; // navbar height
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top, behavior: "smooth" });
    setMobileOpen(false);
  };

  useEffect(() => {
    // Loading Bar simulation
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
          if (entry.isIntersecting) {
            entry.target.classList.add("timeline-in");
          }
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
      {/* Global styles from your HTML */}
      <style jsx global>{`
        :root {
          --primary: #ff0040;
          --secondary: #8b00ff;
          --dark: #0a0008;
          --flame: #ff4500;
        }

        body {
          font-family: "Inter", sans-serif;
          background: var(--dark);
          overflow-x: hidden;
        }

        .orbitron {
          font-family: "Orbitron", sans-serif;
        }

        .hero-gradient {
          background: linear-gradient(
            135deg,
            #0a0008 0%,
            #1a0010 25%,
            #2d0020 50%,
            #1a0030 75%,
            #0a0008 100%
          );
          position: relative;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary), var(--flame), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .text-gradient-animated {
          background: linear-gradient(
            135deg,
            var(--primary),
            var(--flame),
            var(--secondary),
            var(--primary)
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s ease infinite;
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .glow-box {
          box-shadow: 0 0 40px rgba(255, 0, 64, 0.4);
          transition: all 0.3s ease;
        }
        .glow-box:hover {
          box-shadow: 0 0 60px rgba(255, 0, 64, 0.6), 0 0 100px rgba(139, 0, 255, 0.3);
          transform: translateY(-5px);
        }

        .floating {
          animation: floating 6s ease-in-out infinite;
        }
        @keyframes floating {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(2deg);
          }
          50% {
            transform: translateY(-20px) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(-2deg);
          }
        }

        .flame-bg {
          background-image: radial-gradient(circle at 20% 50%, rgba(255, 0, 64, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(139, 0, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(255, 69, 0, 0.1) 0%, transparent 50%);
        }

        .neon-border {
          border: 2px solid var(--primary);
          box-shadow: 0 0 20px rgba(255, 0, 64, 0.5), inset 0 0 20px rgba(255, 0, 64, 0.1);
        }

        .neon-border-purple {
          border: 2px solid var(--secondary);
          box-shadow: 0 0 20px rgba(139, 0, 255, 0.5), inset 0 0 20px rgba(139, 0, 255, 0.1);
        }

        .flame-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(to top, var(--flame), var(--primary));
          border-radius: 50%;
          pointer-events: none;
          animation: flame-rise 3s ease-in infinite;
          box-shadow: 0 0 15px rgba(255, 69, 0, 0.8);
        }

        @keyframes flame-rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
          }
        }

        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 0, 64, 0.5), 0 0 40px rgba(139, 0, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 0, 64, 0.8), 0 0 80px rgba(139, 0, 255, 0.5);
          }
        }

        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.5s ease, box-shadow 0.5s ease;
          perspective: 1000px;
        }
        .card-3d:hover {
          transform: translateY(-10px) rotateY(5deg) rotateX(5deg);
        }

        .scan-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          opacity: 0.3;
          animation: scan 4s linear infinite;
          pointer-events: none;
        }
        @keyframes scan {
          0% {
            top: 0%;
          }
          100% {
            top: 100%;
          }
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease;
        }
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .btn-inferno {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, var(--primary), var(--flame));
        }
        .btn-inferno::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }
        .btn-inferno:hover::before {
          left: 100%;
        }

        .hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }

        .fire-text {
          text-shadow: 0 0 20px rgba(255, 0, 64, 0.8), 0 0 40px rgba(255, 69, 0, 0.6),
            0 0 60px rgba(139, 0, 255, 0.4);
          animation: fire-flicker 2s infinite alternate;
        }

        @keyframes fire-flicker {
          0%,
          100% {
            text-shadow: 0 0 20px rgba(255, 0, 64, 0.8), 0 0 40px rgba(255, 69, 0, 0.6),
              0 0 60px rgba(139, 0, 255, 0.4);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 0, 64, 1), 0 0 60px rgba(255, 69, 0, 0.8),
              0 0 90px rgba(139, 0, 255, 0.6);
          }
        }

        .loading-bar {
          width: 0%;
          height: 4px;
          background: linear-gradient(90deg, var(--primary), var(--flame), var(--secondary));
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10000;
          transition: width 0.3s ease;
        }

        /* Timeline items animation (React version) */
        .timeline-item {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.45s ease, transform 0.45s ease;
        }
        .timeline-item.timeline-in {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      {/* Loading Bar */}
      <div className="loading-bar" id="loadingBar" />

      {/* Flame Particles Container */}
      <div id="flames-container" className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl font-black hexagon pulse-glow">
                <i className="fas fa-fire" />
              </div>
              <span className="text-2xl font-bold orbitron gradient-text">InfernoX 1.0</span>
            </div>

            <div className="hidden md:flex space-x-8">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollToId(l.id)}
                  className="hover:text-red-400 transition"
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button onClick={() => setMobileOpen((s) => !s)} className="md:hidden text-red-400">
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
              <span>[Event Date]</span>
            </div>
            <div
              className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-500/30 glow-box floating"
              style={{ animationDelay: "0.5s" }}
            >
              <i className="fas fa-clock text-purple-400" />
              <span>24 Hours</span>
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
                <span className="text-red-400 font-bold">InfernoX 1.0</span> is an intense,
                high-energy inter-school hackathon where young minds build innovative solutions.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                This 24-hour coding marathon challenges students to think creatively and present boldly.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                All skill levels welcome. Bring your ideas, your team, and your determination!
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center bg-red-500/20 backdrop-blur-md p-4 rounded-xl border border-red-500/30 glow-box">
                  <div className="text-3xl font-bold text-red-400 mb-1 orbitron">50+</div>
                  <div className="text-gray-200 text-sm">Teams</div>
                </div>
                <div className="text-center bg-purple-500/20 backdrop-blur-md p-4 rounded-xl border border-purple-500/30 glow-box">
                  <div className="text-3xl font-bold text-purple-400 mb-1 orbitron">24</div>
                  <div className="text-gray-200 text-sm">Hours</div>
                </div>
                <div className="text-center bg-orange-500/20 backdrop-blur-md p-4 rounded-xl border border-orange-500/30 glow-box">
                  <div className="text-3xl font-bold text-orange-400 mb-1 orbitron">5</div>
                  <div className="text-gray-200 text-sm">Tracks</div>
                </div>
              </div>
            </div>

            <div className="relative group scroll-reveal">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-purple-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-red-500/30 neon-border card-3d">
                <div className="w-full h-96 bg-gradient-to-br from-red-900/50 via-purple-900/50 to-orange-900/50 flex items-center justify-center">
                  <i className="fas fa-fire text-9xl text-red-400 floating" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-red-400 mb-2 orbitron">Code in the Heat</h3>
                  <p className="text-gray-200">Experience the ultimate coding challenge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks (same structure as your HTML; kept) */}
      <section id="tracks" className="py-24 px-4 hero-gradient relative flame-bg">
        <div className="scan-line" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-red-400 font-semibold text-sm uppercase tracking-widest orbitron">
              Choose Your Battle
            </span>
            <h2 className="text-5xl font-bold mt-4 mb-6 orbitron">
              Competition <span className="text-gradient-animated">Tracks</span>
            </h2>
            <p className="text-gray-300 text-xl">Pick your domain and dominate</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI */}
            <div className="glow-box bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-red-500/30 neon-border text-center card-3d scroll-reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl floating hexagon pulse-glow">
                <i className="fas fa-brain" />
              </div>
              <h3 className="text-2xl font-bold mb-4 orbitron text-red-400">AI & Machine Learning</h3>
              <p className="text-gray-300 mb-4">Build intelligent solutions using AI technologies</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs">Python</span>
                <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs">TensorFlow</span>
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs">ML</span>
              </div>
            </div>

            {/* Web */}
            <div className="glow-box bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-purple-500/30 neon-border-purple text-center card-3d scroll-reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl floating hexagon pulse-glow">
                <i className="fas fa-globe" />
              </div>
              <h3 className="text-2xl font-bold mb-4 orbitron text-purple-400">Web Development</h3>
              <p className="text-gray-300 mb-4">Create stunning, functional web apps</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">React</span>
                <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs">Node.js</span>
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">Full-Stack</span>
              </div>
            </div>

            {/* Mobile */}
            <div className="glow-box bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-orange-500/30 text-center card-3d scroll-reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl floating hexagon pulse-glow">
                <i className="fas fa-mobile-alt" />
              </div>
              <h3 className="text-2xl font-bold mb-4 orbitron text-orange-400">Mobile Apps</h3>
              <p className="text-gray-300 mb-4">Develop innovative mobile solutions</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs">Flutter</span>
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs">React Native</span>
                <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs">iOS/Android</span>
              </div>
            </div>

            {/* Cyber */}
            <div className="glow-box bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-green-500/30 text-center card-3d scroll-reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl floating hexagon pulse-glow">
                <i className="fas fa-shield-alt" />
              </div>
              <h3 className="text-2xl font-bold mb-4 orbitron text-green-400">Cybersecurity</h3>
              <p className="text-gray-300 mb-4">Protect, defend, and secure systems</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs">Encryption</span>
                <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs">Pentesting</span>
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs">Security</span>
              </div>
            </div>

            {/* IoT */}
            <div className="glow-box bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-blue-500/30 text-center card-3d scroll-reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl floating hexagon pulse-glow">
                <i className="fas fa-database" />
              </div>
              <h3 className="text-2xl font-bold mb-4 orbitron text-blue-400">IoT & Hardware</h3>
              <p className="text-gray-300 mb-4">Merge code with physical devices</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">Arduino</span>
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs">Raspberry Pi</span>
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">Sensors</span>
              </div>
            </div>

            {/* Open Innovation */}
            <div className="glow-box bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-yellow-500/30 text-center card-3d scroll-reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl floating hexagon pulse-glow">
                <i className="fas fa-lightbulb" />
              </div>
              <h3 className="text-2xl font-bold mb-4 orbitron text-yellow-400">Open Innovation</h3>
              <p className="text-gray-300 mb-4">Build anything your mind imagines</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs">Any Tech</span>
                <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs">Your Choice</span>
                <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs">Be Creative</span>
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
              Event Schedule
            </span>
            <h2 className="text-5xl font-bold mt-4 mb-6 orbitron">
              Hackathon <span className="text-gradient-animated">Timeline</span>
            </h2>
            <p className="text-gray-300 text-xl">24 hours of intense coding</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-purple-500 to-orange-500 rounded-full" />

            <div className="space-y-12">
              {[
                { icon: "DAY 1", color: "from-red-500 to-orange-600", title: "Opening Ceremony", time: "9:00 AM - 10:00 AM", text: "Registration, team formation, and kickoff", border: "border-red-500/30", titleColor: "text-red-400" },
                { iconFa: "fa-code", color: "from-purple-500 to-pink-600", title: "Hacking Begins!", time: "10:00 AM - Teams start building", text: "24 hours of non-stop coding starts now", border: "border-purple-500/30", titleColor: "text-purple-400" },
                { iconFa: "fa-users", color: "from-green-500 to-teal-600", title: "Workshops & Mentorship", time: "Throughout the event", text: "Industry experts available for guidance", border: "border-green-500/30", titleColor: "text-green-400" },
                { iconFa: "fa-moon", color: "from-orange-500 to-red-600", title: "Midnight Fuel", time: "12:00 AM - Keep the fire burning!", text: "Snacks, energy drinks, and team check-ins", border: "border-orange-500/30", titleColor: "text-orange-400" },
                { icon: "DAY 2", color: "from-blue-500 to-cyan-600", title: "Final Push", time: "8:00 AM - 10:00 AM", text: "Last hours to polish your project", border: "border-blue-500/30", titleColor: "text-blue-400" },
                { iconFa: "fa-upload", color: "from-yellow-500 to-orange-600", title: "Project Submissions", time: "10:00 AM - Deadline!", text: "Submit your final projects and presentations", border: "border-yellow-500/30", titleColor: "text-yellow-400" },
                { iconFa: "fa-gavel", color: "from-pink-500 to-purple-600", title: "Judging & Demos", time: "11:00 AM - 1:00 PM", text: "Present your solution to the judges", border: "border-pink-500/30", titleColor: "text-pink-400" },
                { iconFa: "fa-trophy", color: "from-red-500 to-purple-600", title: "Awards & Closing", time: "2:00 PM - Celebrate the champions!", text: "Winners announced, prizes distributed", border: "border-red-500/30", titleColor: "text-red-400" },
              ].map((t, idx) => (
                <div key={idx} className="flex gap-8 items-start relative timeline-item">
                  <div className={`w-16 h-16 bg-gradient-to-br ${t.color} rounded-2xl flex items-center justify-center text-sm font-bold orbitron flex-shrink-0 z-10 pulse-glow`}>
                    {t.icon ? (
                      t.icon
                    ) : (
                      <i className={`fas ${t.iconFa} text-xl`} />
                    )}
                  </div>

                  <div className={`flex-1 bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border ${t.border} glow-box`}>
                    <h3 className={`text-2xl font-bold mb-2 orbitron ${t.titleColor}`}>{t.title}</h3>
                    <p className="text-gray-300 mb-2">{t.text}</p>
                    <div className="text-sm text-gray-200/80">{t.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prizes (shortened text but same look) */}
      <section id="prizes" className="py-24 px-4 hero-gradient relative flame-bg">
        <div className="scan-line" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-red-400 font-semibold text-sm uppercase tracking-widest orbitron">What You'll Win</span>
            <h2 className="text-5xl font-bold mt-4 mb-6 orbitron">
              Epic <span className="text-gradient-animated">Prizes</span>
            </h2>
            <p className="text-gray-300 text-xl">Rewards for the coding champions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* 1st */}
            <div
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-10 rounded-3xl border-2 border-yellow-500/50 text-center card-3d glow-box scroll-reveal"
              style={{ boxShadow: "0 0 60px rgba(255, 215, 0, 0.4)" }}
            >
              <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl floating hexagon pulse-glow">
                <i className="fas fa-crown" />
              </div>
              <h3 className="text-3xl font-bold mb-4 orbitron text-yellow-400">1st Place</h3>
              <div className="text-5xl font-black text-white mb-6 orbitron">$500</div>
              <ul className="space-y-3 text-gray-200">
                <li><i className="fas fa-check-circle text-yellow-400 mr-2" />Cash Prize</li>
                <li><i className="fas fa-check-circle text-yellow-400 mr-2" />Winner Trophy</li>
                <li><i className="fas fa-check-circle text-yellow-400 mr-2" />Certificates</li>
                <li><i className="fas fa-check-circle text-yellow-400 mr-2" />Internship Opportunities</li>
                <li><i className="fas fa-check-circle text-yellow-400 mr-2" />Mentorship Program</li>
              </ul>
            </div>

            {/* 2nd */}
            <div
              className="bg-gradient-to-br from-gray-400/20 to-gray-500/20 p-10 rounded-3xl border-2 border-gray-400/50 text-center card-3d glow-box scroll-reveal"
              style={{ boxShadow: "0 0 60px rgba(192, 192, 192, 0.4)" }}
            >
              <div className="w-28 h-28 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl floating hexagon pulse-glow">
                <i className="fas fa-medal" />
              </div>
              <h3 className="text-3xl font-bold mb-4 orbitron text-gray-300">2nd Place</h3>
              <div className="text-5xl font-black text-white mb-6 orbitron">$300</div>
              <ul className="space-y-3 text-gray-200">
                <li><i className="fas fa-check-circle text-gray-400 mr-2" />Cash Prize</li>
                <li><i className="fas fa-check-circle text-gray-400 mr-2" />Runner-up Trophy</li>
                <li><i className="fas fa-check-circle text-gray-400 mr-2" />Certificates</li>
                <li><i className="fas fa-check-circle text-gray-400 mr-2" />Tech Swag</li>
                <li><i className="fas fa-check-circle text-gray-400 mr-2" />Workshop Access</li>
              </ul>
            </div>

            {/* 3rd */}
            <div
              className="bg-gradient-to-br from-orange-600/20 to-red-600/20 p-10 rounded-3xl border-2 border-orange-500/50 text-center card-3d glow-box scroll-reveal"
              style={{ boxShadow: "0 0 60px rgba(205, 127, 50, 0.4)" }}
            >
              <div className="w-28 h-28 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl floating hexagon pulse-glow">
                <i className="fas fa-award" />
              </div>
              <h3 className="text-3xl font-bold mb-4 orbitron text-orange-400">3rd Place</h3>
              <div className="text-5xl font-black text-white mb-6 orbitron">$200</div>
              <ul className="space-y-3 text-gray-200">
                <li><i className="fas fa-check-circle text-orange-400 mr-2" />Cash Prize</li>
                <li><i className="fas fa-check-circle text-orange-400 mr-2" />Recognition Trophy</li>
                <li><i className="fas fa-check-circle text-orange-400 mr-2" />Certificates</li>
                <li><i className="fas fa-check-circle text-orange-400 mr-2" />Tech Swag</li>
                <li><i className="fas fa-check-circle text-orange-400 mr-2" />Community Access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Register section (IMPORTANT: link to /register page) */}
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
                  <li><i className="fas fa-check text-red-400 mr-3" />Team of 2-4 students from the same school</li>
                  <li><i className="fas fa-check text-red-400 mr-3" />Laptop for each team member</li>
                  <li><i className="fas fa-check text-red-400 mr-3" />Basic coding knowledge in any language</li>
                  <li><i className="fas fa-check text-red-400 mr-3" />Passion for innovation and problem-solving</li>
                  <li><i className="fas fa-check text-red-400 mr-3" />School ID for verification</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-red-500/20 to-purple-500/20 p-6 rounded-xl border border-purple-500/30">
                <div className="flex items-start gap-4">
                  <i className="fas fa-info-circle text-purple-400 text-2xl mt-1" />
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 mb-2">Registration Info</h4>
                    <p className="text-gray-300 text-sm">
                      Registration closes [Date]. Limited spots available - first come, first served!
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

      {/* Footer (short but same vibe) */}
      <footer className="bg-gray-950 text-gray-400 py-12 px-4 border-t border-red-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="border-t border-gray-800 pt-8 text-center scroll-reveal">
            <p className="text-sm">
              &copy; 2025 InfernoX 1.0. Organized by{" "}
              <span className="text-red-400 font-semibold">Robotics Club of LNBTI</span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
