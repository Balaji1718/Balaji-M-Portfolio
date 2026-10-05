import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import certifications from "@/data/certifications";
import experience from "@/data/experience";
import personal from "@/data/personal";
import projects from "@/data/projects";
import skills from "@/data/skills";

const navigation = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["My Works", "work"],
  ["Experience", "experience"],
  ["Certifications", "certifications"],
  ["Contact", "contact"],
];

const isPlaceholder = (value = "") => !value || value.startsWith("[");
const displayValue = (value) => (isPlaceholder(value) ? value || "[ADD DETAILS]" : value);

function SectionHeading({ eyebrow, title, note }) {
  return (
    <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
        <h2 className="mt-2 max-w-[42ch] text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">{title}</h2>
      </div>
      {note ? <p className="font-mono text-xs text-muted-foreground">{note}</p> : null}
    </div>
  );
}

function SocialLink({ href, label, icon: Icon, compact = false }) {
  const unavailable = isPlaceholder(href);
  const common = `inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm transition-colors ${compact ? "text-muted-foreground hover:bg-muted hover:text-ink" : "border border-border bg-surface/70 text-ink hover:border-accent/40 hover:text-accent"}`;
  if (unavailable) {
    return (
      <span className={`${common} cursor-not-allowed opacity-65`} aria-label={`${label}: add your link later`}>
        <Icon aria-hidden="true" size={16} /> {label}
      </span>
    );
  }
  return (
    <a className={common} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      <Icon aria-hidden="true" size={16} /> {label}
    </a>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const sections = navigation.map(([, id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-22% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6">
      <nav aria-label="Main navigation" className={`journal-surface mx-auto max-w-6xl rounded-full border px-3 py-2 transition-shadow ${scrolled ? "border-border shadow-soft" : "border-border/70"}`}>
        <div className="flex min-h-10 items-center justify-between gap-3">
          <a href="#home" onClick={closeMenu} className="flex min-w-0 items-center gap-2 pl-1" aria-label={`${displayValue(personal.name)} home`}>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent font-mono text-xs font-medium text-accent-foreground" aria-hidden="true">
              {displayValue(personal.initials)}
            </span>
            <span className="max-w-36 truncate text-sm font-semibold text-ink sm:max-w-none">{displayValue(personal.name)}</span>
          </a>
          <div className="hidden items-center gap-0.5 lg:flex">
            {navigation.slice(1).map(([label, id]) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} className={`rounded-full px-3 py-2 text-xs transition-colors ${active === id ? "bg-muted text-ink" : "text-muted-foreground hover:bg-muted/70 hover:text-ink"}`}>
                {label}
              </a>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a href={personal.resume} className="inline-flex min-h-9 items-center gap-2 rounded-full bg-accent px-4 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/90">
              <FileText size={14} aria-hidden="true" /> Resume
            </a>
            <Button variant="ghost" size="icon" className="size-9 rounded-full lg:hidden" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>
        {menuOpen ? (
          <div id="mobile-navigation" className="border-t border-border px-1 pb-2 pt-2 lg:hidden">
            <div className="grid grid-cols-2 gap-1">
              {navigation.slice(1).map(([label, id]) => (
                <a key={id} href={`#${id}`} onClick={closeMenu} aria-current={active === id ? "location" : undefined} className={`rounded-lg px-3 py-2.5 text-sm ${active === id ? "bg-muted font-medium text-ink" : "text-muted-foreground hover:bg-muted/70"}`}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="mx-auto grid max-w-6xl scroll-mt-24 gap-4 px-5 pb-8 pt-9 sm:px-8 sm:pt-14 lg:grid-cols-12">
      <div className="journal-surface rise-in rounded-2xl border border-border p-7 sm:p-9 lg:col-span-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{personal.degree} · Software Development</p>
        <h1 className="mt-5 max-w-[17ch] text-balance text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-[3.45rem]">
          Hi, I’m {displayValue(personal.name)}.
          <span className="mt-2 block text-ink/65">{personal.role}</span>
        </h1>
        <p className="mt-5 max-w-[55ch] text-pretty text-base leading-7 text-muted-foreground">{personal.introduction}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#work" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90">View My Works <ArrowDownRight size={16} aria-hidden="true" /></a>
          <a href={personal.resume} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent"><FileText size={16} aria-hidden="true" /> Download Resume</a>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <SocialLink href={personal.github} label="GitHub" icon={Github} />
          <SocialLink href={personal.linkedin} label="LinkedIn" icon={Linkedin} />
          <SocialLink href={isPlaceholder(personal.email) ? personal.email : `mailto:${personal.email}`} label="Email" icon={Mail} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
        <div className="journal-surface rounded-2xl border border-border p-6 sm:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Field notebook</p>
            <BookOpen size={17} className="text-accent" aria-hidden="true" />
          </div>
          <p className="mt-3 text-2xl font-semibold text-ink">A record of the work.</p>
          <p className="mt-2 max-w-[45ch] text-sm leading-6 text-muted-foreground">Practical builds, considered solutions, and the technical details behind each project.</p>
          <a href="#work" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">Browse project entries <ArrowRight size={15} aria-hidden="true" /></a>
        </div>
        <div className="journal-surface rounded-2xl border border-border p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Currently focused on</p>
          <p className="mt-3 text-sm font-medium leading-6 text-ink">{displayValue(personal.currentFocus)}</p>
        </div>
        <div className="journal-surface rounded-2xl border border-border p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Based in</p>
          <p className="mt-3 flex items-start gap-2 text-sm font-medium leading-6 text-ink"><MapPin size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" />{displayValue(personal.location)}</p>
        </div>
      </div>
    </section>
  );
}

function About() {
  const details = [
    [GraduationCap, "Education", personal.education],
    [Code2, "Current focus", personal.currentFocus],
    [BookOpen, "Development interests", personal.interests],
  ];
  return (
    <section id="about" className="section-space scroll-mt-20 border-t border-border/70">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="A little about me" title="Curious by nature. Practical by design." note="01 — About" />
        <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="journal-surface rounded-2xl border border-border p-7 sm:p-8">
            <p className="text-lg leading-8 text-ink">{displayValue(personal.about)}</p>
            <p className="mt-5 max-w-[58ch] text-sm leading-7 text-muted-foreground">{personal.introduction}</p>
          </div>
          <div className="grid gap-3">
            {details.map(([Icon, label, value]) => (
              <div key={label} className="flex gap-4 rounded-xl border border-border bg-surface/65 p-5">
                <Icon size={19} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <div><h3 className="text-sm font-semibold text-ink">{label}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{displayValue(value)}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-border/70 bg-paper/50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Tools of the trade" title="Technology, in context." note="02 — Skills" />
        <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category} className="border-t border-border py-5">
              <h3 className="font-mono text-xs uppercase tracking-[0.11em] text-muted-foreground">{group.category}</h3>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${group.category} skills`}>
                {group.items.map((skill, index) => (
                  <li key={`${skill}-${index}`} className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-ink">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectPreview({ project }) {
  if (project.image) {
    return <img src={project.image} alt={displayValue(project.imageAlt)} loading="lazy" className="aspect-[16/9] w-full rounded-xl border border-border object-cover" />;
  }
  return (
    <div role="img" aria-label="Project screenshot will be added here" className="journal-lines flex aspect-[16/9] w-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-paper p-4 sm:p-6">
      <div className="flex items-center gap-1.5" aria-hidden="true"><i className="size-2 rounded-full bg-accent/55" /><i className="size-2 rounded-full bg-ink/20" /><i className="size-2 rounded-full bg-ink/20" /></div>
      <div className="grid gap-2" aria-hidden="true">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Project visual</span>
        <span className="max-w-[28ch] text-xl font-medium text-ink/75">{project.title}</span>
        <span className="text-xs text-muted-foreground">[ADD PROJECT SCREENSHOT]</span>
      </div>
      <span className="self-end font-mono text-[10px] text-muted-foreground">ENTRY {String(project.id).padStart(2, "0")}</span>
    </div>
  );
}

function ProjectLinks({ project }) {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      <SocialLink href={project.github} label="GitHub" icon={Github} />
      <SocialLink href={project.demo} label="Live demo" icon={ExternalLink} />
    </div>
  );
}

function ProjectDetails({ project }) {
  return (
    <>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div><h4 className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">The problem</h4><p className="mt-2 text-sm leading-6 text-ink/85">{project.problem}</p></div>
        <div><h4 className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">The approach</h4><p className="mt-2 text-sm leading-6 text-ink/85">{project.solution}</p></div>
      </div>
      <div className="mt-5"><h4 className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Key features</h4><ul className="mt-2 flex flex-wrap gap-2">{project.features.map((feature, index) => <li key={`${feature}-${index}`} className="rounded-full bg-paper px-3 py-1.5 text-xs text-ink">{feature}</li>)}</ul></div>
      <div className="mt-5"><h4 className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Built with</h4><ul className="mt-2 flex flex-wrap gap-2">{project.technologies.map((technology, index) => <li key={`${technology}-${index}`} className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground">{technology}</li>)}</ul></div>
    </>
  );
}

function Notebook({ project, index, setIndex, opened, setOpened }) {
  const total = projects.length;
  const previous = () => setIndex((index + total - 1) % total);
  const next = () => setIndex((index + 1) % total);
  if (!opened) {
    return (
      <div className="journal-surface journal-lines mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border p-8 sm:p-12">
        <div className="flex min-h-[24rem] flex-col items-center justify-center border border-border/75 bg-surface/70 px-5 py-10 text-center sm:min-h-[27rem]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">My works</p>
          <p className="mt-8 text-sm text-muted-foreground">{displayValue(personal.name)}</p>
          <h3 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">My projects</h3>
          <p className="mt-3 max-w-[42ch] text-sm leading-6 text-muted-foreground">A working record of the things I’ve built and the thinking behind them.</p>
          <Button onClick={() => setOpened(true)} className="mt-8 min-h-11 rounded-full bg-accent px-5 text-accent-foreground hover:bg-accent/90">
            <BookOpen aria-hidden="true" /> Open notebook <ArrowRight aria-hidden="true" />
          </Button>
          <button onClick={() => setOpened(true)} className="mt-4 text-xs text-muted-foreground underline underline-offset-4 hover:text-ink">Or explore the project entry directly</button>
        </div>
      </div>
    );
  }
  return (
    <div className="grid gap-4 lg:grid-cols-12" aria-live="polite">
      <motion.article key={project.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22 }} className="journal-surface journal-lines rounded-2xl border border-border p-5 sm:p-8 lg:col-span-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Project {String(project.id).padStart(2, "0")} · {displayValue(project.category)}</span>
          <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] text-accent">ENGINEERING NOTE</span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold leading-tight text-ink sm:text-3xl">{project.title}</h3>
        <p className="mt-2 max-w-[60ch] text-sm leading-6 text-muted-foreground">{project.shortDescription}</p>
        <div className="mt-6"><ProjectPreview project={project} /></div>
        <ProjectDetails project={project} />
        <div className="mt-6"><ProjectLinks project={project} /></div>
      </motion.article>
      <aside className="journal-surface rounded-2xl border border-border p-5 sm:p-7 lg:col-span-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">Notebook index</p>
        <h4 className="mt-3 text-xl font-semibold text-ink">Projects, in progress.</h4>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Each entry keeps the brief, approach, features and tools together.</p>
        <ol className="mt-6 divide-y divide-border border-y border-border">
          {projects.map((entry, entryIndex) => (
            <li key={entry.id}>
              <button onClick={() => setIndex(entryIndex)} aria-current={index === entryIndex ? "true" : undefined} className={`flex min-h-14 w-full items-center justify-between gap-3 text-left text-sm transition-colors ${index === entryIndex ? "font-medium text-accent" : "text-ink hover:text-accent"}`}>
                <span className="font-mono text-[11px] text-muted-foreground">{String(entry.id).padStart(2, "0")}</span><span className="min-w-0 flex-1 truncate">{entry.title}</span>{index === entryIndex ? <ArrowRight size={15} aria-hidden="true" /> : null}
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex items-center justify-between gap-2">
          <Button variant="outline" className="min-h-10 rounded-full border-border bg-surface px-3 text-ink" onClick={previous} disabled={total <= 1} aria-label="Previous project"><ChevronLeft aria-hidden="true" /> Previous</Button>
          <span className="shrink-0 font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          <Button variant="outline" className="min-h-10 rounded-full border-border bg-surface px-3 text-ink" onClick={next} disabled={total <= 1} aria-label="Next project">Next <ChevronRight aria-hidden="true" /></Button>
        </div>
        <button onClick={() => setOpened(false)} className="mt-5 text-xs text-muted-foreground underline underline-offset-4 hover:text-ink">Close the notebook cover</button>
      </aside>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className="journal-surface overflow-hidden rounded-2xl border border-border">
      <div className="p-4 pb-0"><ProjectPreview project={project} /></div>
      <div className="p-5 sm:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">Project {String(index + 1).padStart(2, "0")} · {displayValue(project.category)}</p>
        <h3 className="mt-2 text-xl font-semibold text-ink">{project.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.shortDescription}</p>
        <ul className="mt-4 flex flex-wrap gap-2">{project.technologies.map((technology, itemIndex) => <li key={`${technology}-${itemIndex}`} className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground">{technology}</li>)}</ul>
        <div className="mt-5"><ProjectLinks project={project} /></div>
      </div>
    </article>
  );
}

function Projects() {
  const [mode, setMode] = useState("notebook");
  const [index, setIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const selectedProject = projects[index] || projects[0];
  return (
    <section id="work" className="section-space scroll-mt-20 border-t border-border/70">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Digital developer notebook" title="Entries from the build log." note="03 — Projects" />
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[55ch] text-sm leading-6 text-muted-foreground">Explore an engineering notebook entry, or switch to a quick-scan project list.</p>
          <div role="group" aria-label="Project display mode" className="inline-flex rounded-full border border-border bg-surface p-1">
            <Button variant="ghost" aria-pressed={mode === "notebook"} onClick={() => setMode("notebook")} className={`min-h-9 rounded-full px-4 text-xs ${mode === "notebook" ? "bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground" : "text-muted-foreground"}`}>Interactive</Button>
            <Button variant="ghost" aria-pressed={mode === "classic"} onClick={() => setMode("classic")} className={`min-h-9 rounded-full px-4 text-xs ${mode === "classic" ? "bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground" : "text-muted-foreground"}`}>Classic</Button>
          </div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${mode}-${mode === "notebook" ? opened ? "open" : "cover" : "list"}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
            {mode === "notebook" ? <Notebook project={selectedProject} index={index} setIndex={setIndex} opened={opened} setOpened={setOpened} /> : <div className="grid gap-5 md:grid-cols-2">{projects.map((project, projectIndex) => <ProjectCard key={project.id} project={project} index={projectIndex} />)}</div>}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-border/70 bg-paper/50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Experience & internships" title="Learning by doing." note="04 — Experience" />
        <div className="grid gap-4">
          {experience.map((item, index) => (
            <article key={`${item.company}-${index}`} className="journal-surface grid gap-4 rounded-2xl border border-border p-6 sm:grid-cols-[1fr_auto] sm:items-start sm:p-7">
              <div><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{displayValue(item.dates)} · {displayValue(item.location)}</p><h3 className="mt-2 text-lg font-semibold text-ink">{displayValue(item.role)}</h3><p className="mt-1 text-sm text-muted-foreground">{displayValue(item.company)}</p><p className="mt-4 max-w-[68ch] text-sm leading-6 text-ink/80">{displayValue(item.summary)}</p><ul className="mt-4 flex flex-wrap gap-2">{item.tools.map((tool, toolIndex) => <li key={`${tool}-${toolIndex}`} className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground">{tool}</li>)}</ul></div>
              <BriefcaseBusiness size={19} className="text-accent" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="section-space scroll-mt-20 border-t border-border/70">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Recognition & learning" title="A few milestones along the way." note="05 — Certifications" />
        <div className="grid gap-4 md:grid-cols-2">
          {certifications.map((item, index) => (
            <article key={`${item.title}-${index}`} className="journal-surface flex gap-4 rounded-xl border border-border p-5 sm:p-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent"><GraduationCap size={18} aria-hidden="true" /></span>
              <div className="min-w-0"><p className="font-mono text-[10px] uppercase tracking-[0.13em] text-accent">{item.type} · {displayValue(item.date)}</p><h3 className="mt-2 font-semibold text-ink">{item.title}</h3><p className="mt-1 text-sm text-muted-foreground">{displayValue(item.issuer)}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [notice, setNotice] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    setNotice("No message was sent. Add a contact email or connect a form service before using this form.");
  }
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border/70 bg-paper/50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Get in touch" title="Let’s build something together." note="06 — Contact" />
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="journal-surface rounded-2xl border border-border p-7 sm:p-8">
            <h3 className="text-xl font-semibold text-ink">Have a project in mind?</h3>
            <p className="mt-3 max-w-[48ch] text-sm leading-6 text-muted-foreground">For opportunities, collaborations or a good technical conversation, find me here.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <SocialLink href={personal.email.startsWith("[") ? personal.email : `mailto:${personal.email}`} label="Email" icon={Mail} />
              <SocialLink href={personal.github} label="GitHub" icon={Github} />
              <SocialLink href={personal.linkedin} label="LinkedIn" icon={Linkedin} />
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><MapPin size={16} className="text-accent" aria-hidden="true" />{displayValue(personal.location)}</p>
          </div>
          <form onSubmit={handleSubmit} className="journal-surface rounded-2xl border border-border p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-ink">Name<input required name="name" autoComplete="name" placeholder="Your name" className="min-h-11 rounded-lg border border-input bg-background/70 px-3 font-normal placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
              <label className="grid gap-2 text-sm font-medium text-ink">Email<input required name="email" type="email" autoComplete="email" placeholder="you@example.com" className="min-h-11 rounded-lg border border-input bg-background/70 px-3 font-normal placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-medium text-ink">Message<textarea required name="message" rows={4} placeholder="What would you like to talk about?" className="resize-y rounded-lg border border-input bg-background/70 px-3 py-2.5 font-normal placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
            <Button type="submit" className="mt-4 min-h-11 rounded-full bg-accent px-5 text-accent-foreground hover:bg-accent/90">Send Message <Send size={15} aria-hidden="true" /></Button>
            <p aria-live="polite" role="status" className="mt-3 min-h-5 text-xs leading-5 text-muted-foreground">{notice || "This form is a preview and does not send messages."}</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div><a href="#home" className="text-sm font-semibold text-ink">{displayValue(personal.name)}</a><p className="mt-1 text-xs text-muted-foreground">Thoughtful software, built one entry at a time.</p></div>
        <div className="flex flex-wrap items-center gap-1"><SocialLink href={personal.github} label="GitHub" icon={Github} compact /><SocialLink href={personal.linkedin} label="LinkedIn" icon={Linkedin} compact /><SocialLink href={personal.email.startsWith("[") ? personal.email : `mailto:${personal.email}`} label="Email" icon={Mail} compact /></div>
        <p className="font-mono text-[10px] text-muted-foreground">© {new Date().getFullYear()} {displayValue(personal.name)}</p>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div className="paper-atmosphere min-h-screen overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <a href="#home" aria-label="Back to top" className="fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-full border border-border bg-surface/90 text-ink shadow-soft backdrop-blur transition-colors hover:text-accent"><ArrowUpRight size={17} aria-hidden="true" /></a>
    </div>
  );
}
