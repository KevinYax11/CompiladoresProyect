import { useDiagramStore } from '../store/diagramStore';

export const useCompilerClient = () => {
  const { nodes, edges, setCompilationResult, setIsCompiling } = useDiagramStore();

  const compile = async () => {
    setIsCompiling(true);
    try {
      const response = await fetch('http://localhost:3001/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Error de compilación');
      }

      const result = await response.json();
      setCompilationResult(result);
    } catch (error) {
      console.error('Compiler Error:', error);
      alert(error instanceof Error ? error.message : 'Error desconocido al compilar');
    } finally {
      setIsCompiling(false);
    }
  };

  return { compile };
};