"use client";

import { useState, useEffect } from "react";

type Quote = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string | null;
  message: string;
  status: string;
  createdAt: string;
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: "New", color: "#1E63D6" },
  contacted: { label: "Contacted", color: "#D97706" },
  quoted: { label: "Quoted", color: "#7C3AED" },
  completed: { label: "Completed", color: "#059669" },
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      loadQuotes();
    } else {
      setPwError("Incorrect password");
    }
  }

  async function loadQuotes() {
    setLoading(true);
    const res = await fetch("/api/admin/quotes");
    if (res.ok) {
      const data = await res.json();
      setQuotes(data);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    await fetch(`/api/admin/quotes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setQuotes((prev) => prev.map((q) => q.id === id ? { ...q, status } : q));
    setUpdating(null);
  }

  const filtered = filter === "all" ? quotes : quotes.filter((q) => q.status === filter);

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#F2F4F7", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "14px", padding: "48px 40px", maxWidth: "420px", width: "100%", textAlign: "center" }}>
          <div style={{ marginBottom: "24px" }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#0A1A2F", textTransform: "uppercase" }}>Henry Ridge</span>
            <br />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1E63D6", letterSpacing: "0.15em", textTransform: "uppercase" }}>Admin</span>
          </div>
          <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ padding: "13px 16px", border: "1px solid #D1D9E6", borderRadius: "8px", fontSize: "1rem", outline: "none" }}
            />
            {pwError && <p style={{ color: "#C53030", fontSize: "0.85rem" }}>{pwError}</p>}
            <button
              type="submit"
              style={{ background: "#1E63D6", color: "#fff", padding: "13px", borderRadius: "8px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.95rem" }}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F2F4F7" }}>
      {/* Admin header */}
      <div style={{ background: "#0A1A2F", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Henry Ridge — Admin
        </span>
        <button onClick={() => { setAuthed(false); setQuotes([]); }} style={{ color: "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem" }}>
          Sign out
        </button>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 16px" }}>
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {["all", "new", "contacted", "completed"].map((s) => {
            const count = s === "all" ? quotes.length : quotes.filter((q) => q.status === s).length;
            const st = STATUS_LABELS[s] ?? { label: "All", color: "#0A1A2F" };
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{ background: filter === s ? "#0A1A2F" : "#FFFFFF", border: `1px solid ${filter === s ? "#0A1A2F" : "#D1D9E6"}`, borderRadius: "10px", padding: "18px 16px", textAlign: "left", cursor: "pointer" }}
              >
                <p style={{ fontSize: "1.8rem", fontWeight: 800, color: filter === s ? "#FFFFFF" : "#0A1A2F", fontFamily: "'Barlow Condensed', sans-serif" }}>{count}</p>
                <p style={{ fontSize: "0.78rem", color: filter === s ? "rgba(255,255,255,0.6)" : "#4A5A72", textTransform: "capitalize" }}>{s === "all" ? "Total enquiries" : s}</p>
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "12px", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "60px", textAlign: "center", color: "#4A5A72" }}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "60px", textAlign: "center", color: "#4A5A72" }}>No quote requests yet.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F2F4F7", borderBottom: "1px solid #D1D9E6" }}>
                    {["Date", "Name", "Service", "Contact", "Status", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#4A5A72", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((q) => {
                    const st = STATUS_LABELS[q.status] ?? STATUS_LABELS.new;
                    const date = new Date(q.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
                    return (
                      <tr key={q.id} style={{ borderBottom: "1px solid #F2F4F7" }}>
                        <td style={{ padding: "14px 16px", fontSize: "0.85rem", color: "#4A5A72", whiteSpace: "nowrap" }}>{date}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <p style={{ fontWeight: 600, color: "#0A1A2F", fontSize: "0.9rem" }}>{q.name}</p>
                          {q.address && <p style={{ color: "#4A5A72", fontSize: "0.8rem" }}>{q.address}</p>}
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: "0.88rem", color: "#0A1A2F" }}>{q.service}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <a href={`tel:${q.phone}`} style={{ display: "block", color: "#1E63D6", fontSize: "0.85rem", textDecoration: "none", fontWeight: 600 }}>{q.phone}</a>
                          <a href={`mailto:${q.email}`} style={{ display: "block", color: "#4A5A72", fontSize: "0.8rem", textDecoration: "none" }}>{q.email}</a>
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{ background: `${st.color}18`, color: st.color, padding: "4px 10px", borderRadius: "50px", fontSize: "0.78rem", fontWeight: 700 }}>
                            {st.label}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <select
                            value={q.status}
                            disabled={updating === q.id}
                            onChange={(e) => updateStatus(q.id, e.target.value)}
                            style={{ border: "1px solid #D1D9E6", borderRadius: "6px", padding: "6px 10px", fontSize: "0.82rem", color: "#0A1A2F", cursor: "pointer" }}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="quoted">Quoted</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Message preview */}
        {filtered.length > 0 && (
          <div style={{ marginTop: "32px", display: "grid", gap: "12px" }}>
            {filtered.map((q) => (
              <details key={`msg-${q.id}`} style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "10px" }}>
                <summary style={{ padding: "14px 18px", cursor: "pointer", fontWeight: 600, color: "#0A1A2F", fontSize: "0.9rem" }}>
                  {q.name} — {q.service}
                </summary>
                <div style={{ padding: "14px 18px 18px", borderTop: "1px solid #F2F4F7" }}>
                  <p style={{ color: "#4A5A72", fontSize: "0.9rem", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{q.message}</p>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
