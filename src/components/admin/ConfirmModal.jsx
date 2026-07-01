import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmLabel = 'Delete', danger = true }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-[#111] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <h3 className="text-lg font-black text-white mb-2">{title}</h3>
        <p className="text-white/50 text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-colors ${danger ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
