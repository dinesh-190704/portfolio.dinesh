import { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Scale & Security', href: '#scale-security' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export default function ProNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-black/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-xl font-bold tracking-tight text-foreground hover:text-accent transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center">
            <Shield size={16} className="text-black" />
          </div>
          Dinesh M
        </a>

        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground rounded-lg hover:bg-white/[0.08] transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          
          {/* Admin Portal Button */}
          <button
            onClick={() => {
              // Scroll to resume section and trigger admin modal
              const resumeSection = document.getElementById('resume');
              if (resumeSection) {
                resumeSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                  // Trigger admin modal in resume section
                  window.dispatchEvent(new CustomEvent('openAdminModal'));
                }, 500);
              }
            }}
            className="p-2 text-muted hover:text-security hover:bg-white/[0.08] transition-all duration-200 rounded-lg group"
            title="Admin Portal - Resume Upload/Delete"
          >
            <Shield size={16} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <button
          className="lg:hidden p-3 text-muted hover:text-foreground transition-colors rounded-lg hover:bg-white/[0.08]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-black/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="px-4 py-3 text-sm font-medium text-muted hover:text-foreground rounded-lg hover:bg-white/[0.08] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
            
            {/* Admin Portal Button - Mobile */}
            <button
              onClick={() => {
                setMenuOpen(false);
                // Scroll to resume section and trigger admin modal
                const resumeSection = document.getElementById('resume');
                if (resumeSection) {
                  resumeSection.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    // Trigger admin modal in resume section
                    window.dispatchEvent(new CustomEvent('openAdminModal'));
                  }, 500);
                }
              }}
              className="px-4 py-3 text-sm font-medium text-muted hover:text-security rounded-lg hover:bg-white/[0.08] transition-all duration-200 flex items-center gap-2"
            >
              <Shield size={16} />
              Admin Portal
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
