import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BadgeCheck, ShieldAlert, Trash2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { clearHistory, loadHistory, type PredictionRecord } from "@/lib/predict";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Prediction History | CreditSense" },
      {
        name: "description",
        content: "Review every credit card approval prediction made in this browser with confidence scores and outcomes.",
      },
      { property: "og:title", content: "Prediction History | CreditSense" },
      { property: "og:description", content: "Audit trail of past credit approval predictions and confidence scores." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const [records, setRecords] = useState<PredictionRecord[]>([]);

  useEffect(() => setRecords(loadHistory()), []);

  return (
    <div className="px-4 pb-10 sm:px-6">
      <section className="mx-auto max-w-5xl py-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold">
                Prediction <span className="gradient-text">History</span>
              </h1>
              <p className="mt-3 text-muted-foreground">
                {records.length} stored prediction{records.length === 1 ? "" : "s"} on this device.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                clearHistory();
                setRecords([]);
              }}
              className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium"
            >
              <Trash2 className="h-4 w-4" /> Clear history
            </button>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl">
        {records.length === 0 ? (
          <Reveal>
            <div className="glass-card p-12 text-center">
              <p className="text-muted-foreground">No predictions yet.</p>
              <Link
                to="/predict"
                className="gradient-brand mt-6 inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                Run your first prediction
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="glass-card overflow-x-auto p-2">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Applicant</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Income</th>
                  <th className="px-4 py-3 font-medium">Confidence</th>
                  <th className="px-4 py-3 font-medium">Decision</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="border-t border-border/70">
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">${r.income.toLocaleString()}</td>
                    <td className="px-4 py-3">{Math.round(r.confidence * 100)}%</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          r.approved ? "bg-success/12 text-success" : "bg-destructive/12 text-destructive"
                        }`}
                      >
                        {r.approved ? <BadgeCheck className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
                        {r.approved ? "Approved" : "Rejected"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
