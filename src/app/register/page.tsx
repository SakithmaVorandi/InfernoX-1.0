"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Member = { name: string; grade: string; email?: string; phone?: string };

export default function RegisterPage() {
  const [teamName, setTeamName] = useState("");
  const [schoolName, setSchoolName] = useState("");

  // ✅ Team leader (required)
  const [teamLeadName, setTeamLeadName] = useState("");
  const [teamLeadPhone, setTeamLeadPhone] = useState("");
  const [teamLeadEmail, setTeamLeadEmail] = useState("");

  // Optional teacher
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");

  const [track, setTrack] = useState("Open Innovation");
  const [ideaSummary, setIdeaSummary] = useState("");

  const [members, setMembers] = useState<Member[]>([
    { name: "", grade: "", email: "", phone: "" },
    { name: "", grade: "", email: "", phone: "" },
  ]);

  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const tracks = useMemo(
    () => [
      "AI for Social Impact",
      "AI for Sustainability & Environment",
      "AI for Food & Agriculture",
      "AI for Post-Harvest Management",
      "Open AI Innovation",
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

  const validate = () => {
    if (!teamName.trim()) return "Team name is required.";
    if (!schoolName.trim()) return "School name is required.";
    if (!teamLeadName.trim()) return "Team leader name is required.";
    if (!teamLeadPhone.trim()) return "Team leader phone is required.";
    if (!teamLeadEmail.trim()) return "Team leader email is required.";
    if (!ideaSummary.trim()) return "Idea summary is required.";

    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      if (!m.name.trim()) return `Member ${i + 1}: name is required.`;
      if (!m.grade.trim()) return `Member ${i + 1}: grade is required.`;
    }

    return null;
  };

  const submit = async () => {
    const err = validate();
    if (err) {
      setStatus(`❌ ${err}`);
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_name: teamName,
          school_name: schoolName,
          team_lead_name: teamLeadName,
          team_lead_phone: teamLeadPhone,
          team_lead_email: teamLeadEmail,
          teacher_name: teacherName,
          teacher_email: teacherEmail,
          teacher_phone: teacherPhone,
          track,
          idea_summary: ideaSummary,
          members,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Submission failed");
      }

      setStatus("✅ Registered successfully! We will contact you soon.");

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
    } catch (e: any) {
      setStatus(`❌ ${e?.message || "Something went wrong. Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-black via-[#0a0008] to-black">
      {/* Top nav (simple) */}
      <div className="fixed top-0 inset-x-0 z-40 bg-gray-900/70 backdrop-blur-lg border-b border-red-500/20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black tracking-wide">
              <span className="text-red-400">Inferno</span>
              <span className="text-purple-400">X</span>
            </span>
            <span className="text-xs text-gray-400">Registration</span>
          </Link>

          <Link
            href="/"
            className="text-sm px-4 py-2 rounded-full border border-purple-500/30 hover:border-purple-400/60 hover:bg-purple-500/10 transition"
          >
            ← Back to Home
          </Link>
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
              Fill in team details, team leader contact, and each member’s grade. (2–5 members)
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
                    <input
                      className="p-3 rounded-xl bg-black/30 border border-red-500/20 focus:border-red-400/60 outline-none transition"
                      placeholder="Team Name *"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                    <input
                      className="p-3 rounded-xl bg-black/30 border border-purple-500/20 focus:border-purple-400/60 outline-none transition"
                      placeholder="School Name *"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                    />
                  </div>
                </section>

                {/* Team leader */}
                <section>
                  <h2 className="text-xl font-bold mb-3">
                    Team Leader <span className="text-red-400">(Required)</span>
                  </h2>
                  <div className="grid md:grid-cols-3 gap-3">
                    <input
                      className="p-3 rounded-xl bg-black/30 border border-red-500/20 focus:border-red-400/60 outline-none transition"
                      placeholder="Leader Name *"
                      value={teamLeadName}
                      onChange={(e) => setTeamLeadName(e.target.value)}
                    />
                    <input
                      className="p-3 rounded-xl bg-black/30 border border-purple-500/20 focus:border-purple-400/60 outline-none transition"
                      placeholder="Leader Phone *"
                      value={teamLeadPhone}
                      onChange={(e) => setTeamLeadPhone(e.target.value)}
                    />
                    <input
                      className="p-3 rounded-xl bg-black/30 border border-red-500/20 focus:border-red-400/60 outline-none transition"
                      placeholder="Leader Email *"
                      value={teamLeadEmail}
                      onChange={(e) => setTeamLeadEmail(e.target.value)}
                    />
                  </div>

                  {/* Optional teacher */}
                  <div className="mt-5 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(192,132,252,0.7)]" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-purple-200">Teacher In-charge (Optional)</h3>
                        <p className="text-sm text-gray-300 mt-1">
                          If a teacher is coordinating, add details below.
                        </p>
                        <div className="grid md:grid-cols-3 gap-3 mt-3">
                          <input
                            className="p-3 rounded-xl bg-black/30 border border-purple-500/20 focus:border-purple-400/60 outline-none transition"
                            placeholder="Teacher Name"
                            value={teacherName}
                            onChange={(e) => setTeacherName(e.target.value)}
                          />
                          <input
                            className="p-3 rounded-xl bg-black/30 border border-purple-500/20 focus:border-purple-400/60 outline-none transition"
                            placeholder="Teacher Email"
                            value={teacherEmail}
                            onChange={(e) => setTeacherEmail(e.target.value)}
                          />
                          <input
                            className="p-3 rounded-xl bg-black/30 border border-purple-500/20 focus:border-purple-400/60 outline-none transition"
                            placeholder="Teacher Phone"
                            value={teacherPhone}
                            onChange={(e) => setTeacherPhone(e.target.value)}
                          />
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
                    className="w-full p-3 rounded-xl bg-black/30 border border-purple-500/20 focus:border-purple-400/60 outline-none transition"
                    value={track}
                    onChange={(e) => setTrack(e.target.value)}
                  >
                    {tracks.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </section>

                {/* Idea */}
                <section>
                  <h2 className="text-xl font-bold mb-3">
                    Idea <span className="text-red-400">Summary</span>
                  </h2>

                  {/* ✅ replace arrows with pill steps (no color change) */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1.5 rounded-full text-xs border border-red-500/30 bg-red-500/10 text-red-200">
                      Problem
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="px-3 py-1.5 rounded-full text-xs border border-purple-500/30 bg-purple-500/10 text-purple-200">
                      Proposal
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="px-3 py-1.5 rounded-full text-xs border border-red-500/30 bg-red-500/10 text-red-200">
                      | Final Demo
                    </span>
                  </div>

                  <textarea
                    className="w-full p-3 rounded-xl bg-black/30 border border-red-500/20 focus:border-red-400/60 outline-none transition min-h-[160px]"
                    placeholder="Idea Summary * (100–200 words recommended)"
                    value={ideaSummary}
                    onChange={(e) => setIdeaSummary(e.target.value)}
                  />
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
                      <p className="text-sm text-gray-300">2–5 members. Name & grade required.</p>
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
                          <input
                            className="p-2.5 rounded-xl bg-black/35 border border-red-500/15 focus:border-red-400/60 outline-none transition"
                            placeholder="Name *"
                            value={m.name}
                            onChange={(e) => updateMember(i, "name", e.target.value)}
                          />
                          <input
                            className="p-2.5 rounded-xl bg-black/35 border border-purple-500/15 focus:border-purple-400/60 outline-none transition"
                            placeholder="Grade *"
                            value={m.grade}
                            onChange={(e) => updateMember(i, "grade", e.target.value)}
                          />
                          <input
                            className="p-2.5 rounded-xl bg-black/35 border border-red-500/15 focus:border-red-400/60 outline-none transition"
                            placeholder="Email (optional)"
                            value={m.email || ""}
                            onChange={(e) => updateMember(i, "email", e.target.value)}
                          />
                          <input
                            className="p-2.5 rounded-xl bg-black/35 border border-purple-500/15 focus:border-purple-400/60 outline-none transition"
                            placeholder="Phone (optional)"
                            value={m.phone || ""}
                            onChange={(e) => updateMember(i, "phone", e.target.value)}
                          />
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

          {/* Footer (simple, red/purple palette) */}
          <footer className="mt-10 text-center text-sm text-gray-400">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent mb-6" />
            <p>
              © 2025 <span className="text-red-300">Inferno</span>
              <span className="text-purple-300">X</span> 1.0 · Robotics Club of LNBTI
            </p>
            <p className="mt-1">
              Need help?{" "}
              <span className="text-purple-300/90">Contact the team leader support channel</span>.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
