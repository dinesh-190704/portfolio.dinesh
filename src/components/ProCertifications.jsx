import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Shield, Database, Router, Cpu, Clock, Star } from 'lucide-react';

const certs = [
  {
    title: 'ISC2 Certified in Cybersecurity',
    org: 'ISC2',
    status: 'Currently Pursuing',
    icon: Shield,
    level: 'Professional',
    highlight: true,
  },
  {
    title: 'ISO/IEC 27001:2022',
    org: 'SkillFront',
    status: 'Information Security Associate',
    icon: Award,
    level: 'Associate',
    highlight: false,
  },
  {
    title: 'Oracle Certified Foundations',
    org: 'Oracle',
    status: 'Database Associate',
    icon: Database,
    level: 'Foundations',
    highlight: false,
  },
  {
    title: 'Customer Support',
    org: 'Cisco',
    status: 'IT Support Specialist',
    icon: Router,
    level: 'Specialist',
    highlight: false,
  },
  {
    title: 'Operating Systems',
    org: 'Cisco',
    status: 'System Administration',
    icon: Cpu,
    level: 'Specialist',
    highlight: false,
  },
  {
    title: 'Internet of Things',
    org: 'Cisco',
    status: 'IoT Infrastructure',
    icon: Award,
    level: 'Specialist',
    highlight: false,
  },
];

export default function ProCertifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="pro-section bg-background relative">
      <div className="grid-background" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-foreground text-tight mb-6">
            Certified Expertise
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Industry-recognized credentials validating expertise in security, systems, and infrastructure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40, rotateY: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.1 * i,
                type: 'spring',
                stiffness: 100
              }}
              className="achievement-badge group"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    cert.highlight 
                      ? 'bg-gradient-to-br from-security to-accent' 
                      : 'bg-surface-elevated border border-white/[0.08]'
                  }`}>
                    <cert.icon 
                      size={28} 
                      className={cert.highlight ? 'text-white' : 'text-muted'} 
                    />
                  </div>
                  
                  {cert.highlight && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-security/10 border border-security/20">
                      <Clock size={12} className="text-security" />
                      <span className="text-security text-xs font-semibold uppercase tracking-wide">
                        In Progress
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-foreground leading-tight">
                      {cert.title}
                    </h3>
                    {cert.highlight && <Star size={16} className="text-security" />}
                  </div>
                  <p className="text-sm font-semibold text-accent mb-1">
                    {cert.org}
                  </p>
                  <p className="text-xs text-muted uppercase tracking-wide">
                    {cert.level}
                  </p>
                </div>
                
                <div className="text-xs text-muted leading-relaxed">
                  {cert.status}
                </div>
              </div>
              
              {!cert.highlight && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-surface border border-white/[0.08] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Award size={16} className="text-accent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 glass-card glass-card-hover">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-security to-accent rounded-full" />
              <span className="gradient-text font-semibold">6 Certifications</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-security rounded-full animate-pulse" />
              <span className="text-security font-semibold">1 In Progress</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
