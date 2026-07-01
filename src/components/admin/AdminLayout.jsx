import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const navItems = [
  { path: '/admin/dashboard', icon: '🏠', label: 'Dashboard' },
  { path: '/admin/projects', icon: '📁', label: 'Projects' },
  { path: '/admin/skills', icon: '🛠', label: 'Skills' },
  { path: '/admin/certificates', icon: '🏆', label: 'Certificates' },
  { path: '/admin/experience', icon: '💼', label: 'Work Experience' },
  { path: '/admin/leadership', icon: '🎯', label: 'Leadership' },
  { path: '/admin/settings', icon: '⚙', label: 'Settings' },
];

const AdminLayout = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-black text-white tracking-tight">V.Deena</h1>
        <p className="text-white/30 text-xs font-medium tracking-widest uppercase mt-0.5">Admin Dashboard</p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ path, icon, label }) => (
          <NavLink
            key={path}
            to={path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-[#ff2a2a]/20 text-red-400 border border-red-500/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
        >
          <span className="text-base">🚪</span>
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0f0f0f] border-r border-white/10 min-h-screen fixed left-0 top-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-64 bg-[#0f0f0f] border-r border-white/10 min-h-screen z-50">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/40 text-xs font-medium">Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
