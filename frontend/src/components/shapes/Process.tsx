import React from 'react';

interface Props {
  label: string;
  selected?: boolean;
}

export const Process = ({ label, selected }: Props) => {
  return (
    <div className={`flex items-center justify-center px-4 py-3 bg-white border-2 min-w-[150px] min-h-[60px] shadow-sm transition-colors
      ${selected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50' : 'border-[#0A2240]'}`}
    >
      <span className="text-sm font-semibold text-gray-800">{label}</span>
    </div>
  );
};