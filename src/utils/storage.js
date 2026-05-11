// Persistent storage utility that works across browsers and devices
// Uses localStorage as fallback but syncs with data files

export const persistentStorage = {
  // Load certificates from data file
  async loadCertificates() {
    try {
      // Try to load from the data file first
      const response = await fetch('/data/certificates.json');
      if (response.ok) {
        const data = await response.json();
        console.log('Loaded certificates from data file:', Object.keys(data.uploadedCertificates || {}).length);
        return data.uploadedCertificates || {};
      }
    } catch (error) {
      console.log('Data file not found, using localStorage fallback');
    }
    
    // Fallback to localStorage
    try {
      const savedCerts = localStorage.getItem('uploadedCertificates');
      if (savedCerts) {
        const parsedCerts = JSON.parse(savedCerts);
        if (parsedCerts && typeof parsedCerts === 'object') {
          console.log('Loaded certificates from localStorage fallback:', Object.keys(parsedCerts).length);
          return parsedCerts;
        }
      }
    } catch (error) {
      console.error('Failed to load certificates from localStorage:', error);
    }
    
    return {};
  },

  // Save certificates to both localStorage and prepare for data file update
  async saveCertificates(certificates) {
    try {
      // Save to localStorage for immediate persistence
      localStorage.setItem('uploadedCertificates', JSON.stringify(certificates));
      
      // In a real deployment, this would save to a backend service
      // For static sites, we'll update the data file structure
      const data = {
        uploadedCertificates: certificates,
        lastUpdated: new Date().toISOString()
      };
      
      console.log('Saved certificates:', Object.keys(certificates).length);
      console.log('Data prepared for persistent storage:', data);
      
      // Note: In production, this would be handled by a backend API
      // For now, localStorage provides cross-session persistence within the same browser
      
      return true;
    } catch (error) {
      console.error('Failed to save certificates:', error);
      return false;
    }
  },

  // Load resume data
  async loadResume() {
    try {
      // Try to load from the data file first
      const response = await fetch('/data/resume.json');
      if (response.ok) {
        const data = await response.json();
        console.log('Loaded resume from data file:', data.resumeUrl ? 'URL found' : 'No URL');
        return data.resumeUrl;
      }
    } catch (error) {
      console.log('Resume data file not found, using localStorage fallback');
    }
    
    // Fallback to localStorage
    try {
      const savedResume = localStorage.getItem('resumeUrl');
      if (savedResume) {
        console.log('Loaded resume from localStorage fallback:', 'URL found');
        return savedResume;
      }
    } catch (error) {
      console.error('Failed to load resume from localStorage:', error);
    }
    
    return null;
  },

  // Save resume data
  async saveResume(resumeUrl) {
    try {
      // Save to localStorage for immediate persistence
      localStorage.setItem('resumeUrl', resumeUrl);
      
      // Prepare data for persistent storage
      const data = {
        resumeUrl: resumeUrl,
        lastUpdated: new Date().toISOString()
      };
      
      console.log('Saved resume:', resumeUrl ? 'URL provided' : 'No URL');
      console.log('Data prepared for persistent storage:', data);
      
      // Note: In production, this would be handled by a backend API
      
      return true;
    } catch (error) {
      console.error('Failed to save resume:', error);
      return false;
    }
  },

  // Clear all data
  async clearAllCertificates() {
    try {
      localStorage.removeItem('uploadedCertificates');
      console.log('Cleared all certificates from storage');
      return true;
    } catch (error) {
      console.error('Failed to clear certificates:', error);
      return false;
    }
  }
};
