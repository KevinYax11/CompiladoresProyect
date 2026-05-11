import React from 'react';

interface Props {
  label: string;
  selected?: boolean;
}

export const Decision = ({ label, selected }: Props) => {
  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <div className={`absolute inset-0 bg-white border-2 rotate-45 shadow-sm transition-colors
        ${selected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50' : 'border-[#0A2240]'}`}
      />
      <span className="relative z-10 text-xs font-semibold text-gray-800 text-center px-2">
        {label}
      </span>
    </div>
  );
};