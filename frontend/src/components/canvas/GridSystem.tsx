import React from 'react';

interface GridSystemProps {
  size?: number;
  color?: string;
  opacity?: number;
}

export const GridSystem = ({ size = 20, color = '#cbd5e1', opacity = 0.5 }: GridSystemProps) => {
  return (
    <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <defs>
        <pattern id="grid" width={size} height={size} patternUnits="userSpaceOnUse">
          <circle cx={size / 2} cy={size / 2} r="1" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
};