import React from 'react';
import { useData } from '../../context/DataContext';

const StatCard = ({ icon, label, count, color }) => (
  <div className="bg-[#111]/80 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
    <div className={`text-3xl w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
    <div>
      <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{label}</p>
      <p className="text-4xl font-black text-white">{count}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { data } = useData();

  const stats = [
    { icon: '📁', label: 'Projects', count: data.projects.length, color: 'bg-red-500/10 text-red-400' },
    { icon: '🛠', label: 'Skills', count: data.skills.length, color: 'bg-blue-500/10 text-blue-400' },
    { icon: '🏆', label: 'Certificates', count: data.certificates.length, color: 'bg-yellow-500/10 text-yellow-400' },
    { icon: '💼', label: 'Experience', count: data.experience.length, color: 'bg-green-500/10 text-green-400' },
    { icon: '🎯', label: 'Leadership', count: data.leadership.length, color: 'bg-purple-500/10 text-purple-400' },
    {
      icon: '👁',
      label: 'Visible Projects',
      count: data.projects.filter(p => p.showProject !== false).length,
      color: 'bg-orange-500/10 text-orange-400',
    },
  ];

  const recentProjects = [...data.projects]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white">Dashboard</h2>
        <p className="text-white/40 text-sm mt-1">Welcome back, Deena 👋</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Quick Overview */}
      <div className="bg-[#111]/80 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Projects</h3>
        <div className="space-y-3">
          {recentProjects.map((p, i) => (
            <div key={p.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-white/20 text-sm font-black font-serif italic">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-white text-sm font-semibold">{p.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.showProject !== false ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/30'}`}>
                  {p.showProject !== false ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
