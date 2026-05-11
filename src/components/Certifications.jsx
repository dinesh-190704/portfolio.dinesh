import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Clock, Shield, Database, Router, Cpu } from 'lucide-react';

const certs = [
  {
    title: 'ISC2 Certified in Cybersecurity (CC)',
    org: 'ISC2',
    status: 'Currently Pursuing',
    icon: Shield,
    highlight: true,
  },
  {
    title: 'ISO/IEC 27001:2022 Information Security Associate',
    org: 'SkillFront',
    status: 'Completed',
    icon: Award,
    highlight: false,
  },
  {
    title: 'Oracle Certified Foundations Associate',
    org: 'Oracle',
    status: 'Completed',
    icon: Database,
    highlight: false,
  },
  {
    title: 'Customer Support Certification',
    org: 'Cisco',
    status: 'Completed',
    icon: Router,
    highlight: false,
  },
  {
    title: 'Operating Systems Certification',
    org: 'Cisco',
    status: 'Completed',
    icon: Cpu,
    highlight: false,
  },
  {
    title: 'Internet of Things (IoT) Certification',
    org: 'Cisco',
    status: 'Completed',
    icon: Award,
    highlight: false,
  },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="relative py-24 md:py-32 border-t border-black/[0.06] bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-3 block">Credentials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Certifications
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl">
            Continuous investment in industry-recognized credentials to validate expertise in security, systems, and infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              className={`group p-6 rounded-2xl border transition-all duration-300 ${
                cert.highlight
                  ? 'bg-white border-accent/30 shadow-sm hover:shadow-md hover:border-accent/50'
                  : 'bg-white border-black/[0.06] shadow-sm hover:shadow-md hover:border-black/[0.12]'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  cert.highlight ? 'bg-accent/10' : 'bg-black/[0.04]'
                } group-hover:bg-accent/10 transition-colors`}>
                  <cert.icon size={20} className={cert.highlight ? 'text-accent' : 'text-muted-foreground group-hover:text-accent transition-colors'} />
                </div>
                {cert.highlight && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-semibold uppercase tracking-wide">
                    <Clock size={10} />
                    In Progress
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1 leading-snug">{cert.title}</h3>
              <p className="text-sm text-muted-foreground">{cert.org}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
