export function GlowBackground({ variant = "default" }: { variant?: "default" | "subtle" }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]" />
      <div
        className={`animate-orb absolute -top-40 left-[8%] h-[38rem] w-[38rem] rounded-full blur-3xl ${
          variant === "subtle" ? "opacity-40" : "opacity-70"
        }`}
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 30%, transparent), transparent 65%)" }}
      />
      <div
        className="animate-orb absolute right-[-10%] top-[12%] h-[34rem] w-[34rem] rounded-full opacity-60 blur-3xl"
        style={{
          animationDelay: "-6s",
          background: "radial-gradient(circle, color-mix(in oklab, var(--violet) 28%, transparent), transparent 65%)",
        }}
      />
      <div
        className="animate-orb absolute bottom-[-12%] left-[38%] h-[30rem] w-[30rem] rounded-full opacity-50 blur-3xl"
        style={{
          animationDelay: "-11s",
          background: "radial-gradient(circle, color-mix(in oklab, var(--chart-3) 26%, transparent), transparent 65%)",
        }}
      />
    </div>
  );
}
