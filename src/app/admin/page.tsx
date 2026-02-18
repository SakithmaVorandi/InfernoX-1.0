import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function formatValue(val: any) {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  return JSON.stringify(val);
}

function MembersCell({ members }: { members: any }) {
  if (!members) return <span className="text-white/40">—</span>;

  const list = Array.isArray(members) ? members : [];

  if (list.length === 0) return <span className="text-white/40">—</span>;

  return (
    <div className="space-y-2">
      {list.map((m: any, idx: number) => (
        <div
          key={idx}
          className="rounded-lg border border-white/10 bg-black/30 p-2"
        >
          <div className="text-white/90 font-semibold">
            {m?.name || `Member ${idx + 1}`}{" "}
            {m?.grade ? <span className="text-white/50">({m.grade})</span> : null}
          </div>

          <div className="mt-1 text-[11px] text-white/70 space-y-1">
            {m?.phone ? (
              <div>
                <span className="text-white/40">Phone:</span> {m.phone}
              </div>
            ) : null}
            {m?.email ? (
              <div className="break-words">
                <span className="text-white/40">Email:</span> {m.email}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function IdeaCell({ text }: { text: string }) {
  const t = (text || "").trim();
  if (!t) return <span className="text-white/40">—</span>;

  // collapsible using <details> (works in Server Components, no JS needed)
  return (
    <details className="group">
      <summary className="cursor-pointer select-none text-white/85 hover:text-white underline decoration-white/20">
        <span className="group-open:hidden">
          {t.length > 120 ? `${t.slice(0, 120)}...` : t}
          {t.length > 120 ? (
            <span className="ml-2 text-white/50 no-underline">(show more)</span>
          ) : null}
        </span>

        <span className="hidden group-open:inline text-white/85">
          Hide details <span className="text-white/50">(show less)</span>
        </span>
      </summary>

      <div className="mt-2 whitespace-pre-wrap break-words rounded-lg border border-white/10 bg-black/30 p-2 text-white/80">
        {t}
      </div>
    </details>
  );
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const password = cookieStore.get("admin_auth")?.value;

  if (password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin-login");
  }

  const { data, error } = await supabaseAdmin
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-2xl font-bold">Registrations</h1>
        <p className="mt-2 text-red-300">Database error:</p>
        <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
          {error.message}
        </pre>
      </div>
    );
  }

  const rows = data ?? [];

  // Hide columns you don't want:
  const hiddenCols = new Set(["id", "created_at"]);

  // Build columns from the first row (excluding hidden)
  const columns =
    rows.length > 0
      ? Object.keys(rows[0]).filter((c) => !hiddenCols.has(c))
      : [];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Registrations</h1>
            <p className="mt-1 text-sm text-white/70">Total: {rows.length}</p>
          </div>

          <a
            href="/admin-login"
            className="text-sm text-white/70 underline hover:text-white"
          >
            Re-login
          </a>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="min-w-full text-xs">
            <thead className="sticky top-0 bg-black/60 backdrop-blur text-white/80">
              <tr>
                {columns.map((c) => (
                  <th key={c} className="px-3 py-3 text-left font-semibold">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row: any, idx: number) => (
                <tr
                  key={row.id ?? idx}
                  className="border-t border-white/10 align-top"
                >
                  {columns.map((col) => {
                    const val = row[col];

                    // Special rendering
                    if (col === "members") {
                      return (
                        <td key={col} className="px-3 py-3 min-w-[340px]">
                          <MembersCell members={val} />
                        </td>
                      );
                    }

                    if (col === "idea_summary") {
                      return (
                        <td key={col} className="px-3 py-3 min-w-[420px]">
                          <IdeaCell text={val || ""} />
                        </td>
                      );
                    }

                    return (
                      <td key={col} className="px-3 py-3">
                        <div className="max-w-[520px] whitespace-pre-wrap break-words text-white/85">
                          {formatValue(val) || <span className="text-white/40">—</span>}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-10 text-white/60"
                    colSpan={Math.max(columns.length, 1)}
                  >
                    No registrations yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-white/40">
          Scroll horizontally to see all fields. Members are formatted, and idea summaries are collapsible.
        </p>
      </div>
    </div>
  );
}
