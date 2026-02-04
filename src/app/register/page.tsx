"use client";

import { useState } from "react";

type Member = { name: string; grade: string; email?: string; phone?: string };

export default function RegisterPage() {
  const [teamName, setTeamName] = useState("");
  const [schoolName, setSchoolName] = useState("");

  // ✅ NEW: Team leader details (required)
  const [teamLeadName, setTeamLeadName] = useState("");
  const [teamLeadPhone, setTeamLeadPhone] = useState("");
  const [teamLeadEmail, setTeamLeadEmail] = useState("");

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

  const updateMember = (i: number, key: keyof Member, val: string) => {
    setMembers((prev) =>
      prev.map((m, idx) => (idx === i ? { ...m, [key]: val } : m))
    );
  };

  const addMember = () => {
    if (members.length >= 5) return;
    setMembers((prev) => [...prev, { name: "", grade: "", email: "", phone: "" }]);
  };

  const removeMember = (i: number) => {
    if (members.length <= 2) return;
    setMembers((prev) => prev.filter((_, idx) => idx !== i));
  };

  const submit = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_name: teamName,
          school_name: schoolName,

          // ✅ NEW (matches API schema)
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

      const data = await res.json();
      if (!data.ok) throw new Error("Submission failed");

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
    } catch {
      setStatus("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Team Registration</h1>
        <p className="text-zinc-300 mb-8">
          Fill in team details, team leader contact, and each member’s grade.
        </p>

        <div className="grid gap-4">
          {/* Team + School */}
          <div className="grid md:grid-cols-2 gap-3">
            <input
              className="p-3 rounded bg-zinc-900 border border-zinc-700"
              placeholder="Team Name *"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <input
              className="p-3 rounded bg-zinc-900 border border-zinc-700"
              placeholder="School Name *"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            />
          </div>

          {/* ✅ Team leader */}
          <div className="mt-2">
            <h2 className="text-xl font-semibold mb-2">Team Leader (Required)</h2>
            <div className="grid md:grid-cols-3 gap-3">
              <input
                className="p-3 rounded bg-zinc-900 border border-zinc-700"
                placeholder="Leader Name *"
                value={teamLeadName}
                onChange={(e) => setTeamLeadName(e.target.value)}
              />
              <input
                className="p-3 rounded bg-zinc-900 border border-zinc-700"
                placeholder="Leader Phone *"
                value={teamLeadPhone}
                onChange={(e) => setTeamLeadPhone(e.target.value)}
              />
              <input
                className="p-3 rounded bg-zinc-900 border border-zinc-700"
                placeholder="Leader Email *"
                value={teamLeadEmail}
                onChange={(e) => setTeamLeadEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Teacher (optional) */}
          <div className="mt-2">
            <h2 className="text-xl font-semibold mb-2">Teacher In-charge (Optional)</h2>
            <div className="grid md:grid-cols-3 gap-3">
              <input
                className="p-3 rounded bg-zinc-900 border border-zinc-700"
                placeholder="Teacher Name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
              />
              <input
                className="p-3 rounded bg-zinc-900 border border-zinc-700"
                placeholder="Teacher Email"
                value={teacherEmail}
                onChange={(e) => setTeacherEmail(e.target.value)}
              />
              <input
                className="p-3 rounded bg-zinc-900 border border-zinc-700"
                placeholder="Teacher Phone"
                value={teacherPhone}
                onChange={(e) => setTeacherPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Track */}
          <select
            className="p-3 rounded bg-zinc-900 border border-zinc-700"
            value={track}
            onChange={(e) => setTrack(e.target.value)}
          >
            <option>AI & Machine Learning</option>
            <option>Web Development</option>
            <option>Mobile Apps</option>
            <option>Cybersecurity</option>
            <option>IoT & Hardware</option>
            <option>Open Innovation</option>
          </select>

          {/* Idea */}
          <textarea
            className="p-3 rounded bg-zinc-900 border border-zinc-700 min-h-[140px]"
            placeholder="Idea Summary * (100–200 words recommended)"
            value={ideaSummary}
            onChange={(e) => setIdeaSummary(e.target.value)}
          />

          {/* Members */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Team Members (2–5)</h2>
            <div className="grid gap-3">
              {members.map((m, i) => (
                <div
                  key={i}
                  className="p-4 rounded bg-zinc-900 border border-zinc-700"
                >
                  <div className="grid md:grid-cols-4 gap-2">
                    <input
                      className="p-2 rounded bg-black/40 border border-zinc-700"
                      placeholder="Name *"
                      value={m.name}
                      onChange={(e) => updateMember(i, "name", e.target.value)}
                    />
                    <input
                      className="p-2 rounded bg-black/40 border border-zinc-700"
                      placeholder="Grade *"
                      value={m.grade}
                      onChange={(e) => updateMember(i, "grade", e.target.value)}
                    />
                    <input
                      className="p-2 rounded bg-black/40 border border-zinc-700"
                      placeholder="Email (optional)"
                      value={m.email || ""}
                      onChange={(e) => updateMember(i, "email", e.target.value)}
                    />
                    <input
                      className="p-2 rounded bg-black/40 border border-zinc-700"
                      placeholder="Phone (optional)"
                      value={m.phone || ""}
                      onChange={(e) => updateMember(i, "phone", e.target.value)}
                    />
                  </div>

                  {members.length > 2 && (
                    <button
                      onClick={() => removeMember(i)}
                      className="text-red-400 text-sm mt-2"
                      type="button"
                    >
                      Remove member
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addMember}
              className="mt-3 px-4 py-2 rounded bg-zinc-800 border border-zinc-700"
              type="button"
            >
              + Add member
            </button>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            onClick={submit}
            className="mt-6 px-5 py-3 rounded bg-red-600 hover:bg-red-500 disabled:opacity-60"
            type="button"
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>

          {status && <p className="mt-3">{status}</p>}
        </div>
      </div>
    </div>
  );
}
