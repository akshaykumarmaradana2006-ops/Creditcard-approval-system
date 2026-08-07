import { Link } from "@tanstack/react-router";
import { BookOpen, Github, Linkedin, Mail, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-24 border-t border-border/70 px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="gradient-brand flex h-8 w-8 items-center justify-center rounded-xl text-primary-foreground">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span className="font-semibold tracking-tight">
              Credit<span className="gradient-text">Sense</span>
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Credit Card Approval Prediction using IBM Watson Machine Learning — a Flask + scikit-learn
            pipeline deployed on IBM Cloud for real-time eligibility scoring.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Product</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/predict" className="hover:text-foreground">Prediction form</Link></li>
            <li><Link to="/history" className="hover:text-foreground">Prediction history</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground">Model dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Engineering</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/architecture" className="hover:text-foreground">Technical architecture</Link></li>
            <li><Link to="/deployment" className="hover:text-foreground">Deployment workflow</Link></li>
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground">
                <BookOpen className="h-3.5 w-3.5" /> Documentation
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Connect</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:team@creditsense.ai" className="inline-flex items-center gap-2 hover:text-foreground">
                <Mail className="h-4 w-4" /> team@creditsense.ai
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} CreditSense — academic project built on IBM Watson Machine Learning.</p>
        <p>Predictions are illustrative and not financial advice.</p>
      </div>
    </footer>
  );
}
