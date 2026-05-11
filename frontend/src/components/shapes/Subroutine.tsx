import React from 'react';

interface Props {
  label: string;
  selected?: boolean;
}

export const Subroutine = ({ label, selected }: Props) => {
  return (
    <div className={`relative flex items-center justify-center px-6 py-3 bg-white border-2 min-w-[150px] shadow-sm transition-colors
      ${selected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50' : 'border-[#0A2240]'}`}
    >
      <div className="absolute top-0 bottom-0 left-3 border-l-2 border-inherit" />
      <div className="absolute top-0 bottom-0 right-3 border-r-2 border-inherit" />
      <span className="text-sm font-semibold text-gray-800">{label}</span>
    </div>
  );
};