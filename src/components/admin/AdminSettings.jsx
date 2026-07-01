import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

const AdminSettings = () => {
  const { data, updateData } = useData();
  const { addToast } = useToast();
  const [settings, setSettings] = useState(data.settings);

  const setPersonal = (key, value) => {
    setSettings(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [key]: value }
    }));
  };

  const setSocial = (key, value) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: value }
    }));
  };

  const handleSave = () => {
    updateData('settings', settings);
    addToast('Settings saved successfully!', 'success');
  };

  const personal = settings.personalInfo || {};
  const social = settings.socialLinks || {};

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-white">Settings</h2>
          <p className="text-white/40 text-sm mt-1">Portfolio information and configuration</p>
        </div>
        <button onClick={handleSave} className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors">
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <div className="bg-[#111]/80 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-5">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['Full Name', 'name'], ['First Name', 'firstName'], ['Brand Name', 'brandName'],
              ['Title', 'title'], ['Location', 'location'], ['Phone', 'phone'],
            ].map(([label, key]) => (
              <div key={key}>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">{label}</label>
                <input
                  value={personal[key] || ''}
                  onChange={e => setPersonal(key, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">Primary Email</label>
              <input
                value={personal?.emails?.primary || ''}
                onChange={e => setSettings(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, emails: { ...prev.personalInfo.emails, primary: e.target.value } }
                }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">Resume URL</label>
              <input
                value={personal?.resumeUrl || ''}
                onChange={e => setPersonal('resumeUrl', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">Summary / Bio</label>
              <textarea
                value={personal?.summary || ''}
                onChange={e => setPersonal('summary', e.target.value)}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 resize-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#111]/80 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-5">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['GitHub URL', 'github'], ['LinkedIn URL', 'linkedin'], ['WhatsApp Link', 'whatsapp'],
            ].map(([label, key]) => (
              <div key={key} className="md:col-span-1">
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">{label}</label>
                <input
                  value={social[key] || ''}
                  onChange={e => setSocial(key, e.target.value)}
                  placeholder="https://"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Export / Import */}
        <div className="bg-[#111]/80 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-2">Data Management</h3>
          <p className="text-white/30 text-sm mb-5">Export all portfolio data as JSON or import from a JSON file.</p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'portfolio-data.json';
                a.click();
                URL.revokeObjectURL(url);
                addToast('Data exported!', 'success');
              }}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              📥 Export JSON
            </button>
            <label className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer">
              📤 Import JSON
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={e => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    try {
                      const imported = JSON.parse(ev.target.result);
                      ['projects', 'skills', 'certificates', 'experience', 'leadership', 'settings'].forEach(k => {
                        if (imported[k]) updateData(k, imported[k]);
                      });
                      addToast('Data imported successfully!', 'success');
                    } catch {
                      addToast('Invalid JSON file.', 'error');
                    }
                  };
                  reader.readAsText(file);
                  e.target.value = '';
                }}
              />
            </label>
            <button
              onClick={() => {
                if (window.confirm('This will RESET all data to defaults from portfolioData.js. Are you sure?')) {
                  localStorage.removeItem('portfolio_data');
                  window.location.reload();
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-colors"
            >
              🔄 Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
