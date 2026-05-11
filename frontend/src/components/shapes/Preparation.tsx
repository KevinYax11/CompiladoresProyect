import React from 'react';

interface Props {
  label: string;
  selected?: boolean;
}

export const Preparation = ({ label, selected }: Props) => {
  return (
    <div className={`relative flex items-center justify-center px-6 py-3 bg-white border-2 min-w-[150px] shadow-sm transition-colors
      ${selected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50' : 'border-[#0A2240]'}`}
      style={{
        clipPath: 'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)'
      }}
    >
      <span className="text-sm font-semibold text-gray-800">{label}</span>
    </div>
  );
};