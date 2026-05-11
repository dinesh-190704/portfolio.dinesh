import { motion } from 'framer-motion';
import { ChevronDown, Shield, Database, Briefcase } from 'lucide-react';

export default function ProHero() {
  return (
    <section className="pro-section bg-gradient-hero relative">
      <div className="grid-background" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mb-8 text-center"
          >
            <h1 className="pro-hero text-tight mb-6">
              Dinesh M
            </h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="pro-subhero text-foreground mb-8"
            >
              Infrastructure Engineer & Security Analyst
            </motion.h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-xl text-muted max-w-3xl mx-auto leading-relaxed mb-12"
          >
            1+ Year Experience as a System and Database Administrator at Kranium Healthcare Systems
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-3 px-6 py-3 glass-card glass-card-hover">
              <Database className="text-accent" size={20} />
              <span className="text-accent font-semibold">30+ Servers Managed</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 glass-card glass-card-hover">
              <Shield className="text-foreground" size={20} />
              <span className="text-foreground font-semibold">Zero Compromise</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-muted"
          >
            <ChevronDown size={28} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
