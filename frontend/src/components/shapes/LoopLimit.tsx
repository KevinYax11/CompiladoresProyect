import React from 'react';

interface Props {
  label: string;
  selected?: boolean;
}

export const LoopLimit = ({ label, selected }: Props) => {
  return (
    <div className={`relative flex items-center justify-center px-6 py-3 bg-white border-2 min-w-[140px] shadow-sm transition-colors
      ${selected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50' : 'border-[#0A2240]'}`}
      style={{
        clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)'
      }}
    >
      <span className="text-sm font-semibold text-gray-800">{label}</span>
    </div>
  );
};