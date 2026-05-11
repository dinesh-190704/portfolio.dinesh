import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, Trash2, Lock, FileText, AlertCircle } from 'lucide-react';

// Mock storage service - replace with Supabase/AWS Amplify integration
const mockStorage = {
  resumeExists: true, // Toggle this to test different states
  resumeUrl: 'https://example.com/resume.pdf', // Mock URL
  uploadResume: async (file) => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return 'https://example.com/resume-uploaded.pdf';
  },
  deleteResume: async () => {
    // Simulate delete delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  },
  getResume: () => {
    return mockStorage.resumeExists ? mockStorage.resumeUrl : null;
  }
};

// Simple auth mock - replace with real auth
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (password) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    if (password === 'admin123') { // CHANGE THIS PASSWORD
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

export default function ResumeManager() {
  const { isAuthenticated, isLoading: authLoading, login, logout } = useAuth();
  const [resumeUrl, setResumeUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    setResumeUrl(mockStorage.getResume());
  }, []);

  const handleUpload = async (file) => {
    if (!file) return;
    
    setUploading(true);
    try {
      const url = await mockStorage.uploadResume(file);
      setResumeUrl(url);
      mockStorage.resumeExists = true;
      mockStorage.resumeUrl = url;
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await mockStorage.deleteResume();
      setResumeUrl(null);
      mockStorage.resumeExists = false;
      mockStorage.resumeUrl = null;
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const success = await login(password);
    if (!success) {
      setLoginError('Invalid password');
    } else {
      setShowLogin(false);
      setPassword('');
    }
  };

  // Public View
  if (!isAuthenticated) {
    return (
      <section className="apple-section bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-tight mb-8">
              Resume
            </h2>
            
            <div className="max-w-md mx-auto">
              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  download
                  className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-colors duration-200"
                >
                  <Download size={20} />
                  Download Resume
                </a>
              ) : (
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-black/[0.04] text-muted font-semibold rounded-xl cursor-not-allowed">
                  <AlertCircle size={20} />
                  Resume Update in Progress
                </div>
              )}
            </div>

            <button
              onClick={() => setShowLogin(true)}
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <Lock size={16} />
              Admin Access
            </button>

            {showLogin && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-6 bg-surface-elevated rounded-2xl border border-black/[0.04] max-w-sm mx-auto"
              >
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Admin password"
                      className="w-full px-4 py-3 bg-background border border-black/[0.08] rounded-lg focus:outline-none focus:border-accent transition-colors"
                      required
                    />
                  </div>
                  {loginError && (
                    <p className="text-sm text-red-500">{loginError}</p>
                  )}
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={authLoading}
                      className="flex-1 px-4 py-2 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50"
                    >
                      {authLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowLogin(false);
                        setPassword('');
                        setLoginError('');
                      }}
                      className="px-4 py-2 text-muted hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  // Admin View
  return (
    <section className="apple-section bg-surface">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-tight">
              Resume Management
            </h2>
            <button
              onClick={logout}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Sign Out
            </button>
          </div>

          {resumeUrl ? (
            <div className="space-y-6">
              <div className="p-8 bg-surface-elevated rounded-2xl border border-black/[0.04]">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center">
                    <FileText size={32} className="text-accent" />
                  </div>
                </div>
                <p className="text-lg text-foreground mb-4">Resume is currently hosted</p>
                <div className="flex gap-4 justify-center">
                  <a
                    href={resumeUrl}
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-colors"
                  >
                    <Download size={18} />
                    Download Current Resume
                  </a>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {deleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 size={18} />
                        Delete Resume
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted">
                Delete the current resume to upload a new one
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-8 bg-surface-elevated rounded-2xl border border-black/[0.04] border-dashed">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-black/[0.04] rounded-xl flex items-center justify-center">
                    <Upload size={32} className="text-muted" />
                  </div>
                </div>
                <p className="text-lg text-foreground mb-2">Upload Resume</p>
                <p className="text-sm text-muted mb-6">
                  PDF files only, max 5MB
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => e.target.files[0] && handleUpload(e.target.files[0])}
                  disabled={uploading}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-lg cursor-pointer hover:bg-foreground/90 transition-colors ${
                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      Choose File
                    </>
                  )}
                </label>
              </div>
              <p className="text-sm text-muted">
                No resume is currently hosted
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
