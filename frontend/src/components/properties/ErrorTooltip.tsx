import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  message: string;
  visible: boolean;
}

export const ErrorTooltip = ({ message, visible }: Props) => {
  if (!visible) return null;

  return (
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-1.5 rounded shadow-lg flex items-center gap-2 text-xs z-50 whitespace-nowrap">
      <AlertCircle size={14} />
      <span>{message}</span>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-red-600" />
    </div>
  );
};