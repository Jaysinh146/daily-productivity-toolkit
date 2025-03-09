import React, { useState, useEffect } from 'react';
import { ExternalLink, Edit2, Save, X } from 'lucide-react';

interface Link {
  id: string;
  title: string;
  url: string;
}

export default function LinkHub() {
  const [links, setLinks] = useState<Link[]>(() => {
    const saved = localStorage.getItem('links');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'GitHub', url: 'https://github.com' },
      { id: '2', title: 'Gmail', url: 'https://gmail.com' },
      { id: '3', title: 'Calendar', url: 'https://calendar.google.com' },
      { id: '4', title: 'Drive', url: 'https://drive.google.com' }
    ];
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editUrl, setEditUrl] = useState('');

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  const startEdit = (link: Link) => {
    setEditingId(link.id);
    setEditTitle(link.title);
    setEditUrl(link.url);
  };

  const saveEdit = () => {
    if (!editingId) return;
    
    setLinks(links.map(link =>
      link.id === editingId
        ? { ...link, title: editTitle, url: editUrl }
        : link
    ));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {links.map(link => (
        <div
          key={link.id}
          className="relative group bg-white/5 rounded-lg border border-white/10 p-4 hover:border-[#00F5D4] transition-colors"
        >
          {editingId === link.id ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-1 rounded bg-white/5 border border-white/10 text-white"
                placeholder="Title"
              />
              <input
                type="url"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                className="w-full px-3 py-1 rounded bg-white/5 border border-white/10 text-white"
                placeholder="URL"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={saveEdit}
                  className="p-1 text-[#00F5D4] hover:text-[#00F5D4]/80"
                  aria-label="Save changes"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={cancelEdit}
                  className="p-1 text-white/50 hover:text-white"
                  aria-label="Cancel editing"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white hover:text-[#00F5D4] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink size={16} />
                  <span>{link.title}</span>
                </div>
              </a>
              <button
                onClick={() => startEdit(link)}
                className="absolute top-2 right-2 p-1 text-white/0 group-hover:text-white/50 hover:text-white transition-colors"
                aria-label="Edit link"
              >
                <Edit2 size={16} />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}