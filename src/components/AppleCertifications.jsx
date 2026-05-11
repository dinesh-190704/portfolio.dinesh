import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Shield, Database, Router, Cpu, Clock } from 'lucide-react';

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

export default function AppleCertifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="apple-section bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-tight mb-4">
            Certified Expertise
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Industry-recognized credentials validating expertise in security, systems, and infrastructure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * i }}
              className={`apple-card p-8 text-center ${
                cert.highlight 
                  ? 'bg-accent/5 border-accent/20' 
                  : 'bg-surface-elevated'
              } apple-card-hover`}
            >
              <div className="w-12 h-12 rounded-xl bg-black/[0.04] flex items-center justify-center mx-auto mb-6">
                <cert.icon size={24} className={cert.highlight ? 'text-accent' : 'text-muted'} />
              </div>
              
              {cert.highlight && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wide mb-4">
                  <Clock size={12} />
                  {cert.status}
                </div>
              )}
              
              <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                {cert.title}
              </h3>
              <p className="text-sm text-muted">
                {cert.org}
              </p>
              {!cert.highlight && (
                <p className="text-xs text-muted mt-1">
                  {cert.status}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
