import React, { useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import ConfirmModal from './ConfirmModal';

const EMPTY_PROJECT = {
  title: '', description: '', badge: '', role: '', category: '',
  techTags: [], links: { website: '', github: '' },
  showProject: true, isFlagship: false, year: '',
  thumbnail: '', tags: [],
};

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative inline-flex w-10 h-5.5 items-center rounded-full transition-all duration-300 focus:outline-none ${checked ? 'bg-red-500' : 'bg-white/10'}`}
    style={{ height: '22px', width: '42px' }}
  >
    <span
      className={`inline-block w-4 h-4 transform rounded-full bg-white shadow transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'}`}
    />
  </button>
);

const ProjectModal = ({ project, onSave, onClose }) => {
  const [form, setForm] = useState({ ...EMPTY_PROJECT, ...project });
  const [techInput, setTechInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const handleLink = (field, value) => setForm(prev => ({ ...prev, links: { ...prev.links, [field]: value } }));

  const addTech = (e) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      setForm(prev => ({ ...prev, techTags: [...(prev.techTags || []), techInput.trim()] }));
      setTechInput('');
    }
  };

  const removeTech = (t) => setForm(prev => ({ ...prev, techTags: prev.techTags.filter(x => x !== t) }));

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setForm(prev => ({ ...prev, tags: [...(prev.tags || []), tagInput.trim()] }));
      setTagInput('');
    }
  };
  const removeTag = (t) => setForm(prev => ({ ...prev, tags: prev.tags.filter(x => x !== t) }));

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111] border border-white/10 rounded-2xl p-6 max-w-2xl w-full shadow-2xl my-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-white">{project.id ? 'Edit Project' : 'Add Project'}</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
          </button>
        </div>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['Project Name', 'title'], ['Category', 'badge'], ['Role', 'role'], ['Year', 'year'],
            ].map(([label, key]) => (
              <div key={key}>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">{label}</label>
                <input
                  value={form[key] || ''}
                  onChange={e => handleChange(key, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">Description</label>
            <textarea
              value={form.description || ''}
              onChange={e => handleChange('description', e.target.value)}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 resize-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">Live Website URL</label>
              <input
                value={form.links?.website || ''}
                onChange={e => handleLink('website', e.target.value)}
                placeholder="https://"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">GitHub URL</label>
              <input
                value={form.links?.github || ''}
                onChange={e => handleLink('github', e.target.value)}
                placeholder="https://github.com/"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">Tech Stack <span className="normal-case text-white/20">(press Enter to add)</span></label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(form.techTags || []).map(t => (
                <span key={t} className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-full font-medium">
                  {t}
                  <button onClick={() => removeTech(t)} className="hover:text-red-200">×</button>
                </span>
              ))}
            </div>
            <input
              value={techInput}
              onChange={e => setTechInput(e.target.value)}
              onKeyDown={addTech}
              placeholder="e.g. React..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1.5">Tags <span className="normal-case text-white/20">(press Enter to add)</span></label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(form.tags || []).map(t => (
                <span key={t} className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 text-white/60 text-xs rounded-full font-medium">
                  {t} <button onClick={() => removeTag(t)} className="hover:text-white">×</button>
                </span>
              ))}
            </div>
            <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={addTag} placeholder="e.g. Open Source..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors"/>
          </div>

          <div className="flex items-center gap-8 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <Toggle checked={form.isFlagship === true} onChange={v => handleChange('isFlagship', v)} />
              <span className="text-sm text-white/60 font-medium">Featured Project</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <Toggle checked={form.showProject !== false} onChange={v => handleChange('showProject', v)} />
              <span className="text-sm text-white/60 font-medium">Show Project</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5 transition-colors">Cancel</button>
          <button onClick={() => onSave(form)} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors">Save Project</button>
        </div>
      </div>
    </div>
  );
};

