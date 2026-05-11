import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Server, Database, Cloud, Shield, Network, Bug, Users, Stethoscope } from 'lucide-react';

const experiences = [
  {
    icon: Stethoscope,
    title: 'Healthcare IT Infrastructure',
    description: 'System and Database Administrator supporting healthcare IT environments at Kranium Healthcare System, managing infrastructure for client hospitals',
    details: [
      'Installing, configuring, and maintaining Linux servers',
      'Application environments and backend systems',
      'Ensuring high availability, performance, and security'
    ],
    gradient: 'from-accent to-security-blue'
  },
  {
    icon: Database,
    title: 'Database Administration',
    description: 'Experienced in MySQL and PostgreSQL database administration with focus on healthcare data integrity',
    details: [
      'Database creation, stored procedures, replication setup',
      'Backups, recovery, and performance tuning',
      'Monitoring uptime and implementing preventive measures'
    ],
    gradient: 'from-security to-accent'
  },
  {
    icon: Cloud,
    title: 'AWS Cloud Migration',
    description: 'Skilled in AWS cloud services, migrating hospital data and applications from on-premises to cloud infrastructure',
    details: [
      'Cloud infrastructure planning and execution',
      'Data migration with zero downtime',
      'Monitoring cloud resources and optimizing costs'
    ],
    gradient: 'from-security-blue to-security'
  },
  {
    icon: Network,
    title: 'Network & Security',
    description: 'Working knowledge of networking concepts and security best practices for healthcare systems',
    details: [
      'TCP/IP, DNS, routing, and subnetting',
      'Firewall configuration and traffic management',
      'Access controls and security rule implementation'
    ],
    gradient: 'from-pink-600 to-red-600'
  },
  {
    icon: Bug,
    title: 'VAPT & Security Auditing',
    description: 'Experienced in Vulnerability Assessment and Penetration Testing to safeguard sensitive healthcare data',
    details: [
      'System hardening and security best practices',
      'Vulnerability assessments and penetration testing',
      'Security audit compliance for healthcare standards'
    ],
    gradient: 'from-red-600 to-orange-600'
  },
  {
    icon: Users,
    title: 'Windows Server & Active Directory',
    description: 'Proficient in Windows Server administration and Active Directory management',
    details: [
      'Active Directory user and group management',
      'Group Policy implementation',
      'Windows Server security and maintenance'
    ],
    gradient: 'from-orange-600 to-yellow-600'
  }
];

export default function ProfessionalExperience() {
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
            Professional Experience
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-4xl mx-auto text-professional leading-relaxed">
            Healthcare IT infrastructure and database administration expertise with proven results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.1 * i,
                type: 'spring',
                stiffness: 100
              }}
              className="glass-card glass-card-hover p-8 group h-full min-h-[400px] flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center`}>
                  <exp.icon size={32} className="text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">
                {exp.title}
              </h3>
              
              <p className="text-muted leading-relaxed mb-6">
                {exp.description}
              </p>
              
              <ul className="space-y-2 flex-grow">
                {exp.details.map((detail, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 glass-card glass-card-hover">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
              <span className="text-accent font-semibold">1+ Years Experience</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-foreground rounded-full animate-pulse" />
              <span className="text-foreground font-semibold">Healthcare Focused</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
              <span className="text-accent font-semibold">Security First</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
