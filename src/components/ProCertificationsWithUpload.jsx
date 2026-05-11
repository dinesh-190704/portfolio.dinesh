import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Upload, X, FileText, Download, Check, Shield } from 'lucide-react';
import { persistentStorage } from '../utils/storage';

const certs = [
  {
    id: 1,
    title: 'ISC2 Certified in Cybersecurity',
    org: 'ISC2',
    status: 'Currently Pursuing',
    icon: Shield,
    level: 'Professional',
    highlight: true,
  },
  {
    id: 2,
    title: 'ISO/IEC 27001:2022',
    org: 'SkillFront',
    status: 'Information Security Associate',
    icon: Award,
    level: 'Associate',
    highlight: false,
  },
  {
    id: 3,
    title: 'Oracle Certified Foundations',
    org: 'Oracle',
    status: 'Database Associate',
    icon: Database,
    level: 'Foundations',
    highlight: false,
  },
  {
    id: 4,
    title: 'Customer Support',
    org: 'Cisco',
    status: 'IT Support Specialist',
    icon: Router,
    level: 'Specialist',
    highlight: false,
  },
  {
    id: 5,
    title: 'Operating Systems',
    org: 'Cisco',
    status: 'System Administration',
    icon: Cpu,
    level: 'Specialist',
    highlight: false,
  },
  {
    id: 6,
    title: 'Internet of Things',
    org: 'Cisco',
    status: 'IoT Infrastructure',
    icon: Award,
    level: 'Specialist',
    highlight: false,
  },
];

