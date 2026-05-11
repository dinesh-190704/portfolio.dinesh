import { motion } from 'framer-motion';
import { Mail, Code2, Globe, ArrowUpRight, Shield, Activity, Phone } from 'lucide-react';

const socials = [
  {
    label: 'Email',
    href: 'mailto:dinesh1900704@gmail.com',
    icon: Mail,
    description: 'dinesh1900704@gmail.com',
  },
  {
    label: 'Phone',
    href: 'tel:+916385800683',
    icon: Phone,
    description: '+91 63858 00683',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/dinesh-190704',
    icon: Code2,
    description: 'github.com/dinesh-190704',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dinesh-mohan-894574227/',
    icon: Globe,
    description: 'linkedin.com/in/dinesh-mohan-894574227',
  },
];

export default function ProFooter() {
  return (
    <footer className="bg-background border-t border-white/[0.08] relative">
      <div className="grid-background" />
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-foreground text-tight mb-6">
            Let&apos;s Connect
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto mb-8">
            Open to opportunities in infrastructure engineering, security operations, and compliance auditing.
          </p>
          
          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 px-6 py-3 glass-card glass-card-hover">
              <Shield size={20} className="text-security" />
              <span className="text-security font-semibold">Security Focused</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 glass-card glass-card-hover">
              <Activity size={20} className="text-accent" />
              <span className="text-accent font-semibold">24/7 Available</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-20">
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              viewport={{ once: true }}
              className="group glass-card glass-card-hover p-8 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-security/10 to-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-surface-elevated border border-white/[0.08] flex items-center justify-center mx-auto mb-6 group-hover:border-white/[0.16] transition-all duration-300">
                  <social.icon size={32} className="text-muted group-hover:text-foreground transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{social.label}</h3>
                <p className="text-sm text-muted mb-4">{social.description}</p>
                <ArrowUpRight size={20} className="text-muted group-hover:text-accent transition-colors mx-auto opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="pt-12 border-t border-white/[0.08]"
        >
          <div className="text-center">
            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} Dinesh M. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
