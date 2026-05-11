import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Server, Database, ShieldCheck, Terminal, Lock, GitBranch } from 'lucide-react';

const skillGroups = [
  {
    title: 'IT Infrastructure',
    icon: Server,
    skills: ['RHEL', 'AlmaLinux', 'Windows Server'],
    description: 'Enterprise server deployment, configuration, and maintenance across hybrid environments.',
    col: 'col-span-1 md:col-span-2',
  },
  {
    title: 'Database Administration',
    icon: Database,
    skills: ['MySQL', 'PostgreSQL', 'Foreign Data Wrappers'],
    description: 'Schema design, migration pipelines, and performance optimization for critical data systems.',
    col: 'col-span-1 md:col-span-2',
  },
  {
    title: 'Cybersecurity',
    icon: ShieldCheck,
    skills: ['Wazuh SIEM', 'Sophos EDR', 'Burp Suite'],
    description: 'Threat detection, endpoint protection, and vulnerability assessment.',
    col: 'col-span-1',
  },
  {
    title: 'Server Hardening',
    icon: Lock,
    skills: ['CIS Benchmarks', 'SSH Hardening', 'Firewall Config'],
    description: 'Systematic lockdown of attack surfaces across Linux and Windows platforms.',
    col: 'col-span-1',
  },
  {
    title: 'CI/CD Pipelines',
    icon: GitBranch,
    skills: ['Git', 'Automation Scripts', 'Deployment'],
    description: 'Streamlined build and release workflows for reliable software delivery.',
    col: 'col-span-1',
  },
  {
    title: 'UI/UX Aesthetics',
    icon: Terminal,
    skills: ['Design Systems', 'Tailwind CSS', 'React'],
    description: 'Crafting clean, accessible interfaces with modern component architecture.',
    col: 'col-span-1',
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-3 block">Core Competencies</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Technical Arsenal
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl">
            A curated stack of infrastructure, database, and security tooling built through real-world enterprise deployments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className={`${group.col} group p-6 rounded-2xl glass glass-hover flex flex-col`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <group.icon size={18} className="text-accent" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow">{group.description}</p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/[0.05] text-muted-foreground border border-white/[0.06]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
