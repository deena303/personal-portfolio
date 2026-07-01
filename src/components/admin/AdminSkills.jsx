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

const CATEGORIES = ['Frontend Development', 'UI / UX & 3D Design', 'Development Tools', 'Additional Skills'];

const SkillModal = ({ skill, onSave, onClose }) => {
  const [form, setForm] = useState({ name: '', percentage: 80, category: 'Frontend Development', icon: '', showSkill: true, ...skill });
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-white">{skill.id ? 'Edit Skill' : 'Add Skill'}</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white">✕</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">Skill Name</label>
            <input value={form.name} onChange={e => set('name', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors">
              {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#111]">{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Proficiency: {form.percentage}%</label>
            <input type="range" min="0" max="100" value={form.percentage} onChange={e => set('percentage', Number(e.target.value))}
              className="w-full accent-red-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">Icon (emoji)</label>
            <input value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="e.g. ⚛️"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors" />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <Toggle checked={form.showSkill !== false} onChange={v => set('showSkill', v)} />
            <span className="text-sm text-white/60 font-medium">Show Skill</span>
          </label>
        </div>
        <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5">Cancel</button>
          <button onClick={() => onSave(form)} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold">Save Skill</button>
        </div>
      </div>
    </div>
  );
};

const AdminSkills = () => {
  const { data, updateData } = useData();
  const { addToast } = useToast();
  const [modal, setModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');

  const filtered = data.skills.filter(s =>
    (filterCat === 'All' || s.category === filterCat) &&
    s.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form) => {
    let updated;
    if (form.id) {
      updated = data.skills.map(s => s.id === form.id ? { ...s, ...form } : s);
    } else {
      updated = [...data.skills, { ...form, id: Date.now().toString(), order: data.skills.length }];
    }
    updateData('skills', updated);
    setModal(null);
    addToast(form.id ? 'Skill updated!' : 'Skill added!', 'success');
  };

  const handleDelete = (id) => {
    updateData('skills', data.skills.filter(s => s.id !== id));
    setConfirmDelete(null);
    addToast('Skill deleted.', 'error');
  };

  const handleToggle = (id) => {
    updateData('skills', data.skills.map(s => s.id === id ? { ...s, showSkill: !s.showSkill } : s));
    addToast('Visibility updated!', 'success');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-white">Skills</h2>
          <p className="text-white/40 text-sm mt-1">{data.skills.length} skills total</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 w-44 transition-colors" />
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors">
            <option value="All" className="bg-[#111]">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#111]">{c}</option>)}
          </select>
          <button onClick={() => setModal({ skill: {} })}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
            + Add Skill
          </button>
        </div>
      </div>

      <div className="bg-[#111]/80 border border-white/10 rounded-2xl overflow-hidden">
        <div className="grid px-5 py-3 border-b border-white/10 text-xs font-bold uppercase tracking-widest text-white/30"
          style={{ gridTemplateColumns: '1fr 120px 80px 80px 80px' }}>
          <span>Skill</span><span>Category</span><span>Level</span><span>Visible</span><span>Actions</span>
        </div>
        {filtered.map(skill => (
          <div key={skill.id}
            className="grid px-5 py-3.5 border-b border-white/5 last:border-0 items-center hover:bg-white/3 transition-colors"
            style={{ gridTemplateColumns: '1fr 120px 80px 80px 80px' }}>
            <div className="flex items-center gap-2">
              {skill.icon && <span>{skill.icon}</span>}
              <span className="text-white text-sm font-semibold">{skill.name}</span>
            </div>
            <span className="text-white/40 text-xs truncate">{skill.category?.split(' ').slice(0, 2).join(' ')}</span>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white/10 rounded-full h-1.5 max-w-16">
                <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${skill.percentage}%` }} />
              </div>
              <span className="text-white/40 text-xs">{skill.percentage}%</span>
            </div>
            <Toggle checked={skill.showSkill !== false} onChange={() => handleToggle(skill.id)} />
            <div className="flex gap-1">
              <button onClick={() => setModal({ skill })} className="p-1.5 rounded-lg text-white/30 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button onClick={() => setConfirmDelete(skill.id)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="py-16 text-center text-white/20 text-sm">No skills found.</div>}
      </div>

      {modal && <SkillModal skill={modal.skill} onSave={handleSave} onClose={() => setModal(null)} />}
      <ConfirmModal isOpen={!!confirmDelete} title="Delete Skill" message="This action cannot be undone."
        onConfirm={() => handleDelete(confirmDelete)} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
};

export default AdminSkills;