export default function ProCertificationsWithUpload() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [uploadedCerts, setUploadedCerts] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Load certificates from persistent storage on component mount
  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const savedCerts = await persistentStorage.loadCertificates();
        setUploadedCerts(savedCerts);
      } catch (error) {
        console.error('Failed to load certificates from persistent storage:', error);
        setUploadedCerts({});
      }
    };

    loadCertificates();
  }, []);

  // Save certificates to persistent storage whenever they change
  useEffect(() => {
    const saveCertificates = async () => {
      try {
        await persistentStorage.saveCertificates(uploadedCerts);
      } catch (error) {
        console.error('Failed to save certificates to persistent storage:', error);
      }
    };

    saveCertificates();
  }, [uploadedCerts]);

  const handleCertUpload = async (certId, file) => {
    if (!file) return;
    
    // Validate file type and size
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF, JPG, or PNG file.');
      return;
    }
    
    if (file.size > maxSize) {
      alert('File size must be less than 5MB.');
      return;
    }
    
    setUploading(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const base64Data = e.target.result;
          const newCert = {
            fileName: file.name,
            uploadDate: new Date().toISOString(),
            fileUrl: base64Data,
            fileType: file.type,
            fileSize: file.size,
          };
          
          setUploadedCerts(prev => {
            const updated = {
              ...prev,
              [certId]: newCert,
            };
            console.log('Certificate uploaded successfully:', certId);
            return updated;
          });
          
          setShowUploadModal(false);
          setSelectedCert(null);
          setUploading(false);
        } catch (error) {
          console.error('Failed to process uploaded file:', error);
          alert('Failed to process the uploaded file. Please try again.');
          setUploading(false);
        }
      };
      reader.onerror = () => {
        console.error('Failed to read file');
        alert('Failed to read the file. Please try again.');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
      setUploading(false);
    }
  };

  const handleCertClick = (cert) => {
    const uploadedCert = uploadedCerts[cert.id];
    if (uploadedCert && uploadedCert.fileUrl) {
      // Convert base64 to blob and create object URL
      try {
        const base64Data = uploadedCert.fileUrl.split(',')[1]; // Remove data:application/pdf;base64, prefix
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        
        // Open in new tab
        window.open(blobUrl, '_blank');
        
        // Clean up the blob URL after a short delay
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      } catch (error) {
        console.error('Error opening PDF:', error);
        // Fallback to data URL if blob creation fails
        window.open(uploadedCert.fileUrl, '_blank');
      }
    } else {
      // Show upload modal
      setSelectedCert(cert);
      setShowUploadModal(true);
    }
  };

  return (
    <section ref={ref} className="pro-section bg-background relative">
      <div className="grid-background" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-tight mb-4 md:mb-6">
            Certified Expertise
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto mb-6">
            Industry-recognized credentials validating expertise in security, systems, and infrastructure
          </p>
          
          {/* Clear All Certificates Button */}
          {Object.keys(uploadedCerts).length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <button
                onClick={async () => {
                  if (window.confirm('Are you sure you want to remove all uploaded certificates? This action cannot be undone.')) {
                    await persistentStorage.clearAllCertificates();
                    setUploadedCerts({});
                  }
                }}
                className="px-4 md:px-6 py-2 md:py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300 border border-red-500/30 text-sm md:text-base font-medium"
              >
                Clear All Certificates ({Object.keys(uploadedCerts).length})
              </button>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40, rotateY: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.1 * i,
                type: 'spring',
                stiffness: 100
              }}
              className={`achievement-badge group cursor-pointer relative h-full min-h-[200px] flex flex-col ${
                uploadedCerts[cert.id] ? 'hover:scale-105' : ''
              }`}
              onClick={() => handleCertClick(cert)}
            >
              <div className="relative z-10 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center relative flex-shrink-0 ${
                    cert.highlight 
                      ? 'bg-gradient-to-br from-accent to-blue-600' 
                      : 'bg-surface-elevated border border-white/[0.08]'
                  }`}>
                    <cert.icon 
                      size={28} 
                      className={cert.highlight ? 'text-white' : 'text-muted'} 
                    />
                    {uploadedCerts[cert.id] && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                        <Check size={12} className="text-black" />
                      </div>
                    )}
                  </div>
                  
                  {cert.highlight && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 flex-shrink-0">
                      <Clock size={12} className="text-accent" />
                      <span className="text-accent text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
                        In Progress
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mb-4 min-w-0 flex-grow">
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className="text-lg font-bold text-foreground leading-tight flex-1">
                      {cert.title}
                    </h3>
                    {cert.highlight && <Star size={16} className="text-accent flex-shrink-0" />}
                  </div>
                  <p className="text-sm font-semibold text-accent mb-1">
                    {cert.org}
                  </p>
                  <p className="text-xs text-muted uppercase tracking-wide">
                    {cert.level}
                  </p>
                </div>
                
                <div className="text-xs text-muted leading-relaxed">
                  {cert.status}
                </div>

                {uploadedCerts[cert.id] && (
                  <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <FileText size={14} className="text-accent flex-shrink-0" />
                        <span className="text-xs text-accent font-medium truncate">
                          {uploadedCerts[cert.id].fileName}
                        </span>
                      </div>
                      <Download size={14} className="text-accent flex-shrink-0" />
                    </div>
                    <div className="text-xs text-muted/70 mt-1 text-center">
                      Click to open
                    </div>
                  </div>
                )}
              </div>
              
              {!cert.highlight && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-surface border border-white/[0.08] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Upload size={16} className="text-accent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-6 px-8 py-4 glass-card glass-card-hover">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-accent to-blue-600 rounded-full" />
              <span className="gradient-text font-semibold">6 Certifications</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
              <span className="text-accent font-semibold">
                {Object.keys(uploadedCerts).length} Uploaded
              </span>
            </div>
          </div>
          
          <button
            onClick={() => {
              if (confirm('Clear all uploaded certificates? This cannot be undone.')) {
                localStorage.removeItem('uploadedCertificates');
                setUploadedCerts({});
                console.log('Cleared all certificates from localStorage');
              }
            }}
            className="text-xs text-muted/70 hover:text-muted transition-colors underline"
          >
            Clear All Certificates
          </button>
        </div>
        </motion.div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setShowUploadModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="glass-card max-w-md w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Upload Certificate</h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedCert(null);
                }}
                className="text-muted hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center">
                  <selectedCert.icon size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{selectedCert.title}</h4>
                  <p className="text-sm text-muted">{selectedCert.org}</p>
                </div>
              </div>
            </div>

            {uploadedCerts[selectedCert.id] ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-accent" />
                </div>
                <p className="text-foreground font-semibold mb-2">Certificate Uploaded</p>
                <p className="text-sm text-muted mb-4">{uploadedCerts[selectedCert.id].fileName}</p>
                <button
                  onClick={() => {
                    setUploadedCerts(prev => {
                      const newCerts = { ...prev };
                      delete newCerts[selectedCert.id];
                      return newCerts;
                    });
                    setShowUploadModal(false);
                    setSelectedCert(null);
                  }}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Remove Certificate
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => e.target.files[0] && handleCertUpload(selectedCert.id, e.target.files[0])}
                  disabled={uploading}
                  className="hidden"
                  id="cert-upload"
                />
                <label
                  htmlFor="cert-upload"
                  className={`block w-full p-8 border-2 border-dashed border-white/[0.2] rounded-xl text-center cursor-pointer hover:border-accent/50 transition-colors ${
                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload size={32} className="text-muted mx-auto mb-4" />
                  <p className="text-foreground font-semibold mb-2">
                    {uploading ? 'Uploading...' : 'Click to Upload Certificate'}
                  </p>
                  <p className="text-xs text-muted">
                    PDF, JPG, PNG (Max 5MB)
                  </p>
                </label>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
