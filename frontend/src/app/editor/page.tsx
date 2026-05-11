"use client";

import React from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { ShapeLibrary } from '@/components/layout/ShapeLibrary';
import { CanvasEngine } from '@/components/canvas/CanvasEngine';
import { NodeInspector } from '@/components/properties/NodeInspector';
import { OutputPanel } from '@/components/code_viewer/OutputPanel';

export default function EditorPage() {
  return (
    <div className="flex flex-col h-screen w-screen bg-slate-50">
      <TopNav />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Izquierda - Librería de Figuras */}
        <aside className="w-72 bg-white border-r border-slate-200 flex flex-col z-20 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Librería de Nodos</h2>
            <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Flowchart</span>
          </div>
          <div className="flex-1 p-5 overflow-y-auto scrollbar-hide">
            <ShapeLibrary />
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 text-center uppercase font-medium">Arrastra nodos al lienzo</p>
          </div>
        </aside>

        {/* Área Central - Canvas */}
        <main className="flex-1 relative bg-[#f8fafc] overflow-hidden">
          <CanvasEngine />
        </main>

        {/* Sidebar Derecha - Inspector y Código */}
        <aside className="w-[450px] bg-white border-l border-slate-200 flex flex-col z-20 shadow-sm">
          {/* Panel Superior: Inspector de Propiedades */}
          <div className="h-[45%] flex flex-col border-b border-slate-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <h2 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Propiedades del Nodo</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <NodeInspector />
            </div>
          </div>

          {/* Panel Inferior: Resultados de Compilación */}
          <div className="h-[55%] flex flex-col bg-slate-900 overflow-hidden">
            <div className="px-5 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <h2 className="font-bold text-white/80 text-xs uppercase tracking-wider">Código Generado</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-[10px] text-white/40 uppercase font-mono">Status: Ready</span>
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden flex flex-col">
              <OutputPanel />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}