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

const CertModal = ({ cert, onSave, onClose }) => {
  const [form, setForm] = useState({ name: '', issuer: '', status: 'Completed', icon: '🏆', pdf: '', credentialUrl: '', showCertificate: true, ...cert });
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-white">{cert.id ? 'Edit Certificate' : 'Add Certificate'}</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white">✕</button>
        </div>
        <div className="space-y-4">
          {[['Certificate Title', 'name'], ['Issuer', 'issuer'], ['Status', 'status'], ['Icon (emoji)', 'icon']].map(([label, key]) => (
            <div key={key}>
              <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">{label}</label>
              <input value={form[key] || ''} onChange={e => set(key, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">PDF URL / Path</label>
            <input value={form.pdf || ''} onChange={e => set('pdf', e.target.value)} placeholder="/certificates/my-cert.pdf"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">Credential URL</label>
            <input value={form.credentialUrl || ''} onChange={e => set('credentialUrl', e.target.value)} placeholder="https://"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors" />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <Toggle checked={form.showCertificate !== false} onChange={v => set('showCertificate', v)} />
            <span className="text-sm text-white/60 font-medium">Show Certificate</span>
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

const AdminCertificates = () => {
  const { data, updateData } = useData();
  const { addToast } = useToast();
  const [modal, setModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleSave = (form) => {
    let updated;
    if (form.id) {
      updated = data.certificates.map(c => c.id === form.id ? { ...c, ...form } : c);
    } else {
      updated = [...data.certificates, { ...form, id: Date.now().toString() }];
    }
    updateData('certificates', updated);
    setModal(null);
    addToast(form.id ? 'Certificate updated!' : 'Certificate added!', 'success');
  };

  const handleDelete = (id) => {
    updateData('certificates', data.certificates.filter(c => c.id !== id));
    setConfirmDelete(null);
    addToast('Certificate deleted.', 'error');
  };

  const handleToggle = (id) => {
    updateData('certificates', data.certificates.map(c => c.id === id ? { ...c, showCertificate: !c.showCertificate } : c));
    addToast('Visibility updated!', 'success');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-white">Certificates</h2>
          <p className="text-white/40 text-sm mt-1">{data.certificates.length} certificates</p>
        </div>
        <button onClick={() => setModal({ cert: {} })}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
          + Add Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.certificates.map(cert => (
          <div key={cert.id} className="bg-[#111]/80 border border-white/10 rounded-2xl p-5 flex gap-4 items-start hover:border-white/20 transition-colors">
            <div className="text-3xl w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl shrink-0">{cert.icon || '🏆'}</div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm truncate">{cert.name}</p>
              <p className="text-white/40 text-xs mt-0.5">{cert.issuer}</p>
              <span className={`inline-block mt-2 text-xs font-bold px-2 py-0.5 rounded-full ${cert.status === 'Star Performer' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'}`}>
                {cert.status}
              </span>
              {cert.pdf && (
                <a href={cert.pdf} target="_blank" rel="noopener noreferrer"
                  className="block mt-2 text-xs text-red-400 hover:text-red-300 transition-colors">📄 View PDF</a>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              <Toggle checked={cert.showCertificate !== false} onChange={() => handleToggle(cert.id)} />
              <div className="flex gap-1">
                <button onClick={() => setModal({ cert })} className="p-1.5 rounded-lg text-white/30 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button onClick={() => setConfirmDelete(cert.id)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && <CertModal cert={modal.cert} onSave={handleSave} onClose={() => setModal(null)} />}
      <ConfirmModal isOpen={!!confirmDelete} title="Delete Certificate" message="This action cannot be undone."
        onConfirm={() => handleDelete(confirmDelete)} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
};

export default AdminCertificates;
