import { Link } from "@tanstack/react-router";
import { Github, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Home", to: "/" as const },
  { label: "Architecture", to: "/architecture" as const },
  { label: "Features", to: "/" as const, hash: "features" },
  { label: "Workflow", to: "/" as const, hash: "workflow" },
  { label: "Models", to: "/dashboard" as const },
  { label: "Deployment", to: "/deployment" as const },
  { label: "Contact", to: "/" as const, hash: "contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav className="glass mx-auto flex max-w-6xl items-center gap-3 rounded-2xl px-3 py-2 sm:px-4">
        <Link to="/" className="flex items-center gap-2 pr-2">
          <span className="gradient-brand flex h-8 w-8 items-center justify-center rounded-xl text-primary-foreground shadow-glow">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Credit<span className="gradient-text">Sense</span>
          </span>
        </Link>

        <div className="mx-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              {...(l.hash ? { hash: l.hash } : {})}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle />
          <Link
            to="/predict"
            className="gradient-brand hidden rounded-xl px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Try Demo
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="glass inline-flex h-9 w-9 items-center justify-center rounded-full lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass mx-auto mt-2 grid max-w-6xl gap-1 rounded-2xl p-3 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              {...(l.hash ? { hash: l.hash } : {})}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/predict"
            onClick={() => setOpen(false)}
            className="gradient-brand mt-1 rounded-xl px-3 py-2 text-center text-sm font-medium text-primary-foreground"
          >
            Try Demo
          </Link>
        </div>
      )}
    </header>
  );
}
