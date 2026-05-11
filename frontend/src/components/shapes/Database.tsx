import React from 'react';

interface Props {
  label: string;
  selected?: boolean;
}

export const Database = ({ label, selected }: Props) => {
  return (
    <div className={`relative flex items-center justify-center px-4 py-6 bg-white border-2 min-w-[120px] shadow-sm transition-colors
      ${selected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50' : 'border-[#0A2240]'}`}
      style={{
        borderRadius: '50% / 20%'
      }}
    >
      <div className="absolute top-0 left-0 w-full h-[20%] border-b-2 border-inherit rounded-[50%]" />
      <span className="text-sm font-semibold text-gray-800 mt-2">{label}</span>
    </div>
  );
};