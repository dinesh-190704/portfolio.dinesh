import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Shield, Zap, BarChart3 } from 'lucide-react';

const highlights = [
  {
    icon: Briefcase,
    title: 'Healthcare to Tech',
    desc: 'Unique background in healthcare pharmacy combined with deep IT infrastructure expertise.',
  },
  {
    icon: Shield,
    title: 'Cybersecurity Focus',
    desc: 'Actively pursuing ISC2 Certified in Cybersecurity (CC) credential.',
  },
  {
    icon: Zap,
    title: 'Continuous Learning',
    desc: 'Dedicated to mastering emerging technologies and security best practices.',
  },
  {
    icon: BarChart3,
    title: 'Analytical Edge',
    desc: 'Daily statistical analysis for fantasy cricket algorithms and high-performance electronics research.',
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-3 block">About Me</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-6">
            Bridging Healthcare Insight with IT Excellence
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl text-balance">
            I bring a distinctive perspective shaped by my background in healthcare pharmacy, now fully immersed in designing and managing robust IT infrastructure. My current focus centers on continuous learning in cybersecurity, where I am actively pursuing the <span className="text-foreground font-medium">ISC2 Certified in Cybersecurity (CC)</span> credential to deepen my defensive security capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="group p-6 rounded-2xl glass glass-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
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
