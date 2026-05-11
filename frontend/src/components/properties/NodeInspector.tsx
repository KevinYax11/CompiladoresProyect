import React from 'react';
import { useDiagramStore } from '../../store/diagramStore';

export const NodeInspector = () => {
  const { nodes, selectedNodeId, updateNodeData } = useDiagramStore();
  
  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm p-4 text-center">
        Selecciona un nodo en el lienzo para editar sus propiedades.
      </div>
    );
  }

  const renderFields = () => {
    switch (selectedNode.type) {
      case 'Process':
        return (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-600 uppercase">Variable de Destino</label>
              <input
                type="text"
                placeholder="ej: x"
                value={(selectedNode.data.variableName as string) || ''}
                onChange={(e) => updateNodeData(selectedNode.id, { variableName: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-institutional-blue"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-600 uppercase">Expresión / Valor</label>
              <input
                type="text"
                placeholder="ej: 10 + y"
                value={(selectedNode.data.expression as string) || ''}
                onChange={(e) => updateNodeData(selectedNode.id, { expression: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-institutional-blue"
              />
            </div>
          </>
        );
      case 'DataInput':
        return (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-600 uppercase">Guardar en Variable</label>
              <input
                type="text"
                placeholder="ej: edad"
                value={(selectedNode.data.variableName as string) || ''}
                onChange={(e) => updateNodeData(selectedNode.id, { variableName: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-institutional-blue"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-600 uppercase">Mensaje al Usuario</label>
              <input
                type="text"
                placeholder="ej: Ingrese su edad"
                value={(selectedNode.data.promptMessage as string) || ''}
                onChange={(e) => updateNodeData(selectedNode.id, { promptMessage: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-institutional-blue"
              />
            </div>
          </>
        );
      case 'Document':
        return (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-600 uppercase">Valor a Imprimir</label>
            <input
              type="text"
              placeholder='ej: "Hola " + nombre'
              value={(selectedNode.data.outputExpression as string) || ''}
              onChange={(e) => updateNodeData(selectedNode.id, { outputExpression: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-institutional-blue"
            />
          </div>
        );
      case 'Decision':
        return (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-600 uppercase">Condición (Si/No)</label>
            <input
              type="text"
              placeholder="ej: x > 10"
              value={(selectedNode.data.condition as string) || ''}
              onChange={(e) => updateNodeData(selectedNode.id, { condition: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-institutional-blue"
            />
            <p className="text-[10px] text-gray-500 mt-1 italic">
              Conecta el puerto <span className="text-green-600 font-bold">Derecho</span> para VERDADERO y el <span className="text-red-600 font-bold">Inferior</span> para FALSO.
            </p>
          </div>
        );
      default:
        return <p className="text-sm text-gray-500 italic">Este nodo no requiere configuración adicional.</p>;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-600 uppercase">Etiqueta Visual</label>
        <input
          type="text"
          value={(selectedNode.data.label as string) || ''}
          onChange={(e) => updateNodeData(selectedNode.id, { label: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-institutional-blue"
        />
      </div>

      <div className="h-px bg-gray-200 my-2" />

      {renderFields()}
    </div>
  );
};