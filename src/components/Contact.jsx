import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Globe, Mail, ArrowUpRight } from 'lucide-react';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/dinesh-190704',
    icon: Code2,
    placeholder: 'github.com/dinesh-190704',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dinesh-mohan-894574227/',
    icon: Globe,
    placeholder: 'linkedin.com/in/dinesh-mohan-894574227',
  },
  {
    label: 'Email',
    href: 'mailto:dinesh1900704@gmail.com',
    icon: Mail,
    placeholder: 'dinesh1900704@gmail.com',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-3 block">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Open to opportunities in infrastructure engineering, security operations, and compliance auditing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-20">
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.label === 'Email' ? '_self' : '_blank'}
              rel={social.label === 'Email' ? '' : 'noopener noreferrer'}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-black/[0.08] shadow-sm hover:shadow-md hover:border-black/[0.14] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-black/[0.04] border border-black/[0.06] flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300">
                <social.icon size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{social.label}</div>
                <div className="text-xs text-muted-foreground truncate">{social.placeholder}</div>
              </div>
              <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-accent transition-colors" />
            </motion.a>
          ))}
        </div>

        <div className="border-t border-black/[0.06] pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Dinesh M. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Designed with precision. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </section>
  );
}
