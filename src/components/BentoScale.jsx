import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Server, Shield, Eye, CheckCircle } from 'lucide-react';

const specs = [
  {
    icon: Server,
    number: '30+',
    label: 'Enterprise Clients',
    description: 'Ensuring seamless 24/7 global uptime across diverse infrastructure',
    gradient: 'from-security to-accent',
  },
  {
    icon: Shield,
    number: '100%',
    label: 'Security Hardened',
    description: 'Comprehensive system and database hardening across Windows & Linux',
    gradient: 'from-accent to-security',
  },
  {
    icon: Eye,
    number: 'SIEM',
    label: 'Centralized Vision',
    description: 'Deployed and configured Wazuh for global monitoring and threat detection',
    gradient: 'from-security to-accent',
  },
  {
    icon: CheckCircle,
    number: 'ISO',
    label: 'Compliant by Design',
    description: 'Active experience navigating and executing ISO 27001 audits',
    gradient: 'from-accent to-security',
  },
];

export default function BentoScale() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="pro-section bg-surface relative">
      <div className="grid-background" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-tight mb-6 md:mb-8">
            Scale & Security
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-4xl mx-auto text-professional leading-relaxed">
            Enterprise-grade infrastructure management with uncompromising security standards and operational excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 * i,
                type: 'spring',
                stiffness: 100
              }}
              className="bento-card group h-full min-h-[280px]"
            >
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${spec.gradient} flex items-center justify-center`}>
                    <spec.icon size={32} className="text-white" />
                  </div>
                  <div className="pro-metric gradient-text text-tight">
                    {spec.number}
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-foreground text-tight mb-3 md:mb-4">
                  {spec.label}
                </h3>
                
                <p className="text-muted text-professional leading-relaxed flex-grow">
                  {spec.description}
                </p>
              </div>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-security/10 to-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 glass-card glass-card-hover">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-security rounded-full animate-pulse" />
              <span className="text-security font-semibold">24/7 Monitoring</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
              <span className="text-accent font-semibold">Zero Downtime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
