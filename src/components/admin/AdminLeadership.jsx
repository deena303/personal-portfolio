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

const LeadershipModal = ({ item, onSave, onClose }) => {
  const [form, setForm] = useState({ title: '', description: '', role: '', badge: '', showLeadership: true, ...item });
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-white">{item.id ? 'Edit Item' : 'Add Item'}</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white">✕</button>
        </div>
        <div className="space-y-4">
          {[['Title', 'title'], ['Role', 'role'], ['Badge', 'badge']].map(([label, key]) => (
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
          <label className="flex items-center gap-3 cursor-pointer">
            <Toggle checked={form.showLeadership !== false} onChange={v => set('showLeadership', v)} />
            <span className="text-sm text-white/60 font-medium">Show Item</span>
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

const AdminLeadership = () => {
  const { data, updateData } = useData();
  const { addToast } = useToast();
  const [modal, setModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleSave = (form) => {
    let updated;
    if (form.id) {
      updated = data.leadership.map(l => l.id === form.id ? { ...l, ...form } : l);
    } else {
      updated = [...data.leadership, { ...form, id: Date.now().toString() }];
    }
    updateData('leadership', updated);
    setModal(null);
    addToast(form.id ? 'Updated!' : 'Added!', 'success');
  };

  const handleDelete = (id) => {
    updateData('leadership', data.leadership.filter(l => l.id !== id));
    setConfirmDelete(null);
    addToast('Deleted.', 'error');
  };

  const handleToggle = (id) => {
    updateData('leadership', data.leadership.map(l => l.id === id ? { ...l, showLeadership: !l.showLeadership } : l));
    addToast('Visibility updated!', 'success');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-white">Leadership & Engagement</h2>
          <p className="text-white/40 text-sm mt-1">{data.leadership.length} items</p>
        </div>
        <button onClick={() => setModal({ item: {} })} className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
          + Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.leadership.map(item => (
          <div key={item.id} className="bg-[#111]/80 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                {item.badge && <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 mb-2 inline-block">{item.badge}</span>}
                <h3 className="text-white font-bold text-base">{item.title}</h3>
                {item.role && <p className="text-white/40 text-xs mt-0.5 font-medium">{item.role}</p>}
                {item.description && <p className="text-white/30 text-xs mt-2 line-clamp-2 leading-relaxed">{item.description}</p>}
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <Toggle checked={item.showLeadership !== false} onChange={() => handleToggle(item.id)} />
                <div className="flex gap-1 mt-1">
                  <button onClick={() => setModal({ item })} className="p-1.5 rounded-lg text-white/30 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button onClick={() => setConfirmDelete(item.id)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && <LeadershipModal item={modal.item} onSave={handleSave} onClose={() => setModal(null)} />}
      <ConfirmModal isOpen={!!confirmDelete} title="Delete Item" message="This action cannot be undone."
        onConfirm={() => handleDelete(confirmDelete)} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
};

export default AdminLeadership;
