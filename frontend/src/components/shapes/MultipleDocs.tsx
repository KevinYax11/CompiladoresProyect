import React from 'react';

interface Props {
  label: string;
  selected?: boolean;
}

export const MultipleDocs = ({ label, selected }: Props) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white border-2 border-gray-300 translate-x-2 translate-y-2" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 50% 85%, 25% 100%, 0% 75%)' }} />
      <div className="absolute inset-0 bg-white border-2 border-gray-300 translate-x-1 translate-y-1" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 50% 85%, 25% 100%, 0% 75%)' }} />
      <div className={`relative flex items-center justify-center px-4 pt-2 pb-6 bg-white border-2 min-w-[140px] shadow-sm transition-colors
        ${selected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50' : 'border-[#0A2240]'}`}
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 50% 85%, 25% 100%, 0% 75%)' }}
      >
        <span className="text-sm font-semibold text-gray-800">{label}</span>
      </div>
    </div>
  );
};