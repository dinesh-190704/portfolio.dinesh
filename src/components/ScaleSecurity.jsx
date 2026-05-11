import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const metrics = [
  {
    number: '30+',
    label: 'Client Servers Managed.',
    subtext: 'Ensuring seamless 24/7 global uptime',
  },
  {
    number: 'Zero',
    label: 'Compromise.',
    subtext: 'Comprehensive system and database hardening across Windows & Linux',
  },
  {
    number: 'Centralized',
    label: 'Vision.',
    subtext: 'Deployed and configured Wazuh SIEM for global monitoring',
  },
  {
    number: 'Compliant',
    label: 'by Design.',
    subtext: 'Active experience navigating and executing ISO 27001 audits',
  },
];

export default function ScaleSecurity() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="apple-section bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-tight mb-4">
            Scale & Security
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Enterprise-grade infrastructure management with uncompromising security standards
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-16">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 * i }}
              className="text-center"
            >
              <div className="apple-metric text-foreground text-tight mb-4">
                {metric.number}
              </div>
              <div className="text-2xl md:text-3xl font-semibold text-foreground text-tight mb-3">
                {metric.label}
              </div>
              <p className="text-base text-muted leading-relaxed max-w-md mx-auto">
                {metric.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
