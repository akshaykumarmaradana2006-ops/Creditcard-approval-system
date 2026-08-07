import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Cloud, CloudCog, Database, Github, Globe, Laptop, BrainCircuit, CheckCircle2, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { deploymentStages } from "@/lib/project-data";

const icons: Record<string, LucideIcon> = { Laptop, Github, Cloud, BrainCircuit, Database, Globe, CloudCog };

export const Route = createFileRoute("/deployment")({
  head: () => ({
    meta: [
      { title: "Deployment Workflow | IBM Cloud & Watson ML" },
      {
        name: "description",
        content:
          "Deployment pipeline from local development through GitHub, IBM Cloud, Watson Machine Learning and Cloud Object Storage to the live application.",
      },
      { property: "og:title", content: "Deployment Workflow | CreditSense" },
      { property: "og:description", content: "Six-stage IBM Cloud deployment pipeline for the credit approval model." },
    ],
  }),
  component: DeploymentPage,
});

function DeploymentPage() {
  return (
    <div className="px-4 pb-10 sm:px-6">
      <section className="mx-auto max-w-3xl py-10 text-center">
        <Reveal>
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Deployment <span className="gradient-text">Workflow</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Every commit travels the same path: from a local Flask build to a Watson Machine Learning
            scoring endpoint backed by Cloud Object Storage.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl">
        <ol className="relative border-l border-border pl-8">
          {deploymentStages.map((s, i) => {
            const Icon = icons[s.icon] ?? Cloud;
            return (
              <Reveal key={s.title} delay={i * 0.07}>
                <li className="relative pb-10 last:pb-0">
                  <span className="gradient-brand absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground shadow-glow">
                    <Icon className="h-4 w-4" />
                  </span>
                  <motion.div className="glass-card p-6" whileHover={{ y: -4 }}>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-semibold">{s.title}</h2>
                      <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
                        <CheckCircle2 className="h-3 w-3" /> Operational
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                    <p className="mt-3 text-xs font-mono text-muted-foreground">stage {i + 1} / {deploymentStages.length}</p>
                  </motion.div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </section>

      <section className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-3">
        {[
          { t: "IBM Watson ML", d: "Deployment space with versioned model assets and a REST scoring endpoint.", s: "Online" },
          { t: "Cloud Object Storage", d: "model.pkl, scaler.pkl and encoder.pkl kept in a dedicated bucket.", s: "Synced" },
          { t: "Application Runtime", d: "Flask service on IBM Cloud with health checks and autoscaling.", s: "Healthy" },
        ].map((c, i) => (
          <Reveal key={c.t} delay={i * 0.06}>
            <div className="glass-card h-full p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{c.t}</h3>
                <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              <p className="mt-4 text-xs font-medium text-success">{c.s}</p>
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
