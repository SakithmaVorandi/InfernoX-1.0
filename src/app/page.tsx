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

type Prize = {
  title: string;
  amount: string;
  subtitle: string;
  icon: string;
  color: string;
  border: string;
  highlight?: boolean;
  perks?: string[];
};

type TimelineItem = {
  icon: string;
  color: string;
  title: string;
  time: string;
  text: string;
  border: string;
  titleColor: string;
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

  const timeline: TimelineItem[] = useMemo(
    () => [
      {
        icon: "1",
        color: "from-red-500 to-orange-600",
        title: "Official Launch of InfernoX 1.0",
        time: "Feb 8",
        text: "InfernoX 1.0 officially launches.",
        border: "border-red-500/30",
        titleColor: "text-red-400",
      },
      {
        icon: "2",
        color: "from-purple-500 to-pink-600",
        title: "Registrations",
        time: "Extended till Mar 24",
        text: "Registrations have been extended till March 24th. Teams must register and confirm participation before the final deadline.",
        border: "border-purple-500/30",
        titleColor: "text-purple-400",
      },
      {
        icon: "3",
        color: "from-blue-500 to-cyan-600",
        title: "Introduction Session (Online)",
        time: "Mar 25",
        text: "All registered students must participate in the first Introduction Session.",
        border: "border-blue-500/30",
        titleColor: "text-blue-400",
      },
      {
        icon: "4",
        color: "from-green-500 to-teal-600",
        title: "Proposal Submission Deadline",
        time: "Apr 7",
        text: "Teams must submit their proposal presentation together with a 15-minute proposal explanation recording before the deadline.",
        border: "border-green-500/30",
        titleColor: "text-green-400",
      },
      {
        icon: "5",
        color: "from-orange-500 to-red-600",
        title: "Announcement of First Round Winners",
        time: "Apr 10",
        text: "The first round winners will be officially announced after the proposal evaluation process is completed.",
        border: "border-orange-500/30",
        titleColor: "text-orange-400",
      },
      {
        icon: "II",
        color: "from-yellow-500 to-orange-600",
        title: "Final Event / Project Demonstration",
        time: "Expected: May 30 – Jun 5",
        text: "Finalists will demonstrate their working solutions and compete for awards during the final event.",
        border: "border-yellow-500/30",
        titleColor: "text-yellow-400",
      },
    ],
    []
  );

  const prizes: Prize[] = useMemo(
    () => [
      {
        title: "1st Prize",
        amount: "LKR 500,000",
        subtitle: "Grand Champion",
        icon: "fa-trophy",
        color: "from-yellow-400 to-orange-500",
        border: "border-yellow-400/40",
        highlight: true,
        perks: ["Winner Certificate", "Stage Recognition", "Top Spotlight"],
      },
      {
        title: "2nd Prize",
        amount: "LKR 350,000",
        subtitle: "First Runner-up",
        icon: "fa-medal",
        color: "from-gray-200 to-gray-500",
        border: "border-gray-400/40",
        perks: ["Winner Certificate", "Stage Recognition"],
      },
      {
        title: "3rd Prize",
        amount: "LKR 150,000",
        subtitle: "Second Runner-up",
        icon: "fa-award",
        color: "from-orange-400 to-red-500",
        border: "border-orange-400/40",
        perks: ["Winner Certificate", "Recognition"],
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
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 group"
              aria-label="Go to top"
            >
              <div className="relative h-8 w-36 sm:h-9 sm:w-40 transition-transform duration-300 group-hover:scale-105">
                <Image src="/infernox-logo.png" alt="InfernoX 1.0" fill priority className="object-contain" />
              </div>
            </button>

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

            <div className="flex items-center gap-2">
              <div className="relative w-19 h-10 shadow-sm shadow-black/30 overflow-hidden flex items-center justify-center">
                <Image src="/lnbtilogo.png" alt="LNBTI" fill className="object-contain p-1" />
              </div>
              <div className="relative w-13 h-10 shadow-sm shadow-black/20 overflow-hidden flex items-center justify-center">
                <Image src="/roboticsclub.png" alt="Robotics Club" fill className="object-contain p-1" />
              </div>
            </div>

            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="md:hidden text-red-300 hover:text-orange-300 transition-colors"
              aria-label="Toggle menu"
            >
              <i className={`fas ${mobileOpen ? "fa-times" : "fa-bars"} text-xl`} />
            </button>
          </div>
        </div>

        <div
          className={`${
            mobileOpen ? "block animate-slideDown" : "hidden"
          } md:hidden bg-slate-950/75 backdrop-blur-xl border-t border-white/10 shadow-2xl shadow-black/30`}
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

          <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-5 py-2 text-sm text-orange-200">
            <i className="fas fa-bullhorn text-orange-300" />
            Registrations extended till March 24th
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
              <span>Registration Deadline: March 24</span>
            </div>
            <div
              className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-500/30 glow-box floating"
              style={{ animationDelay: "0.5s" }}
            >
              <i className="fas fa-video text-purple-400" />
              <span>Introduction Session: March 25</span>
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
              onClick={() => scrollToId("timeline")}
              className="border-2 border-red-400 px-10 py-4 rounded-full font-bold text-lg hover:bg-red-400/10 transition-all duration-300 relative overflow-hidden group btn-inferno"
            >
              <span className="relative z-10">
                <i className="fas fa-calendar-days mr-2" />
                View Important Dates
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
                    A structured hackathon experience: register, attend the introduction session, submit a proposal with a
                    recording, get shortlisted, and move toward the next round.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center bg-red-500/20 backdrop-blur-md p-4 rounded-xl border border-red-500/30 glow-box">
                  <div className="text-3xl font-bold text-red-400 mb-1 orbitron">50+</div>
                  <div className="text-gray-200 text-sm">Teams</div>
                </div>
                <div className="text-center bg-purple-500/20 backdrop-blur-md p-4 rounded-xl border border-purple-500/30 glow-box">
                  <div className="text-3xl font-bold text-purple-400 mb-1 orbitron">4</div>
                  <div className="text-gray-200 text-sm">Key Dates</div>
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
                  <Image
                    src="/hackathon.jpg"
                    alt="Students collaborating during a hackathon"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-red-400 mb-3 orbitron">Build with Purpose</h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-gray-100">
                      Register
                    </span>
                    <span className="text-purple-300/90">•</span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-gray-100">
                      Session
                    </span>
                    <span className="text-purple-300/90">•</span>
                    <span className="px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-gray-100">
                      Proposal
                    </span>
                  </div>

                  <p className="text-gray-200/80 text-sm mt-3">Collaborate, iterate, and pitch something meaningful.</p>
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
              Competitive <span className="text-gradient-animated">Tracks</span>
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-red-400 font-semibold text-sm uppercase tracking-widest orbitron">
              Official Schedule
            </span>
            <h2 className="text-5xl font-bold mt-4 mb-6 orbitron">
              Important Dates & <span className="text-gradient-animated">Information</span>
            </h2>
            <p className="text-gray-300 text-xl">
              Launch • Registration • Introduction Session • Proposal • First Round • Finals
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

          {/* Important Notice */}
          <div className="mt-12 scroll-reveal">
            <div className="mx-auto max-w-4xl rounded-3xl border border-orange-400/25 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-purple-500/10 backdrop-blur-sm p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400/20 to-red-500/20 border border-orange-300/20 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-circle-info text-orange-300 text-lg" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-flex items-center rounded-full border border-orange-300/20 bg-orange-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-orange-200 orbitron">
                      Must Read
                    </span>
                    <h3 className="text-2xl font-bold orbitron text-orange-300 leading-tight">
                      Important Notice
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                      <p className="text-gray-100 leading-relaxed">
                        All registered students must participate in the first{" "}
                        <span className="text-white font-semibold">Introduction Session</span>.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                      <p className="text-gray-300 leading-relaxed">
                        Further information, including{" "}
                        <span className="text-orange-200 font-medium">submission links</span>,{" "}
                        <span className="text-orange-200 font-medium">guidelines</span>,{" "}
                        <span className="text-orange-200 font-medium">additional instructions</span>, and{" "}
                        <span className="text-orange-200 font-medium">sample materials</span> will be provided during the
                        Introduction Session.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section id="prizes" className="py-24 px-4 hero-gradient relative flame-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-5 scroll-reveal">
            <span className="text-red-400 font-semibold text-sm uppercase tracking-widest orbitron">Awards</span>
            <h2 className="text-5xl font-bold mt-4 mb-1 orbitron">
              Prizes & <span className="text-gradient-animated">Recognition</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              All <span className="text-purple-300 font-semibold">Finalists</span> will receive a{" "}
              <span className="text-red-300 font-semibold">Finalist Certificate</span>. All{" "}
              <span className="text-orange-300 font-semibold">Winners</span> will receive a{" "}
              <span className="text-red-300 font-semibold">Winner Certificate</span>.
            </p>
          </div>

          <div className="mb-2 scroll-reveal">
            <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-orange-500/10 px-5 py-3 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-200/90">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/10">
                  <i className="fas fa-certificate text-red-300" />
                  Finalist Certificates
                </span>
                <span className="text-gray-500">•</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/10">
                  <i className="fas fa-award text-orange-300" />
                  Winner Certificates
                </span>
                <span className="text-gray-500">•</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/10">
                  <i className="fas fa-bolt text-purple-300" />
                  Stage Recognition
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {prizes.map((p) => (
              <div
                key={p.title}
                className={`relative scroll-reveal bg-gray-800/45 backdrop-blur-sm p-7 rounded-2xl border ${
                  p.border
                } glow-box card-3d overflow-hidden ${p.highlight ? "ring-1 ring-yellow-400/25" : ""}`}
              >
                <div
                  className={`pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${p.color}`}
                />

                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl shadow-lg shadow-black/25`}
                    >
                      <i className={`fas ${p.icon}`} />
                    </div>

                    <h3 className="text-xl font-bold mt-5 orbitron text-purple-100">{p.title}</h3>
                    <p className="text-gray-300 mt-1 text-sm">{p.subtitle}</p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-[11px] text-gray-400 uppercase tracking-widest">Cash Prize</div>
                    <div className="mt-2 leading-none">
                      <div className="orbitron text-gray-200/80 font-bold text-sm">LKR</div>
                      <div className="orbitron font-black text-3xl text-white">{p.amount.replace("LKR", "").trim()}</div>
                    </div>
                  </div>
                </div>

                {p.perks?.length ? (
                  <div className="mt-5 grid gap-2">
                    {p.perks.map((perk) => (
                      <div
                        key={perk}
                        className="flex items-center gap-2 rounded-xl bg-black/20 border border-white/10 px-3 py-2 text-sm text-gray-200/90"
                      >
                        <i className="fas fa-check text-red-300 text-xs" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-900/50 border border-red-500/20 text-gray-200">
                    Winner Certificate
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-900/50 border border-purple-500/20 text-gray-200">
                    Recognition
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center scroll-reveal">
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
      <section id="register" className="py-12 px-4 hero-gradient relative flame-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 scroll-reveal">
            <span className="text-red-400 font-semibold text-sm uppercase tracking-widest orbitron">Join the Battle</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-2 orbitron">
              Register Your <span className="text-gradient-animated">Team</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg">Registrations extended till March 24th</p>
          </div>

          <div className="mb-4 scroll-reveal">
            <div className="mx-auto max-w-4xl rounded-2xl border border-orange-400/25 bg-orange-500/10 px-5 py-3 text-center backdrop-blur-sm">
              <p className="text-orange-200 font-medium">
                <i className="fas fa-bullhorn mr-2 text-orange-300" />
                Registration deadline has been extended to <span className="text-white font-bold">24th March</span>.
              </p>
            </div>
          </div>

          <div className="relative scroll-reveal">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-500/25 via-orange-500/10 to-purple-500/20 blur-xl" />
            <div className="relative rounded-3xl border border-red-500/25 bg-gradient-to-br from-red-500/10 via-gray-900/30 to-purple-500/10 p-5 md:p-6 overflow-hidden">
              <div className="pointer-events-none absolute -top-24 left-[-25%] h-48 w-[55%] rotate-12 bg-white/10 blur-2xl opacity-30" />

              <div className="grid lg:grid-cols-3 gap-4 items-stretch">
                {/* Column 1 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 flex flex-col h-full">
                  <div className="flex items-start gap-3">
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

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-red-500/15 border border-red-500/25 text-gray-100 text-xs">
                      FREE
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-gray-100 text-xs">
                      Limited Spots
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-200 text-xs">
                      Deadline: March 24
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-black/20 border border-white/10 py-2 px-1">
                      <div className="text-xs font-bold text-red-300 orbitron">2–5</div>
                      <div className="text-[11px] text-gray-300">Members</div>
                    </div>
                    <div className="rounded-xl bg-black/20 border border-white/10 py-2 px-1">
                      <div className="text-xs font-bold text-purple-300 orbitron">5</div>
                      <div className="text-[11px] text-gray-300">Tracks</div>
                    </div>
                    <div className="rounded-xl bg-black/20 border border-white/10 py-2 px-1">
                      <div className="text-xs font-bold text-orange-300 orbitron">1</div>
                      <div className="text-[11px] text-gray-300">Intro Session</div>
                    </div>
                  </div>

                  <div className="mt-2 text-[11px] text-gray-400 bg-black/30 rounded-lg px-3 py-2 border border-white/5">
                    <i className="fas fa-clock mr-1 text-purple-300/70" />
                    Registration deadline: <span className="text-white font-medium">24th March</span> • Extended deadline
                  </div>

                  <div className="mt-auto pt-2 text-xs text-gray-400 italic border-t border-white/10">
                    <i className="fas fa-lightbulb text-yellow-300/70 mr-1" /> No registration fee
                  </div>
                </div>

                {/* Column 2 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-list-check text-red-300 text-sm" />
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-red-300 orbitron">Requirements</h4>
                  </div>

                  <ul className="grid sm:grid-cols-1 gap-2 text-gray-300 text-sm flex-grow">
                    {[
                      "2–5 students (same school)",
                      "Laptop(s) for the team",
                      "Basic coding knowledge",
                      "Attendance at the Introduction Session",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 rounded-xl bg-black/20 border border-white/10 px-3 py-2"
                      >
                        <i className="fas fa-check text-red-300 mt-0.5 text-xs flex-shrink-0" />
                        <span className="text-xs md:text-sm leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 text-[11px] text-gray-400 bg-black/30 rounded-lg px-3 py-2 border border-white/5">
                    <i className="fas fa-plug mr-1 text-red-300/70" /> Tip: Bring charger
                  </div>
                </div>

                {/* Column 3 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-info-circle text-purple-300" />
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-purple-300 orbitron mb-1">How it works</h4>
                      <p className="text-gray-300 text-xs md:text-sm">
                        Register, attend the introduction session, and submit your proposal package.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-2 text-sm flex-grow">
                    {[
                      { n: "1", t: "Register your team by March 24" },
                      { n: "2", t: "Attend the online introduction session on March 25" },
                      { n: "3", t: "Submit PPT + 15 min recording by April 7" },
                    ].map((s) => (
                      <div
                        key={s.n}
                        className="flex items-center gap-3 rounded-xl bg-black/20 border border-white/10 px-3 py-2"
                      >
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500/60 to-purple-500/60 flex items-center justify-center text-xs font-bold orbitron flex-shrink-0">
                          {s.n}
                        </div>
                        <span className="text-gray-200/90 text-xs md:text-sm">{s.t}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/register"
                    className="mt-3 block text-center btn-inferno px-6 py-3 rounded-full font-bold text-sm md:text-base hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <i className="fas fa-rocket mr-2" />
                    Register Now
                  </Link>

                  <div className="mt-2 rounded-xl bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-white/10 px-3 py-2 text-xs text-gray-300">
                    <i className="fas fa-circle-info text-red-300 mr-1" />
                    Submission links, guidelines, additional instructions, and sample materials will be shared during the{" "}
                    <span className="text-white font-semibold">Introduction Session</span>.
                  </div>
                </div>
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
                Sri Lanka&apos;s premier inter-school hackathon — empowering students to build impactful solutions through
                structured problem-solving.
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