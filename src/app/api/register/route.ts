import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

/* ---------- Supabase setup (SAFE) ---------- */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!supabaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL is missing or invalid. Check .env.local"
  );
}

if (!serviceKey) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY is missing or invalid. Check .env.local"
  );
}

const supabase = createClient(supabaseUrl, serviceKey);

/* ---------- Validation Schemas ---------- */
const MemberSchema = z.object({
  name: z.string().min(2),
  grade: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(7).optional().or(z.literal("")),
});

const RegistrationSchema = z.object({
  team_name: z.string().min(2),
  school_name: z.string().min(2),

  team_lead_name: z.string().min(2),
  team_lead_phone: z.string().min(7),
  team_lead_email: z.string().email(),

  teacher_name: z.string().optional().or(z.literal("")),
  teacher_email: z.string().email().optional().or(z.literal("")),
  teacher_phone: z.string().optional().or(z.literal("")),

  track: z.string().optional().or(z.literal("")),
  idea_summary: z.string().min(40).max(1200),

  members: z.array(MemberSchema).min(2).max(5),
});

/* ---------- API Handler ---------- */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RegistrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("registrations").insert({
      team_name: parsed.data.team_name,
      school_name: parsed.data.school_name,

      team_lead_name: parsed.data.team_lead_name,
      team_lead_phone: parsed.data.team_lead_phone,
      team_lead_email: parsed.data.team_lead_email,

      teacher_name: parsed.data.teacher_name,
      teacher_email: parsed.data.teacher_email,
      teacher_phone: parsed.data.teacher_phone,

      track: parsed.data.track,
      idea_summary: parsed.data.idea_summary,

      members: parsed.data.members,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("API crash:", err);
    return NextResponse.json(
      { ok: false, error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}
