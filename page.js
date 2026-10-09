"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const projects = [
  {
    id: "voting",
    number: "01",
    category: "WEB DEVELOPMENT",
    title: "Student Organization Voting System",
    description:
      "A web-based election platform designed to make student organization voting secure, transparent, and easy to follow.",
    details: `Problem Statement & Purpose:
I wanted to replace a slow, difficult-to-audit election process with a more accessible and transparent way for students to vote.

Your Exact Role:
I planned and developed the system as a student project, focusing on the voter experience, election workflow, and administration tools.

Key Features & Functionalities Used:
I implemented voter authentication, one-vote-per-user controls, a live results dashboard, and an admin panel for managing elections and candidates.`,
    stack: ["Authentication", "Admin dashboard", "Live results"],
  },
  {
    id: "campus-network",
    number: "02",
    category: "NETWORK ENGINEERING",
    title: "Campus Network Design & Configuration",
    description:
      "A simulated multi-VLAN campus network built in Cisco Packet Tracer for connected, organized, and secure departments.",
    details: `Problem Statement & Purpose:
I designed a campus network simulation to demonstrate how separate departments can communicate reliably while keeping their traffic organized.

Your Exact Role:
I created the network topology and configured the routers and switches in Cisco Packet Tracer, then tested connectivity between network segments.

Key Features & Functionalities Used:
I configured VLANs, inter-VLAN routing, DHCP, static and dynamic routing, access control lists, and switch security.`,
    stack: ["Cisco Packet Tracer", "VLANs", "Routing & ACLs"],
  },
  {
    id: "monitoring",
    number: "03",
    category: "NETWORK MONITORING",
    title: "Network Performance Monitoring Dashboard",
    description:
      "A monitoring concept that turns key network health metrics into a clear view of performance and potential bottlenecks.",
    details: `Problem Statement & Purpose:
I wanted to make it easier to spot network slowdowns by bringing important health and performance indicators into one dashboard.

Your Exact Role:
I planned the dashboard layout and the metrics that an administrator can use to understand network health and investigate performance issues.

Key Features & Functionalities Used:
I designed views for bandwidth, latency, packet loss, and device uptime, supported by charts, alerts, and at-a-glance status indicators.`,
    stack: ["Bandwidth", "Latency & packet loss", "Status alerts"],
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/keyeshieh-may",
    icon: "in",
  },
  {
    label: "Email",
    href: "mailto:keyeshiemay@gmail.com",
    icon: "@",
  },
  {
    label: "GitHub",
    href: "https://github.com/keyeshiehmay-source",
    icon: "⌘",
  },
];

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Education", "education"],
  ["Projects", "projects"],
  ["Contact", "contact"],
];

