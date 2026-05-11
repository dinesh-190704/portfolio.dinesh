import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, Download, Shield, Eye, EyeOff, Trash2 } from 'lucide-react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (password) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('auth_token', 'mock_token');
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth_token');
  };

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return { isAuthenticated, isLoading, login, logout };
};

export default function ProResumeManager() {
  const { isAuthenticated, isLoading: authLoading, login, logout } = useAuth();
  const [resumeUrl, setResumeUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Load resume from localStorage on component mount
  useEffect(() => {
    const savedResume = localStorage.getItem('uploadedResume');
    if (savedResume) {
      try {
        const parsedResume = JSON.parse(savedResume);
        setResumeUrl(parsedResume.fileUrl);
      } catch (error) {
        console.error('Failed to load resume from localStorage:', error);
        localStorage.removeItem('uploadedResume');
      }
    }
  }, []);

  // Listen for admin portal trigger from navigation
  useEffect(() => {
    const handleAdminModalOpen = () => {
      setShowLoginModal(true);
    };

    window.addEventListener('openAdminModal', handleAdminModalOpen);
    return () => window.removeEventListener('openAdminModal', handleAdminModalOpen);
  }, []);

  const handleUpload = async (file) => {
    if (!file) return;
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only.');
      return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }
    
    setUploading(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target.result;
        const resumeData = {
          fileName: file.name,
          uploadDate: new Date().toISOString(),
          fileUrl: base64Data,
        };
        
        setResumeUrl(base64Data);
        localStorage.setItem('uploadedResume', JSON.stringify(resumeData));
        setUploading(false);
        console.log('Resume uploaded successfully:', file.name);
      };
      reader.onerror = (error) => {
        console.error('Failed to read file:', error);
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

  const handleDelete = async () => {
    setDeleting(true);
    try {
      setResumeUrl(null);
      localStorage.removeItem('uploadedResume');
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleDownload = () => {
    if (resumeUrl) {
      try {
        // Convert base64 to blob and create object URL
        const base64Data = resumeUrl.split(',')[1]; // Remove data:application/pdf;base64, prefix
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        
        // Create download link
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the blob URL
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error('Error downloading resume:', error);
        // Fallback to data URL if blob creation fails
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const success = await login(password);
    if (!success) {
      setLoginError('Invalid credentials');
    } else {
      setShowLoginModal(false);
      setPassword('');
    }
  };

  return (
    <section className="pro-section bg-background relative">
      <div className="grid-background" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-foreground text-tight mb-12">
            Here is my resume
          </h2>
          
          <div className="max-w-2xl mx-auto text-center">
            {resumeUrl ? (
              <motion.button
                onClick={handleDownload}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-accent to-blue-600 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-accent/25 transition-all duration-300 group"
              >
                <Download size={24} />
                <span>Download Resume</span>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </motion.button>
            ) : (
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-surface-elevated border border-white/[0.08] text-muted font-semibold rounded-xl cursor-not-allowed">
                <AlertCircle size={24} />
                <span>Resume Not Uploaded</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-6"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-surface-elevated border border-white/[0.08] rounded-2xl max-w-md w-full p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Admin Access</h3>
                <button
                  onClick={() => {
                    setShowLoginModal(false);
                    setPassword('');
                    setLoginError('');
                  }}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="w-full px-4 py-3 bg-surface-elevated border border-white/[0.08] rounded-lg focus:outline-none focus:border-security transition-colors text-foreground"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                  >
                    {loginError}
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-security to-accent text-black font-bold rounded-lg hover:shadow-lg hover:shadow-security/25 transition-all duration-300 disabled:opacity-50"
                  >
                    {authLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Authenticating...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowLoginModal(false);
                      setPassword('');
                      setLoginError('');
                    }}
                    className="px-6 py-3 text-muted hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isAuthenticated && (
        <section className="pro-section bg-surface relative">
          <div className="grid-background" />
          
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-tight">
                  Admin Dashboard
                </h2>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 glass-card glass-card-hover text-sm font-medium"
                >
                  <Shield size={16} />
                  Sign Out
                </button>
              </div>

              {resumeUrl ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="glass-card glass-card-hover p-8 text-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center mx-auto mb-6">
                    <FileText size={40} className="text-black" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Resume Active
                  </h3>
                  
                  <p className="text-muted mb-8">
                    Current resume is available for download
                  </p>
                  
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-blue-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
                    >
                      <Download size={20} />
                      Download
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-500/30 text-red-400 font-bold rounded-lg hover:bg-red-500/30 transition-all duration-300 disabled:opacity-50"
                    >
                      {deleting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 size={20} />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="glass-card glass-card-hover p-8 text-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-surface-elevated border border-white/[0.08] flex items-center justify-center mx-auto mb-6">
                    <Upload size={40} className="text-muted" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Upload Resume
                  </h3>
                  
                  <p className="text-muted mb-8">
                    PDF files only, maximum 5MB
                  </p>
                  
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => e.target.files[0] && handleUpload(e.target.files[0])}
                    disabled={uploading}
                    className="hidden"
                    id="resume-upload-pro"
                  />
                  <label
                    htmlFor="resume-upload-pro"
                    className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-security to-accent text-black font-bold rounded-lg cursor-pointer hover:shadow-lg hover:shadow-security/25 transition-all duration-300 ${
                      uploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={20} />
                        Choose File
                      </>
                    )}
                  </label>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      )}
    </section>
  );
}
