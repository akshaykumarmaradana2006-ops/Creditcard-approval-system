import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  BrainCircuit,
  Cloud,
  CloudCog,
  Database,
  Github,
  LayoutDashboard,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import heroImg from "@/assets/hero-ai.png";
import { Reveal } from "@/components/site/Reveal";
import { architectureLayers, models, overviewCards, techStack, workflowSteps } from "@/lib/project-data";

const icons: Record<string, LucideIcon> = {
  Users,
  LayoutDashboard,
  Server,
  BrainCircuit,
  Database,
  CloudCog,
  Cloud,
  ShieldCheck,
};
