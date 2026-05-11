import React from 'react';

interface Props {
  label: string;
  selected?: boolean;
}

export const Connector = ({ label, selected }: Props) => {
  return (
    <div className={`flex items-center justify-center w-12 h-12 bg-white border-2 rounded-full shadow-sm transition-colors
      ${selected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50' : 'border-[#0A2240]'}`}
    >
      <span className="text-xs font-bold text-gray-800">{label}</span>
    </div>
  );
};