import React from 'react';
import { ZoomIn, ZoomOut, MousePointer2, Hand, Trash2 } from 'lucide-react';

export const Toolbar = () => {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-md shadow-md border border-gray-200 flex items-center p-1 gap-1 z-40">
      <button className="p-2 hover:bg-gray-100 rounded text-gray-700 transition-colors">
        <MousePointer2 size={18} />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded text-gray-700 transition-colors">
        <Hand size={18} />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <button className="p-2 hover:bg-gray-100 rounded text-gray-700 transition-colors">
        <ZoomOut size={18} />
      </button>
      <span className="text-xs font-medium text-gray-600 px-2">100%</span>
      <button className="p-2 hover:bg-gray-100 rounded text-gray-700 transition-colors">
        <ZoomIn size={18} />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <button className="p-2 hover:bg-red-50 rounded text-red-600 transition-colors">
        <Trash2 size={18} />
      </button>
    </div>
  );
};