const AdminProjects = () => {
  const { data, updateData } = useData();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | { project }
  const [confirmDelete, setConfirmDelete] = useState(null);

  const sorted = useMemo(() =>
    [...data.projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [data.projects]
  );

  const filtered = useMemo(() =>
    sorted.filter(p =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.badge?.toLowerCase().includes(search.toLowerCase())
    ),
    [sorted, search]
  );

  const visibleProjects = sorted.filter(p => p.showProject !== false);

  const getDisplayNumber = (projectId) => {
    const idx = visibleProjects.findIndex(p => p.id === projectId);
    return idx >= 0 ? String(idx + 1).padStart(2, '0') : '—';
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(sorted);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    const updated = reordered.map((p, i) => ({ ...p, order: i }));
    updateData('projects', updated);
    addToast('Order saved!', 'success');
  };

  const handleToggle = (id) => {
    const updated = data.projects.map(p =>
      p.id === id ? { ...p, showProject: !p.showProject } : p
    );
    updateData('projects', updated);
    addToast('Visibility updated!', 'success');
  };

  const handleDelete = (id) => {
    const updated = data.projects.filter(p => p.id !== id);
    updateData('projects', updated);
    setConfirmDelete(null);
    addToast('Project deleted.', 'error');
  };

  const handleSave = (form) => {
    let updated;
    if (form.id) {
      updated = data.projects.map(p => p.id === form.id ? { ...p, ...form } : p);
    } else {
      const newProject = { ...form, id: Date.now().toString(), order: data.projects.length };
      updated = [...data.projects, newProject];
    }
    updateData('projects', updated);
    setModal(null);
    addToast(form.id ? 'Project updated!' : 'Project added!', 'success');
  };

  const handleDuplicate = (project) => {
    const dup = { ...project, id: Date.now().toString(), title: project.title + ' (Copy)', order: data.projects.length };
    updateData('projects', [...data.projects, dup]);
    addToast('Project duplicated!', 'info');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-white">Projects</h2>
          <p className="text-white/40 text-sm mt-1">{visibleProjects.length} visible · {data.projects.length} total</p>
        </div>
        <div className="flex gap-3">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 w-56 transition-colors"
          />
          <button
            onClick={() => setModal({ project: {} })}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
          >
            + Add Project
          </button>
        </div>
      </div>

      {/* Drag tip */}
      <p className="text-white/20 text-xs mb-4 font-medium">⠿ Drag rows to reorder</p>

      {/* Table */}
      <div className="bg-[#111]/80 border border-white/10 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="grid gap-4 px-5 py-3 border-b border-white/10 bg-white/3 text-xs font-bold uppercase tracking-widest text-white/30" style={{ gridTemplateColumns: '28px 32px 1fr 110px 60px 50px 100px 110px' }}>
          <span></span>
          <span>#</span>
          <span>Name</span>
          <span>Category</span>
          <span>Featured</span>
          <span>Show</span>
          <span>Links</span>
          <span>Actions</span>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="projects">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {filtered.map((project, index) => (
                  <Draggable key={project.id} draggableId={project.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`grid gap-4 px-5 py-4 border-b border-white/5 last:border-0 items-center transition-colors ${snapshot.isDragging ? 'bg-red-500/5' : 'hover:bg-white/3'}`}
                        style={{ gridTemplateColumns: '28px 32px 1fr 110px 60px 50px 100px 110px', ...provided.draggableProps.style }}
                      >
                        {/* Drag Handle */}
                        <span {...provided.dragHandleProps} className="text-white/20 cursor-grab active:cursor-grabbing hover:text-white/50 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
                        </span>

                        {/* Number */}
                        <span className="text-sm font-black text-white/20 italic font-serif">
                          {project.showProject !== false ? getDisplayNumber(project.id) : '—'}
                        </span>

                        {/* Name */}
                        <div>
                          <p className="text-white text-sm font-semibold truncate">{project.title}</p>
                          {project.role && <p className="text-white/30 text-xs">{project.role}</p>}
                        </div>

                        {/* Category */}
                        <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full truncate">{project.badge || '—'}</span>

                        {/* Featured */}
                        <span className={`text-xs font-bold ${project.isFlagship ? 'text-yellow-400' : 'text-white/20'}`}>
                          {project.isFlagship ? '⭐' : '—'}
                        </span>

                        {/* Visibility Toggle */}
                        <Toggle checked={project.showProject !== false} onChange={() => handleToggle(project.id)} />

                        {/* Links */}
                        <div className="flex gap-1.5">
                          {project.links?.website && (
                            <a href={project.links.website} target="_blank" rel="noopener noreferrer"
                              className="text-xs px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white font-medium transition-colors">Live</a>
                          )}
                          {project.links?.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                              className="text-xs px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white font-medium transition-colors">GH</a>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1">
                          <button onClick={() => setModal({ project })} title="Edit"
                            className="p-1.5 rounded-lg text-white/30 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          <button onClick={() => handleDuplicate(project)} title="Duplicate"
                            className="p-1.5 rounded-lg text-white/30 hover:text-green-400 hover:bg-green-500/10 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="13" height="13" x="9" y="9" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                          </button>
                          {project.links?.website && (
                            <a href={project.links.website} target="_blank" rel="noopener noreferrer" title="Preview"
                              className="p-1.5 rounded-lg text-white/30 hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                            </a>
                          )}
                          <button onClick={() => setConfirmDelete(project.id)} title="Delete"
                            className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-white/20 text-sm">No projects found.</div>
        )}
      </div>

      {modal && <ProjectModal project={modal.project} onSave={handleSave} onClose={() => setModal(null)} />}

      <ConfirmModal
        isOpen={!!confirmDelete}
        title="Delete Project"
        message="This action cannot be undone. The project will be permanently deleted."
        onConfirm={() => handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
};

export default AdminProjects;