function SocialLinks({ className = "" }) {
  return (
    <div className={`social-links ${className}`}>
      {socialLinks.map((link) => (
        <a
          aria-label={link.label}
          className="social-link"
          href={link.href}
          key={link.label}
          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          target={link.href.startsWith("http") ? "_blank" : undefined}
        >
          <span aria-hidden="true" className="social-icon">
            {link.icon}
          </span>
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [typedName, setTypedName] = useState("");
  const [projectDetails, setProjectDetails] = useState(() =>
    Object.fromEntries(projects.map((project) => [project.id, project.details])),
  );
  const [savedProjects, setSavedProjects] = useState({});
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const names = ["Kym", "Keyeshieh"];
    let nameIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timeout;

    const type = () => {
      const currentName = names[nameIndex];
      characterIndex += deleting ? -1 : 1;
      setTypedName(currentName.slice(0, characterIndex));

      let delay = deleting ? 65 : 115;
      if (!deleting && characterIndex === currentName.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        nameIndex = (nameIndex + 1) % names.length;
        delay = 350;
      }
      timeout = window.setTimeout(type, delay);
    };

    timeout = window.setTimeout(type, 250);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    const revealItems = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );
    revealItems.forEach((item) => revealObserver.observe(item));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const handleDetailsChange = (id, value) => {
    setProjectDetails((current) => ({ ...current, [id]: value }));
    setSavedProjects((current) => ({ ...current, [id]: false }));
  };

  const saveDetails = (id) => {
    setSavedProjects((current) => ({ ...current, [id]: true }));
  };

  return (
    <>
      <div aria-hidden="true" className="ambient-background" />
      <header className="site-header">
        <nav aria-label="Main navigation" className="navbar page-shell">
          <a aria-label="Keyeshieh May Sinuto — Home" className="brand" href="#home">
            <span className="brand-mark">K</span>
            <span>keyeshieh<span className="brand-period">.</span></span>
          </a>
          <div className="nav-links">
            {navItems.map(([label, id]) => (
              <a
                aria-current={activeSection === id ? "location" : undefined}
                className={activeSection === id ? "nav-link active" : "nav-link"}
                href={`#${id}`}
                key={id}
              >
                {label}
              </a>
            ))}
          </div>
          <a className="nav-contact" href="#contact">
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main>
        <section aria-labelledby="hero-title" className="hero page-shell" data-section id="home">
          <div className="hero-copy">
            <div className="availability reveal">
              <span aria-hidden="true" className="availability-dot" />
              Open to opportunities
            </div>
            <p className="eyebrow hero-greeting reveal">
              HELLO THERE <span aria-hidden="true">✳</span>
            </p>
            <h1 className="typing-line reveal">
              Hi, I&apos;m <span className="typed-name">{typedName}</span>
              <span aria-hidden="true" className="typing-cursor" />
            </h1>
            <h2 className="hero-name reveal" id="hero-title">
              Keyeshieh May
              <br />
              <span>Sinuto</span>
            </h2>
            <p className="hero-role reveal">
              Aspiring Network Engineer
              <span className="role-divider"> / </span>
              <span className="muted-role">
                BSIT — Network Design &amp; Management Student
              </span>
            </p>
            <p className="hero-tagline reveal">
              Building reliable, optimized networks and practical projects.
            </p>
            <p className="location reveal">
              <span aria-hidden="true">⌖</span> San Jose City, Nueva Ecija
            </p>
            <div className="hero-actions reveal">
              <a className="button button-primary" href="#projects">
                View Projects <span aria-hidden="true">↘</span>
              </a>
              <a className="button button-outline" href="#contact">
                Contact Me <span aria-hidden="true">↗</span>
              </a>
            </div>
            <SocialLinks className="hero-socials reveal" />
          </div>

          <div className="hero-visual reveal">
            <div aria-hidden="true" className="photo-orbit orbit-one" />
            <div aria-hidden="true" className="photo-orbit orbit-two" />
            <div className="photo-frame">
              <Image
                alt="Portrait of Keyeshieh May Sinuto"
                className="profile-photo"
                height={640}
                priority
                src="/profile.jpg"
                width={640}
              />
            </div>
            <div className="photo-caption">
              <span className="caption-dot" />
              <span>Curious by nature. Connected by design.</span>
            </div>
            <span aria-hidden="true" className="visual-spark spark-one">✳</span>
            <span aria-hidden="true" className="visual-spark spark-two">✦</span>
          </div>
          <a aria-label="Scroll to about section" className="scroll-cue" href="#about">
            <span>SCROLL TO EXPLORE</span>
            <span aria-hidden="true" className="scroll-cue-line" />
          </a>
        </section>

        <section aria-labelledby="about-title" className="section page-shell" data-section id="about">
          <div className="section-heading reveal">
            <p className="eyebrow">A LITTLE ABOUT ME <span>01</span></p>
            <h2 id="about-title">Curiosity meets <span>connectivity.</span></h2>
          </div>
          <div className="about-grid">
            <p className="about-copy reveal">
              Dedicated 3rd-year Bachelor of Science in Information Technology
              student majoring in Network Design &amp; Management (NDM) at Nueva
              Vizcaya State University. Hands-on experience in configuring
              network hardware and network performance optimization.
            </p>
            <div className="skills-panel reveal">
              <p className="eyebrow">AREAS I WORK IN</p>
              <div className="skill-chips">
                {["Networking", "Routing & Switching", "Network Optimization", "Web Development"].map(
                  (skill) => (
                    <span className="skill-chip" key={skill}>
                      <span aria-hidden="true">↗</span> {skill}
                    </span>
                  ),
                )}
              </div>
              <div className="about-note">
                <span aria-hidden="true" className="note-mark">“</span>
                <p>Good networks are built with thoughtful connections.</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="education-title" className="section page-shell" data-section id="education">
          <div className="section-heading reveal">
            <p className="eyebrow">WHERE I LEARN <span>02</span></p>
            <h2 id="education-title">The foundation <span>so far.</span></h2>
          </div>
          <article className="education-card reveal">
            <div className="education-marker" aria-hidden="true"><span /></div>
            <div className="education-content">
              <p className="eyebrow">CURRENT <span className="education-status">IN PROGRESS</span></p>
              <h3>Nueva Vizcaya State University</h3>
              <p className="education-college">College of Information Technology (CITE)</p>
              <p className="education-degree">
                Bachelor of Science in Information Technology
                <span>BSIT 3B</span>
              </p>
            </div>
            <div aria-hidden="true" className="education-monogram">NVSU</div>
          </article>
        </section>

        <section aria-labelledby="projects-title" className="section projects-section page-shell" data-section id="projects">
          <div className="section-heading reveal">
            <p className="eyebrow">SELECTED WORK <span>03</span></p>
            <h2 id="projects-title">Projects with <span>purpose.</span></h2>
            <p className="section-intro">
              Practical explorations in building better digital experiences and
              more dependable networks.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                className="project-card reveal"
                key={project.id}
                style={{ "--reveal-delay": `${index * 110}ms` }}
              >
                <div className="project-topline">
                  <span className="project-number">{project.number}</span>
                  <span className="project-category">{project.category}</span>
                  <span aria-hidden="true" className="project-arrow">↗</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-stack">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <label className="details-label" htmlFor={`details-${project.id}`}>
                  PROJECT NOTES <span>EDITABLE</span>
                </label>
                <textarea
                  aria-label={`${project.title} project details`}
                  className="project-details"
                  id={`details-${project.id}`}
                  onChange={(event) => handleDetailsChange(project.id, event.target.value)}
                  value={projectDetails[project.id]}
                />
                <button
                  aria-live="polite"
                  className={`save-button${savedProjects[project.id] ? " is-saved" : ""}`}
                  onClick={() => saveDetails(project.id)}
                  type="button"
                >
                  {savedProjects[project.id] ? "Saved for this session" : "Save notes"}
                  <span aria-hidden="true">{savedProjects[project.id] ? "✓" : "↗"}</span>
                </button>
              </article>
            ))}
          </div>
          <p className="save-note reveal">
            Your project notes stay in this page for the current session.
          </p>
        </section>

        <section aria-labelledby="contact-title" className="contact-section page-shell" data-section id="contact">
          <div className="contact-card reveal">
            <div aria-hidden="true" className="contact-glow" />
            <p className="eyebrow">HAVE A PROJECT IN MIND? <span>04</span></p>
            <h2 id="contact-title">
              Let&apos;s make a
              <br />
              <span>connection.</span>
            </h2>
            <p className="contact-copy">
              I&apos;m always glad to talk about networks, technology, and
              opportunities to learn and build together.
            </p>
            <a className="button button-primary contact-cta" href="mailto:keyeshiemay@gmail.com">
              Say hello <span aria-hidden="true">↗</span>
            </a>
            <SocialLinks className="contact-socials" />
            <span aria-hidden="true" className="contact-decoration">K<span>.</span></span>
          </div>
        </section>
      </main>

      <footer className="site-footer page-shell">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">K</span>
          <span>keyeshieh<span className="brand-period">.</span></span>
        </a>
        <p>Designed &amp; built with curiosity <span aria-hidden="true">✳</span></p>
        <SocialLinks className="footer-socials" />
        <p className="copyright">© {new Date().getFullYear()} Keyeshieh May Sinuto</p>
      </footer>
    </>
  );
}
