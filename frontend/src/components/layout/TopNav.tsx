import React, { useState } from 'react';
import { Play, Save, FolderOpen, ChevronDown, Share2, Settings, Cpu } from 'lucide-react';
import { useCompilerClient } from '../../hooks/useCompilerClient';
import { useDiagramStore } from '../../store/diagramStore';

export const TopNav = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { compile } = useCompilerClient();
  const { isCompiling } = useDiagramStore();

  return (
    <nav className="h-14 bg-slate-900 text-white flex items-center justify-between px-6 shadow-lg z-50 relative border-b border-white/5">
      {/* Lado Izquierdo: Branding y Menú de Archivo */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2.5">
          <div className="bg-blue-500 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
            <Cpu size={18} className="text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-black text-sm tracking-tighter uppercase">Polaris</span>
            <span className="text-blue-400 font-bold text-[9px] uppercase tracking-[0.2em]">Visual Compiler</span>
          </div>
        </div>

        <div className="h-6 w-px bg-white/10"></div>

        <div className="flex items-center gap-1">
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-md transition-all text-[11px] font-bold uppercase tracking-wider text-slate-300">
            <FolderOpen size={14} className="text-blue-400" />
            Abrir
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-md transition-all text-[11px] font-bold uppercase tracking-wider text-slate-300">
            <Save size={14} className="text-blue-400" />
            Guardar
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-md transition-all text-[11px] font-bold uppercase tracking-wider text-slate-300">
            <Share2 size={14} className="text-blue-400" />
            Compartir
          </button>
        </div>
      </div>

      {/* Centro: Título del Proyecto (Opcional) */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
        <div className="px-4 py-1 bg-black/30 rounded-full border border-white/5">
          <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Untitled_Project.flow</span>
        </div>
      </div>

      {/* Lado Derecho: Acciones y Perfil */}
      <div className="flex items-center gap-4">
        <button 
          onClick={compile}
          disabled={isCompiling}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-[11px] uppercase tracking-[0.15em] transition-all shadow-lg
            ${isCompiling 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-400 active:scale-95 shadow-blue-500/20'}`}
        >
          {isCompiling ? (
            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Play size={14} fill="currentColor" />
          )}
          {isCompiling ? 'Compilando' : 'Ejecutar Compilación'}
        </button>

        <div className="h-6 w-px bg-white/10 mx-2"></div>

        <div className="relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 hover:bg-white/5 px-2 py-1 rounded-lg transition-all border border-transparent hover:border-white/5"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-xs shadow-inner">
                JE
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
            </div>
            <div className="hidden lg:flex flex-col items-start leading-none gap-1">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Jorge Escalante</span>
              <span className="text-[9px] text-blue-400 font-medium uppercase tracking-tighter">Pro Developer</span>
            </div>
            <ChevronDown size={14} className="text-slate-500" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-slate-900 text-slate-300 rounded-xl shadow-2xl py-2 border border-white/10 backdrop-blur-xl">
              <div className="px-4 py-2 border-b border-white/5 mb-2">
                <p className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">Ajustes de Usuario</p>
              </div>
              <button className="w-full text-left px-4 py-2.5 text-xs hover:bg-white/5 transition-colors flex items-center gap-3">
                <Settings size={14} className="text-slate-500" /> Mi Perfil
              </button>
              <button className="w-full text-left px-4 py-2.5 text-xs hover:bg-white/5 transition-colors flex items-center gap-3">
                <Cpu size={14} className="text-slate-500" /> Preferencias de Compilación
              </button>
              <div className="h-px bg-white/5 my-2 mx-4"></div>
              <button className="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:bg-red-400/10 transition-colors">
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};