import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function formatValue(val: any) {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  return JSON.stringify(val);
}

function prettifyColumnName(col: string) {
  return col
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function MembersCell({ members }: { members: any }) {
  if (!members) return <span className="text-slate-400">—</span>;

  const list = Array.isArray(members) ? members : [];
  if (list.length === 0) return <span className="text-slate-400">—</span>;

  return (
    <div className="space-y-3">
      {list.map((m: any, idx: number) => (
        <div
          key={idx}
          className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-3 shadow-sm"
        >
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-sm font-semibold text-white">
              {m?.name || `Member ${idx + 1}`}
            </div>
            {m?.grade ? (
              <span className="rounded-full border border-slate-600 bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">
                Grade {m.grade}
              </span>
            ) : null}
          </div>

          <div className="mt-2 grid gap-1 text-xs text-slate-300">
            {m?.phone ? (
              <div>
                <span className="text-slate-500">Phone:</span> {m.phone}
              </div>
            ) : null}
            {m?.email ? (
              <div className="break-words">
                <span className="text-slate-500">Email:</span> {m.email}
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
  if (!t) return <span className="text-slate-400">—</span>;

  return (
    <details className="group rounded-xl border border-slate-700/70 bg-slate-900/60 p-3">
      <summary className="cursor-pointer list-none select-none text-sm text-slate-200 hover:text-white">
        <span className="group-open:hidden">
          {t.length > 140 ? `${t.slice(0, 140)}...` : t}
          {t.length > 140 ? (
            <span className="ml-2 text-xs text-sky-300">(Show more)</span>
          ) : null}
        </span>
        <span className="hidden group-open:inline text-sky-300">
          Hide details
        </span>
      </summary>

      <div className="mt-3 whitespace-pre-wrap break-words rounded-lg border border-slate-700 bg-black/20 p-3 text-sm leading-6 text-slate-300">
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
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
            <h1 className="text-2xl font-bold text-white">Registrations</h1>
            <p className="mt-3 text-sm text-red-300">Database error</p>
            <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-red-400/20 bg-black/30 p-4 text-sm text-slate-200">
              {error.message}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  const rows = data ?? [];
  const hiddenCols = new Set(["id", "created_at"]);

  const columns =
    rows.length > 0
      ? Object.keys(rows[0]).filter((c) => !hiddenCols.has(c))
      : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 shadow-2xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sky-300">
                Admin Dashboard
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
                Registrations
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Review submitted registrations, team members, and proposal summaries.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3">
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  Total Registrations
                </div>
                <div className="mt-1 text-2xl font-bold text-white">{rows.length}</div>
              </div>

              <a
                href="/admin-login"
                className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                Re-login
              </a>
            </div>
          </div>
        </div>

        {/* Table wrapper */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 shadow-2xl">
          <div className="border-b border-slate-800 bg-slate-900/80 px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-white">Submitted Entries</h2>
                <p className="mt-1 text-xs text-slate-400">
                  Scroll horizontally to view all fields. Member details and idea summaries are formatted for readability.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur">
                <tr className="border-b border-slate-800">
                  {columns.map((c) => (
                    <th
                      key={c}
                      className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-400"
                    >
                      {prettifyColumnName(c)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row: any, idx: number) => (
                  <tr
                    key={row.id ?? idx}
                    className="border-b border-slate-800/80 align-top transition hover:bg-slate-800/30"
                  >
                    {columns.map((col) => {
                      const val = row[col];

                      if (col === "members") {
                        return (
                          <td key={col} className="px-4 py-4 min-w-[340px]">
                            <MembersCell members={val} />
                          </td>
                        );
                      }

                      if (col === "idea_summary") {
                        return (
                          <td key={col} className="px-4 py-4 min-w-[420px]">
                            <IdeaCell text={val || ""} />
                          </td>
                        );
                      }

                      return (
                        <td key={col} className="px-4 py-4">
                          <div className="max-w-[420px] whitespace-pre-wrap break-words leading-6 text-slate-200">
                            {formatValue(val) || <span className="text-slate-500">—</span>}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {rows.length === 0 && (
                  <tr>
                    <td
                      className="px-6 py-16 text-center text-slate-400"
                      colSpan={Math.max(columns.length, 1)}
                    >
                      <div className="mx-auto max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
                        <div className="text-lg font-semibold text-white">No registrations yet</div>
                        <p className="mt-2 text-sm text-slate-400">
                          Submitted registrations will appear here once teams start registering.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <p>Newest registrations appear first.</p>
          <p>Tip: Use horizontal scroll to inspect all submitted fields.</p>
        </div>
      </div>
    </div>
  );
}