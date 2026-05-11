import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Layers, Database, TrendingUp } from 'lucide-react';

const projects = [
  {
    title: 'Medstar Application Infrastructure',
    description:
      'Designed and implemented a multi-server architecture separating host Linux, application, and database environments. Established standard operating procedures and IP configurations for secure, scalable deployment.',
    icon: Layers,
    tags: ['Linux', 'Multi-Server', 'SOP', 'Networking'],
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Enterprise Database Migration',
    description:
      'Managed a zero-downtime database migration from MySQL to PostgreSQL for complex healthcare systems, ensuring perfect schema mapping and data integrity verification.',
    icon: Database,
    tags: ['MySQL', 'PostgreSQL', 'Zero Downtime', 'Data Integrity'],
    gradient: 'from-violet-500/20 to-fuchsia-500/20',
  },
  {
    title: 'Data Analytics & Fantasy Sports Engine',
    description:
      'Developed automated statistical analysis models to evaluate player performance metrics and optimize daily fantasy cricket lineups.',
    icon: TrendingUp,
    tags: ['Python', 'Statistics', 'Automation', 'Sports Analytics'],
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-3 block">Selected Work</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Professional Projects
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl">
            A snapshot of infrastructure design, database engineering, and analytical systems I have delivered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="group relative p-6 md:p-8 rounded-2xl glass glass-hover overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/10 transition-all duration-300">
                    <project.icon size={20} className="text-accent" />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/[0.04] text-muted-foreground border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
