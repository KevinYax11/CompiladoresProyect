import React, { useState } from 'react';
import { useDiagramStore } from '../../store/diagramStore';

export const OutputPanel = () => {
  const { compilationResult, isCompiling } = useDiagramStore();
  const [activeTab, setActiveTab] = useState<keyof NonNullable<typeof compilationResult>['code']>('python');

  if (isCompiling) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-white/50">
        <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="font-mono text-xs uppercase tracking-widest animate-pulse">Analizando Grafo...</p>
      </div>
    );
  }

  if (!compilationResult) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
          <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <p className="text-white/40 text-sm font-medium">No hay código generado</p>
        <p className="text-white/20 text-[11px] mt-2 max-w-[200px]">Diseña un diagrama y pulsa "Compilar" para ver los resultados aquí.</p>
      </div>
    );
  }

  const languages = Object.keys(compilationResult.code) as Array<keyof typeof compilationResult.code>;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Selector de Lenguaje (Tabs) */}
      <div className="flex bg-black/20 border-b border-white/5 overflow-x-auto scrollbar-hide">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveTab(lang)}
            className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
              activeTab === lang 
                ? 'text-blue-400 bg-white/5' 
                : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02]'
            }`}
          >
            {lang}
            {activeTab === lang && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Área de Código */}
      <div className="flex-1 p-5 overflow-auto bg-[#0d1117]/50">
        <pre className="font-mono text-[13px] leading-relaxed m-0 text-slate-300">
          <code className="block">
            {compilationResult.code[activeTab]}
          </code>
        </pre>
      </div>
      
      {/* Footer del Panel */}
      <div className="px-5 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] text-white/20 font-mono uppercase">Output Format: UTF-8</span>
        <button 
          onClick={() => {
            const code = compilationResult.code[activeTab];
            if (code) {
              navigator.clipboard.writeText(code);
              alert('Código copiado al portapapeles');
            }
          }}
          className="text-[10px] text-blue-400/60 hover:text-blue-400 font-bold uppercase transition-colors"
        >
          Copiar Código
        </button>
      </div>
    </div>
  );
};