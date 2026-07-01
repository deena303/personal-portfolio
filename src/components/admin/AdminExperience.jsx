import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import ConfirmModal from './ConfirmModal';

const Toggle = ({ checked, onChange }) => (
  <button type="button" onClick={() => onChange(!checked)}
    className={`relative inline-flex items-center rounded-full transition-all duration-300 focus:outline-none ${checked ? 'bg-red-500' : 'bg-white/10'}`}
    style={{ height: '22px', width: '42px' }}>
    <span className={`inline-block w-4 h-4 transform rounded-full bg-white shadow transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

const ExperienceModal = ({ exp, onSave, onClose }) => {
  const [form, setForm] = useState({ organization: '', role: '', duration: '', description: '', badge: '', tech: [], skills: [], showExperience: true, ...exp });
  const [techInput, setTechInput] = useState('');
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const addTech = (e) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      setForm(prev => ({ ...prev, tech: [...(prev.tech || []), techInput.trim()] }));
      setTechInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111] border border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl my-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-white">{exp.id ? 'Edit Experience' : 'Add Experience'}</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white">✕</button>
        </div>
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          {[['Company / Organization', 'organization'], ['Role', 'role'], ['Duration', 'duration'], ['Badge', 'badge']].map(([label, key]) => (
            <div key={key}>
              <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">{label}</label>
              <input value={form[key] || ''} onChange={e => set(key, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">Description</label>
            <textarea value={form.description || ''} onChange={e => set('description', e.target.value)} rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 resize-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">Tech Stack <span className="normal-case text-white/20">(Enter)</span></label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(form.tech || []).map(t => (
                <span key={t} className="flex items-center gap-1 px-2.5 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-full">
                  {t} <button onClick={() => set('tech', form.tech.filter(x => x !== t))}>×</button>
                </span>
              ))}
            </div>
            <input value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={addTech} placeholder="e.g. React..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors" />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <Toggle checked={form.showExperience !== false} onChange={v => set('showExperience', v)} />
            <span className="text-sm text-white/60 font-medium">Show Experience</span>
          </label>
        </div>
        <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5">Cancel</button>
          <button onClick={() => onSave(form)} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold">Save</button>
        </div>
      </div>
    </div>
  );
};

const AdminExperience = () => {
  const { data, updateData } = useData();
  const { addToast } = useToast();
  const [modal, setModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleSave = (form) => {
    let updated;
    if (form.id) {
      updated = data.experience.map(e => e.id === form.id ? { ...e, ...form } : e);
    } else {
      updated = [...data.experience, { ...form, id: Date.now().toString() }];
    }
    updateData('experience', updated);
    setModal(null);
    addToast(form.id ? 'Experience updated!' : 'Experience added!', 'success');
  };

  const handleDelete = (id) => {
    updateData('experience', data.experience.filter(e => e.id !== id));
    setConfirmDelete(null);
    addToast('Experience deleted.', 'error');
  };

  const handleToggle = (id) => {
    updateData('experience', data.experience.map(e => e.id === id ? { ...e, showExperience: !e.showExperience } : e));
    addToast('Visibility updated!', 'success');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-white">Work Experience</h2>
          <p className="text-white/40 text-sm mt-1">{data.experience.length} entries</p>
        </div>
        <button onClick={() => setModal({ exp: {} })} className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
          + Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {data.experience.map(exp => (
          <div key={exp.id} className="bg-[#111]/80 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  {exp.badge && <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">{exp.badge}</span>}
                  <span className="text-white/30 text-xs font-medium">{exp.duration}</span>
                </div>
                <h3 className="text-white font-black text-lg">{exp.role}</h3>
                <p className="text-white/50 text-sm font-semibold mt-0.5">{exp.organization}</p>
                {exp.description && <p className="text-white/30 text-xs mt-3 line-clamp-2 leading-relaxed">{exp.description}</p>}
                {exp.tech?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.tech.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-white/5 rounded text-white/40">{t}</span>)}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <Toggle checked={exp.showExperience !== false} onChange={() => handleToggle(exp.id)} />
                <div className="flex gap-1 mt-2">
                  <button onClick={() => setModal({ exp })} className="p-1.5 rounded-lg text-white/30 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button onClick={() => setConfirmDelete(exp.id)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && <ExperienceModal exp={modal.exp} onSave={handleSave} onClose={() => setModal(null)} />}
      <ConfirmModal isOpen={!!confirmDelete} title="Delete Experience" message="This action cannot be undone."
        onConfirm={() => handleDelete(confirmDelete)} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
};

export default AdminExperience;
