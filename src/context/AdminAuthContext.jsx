import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage on mount
    const session = localStorage.getItem('admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Hardcoded credentials as requested
    const ADMIN_EMAIL = 'deenaoffical1507@gmail.com';
    const ADMIN_PASSWORD = 'Deena@15072006';

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_session', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_session');
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {isLoading ? (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : children}
    </AdminAuthContext.Provider>
  );
}
