import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Contexts
import { AdminAuthProvider } from './context/AdminAuthContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './context/ToastContext';

// Admin Components
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProjects from './components/admin/AdminProjects';
import AdminSkills from './components/admin/AdminSkills';
import AdminCertificates from './components/admin/AdminCertificates';
import AdminExperience from './components/admin/AdminExperience';
import AdminLeadership from './components/admin/AdminLeadership';
import AdminSettings from './components/admin/AdminSettings';

// Public Portfolio Components
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechnicalSkills from './components/TechnicalSkills';
import Services from './components/Services';
import Projects from './components/Projects';
import ContentCreator from './components/ContentCreator';
import Internships from './components/Internships';
import Leadership from './components/Leadership';
import Certificates from './components/Certificates';
import SoftSkills from './components/SoftSkills';
import Contact from './components/Contact';
import Footer from './components/Footer';

const PublicPortfolio = () => (
  <>
    <Preloader />
    <Navbar />
    <Hero />
    <About />
    <TechnicalSkills />
    <Services />
    <Projects />
    <ContentCreator />
    <Internships />
    <Leadership />
    <Certificates />
    <SoftSkills />
    <Contact />
    <Footer />
  </>
);



function App() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <DataProvider>
          <ToastProvider>
            <Routes>
              {/* Public Portfolio */}
              <Route path="/" element={<PublicPortfolio />} />

              {/* Admin Login */}
              <Route path="/admin" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/projects" element={<AdminProjects />} />
                <Route path="/admin/skills" element={<AdminSkills />} />
                <Route path="/admin/certificates" element={<AdminCertificates />} />
                <Route path="/admin/experience" element={<AdminExperience />} />
                <Route path="/admin/leadership" element={<AdminLeadership />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ToastProvider>
        </DataProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;
