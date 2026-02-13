"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Member = { name: string; grade: string; email?: string; phone?: string };
type Errors = Record<string, string>;

export default function RegisterPage() {
  const [teamName, setTeamName] = useState("");
  const [schoolName, setSchoolName] = useState("");

  // ✅ Team leader (required)
  const [teamLeadName, setTeamLeadName] = useState("");
  const [teamLeadPhone, setTeamLeadPhone] = useState("");
  const [teamLeadEmail, setTeamLeadEmail] = useState("");

  // ✅ Teacher in-charge (optional, but validate if any field is filled)
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");

  // ✅ UPDATED default to new "Open Innovation"
  const [track, setTrack] = useState("Open Innovation");
  const [ideaSummary, setIdeaSummary] = useState("");

  const [members, setMembers] = useState<Member[]>([
    { name: "", grade: "", email: "", phone: "" },
    { name: "", grade: "", email: "", phone: "" },
  ]);

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ UPDATED TRACKS LIST
  const tracks = useMemo(
    () => [
      "Education & Skill Development",
      "Disaster Management & Resilience",
      "Renewable Energy & Energy Efficiency",
      "AI for Post-harvest Management",
      "Open Innovation",
    ],
    []
  );

  const updateMember = (i: number, key: keyof Member, val: string) => {
    setMembers((prev) => prev.map((m, idx) => (idx === i ? { ...m, [key]: val } : m)));
  };

  const addMember = () => {
    if (members.length >= 5) return;
    setMembers((prev) => [...prev, { name: "", grade: "", email: "", phone: "" }]);
  };

  const removeMember = (i: number) => {
    if (members.length <= 2) return;
    setMembers((prev) => prev.filter((_, idx) => idx !== i));
  };

  // ---------- Validation helpers ----------
  const normalizePhone = (raw: string) => raw.replace(/\s+/g, "");

  // Accepts local + international: digits with optional leading +
  // Length: 7–15 digits (common E.164 max 15)
  const isValidPhone = (raw: string) => {
    const v = normalizePhone(raw);
    if (!v) return false;
    if (!/^\+?\d{7,15}$/.test(v)) return false;
    return true;
  };

  const isValidEmail = (raw: string) => {
    const v = raw.trim();
    if (!v) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };

  const validate = () => {
    const e: Errors = {};

    // Team
    if (!teamName.trim()) e.teamName = "Team name is required.";
    if (!schoolName.trim()) e.schoolName = "School name is required.";

    // Leader
    if (!teamLeadName.trim()) e.teamLeadName = "Team leader name is required.";
    if (!teamLeadPhone.trim()) e.teamLeadPhone = "Team leader phone is required.";
    else if (!isValidPhone(teamLeadPhone)) e.teamLeadPhone = "Enter a valid phone (digits, optional +).";
    if (!teamLeadEmail.trim()) e.teamLeadEmail = "Team leader email is required.";
    else if (!isValidEmail(teamLeadEmail)) e.teamLeadEmail = "Enter a valid email.";

    // Track (safety)
    if (!track.trim()) e.track = "Please select a track.";

    // Idea
    if (!ideaSummary.trim()) e.ideaSummary = "Idea summary is required.";
    else if (ideaSummary.trim().length < 30) e.ideaSummary = "Idea summary is too short (write at least ~30 chars).";

    // Teacher in-charge (optional BUT validate if anything entered)
    const teacherTouched = teacherName.trim() || teacherEmail.trim() || teacherPhone.trim();
    if (teacherTouched) {
      if (!teacherName.trim()) e.teacherName = "Teacher name is required if you add teacher details.";
      if (!teacherEmail.trim()) e.teacherEmail = "Teacher email is required if you add teacher details.";
      else if (!isValidEmail(teacherEmail)) e.teacherEmail = "Enter a valid teacher email.";

      if (!teacherPhone.trim()) e.teacherPhone = "Teacher phone is required if you add teacher details.";
      else if (!isValidPhone(teacherPhone)) e.teacherPhone = "Enter a valid teacher phone (digits, optional +).";
    }

    // Members: name + grade + ✅ student phone required
    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      const idx = i + 1;

      if (!m.name?.trim()) e[`m_${i}_name`] = `Member ${idx}: name is required.`;
      if (!m.grade?.trim()) e[`m_${i}_grade`] = `Member ${idx}: grade is required.`;

      const phone = (m.phone || "").trim();
      if (!phone) e[`m_${i}_phone`] = `Member ${idx}: phone number is required.`;
      else if (!isValidPhone(phone)) e[`m_${i}_phone`] = `Member ${idx}: enter a valid phone (digits, optional +).`;

      const email = (m.email || "").trim();
      if (email && !isValidEmail(email)) e[`m_${i}_email`] = `Member ${idx}: enter a valid email or leave it blank.`;
    }

    setErrors(e);
    return Object.keys(e).length ? e : null;
  };

  const submit = async () => {
    const e = validate();
    if (e) {
      setStatus("❌ Please fix the highlighted fields and try again.");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_name: teamName.trim(),
          school_name: schoolName.trim(),
          team_lead_name: teamLeadName.trim(),
          team_lead_phone: normalizePhone(teamLeadPhone.trim()),
          team_lead_email: teamLeadEmail.trim(),
          teacher_name: teacherName.trim(),
          teacher_email: teacherEmail.trim(),
          teacher_phone: teacherPhone ? normalizePhone(teacherPhone.trim()) : "",
          track,
          idea_summary: ideaSummary.trim(),
          members: members.map((m) => ({
            ...m,
            name: m.name.trim(),
            grade: m.grade.trim(),
            email: (m.email || "").trim(),
            phone: normalizePhone((m.phone || "").trim()),
          })),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Submission failed");

      setStatus("✅ Registered successfully! We will contact you soon.");
      setErrors({});

      // reset
      setTeamName("");
      setSchoolName("");
      setTeamLeadName("");
      setTeamLeadPhone("");
      setTeamLeadEmail("");
      setTeacherName("");
      setTeacherEmail("");
      setTeacherPhone("");
      setIdeaSummary("");
      setTrack("Open Innovation");
      setMembers([
        { name: "", grade: "", email: "", phone: "" },
        { name: "", grade: "", email: "", phone: "" },
      ]);
    } catch (err: any) {
      setStatus(`❌ ${err?.message || "Something went wrong. Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (key: string, accent: "red" | "purple" = "red") => {
    const has = !!errors[key];
    const base = "w-full p-3 rounded-xl bg-black/30 outline-none transition border";
    const ok =
      accent === "red"
        ? "border-red-500/20 focus:border-red-400/60"
        : "border-purple-500/20 focus:border-purple-400/60";
    const bad = "border-red-400/70 ring-1 ring-red-400/25";
    return `${base} ${has ? bad : ok}`;
  };

  const errorText = (key: string) =>
    errors[key] ? <p className="mt-1 text-xs text-red-200">{errors[key]}</p> : null;

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-black via-[#0a0008] to-black">
      {/* Top nav (logo + partner logos) */}
      <div className="fixed top-0 inset-x-0 z-40 bg-gray-900/70 backdrop-blur-lg border-b border-red-500/20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            {/* ✅ Logo image */}
            <div className="relative h-8 w-40 sm:h-9 sm:w-44">
              <Image src="/infernox-logo.png" alt="InfernoX 1.0" fill priority className="object-contain" />
            </div>
            {/*<span className="text-xs text-gray-400 hidden sm:inline">Registration</span>*/}
          </Link>

          {/* ✅ Partner logos */}
          <div className="flex items-center gap-2">
            <div className="relative w-20 h-9 rounded-md bg-white/5 border border-white/10 shadow-sm shadow-black/20 overflow-hidden flex items-center justify-center">
              <Image src="/lnbtilogo.png" alt="LNBTI" fill className="object-contain p-1" />
            </div>

            <div className="relative w-12 h-9 rounded-md bg-white/5 border border-white/10 shadow-sm shadow-black/20 overflow-hidden flex items-center justify-center">
              <Image src="/roboticsclub.png" alt="Robotics Club" fill className="object-contain p-1" />
            </div>

            {/*<Link
              href="/"
              className="text-sm px-4 py-2 rounded-full border border-purple-500/30 hover:border-purple-400/60 hover:bg-purple-500/10 transition hidden sm:inline-flex"
            >
              ← Back to Home
            </Link>*/}
          </div>
        </div>
      </div>

      <div className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10">
              <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_18px_rgba(248,113,113,0.7)]" />
              <span className="text-sm text-red-200 tracking-wide">TEAM REGISTRATION</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mt-4 leading-tight">
              Enter the <span className="text-red-400">Inferno</span>, build with{" "}
              <span className="text-purple-400">purpose</span>.
            </h1>
            <p className="text-gray-300 mt-3">
              Fill in team details, team leader contact, and each member’s grade + phone. (2–5 members)
            </p>
          </div>

          {/* Card */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-500/25 to-purple-500/25 blur-2xl" />
            <div className="relative rounded-3xl border border-red-500/25 bg-gray-900/35 backdrop-blur-xl p-6 md:p-8">
              {/* Progress hint */}
              <div className="mb-6 flex flex-wrap gap-2">
                {["Team", "Leader", "Idea", "Members"].map((s, idx) => (
                  <span
                    key={s}
                    className={`px-3 py-1.5 rounded-full text-xs border ${
                      idx % 2 === 0
                        ? "border-red-500/30 bg-red-500/10 text-red-200"
                        : "border-purple-500/30 bg-purple-500/10 text-purple-200"
                    }`}
                  >
                    Step {idx + 1}: {s}
                  </span>
                ))}
              </div>

              <div className="grid gap-8">
                {/* Team + School */}
                <section>
                  <h2 className="text-xl font-bold mb-3">
                    Team <span className="text-red-400">Details</span>
                  </h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <input
                        className={fieldClass("teamName", "red")}
                        placeholder="Team Name *"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                      />
                      {errorText("teamName")}
                    </div>

                    <div>
                      <input
                        className={fieldClass("schoolName", "purple")}
                        placeholder="School Name *"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                      />
                      {errorText("schoolName")}
                    </div>
                  </div>
                </section>

                {/* Team leader */}
                <section>
                  <h2 className="text-xl font-bold mb-3">
                    Team Leader <span className="text-red-400">(Required)</span>
                  </h2>

                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <input
                        className={fieldClass("teamLeadName", "red")}
                        placeholder="Leader Name *"
                        value={teamLeadName}
                        onChange={(e) => setTeamLeadName(e.target.value)}
                      />
                      {errorText("teamLeadName")}
                    </div>

                    <div>
                      <input
                        className={fieldClass("teamLeadPhone", "purple")}
                        placeholder="Leader Phone * (e.g. +947XXXXXXXX)"
                        value={teamLeadPhone}
                        onChange={(e) => setTeamLeadPhone(e.target.value)}
                      />
                      {errorText("teamLeadPhone")}
                    </div>

                    <div>
                      <input
                        className={fieldClass("teamLeadEmail", "red")}
                        placeholder="Leader Email *"
                        value={teamLeadEmail}
                        onChange={(e) => setTeamLeadEmail(e.target.value)}
                      />
                      {errorText("teamLeadEmail")}
                    </div>
                  </div>

                  {/* Teacher In-charge */}
                  <div className="mt-5 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(192,132,252,0.7)]" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-purple-200">Teacher In-charge (Optional)</h3>
                        <p className="text-sm text-gray-300 mt-1">
                          If you add any teacher field, all teacher details will be validated.
                        </p>

                        <div className="grid md:grid-cols-3 gap-3 mt-3">
                          <div>
                            <input
                              className={fieldClass("teacherName", "purple")}
                              placeholder="Teacher Name"
                              value={teacherName}
                              onChange={(e) => setTeacherName(e.target.value)}
                            />
                            {errorText("teacherName")}
                          </div>

                          <div>
                            <input
                              className={fieldClass("teacherEmail", "purple")}
                              placeholder="Teacher Email"
                              value={teacherEmail}
                              onChange={(e) => setTeacherEmail(e.target.value)}
                            />
                            {errorText("teacherEmail")}
                          </div>

                          <div>
                            <input
                              className={fieldClass("teacherPhone", "purple")}
                              placeholder="Teacher Phone"
                              value={teacherPhone}
                              onChange={(e) => setTeacherPhone(e.target.value)}
                            />
                            {errorText("teacherPhone")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Track */}
                <section>
                  <h2 className="text-xl font-bold mb-3">
                    Choose a <span className="text-purple-400">Track</span>
                  </h2>

                  <select
                    className={`w-full p-3 rounded-xl bg-black/30 outline-none transition border ${
                      errors.track ? "border-red-400/70 ring-1 ring-red-400/25" : "border-purple-500/20 focus:border-purple-400/60"
                    }`}
                    value={track}
                    onChange={(e) => setTrack(e.target.value)}
                  >
                    {tracks.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errorText("track")}
                </section>

                {/* Idea */}
                <section>
                  <h2 className="text-xl font-bold mb-3">
                    Idea <span className="text-red-400">Summary</span>
                  </h2>

                  <textarea
                    className={fieldClass("ideaSummary", "red") + " min-h-[160px]"}
                    placeholder="Idea Summary * (100–200 words recommended)"
                    value={ideaSummary}
                    onChange={(e) => setIdeaSummary(e.target.value)}
                  />
                  {errorText("ideaSummary")}

                  <p className="text-xs text-gray-400 mt-2">
                    Tip: mention the problem, who it affects, and what your solution does.
                  </p>
                </section>

                {/* Members */}
                <section>
                  <div className="flex items-end justify-between gap-3 mb-3">
                    <div>
                      <h2 className="text-xl font-bold">
                        Team <span className="text-purple-400">Members</span>
                      </h2>
                      <p className="text-sm text-gray-300">
                        2–5 members. Name, grade, and{" "}
                        <span className="text-purple-200 font-semibold">student phone</span> required.
                      </p>
                    </div>

                    <button
                      onClick={addMember}
                      className="px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/15 hover:border-purple-400/60 transition text-sm"
                      type="button"
                      disabled={members.length >= 5}
                      aria-disabled={members.length >= 5}
                    >
                      + Add member
                    </button>
                  </div>

                  <div className="grid gap-3">
                    {members.map((m, i) => (
                      <div key={i} className="rounded-2xl border border-red-500/15 bg-black/25 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm text-gray-200">
                            Member <span className="text-red-400 font-semibold">{i + 1}</span>
                          </div>

                          {members.length > 2 && (
                            <button
                              onClick={() => removeMember(i)}
                              className="text-sm text-red-300 hover:text-red-200 transition"
                              type="button"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="grid md:grid-cols-4 gap-2">
                          <div>
                            <input
                              className={fieldClass(`m_${i}_name`, "red")}
                              placeholder="Name *"
                              value={m.name}
                              onChange={(e) => updateMember(i, "name", e.target.value)}
                            />
                            {errorText(`m_${i}_name`)}
                          </div>

                          <div>
                            <input
                              className={fieldClass(`m_${i}_grade`, "purple")}
                              placeholder="Grade *"
                              value={m.grade}
                              onChange={(e) => updateMember(i, "grade", e.target.value)}
                            />
                            {errorText(`m_${i}_grade`)}
                          </div>

                          <div>
                            <input
                              className={fieldClass(`m_${i}_email`, "red")}
                              placeholder="Email (optional)"
                              value={m.email || ""}
                              onChange={(e) => updateMember(i, "email", e.target.value)}
                            />
                            {errorText(`m_${i}_email`)}
                          </div>

                          <div>
                            <input
                              className={fieldClass(`m_${i}_phone`, "purple")}
                              placeholder="Phone *"
                              value={m.phone || ""}
                              onChange={(e) => updateMember(i, "phone", e.target.value)}
                            />
                            {errorText(`m_${i}_phone`)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Submit */}
                <section>
                  <button
                    disabled={loading}
                    onClick={submit}
                    className="w-full mt-1 px-5 py-3 rounded-2xl font-bold
                               bg-gradient-to-r from-red-600 to-purple-600
                               hover:from-red-500 hover:to-purple-500
                               disabled:opacity-60 transition shadow-lg shadow-red-500/20"
                    type="button"
                  >
                    {loading ? "Submitting..." : "Submit Registration"}
                  </button>

                  {status && (
                    <div
                      className={`mt-4 rounded-2xl border p-4 text-sm ${
                        status.startsWith("✅")
                          ? "border-purple-500/25 bg-purple-500/10 text-purple-100"
                          : "border-red-500/25 bg-red-500/10 text-red-100"
                      }`}
                    >
                      {status}
                    </div>
                  )}

                  <p className="text-xs text-gray-400 mt-4">
                    By submitting, you confirm your details are correct. We will contact the team leader.
                  </p>
                </section>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-10 text-center text-sm text-gray-400">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent mb-6" />
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="text-red-300">Inferno</span>
              <span className="text-purple-300">X</span> 1.0 · Robotics Club of LNBTI
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
