export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>© 2026 Slop Simulator, Inc. No humans were consulted.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Twitter (AI-managed)</a>
          <a href="#" className="hover:text-foreground">LinkedIn (AI-posted)</a>
          <a href="#" className="hover:text-foreground">GitHub (AI-committed)</a>
        </div>
      </div>
    </footer>
  );
}
