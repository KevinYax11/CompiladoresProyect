import { useEffect, useState } from 'react';
import { useDiagramStore } from '../store/diagramStore';
import { Node, Edge } from '@xyflow/react';

interface HistoryState {
  nodes: Node[];
  edges: Edge[];
}

export const useCanvasHistory = () => {
  const { nodes, edges } = useDiagramStore();
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      } else if (e.ctrlKey && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, history]);

  const saveState = () => {
    const currentState = { nodes: [...nodes], edges: [...edges] };
    const newHistory = history.slice(0, currentIndex + 1);
    setHistory([...newHistory, currentState]);
    setCurrentIndex(newHistory.length);
  };

  const undo = () => {
    if (currentIndex > 0) {
      const previousState = history[currentIndex - 1];
      useDiagramStore.setState({ nodes: previousState.nodes, edges: previousState.edges });
      setCurrentIndex(currentIndex - 1);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      const nextState = history[currentIndex + 1];
      useDiagramStore.setState({ nodes: nextState.nodes, edges: nextState.edges });
      setCurrentIndex(currentIndex + 1);
    }
  };

  return { saveState, undo, redo, canUndo: currentIndex > 0, canRedo: currentIndex < history.length - 1 };
};