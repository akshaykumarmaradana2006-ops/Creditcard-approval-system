import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  CloudCog,
  Database,
  FileBarChart,
  LayoutDashboard,
  Settings,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { models } from "@/lib/project-data";
import { loadHistory, type PredictionRecord } from "@/lib/predict";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Model Performance Dashboard | CreditSense Analytics" },
      {
        name: "description",
        content:
          "Approval analytics, model comparison, feature importance and IBM Watson deployment status for the credit approval prediction system.",
      },
      { property: "og:title", content: "Model Performance Dashboard | CreditSense" },
      { property: "og:description", content: "Interactive analytics for credit approval predictions and model benchmarks." },
    ],
  }),
  component: Dashboard,
});

const sidebar = [
  { label: "Dashboard", to: "/dashboard" as const, icon: LayoutDashboard },
  { label: "Predict", to: "/predict" as const, icon: Target },
  { label: "History", to: "/history" as const, icon: Activity },
  { label: "Models", to: "/dashboard" as const, icon: FileBarChart },
  { label: "Architecture", to: "/architecture" as const, icon: BrainCircuit },
  { label: "Deployment", to: "/deployment" as const, icon: CloudCog },
];

const monthly = [
  { month: "Jan", approved: 412, rejected: 188 },
  { month: "Feb", approved: 468, rejected: 202 },
  { month: "Mar", approved: 521, rejected: 179 },
  { month: "Apr", approved: 496, rejected: 214 },
  { month: "May", approved: 588, rejected: 191 },
  { month: "Jun", approved: 634, rejected: 176 },
];

const featureImportance = [
  { feature: "Income", value: 0.24 },
  { feature: "Debt ratio", value: 0.21 },
  { feature: "Credit history", value: 0.17 },
  { feature: "Past due", value: 0.14 },
  { feature: "Employment", value: 0.13 },
  { feature: "Inquiries", value: 0.11 },
];

const confidenceBands = [
  { band: "50-60%", count: 62 },
  { band: "60-70%", count: 118 },
  { band: "70-80%", count: 245 },
  { band: "80-90%", count: 401 },
  { band: "90-100%", count: 512 },
];

const chartColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function Dashboard() {
  const [history, setHistory] = useState<PredictionRecord[]>([]);
  useEffect(() => setHistory(loadHistory()), []);

  const baseApproved = monthly.reduce((s, m) => s + m.approved, 0);
  const baseRejected = monthly.reduce((s, m) => s + m.rejected, 0);
  const approved = baseApproved + history.filter((h) => h.approved).length;
  const rejected = baseRejected + history.filter((h) => !h.approved).length;
  const total = approved + rejected;

  const stats = [
    { label: "Applications", value: total.toLocaleString(), icon: FileBarChart, tone: "text-primary" },
    { label: "Approved", value: approved.toLocaleString(), icon: CheckCircle2, tone: "text-success" },
    { label: "Rejected", value: rejected.toLocaleString(), icon: XCircle, tone: "text-destructive" },
    { label: "Model accuracy", value: "96.3%", icon: Target, tone: "text-violet" },
  ];

  const pieData = [
    { name: "Approved", value: approved },
    { name: "Rejected", value: rejected },
  ];

  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 pb-10 sm:px-6">
      <aside className="glass sticky top-28 hidden h-fit w-56 shrink-0 rounded-3xl p-3 lg:block">
        <nav className="space-y-1">
          {sidebar.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              activeProps={{ className: "bg-accent text-accent-foreground font-medium" }}
            >
              <s.icon className="h-4 w-4" /> {s.label}
            </Link>
          ))}
          <span className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground/60">
            <Settings className="h-4 w-4" /> Settings
          </span>
        </nav>
      </aside>

      <div className="min-w-0 flex-1 py-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold sm:text-4xl">
                Model <span className="gradient-text">Performance Dashboard</span>
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Watson Machine Learning scoring analytics across the last six reporting periods.
              </p>
            </div>
            <Link
              to="/predict"
              className="gradient-brand rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              New prediction
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <s.icon className={`h-4 w-4 ${s.tone}`} />
                </div>
                <p className="mt-3 text-2xl font-bold">{s.value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="glass-card h-full p-6">
              <h2 className="text-sm font-semibold">Approval trend</h2>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        color: "var(--popover-foreground)",
                        fontSize: 12,
                      }}
                    />
                    <Line type="monotone" dataKey="approved" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="rejected" stroke="var(--chart-2)" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="glass-card h-full p-6">
              <h2 className="text-sm font-semibold">Approval rate</h2>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={3}>
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={chartColors[i]} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        color: "var(--popover-foreground)",
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{Math.round((approved / total) * 100)}%</span> approved
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="glass-card h-full p-6">
              <h2 className="text-sm font-semibold">Feature importance</h2>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={featureImportance} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="feature" type="category" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={86} />
                    <Tooltip
                      cursor={{ fill: "var(--muted)" }}
                      contentStyle={{
                        background: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        color: "var(--popover-foreground)",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="value" fill="var(--chart-2)" radius={[0, 6, 6, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="glass-card h-full p-6">
              <h2 className="text-sm font-semibold">Prediction confidence</h2>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={confidenceBands}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="band" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      cursor={{ fill: "var(--muted)" }}
                      contentStyle={{
                        background: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        color: "var(--popover-foreground)",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="count" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass-card h-full p-6">
              <h2 className="text-sm font-semibold">Deployment status</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  { n: "IBM Watson ML", s: "Online", icon: BrainCircuit },
                  { n: "Cloud Object Storage", s: "Synced", icon: Database },
                  { n: "Flask runtime", s: "Healthy", icon: CloudCog },
                  { n: "Model version", s: "v3.2 · XGBoost", icon: Sparkles },
                ].map((d) => (
                  <li key={d.n} className="glass flex items-center justify-between rounded-xl px-3 py-2.5">
                    <span className="flex items-center gap-2">
                      <d.icon className="h-4 w-4 text-primary" /> {d.n}
                    </span>
                    <span className="text-xs font-medium text-success">{d.s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Model comparison */}
        <Reveal>
          <div className="glass-card mt-6 overflow-x-auto p-6">
            <h2 className="text-sm font-semibold">Machine learning models</h2>
            <table className="mt-4 w-full min-w-[620px] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-2 font-medium">Model</th>
                  <th className="py-2 font-medium">Accuracy</th>
                  <th className="py-2 font-medium">Precision</th>
                  <th className="py-2 font-medium">Recall</th>
                  <th className="py-2 font-medium">F1</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {models.map((m) => (
                  <tr key={m.name} className="border-t border-border/70">
                    <td className="py-3 font-medium">{m.name}</td>
                    <td className="py-3">{m.accuracy}%</td>
                    <td className="py-3">{m.precision}%</td>
                    <td className="py-3">{m.recall}%</td>
                    <td className="py-3">{m.f1}%</td>
                    <td className="py-3">
                      {m.best ? (
                        <span className="gradient-brand rounded-full px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
                          Deployed
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Benchmarked</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Recent predictions */}
        <Reveal>
          <div className="glass-card mt-6 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Recent predictions</h2>
              <Link to="/history" className="text-xs font-medium text-primary">
                View all
              </Link>
            </div>
            {history.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                No local predictions yet — run one from the prediction form.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {history.slice(0, 5).map((h) => (
                  <li key={h.id} className="glass flex flex-wrap items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm">
                    <span className="font-medium">{h.name}</span>
                    <span className="text-xs text-muted-foreground">{new Date(h.createdAt).toLocaleString()}</span>
                    <span className={h.approved ? "text-xs font-semibold text-success" : "text-xs font-semibold text-destructive"}>
                      {h.approved ? "Approved" : "Rejected"} · {Math.round(h.confidence * 100)}%
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
