import React from 'react';
import { Circle, Square, Diamond, Database, FileText } from 'lucide-react';

const SHAPES = [
  { type: 'Terminator', label: 'Inicio', icon: Circle, color: 'bg-red-50 border-red-400' },
  { type: 'Process', label: 'Proceso', icon: Square, color: 'bg-blue-50 border-blue-400' },
  { type: 'Decision', label: 'Decisión', icon: Diamond, color: 'bg-yellow-50 border-yellow-400' },
  { type: 'DataInput', label: 'Entrada', icon: Database, color: 'bg-green-50 border-green-400' },
  { type: 'Document', label: 'Salida', icon: FileText, color: 'bg-purple-50 border-purple-400' }
];

export const ShapeLibrary = () => {
  const onDragStart = (e: React.DragEvent, shapeType: string, shapeLabel: string) => {
    e.dataTransfer.setData('application/reactflow', shapeType);
    e.dataTransfer.setData('application/label', shapeLabel);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex flex-col gap-3">
      {SHAPES.map((shape) => (
        <div
          key={shape.type}
          draggable
          onDragStart={(e) => onDragStart(e, shape.type, shape.label)}
          className={`flex items-center gap-3 p-3 border-2 rounded-md cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${shape.color}`}
        >
          <shape.icon size={20} className="text-gray-700" />
          <span className="text-sm font-medium text-gray-800">{shape.label}</span>
        </div>
      ))}
    </div>
  );
};