import React from 'react';

interface Props {
  label: string;
  selected?: boolean;
}

export const Note = ({ label, selected }: Props) => {
  return (
    <div className={`relative flex items-center justify-start px-4 py-3 bg-white border-y-2 border-l-2 border-r-0 min-w-[120px] border-dashed
      ${selected ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-[#0A2240]'}`}
    >
      <span className="text-sm font-medium text-gray-600 italic">{label}</span>
    </div>
  );
};