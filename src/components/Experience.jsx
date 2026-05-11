import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, ShieldCheck, FileCheck, Monitor, Cloud } from 'lucide-react';

const competencies = [
  {
    icon: Globe,
    title: 'Server Operations',
    desc: 'Managing 30+ client servers globally, ensuring seamless 24/7 uptime and reliability.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Hardening',
    desc: 'Executing comprehensive system and database hardening across both Windows and Linux environments.',
  },
  {
    icon: FileCheck,
    title: 'Compliance & Auditing',
    desc: 'Active experience working on ISO 27001 audits and compliance standards.',
  },
  {
    icon: Monitor,
    title: 'SIEM Implementation',
    desc: 'Deployed and configured the Wazuh platform for centralized system monitoring and security management.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    desc: 'Responsible for provisioning, managing, and maintaining cloud infrastructure, Windows, and Linux operating systems.',
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative py-24 md:py-32 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-3 block">Professional Experience</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            Core Competencies
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            1+ Year as a System and Database Administrator at <span className="text-foreground font-medium">Kranium Healthcare Systems</span>, delivering enterprise-grade infrastructure, security, and compliance operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {competencies.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="group p-6 rounded-2xl glass glass-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
                <item.icon size={20} className="text-accent" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
