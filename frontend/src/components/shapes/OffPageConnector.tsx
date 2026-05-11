import React from 'react';

interface Props {
  label: string;
  selected?: boolean;
}

export const OffPageConnector = ({ label, selected }: Props) => {
  return (
    <div className={`flex items-center justify-center w-12 h-16 pt-2 pb-4 bg-white border-2 shadow-sm transition-colors
      ${selected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50' : 'border-[#0A2240]'}`}
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%)'
      }}
    >
      <span className="text-xs font-bold text-gray-800">{label}</span>
    </div>
  );
};