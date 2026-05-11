import { motion } from 'framer-motion';
import { Mail, Code2, Globe, ArrowUpRight } from 'lucide-react';

const socials = [
  {
    label: 'Email',
    href: 'mailto:dinesh1900704@gmail.com',
    icon: Mail,
    description: 'dinesh1900704@gmail.com',
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

export default function AppleFooter() {
  return (
    <footer className="bg-background border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-tight mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Open to opportunities in infrastructure engineering, security operations, and compliance auditing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              viewport={{ once: true }}
              className="group text-center p-6 rounded-2xl bg-surface border border-black/[0.04] hover:border-black/[0.08] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-black/[0.04] flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/10 transition-colors">
                <social.icon size={24} className="text-muted group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">{social.label}</h3>
              <p className="text-sm text-muted">{social.description}</p>
              <ArrowUpRight size={16} className="text-muted group-hover:text-accent transition-colors mx-auto mt-2 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-200" />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-black/[0.06] text-center"
        >
          <p className="text-sm text-muted mb-2">
            &copy; {new Date().getFullYear()} Dinesh M. All rights reserved.
          </p>
          <p className="text-xs text-muted/60">
            Designed with precision. Built with React & Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
