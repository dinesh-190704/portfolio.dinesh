import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Server, Database, Shield, Cloud, HardDrive, Activity } from 'lucide-react';

const technologies = [
  { name: 'RHEL', icon: Server, color: 'text-security' },
  { name: 'Windows Server', icon: Server, color: 'text-security-blue' },
  { name: 'SOC', icon: Shield, color: 'text-accent' },
  { name: 'MySQL', icon: Database, color: 'text-security' },
  { name: 'AWS', icon: Cloud, color: 'text-accent' },
  { name: 'Linux', icon: HardDrive, color: 'text-security' },
  { name: 'Docker', icon: Server, color: 'text-security-blue' },
  { name: 'Monitoring', icon: Activity, color: 'text-accent' },
];

export default function InfrastructureStack() {
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
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-foreground text-tight mb-6">
            Infrastructure Stack
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Enterprise technologies powering secure, scalable infrastructure solutions
          </p>
        </motion.div>

        <div className="relative overflow-hidden mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {technologies.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 * i,
                  type: 'spring',
                  stiffness: 100
                }}
                className="group h-full"
              >
                <div className="glass-card glass-card-hover p-8 text-center h-full flex flex-col justify-center min-h-[200px]">
                  <div className="w-16 h-16 rounded-2xl bg-surface-elevated border border-white/[0.08] flex items-center justify-center mx-auto mb-4 group-hover:border-white/[0.16] transition-all duration-300">
                    <tech.icon size={32} className={tech.color} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                    {tech.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="glass-card glass-card-hover p-6 text-center min-h-[120px] flex flex-col justify-center">
            <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
            <p className="text-sm text-muted">Monitoring</p>
          </div>
          <div className="glass-card glass-card-hover p-6 text-center min-h-[120px] flex flex-col justify-center">
            <div className="text-3xl font-bold text-accent mb-2">99.9%</div>
            <p className="text-sm text-muted">Uptime</p>
          </div>
          <div className="glass-card glass-card-hover p-6 text-center min-h-[120px] flex flex-col justify-center">
            <div className="text-3xl font-bold text-foreground mb-2">Zero</div>
            <p className="text-sm text-muted">Downtime</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
