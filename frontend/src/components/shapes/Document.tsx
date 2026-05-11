import React from 'react';

interface Props {
  label: string;
  selected?: boolean;
}

export const Document = ({ label, selected }: Props) => {
  return (
    <div className={`relative flex items-center justify-center px-4 py-3 bg-white border-2 min-w-[150px] min-h-[60px] shadow-sm transition-colors
      ${selected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50' : 'border-[#0A2240]'}`}
      style={{
        borderRadius: '2px 2px 2px 2px',
        clipPath: 'path("M 0 0 L 150 0 L 150 50 C 120 40, 30 60, 0 50 Z")'
      }}
    >
      <span className="text-sm font-semibold text-gray-800">{label}</span>
    </div>
  );
};