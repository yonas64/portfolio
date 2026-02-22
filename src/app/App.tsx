import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Code2, Database, Palette, Mail, Github, Linkedin, Terminal, ArrowRight, ArrowLeft } from 'lucide-react';
import RobotAssistant from './components/RobotAssistant';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

type SectionKey = 'hero' | 'skills' | 'projects' | 'hobbies' | 'contact';

const sectionTitles: SectionKey[] = ['hero', 'skills', 'projects', 'hobbies', 'contact'];
const heroPhotoSrc = '/profile-placeholder.svg';
const psychologySections = [
  {
    title: 'Jungian Psychology',
    image: '/psychology/as-1.png',
    body: [
      'The deeper you look into the mind, the more you realize most of what drives you is invisible.',
      'These ideas, inspired by Carl Jung, are not just theories. They are mirrors.',
    ],
  },
  {
    title: 'The Shadow',
    image: '/psychology/as-4.png',
    body: [
      'Think about the traits you dislike most in other people: arrogance, weakness, laziness, neediness.',
      'Why do those traits trigger you so strongly?',
      'Jung suggested that what disturbs us in others often reflects something unaccepted within ourselves.',
      'The Shadow is not evil. It is simply the part of you that was pushed away because it was inconvenient, judged, or misunderstood.',
      'Growth begins the moment you stop fighting your Shadow and start understanding it.',
    ],
  },
  {
    title: 'The Collective Unconscious',
    image: '/psychology/collective2.png',
    body: [
      'Why do certain stories move you deeply, even if they come from cultures far from yours?',
      'Why do symbols like the hero, the villain, or the wise guide feel instantly familiar?',
      'Jung believed that beneath your personal memories lies a shared human layer of the mind: the Collective Unconscious.',
      'It connects you to myths, dreams, and stories across time and explains why some patterns feel universal.',
      'You are more connected to humanity than you think.',
    ],
  },
  {
    title: 'Dream Interpretation',
    image: '/psychology/dream.jpg',
    body: [
      'Jung believed dreams are not random noise. They are messages from parts of you that do not speak during the day.',
      'A dream does not predict the future. It reveals what you are ignoring.',
      'A fall might reflect loss of control. A locked door might reflect avoidance. A shadowy figure might reflect something unacknowledged within you.',
      'Your unconscious speaks in symbols, not sentences.',
    ],
  },
  {
    title: 'Self-Awareness and Metacognition',
    image: '/psychology/self.jpg',
    body: [
      'Notice your reactions. When someone criticizes you, what rises first: anger, defensiveness, or silence?',
      'Do you react automatically, or do you observe yourself reacting?',
      'Metacognition is the ability to step outside your thoughts and watch them.',
      'The moment you observe your thinking, you are no longer controlled by it.',
      'Self-awareness is quiet power.',
    ],
  },
  {
    title: 'Individuation',
    image: '/psychology/individuation.svg',
    body: [
      'Who are you without expectations, labels, performance, or the need to impress?',
      'Jung called the journey toward wholeness individuation.',
      'It is not about becoming perfect. It is about becoming honest.',
      'It is the slow integration of contradictions: strength and weakness, confidence and fear, light and shadow.',
      'Individuation is not self-improvement. It is self-integration.',
    ],
  },
];
const projectShowcase = [
  {
    title: 'SecureAuth Dashboard',
    year: '2025',
    status: 'Live',
    description:
      'Enterprise authentication platform handling 100k+ daily active users with OAuth 2.0, MFA, and SSO.',
    tech: ['Next.js', 'PostgreSQL', 'Redis', 'OAuth 2.0'],
    outcomes: ['99.98% auth uptime', '35% faster login flow', 'Reduced support tickets by 41%'],
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'Real-time Analytics Engine',
    year: '2024',
    status: 'Production',
    description:
      'Real-time observability pipeline processing 50k events/second with sub-100ms dashboard updates.',
    tech: ['React', 'WebSocket', 'TimescaleDB', 'D3.js'],
    outcomes: ['<100ms stream latency', '50k events/sec sustained', 'Used by ops teams daily'],
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'Design System Library',
    year: '2024',
    status: 'Scaled',
    description:
      'Reusable component library used across 15+ products with accessibility standards and versioned releases.',
    tech: ['React', 'TypeScript', 'Storybook', 'CSS-in-JS'],
    outcomes: ['15+ product adoption', '42% faster UI delivery', 'Consistent accessibility baseline'],
    demoUrl: '#',
    codeUrl: '#',
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname.toLowerCase());

  const shouldReduceMotion = useReducedMotion();
  const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const riseIn = useMemo(
    () => ({
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 26 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: smoothEase },
      },
    }),
    [shouldReduceMotion],
  );

  const stagger = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: shouldReduceMotion ? 0 : 0.09,
          delayChildren: shouldReduceMotion ? 0 : 0.06,
        },
      },
    }),
    [shouldReduceMotion],
  );

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname.toLowerCase());
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as SectionKey);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionTitles.forEach((key) => {
      const section = document.getElementById(key);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [currentPath]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigateToPsychology = () => {
    if (window.location.pathname !== '/psychology') {
      window.history.pushState({}, '', '/psychology');
      setCurrentPath('/psychology');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToPortfolio = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (currentPath === '/psychology') {
    return (
      <div className="relative min-h-screen overflow-x-clip bg-zinc-950 px-6 py-16 text-zinc-100">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute -top-32 left-[5%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
            animate={shouldReduceMotion ? undefined : { x: [0, 35, -10, 0], y: [0, 24, -16, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-12rem] right-[8%] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
            animate={shouldReduceMotion ? undefined : { x: [0, -32, 0], y: [0, -26, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
        </div>

        <main className="relative z-10 mx-auto max-w-5xl">
          <motion.button
            type="button"
            onClick={navigateToPortfolio}
            whileHover={shouldReduceMotion ? undefined : { x: -2 }}
            className="mb-8 inline-flex items-center gap-2 border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </motion.button>

          <motion.div initial="hidden" animate="show" variants={stagger}>
            {psychologySections.map((section, index) => (
              <motion.section
                key={section.title}
                variants={riseIn}
                className="mb-6 border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 backdrop-blur-sm"
              >
                <div className="grid items-center gap-6 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : index % 2 === 0 ? 36 : -36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className={index % 2 === 0 ? 'md:order-2' : 'md:order-1'}
                  >
                    <div className="relative overflow-hidden border border-zinc-800 bg-zinc-950/60">
                      <ImageWithFallback
                        src={section.image}
                        alt={`${section.title} concept illustration`}
                        className="h-56 w-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : index % 2 === 0 ? -36 : 36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.55, ease: 'easeOut', delay: shouldReduceMotion ? 0 : 0.05 }}
                    className={index % 2 === 0 ? 'md:order-1' : 'md:order-2'}
                  >
                    <h2 className="mb-4 text-2xl md:text-3xl">{section.title}</h2>
                    <div className="space-y-3">
                      {section.body.map((paragraph, paragraphIndex) => {
                        const isLast = paragraphIndex === section.body.length - 1;
                        return (
                          <p
                            key={`${section.title}-${paragraphIndex}`}
                            className={
                              isLast
                                ? 'border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-zinc-100'
                                : 'text-zinc-300'
                            }
                          >
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            ))}
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 left-[5%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
          animate={shouldReduceMotion ? undefined : { x: [0, 35, -10, 0], y: [0, 24, -16, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-12rem] right-[8%] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
          animate={shouldReduceMotion ? undefined : { x: [0, -32, 0], y: [0, -26, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(63,63,70,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(63,63,70,0.45) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem',
          }}
          animate={shouldReduceMotion ? undefined : { backgroundPositionY: ['0rem', '4rem'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10">
        <motion.section
          id="hero"
          className="min-h-screen px-6 relative flex items-center justify-center"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <div className="max-w-6xl w-full grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <motion.div variants={riseIn} className="mb-4 inline-block border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm text-zinc-400">
                <Terminal className="mr-2 inline-block h-3 w-3" />
                Available for work
              </motion.div>
              <motion.h1 variants={riseIn} className="mb-6 text-6xl md:text-8xl">
                Yonas <span className="text-zinc-600">Bezawerk</span>
              </motion.h1>
              <motion.p variants={riseIn} className="mb-8 max-w-2xl text-xl text-zinc-400 md:text-2xl">
                Full-stack developer specializing in building secure, scalable systems and crafting exceptional user experiences.
              </motion.p>
              <motion.div variants={riseIn} className="flex flex-wrap gap-4">
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -2, boxShadow: '0 8px 24px rgba(255,255,255,0.12)' }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className="px-6 py-3 bg-zinc-100 text-zinc-950 transition-colors hover:bg-zinc-200"
                >
                  Get in touch
                </motion.a>
                <motion.a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('projects');
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className="border border-zinc-700 px-6 py-3 transition-colors hover:border-zinc-500"
                >
                  View work
                </motion.a>
              </motion.div>
            </div>

            <motion.div variants={riseIn} className="mx-auto w-full max-w-[19rem] sm:max-w-[22rem]">
              <div className="relative">
                <div className="pointer-events-none absolute -inset-5 bg-cyan-400/10 blur-3xl" />
                <div className="pointer-events-none absolute -left-5 -top-5 h-16 w-16 border-l border-t border-cyan-300/40" />
                <div className="pointer-events-none absolute -bottom-5 -right-5 h-16 w-16 border-b border-r border-cyan-300/40" />

                <div className="relative overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                  <ImageWithFallback
                    src={heroPhotoSrc}
                    alt="Yonas portrait"
                    className="h-[24rem] w-full object-cover grayscale contrast-110 transition duration-500 hover:grayscale-0"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-zinc-500"></p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="min-h-screen px-6 py-20 flex items-center justify-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <div className="max-w-6xl w-full">
            <motion.h2 variants={riseIn} className="mb-4 text-4xl md:text-5xl">Skills</motion.h2>
            <motion.p variants={riseIn} className="mb-12 text-lg text-zinc-500">He broke things to understand them.</motion.p>

            <motion.div variants={stagger} className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'Frontend',
                  copy: 'Building interfaces that users actually enjoy.',
                  icon: Code2,
                  items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Motion'],
                },
                {
                  title: 'Backend',
                  copy: 'Systems that scale. Authentication that works.',
                  icon: Database,
                  items: ['Node.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL'],
                },
                {
                  title: 'Design',
                  copy: 'Minimal. Intentional. Functional.',
                  icon: Palette,
                  items: ['UI/UX', 'Figma', 'Design Systems', 'Accessibility', 'Animation'],
                },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  variants={riseIn}
                  whileHover={shouldReduceMotion ? undefined : { y: -6, borderColor: 'rgb(82 82 91)' }}
                  className="group border border-zinc-800 bg-zinc-950/70 p-8 backdrop-blur-sm transition-colors"
                >
                  <card.icon className="mb-4 h-10 w-10 text-zinc-400 transition-colors group-hover:text-cyan-300" />
                  <h3 className="mb-3 text-2xl">{card.title}</h3>
                  <p className="mb-4 text-zinc-500">{card.copy}</p>
                  <div className="flex flex-wrap gap-2">
                    {card.items.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                        className="bg-zinc-900 px-2 py-1 text-sm text-zinc-400"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="min-h-screen px-6 py-20 flex items-center justify-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <div className="max-w-6xl w-full">
            <motion.h2 variants={riseIn} className="mb-4 text-4xl md:text-5xl">Projects</motion.h2>
            <motion.p variants={riseIn} className="mb-12 text-lg text-zinc-500">These survived production.</motion.p>
            <motion.div variants={riseIn} className="mb-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Shipped Projects', value: '12+' },
                { label: 'Products Impacted', value: '15+' },
                { label: 'Avg. Perf Gain', value: '38%' },
              ].map((item) => (
                <div key={item.label} className="border border-zinc-800 bg-zinc-900/40 p-4">
                  <div className="text-2xl text-zinc-100">{item.value}</div>
                  <div className="text-sm text-zinc-500">{item.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={stagger} className="space-y-6">
              {projectShowcase.map((project) => (
                <motion.article
                  key={project.title}
                  variants={riseIn}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  className="group relative overflow-hidden border border-zinc-800 bg-zinc-950/60 p-8 transition-colors hover:border-zinc-600"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
                  </div>

                  <div className="relative">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-2xl">{project.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="bg-zinc-900 px-2 py-1 text-sm text-zinc-400">{project.year}</span>
                        <span className="border border-cyan-400/40 bg-cyan-400/10 px-2 py-1 text-xs text-cyan-200">{project.status}</span>
                      </div>
                    </div>

                    <p className="mb-5 text-zinc-400">{project.description}</p>

                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="bg-zinc-900 px-2 py-1 text-xs text-zinc-500">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mb-6 grid gap-2 sm:grid-cols-3">
                      {project.outcomes.map((outcome) => (
                        <div key={outcome} className="border border-zinc-800 bg-zinc-900/30 px-3 py-2 text-xs text-zinc-300">
                          {outcome}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href={project.demoUrl}
                        className="inline-flex items-center gap-2 border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
                      >
                        Live demo <ArrowRight className="h-4 w-4" />
                      </a>
                      <a
                        href={project.codeUrl}
                        className="inline-flex items-center gap-2 border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
                      >
                        Case study <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="hobbies"
          className="min-h-screen px-6 py-20 flex items-center justify-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <div className="max-w-6xl w-full">
            <motion.h2 variants={riseIn} className="mb-4 text-4xl md:text-5xl">Beyond Code</motion.h2>
            <motion.p variants={riseIn} className="mb-12 text-lg text-zinc-500">
              CNC business, visual storytelling, and creative work outside software.
            </motion.p>

            <motion.div variants={stagger} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'CNC Machine Business',
                  text: 'Working with CNC fabrication workflows, production planning, and client delivery.',
                  value: 'Precision, quality control, and operational discipline.',
                },
                {
                  title: 'Movies and Series',
                  text: 'Exploring cinematography, pacing, and character storytelling across genres.',
                  value: 'Better narrative sense for product and content storytelling.',
                },
                {
                  title: 'Reading',
                  text: 'Books on business, technology, and personal growth.',
                  value: 'Continuous learning and sharper long-term thinking.',
                },
                {
                  title: 'Photography',
                  text: 'Capturing street and architecture moments with strong composition.',
                  value: 'A better eye for balance, framing, and visual hierarchy.',
                },
                {
                  title: 'Content Creation',
                  text: 'Creating short-form content around projects, ideas, and practical workflows.',
                  value: 'Clear communication and stronger audience connection.',
                },
                {
                  title: 'Jungian Psychology',
                  text: 'Studying the shadow, dreams, and self-awareness to understand deeper human patterns.',
                  value: 'Click to open a dedicated page with my notes and sections.',
                  path: '/psychology',
                },
              ].map((hobby) => (
                <motion.div
                  key={hobby.title}
                  variants={riseIn}
                  whileHover={shouldReduceMotion ? undefined : { y: -5, backgroundColor: 'rgba(24,24,27,0.55)' }}
                  className="border border-zinc-800 bg-zinc-950/40 p-8 transition-colors"
                >
                  <h3 className="mb-3 text-2xl">{hobby.title}</h3>
                  <p className="mb-4 text-zinc-400">{hobby.text}</p>
                  <p className="text-sm text-zinc-500">{hobby.value}</p>
                  {hobby.path && (
                    <button
                      type="button"
                      onClick={navigateToPsychology}
                      className="mt-5 inline-flex items-center gap-2 border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
                    >
                      Open psychology page
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="min-h-screen px-6 py-20 flex items-center justify-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          <div className="max-w-4xl w-full">
            <motion.h2 variants={riseIn} className="mb-4 text-4xl md:text-5xl">Get in Touch</motion.h2>
            <motion.p variants={riseIn} className="mb-12 text-lg text-zinc-500">This is where humans can reach him.</motion.p>

            <motion.div variants={stagger} className="mb-12 space-y-6">
              {[
                {
                  href: 'mailto:yonasbezawork@gmail.com',
                  label: 'Email',
                  value: 'yonasbezawork@gmail.com',
                  icon: Mail,
                },
                {
                  href: 'https://github.com/yonas64',
                  label: 'GitHub',
                  value: 'github.com/yonas',
                  icon: Github,
                  external: true,
                },
                {
                  href: 'https://www.linkedin.com/in/yonas-bezawerk-0088a43b1',
                  label: 'LinkedIn',
                  value: 'linkedin.com/in/yonas-bezawerk',
                  icon: Linkedin,
                  external: true,
                },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  variants={riseIn}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  whileHover={shouldReduceMotion ? undefined : { x: 6, borderColor: 'rgb(82 82 91)' }}
                  className="group flex items-center gap-4 border border-zinc-800 p-6 transition-colors"
                >
                  <item.icon className="h-6 w-6 text-zinc-400 transition-colors group-hover:text-zinc-100" />
                  <div>
                    <div className="text-sm text-zinc-400">{item.label}</div>
                    <div className="text-xl">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <motion.div variants={riseIn} className="text-center text-sm text-zinc-600">
              (c) 2026 Yonas Feshazion. Built with React and an unhealthy amount of coffee.
            </motion.div>
          </div>
        </motion.section>
      </div>

      <RobotAssistant activeSection={activeSection} onNavigate={scrollToSection} />
    </div>
  );
}
