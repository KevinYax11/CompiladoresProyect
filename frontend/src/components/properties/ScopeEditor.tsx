import React from 'react';

interface Props {
  scope: 'global' | 'local';
  onChange: (scope: 'global' | 'local') => void;
}

export const ScopeEditor = ({ scope, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-1 mt-4">
      <label className="text-xs font-bold text-gray-600 uppercase">Alcance (Scope)</label>
      <select
        value={scope}
        onChange={(e) => onChange(e.target.value as 'global' | 'local')}
        className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-institutional-blue bg-white"
      >
        <option value="local">Local</option>
        <option value="global">Global</option>
      </select>
    </div>
  );
};