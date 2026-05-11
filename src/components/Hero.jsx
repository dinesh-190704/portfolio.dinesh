import { motion } from 'framer-motion';
import { MapPin, ArrowDown, Mail, Briefcase } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-400/5 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold text-accent mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          Available for opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
        >
          Dinesh M
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl sm:text-2xl text-muted font-light mb-4"
        >
          System and Database Administrator
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-4 text-muted-foreground text-sm mb-6 flex-wrap"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} />
            Chennai, India
          </span>
          <span className="hidden sm:inline text-border-hover">|</span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase size={14} />
            1+ Year at Kranium Healthcare Systems
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base text-muted-foreground max-w-2xl mx-auto mb-10 text-balance leading-relaxed"
        >
          Seeking opportunities as an <span className="text-foreground font-medium">Infrastructure Engineer</span>, <span className="text-foreground font-medium">Security Analyst</span>, <span className="text-foreground font-medium">System Administrator</span>, or <span className="text-foreground font-medium">ISO Internal Auditor</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#experience').scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-xl hover:bg-foreground/90 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            View Expertise
            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 glass glass-hover font-medium rounded-xl text-foreground"
          >
            <Mail size={16} />
            Contact Me
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={20} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
