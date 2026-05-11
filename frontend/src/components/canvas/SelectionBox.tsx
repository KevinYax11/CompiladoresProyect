import React from 'react';

interface Props {
  startPoint: { x: number; y: number } | null;
  currentPoint: { x: number; y: number } | null;
}

export const SelectionBox = ({ startPoint, currentPoint }: Props) => {
  if (!startPoint || !currentPoint) return null;

  const x = Math.min(startPoint.x, currentPoint.x);
  const y = Math.min(startPoint.y, currentPoint.y);
  const width = Math.abs(currentPoint.x - startPoint.x);
  const height = Math.abs(currentPoint.y - startPoint.y);

  return (
    <div
      className="absolute bg-institutional-blue/10 border border-institutional-blue pointer-events-none"
      style={{ left: x, top: y, width, height }}
    />
  );
};