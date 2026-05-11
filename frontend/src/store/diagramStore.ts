import { create } from 'zustand';
import { 
  addEdge, 
  applyNodeChanges, 
  applyEdgeChanges, 
  Connection, 
  Edge, 
  EdgeChange, 
  Node, 
  NodeChange, 
  OnConnect, 
  OnEdgesChange, 
  OnNodesChange 
} from '@xyflow/react';
import { FlowNode, FlowEdge, CompilationResult } from '../types/flowchart';

interface DiagramState {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  compilationResult: CompilationResult | null;
  isCompiling: boolean;
  
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  
  addNode: (node: Node) => void;
  updateNodeData: (id: string, data: any) => void;
  setSelectedNode: (id: string | null) => void;
  setCompilationResult: (result: CompilationResult | null) => void;
  setIsCompiling: (status: boolean) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
}

export const useDiagramStore = create<DiagramState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  compilationResult: null,
  isCompiling: false,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  
  updateNodeData: (id, data) => set((state) => ({
    nodes: state.nodes.map((n) => n.id === id ? { ...n, data: { ...n.data, ...data } } : n)
  })),

  setSelectedNode: (id) => set({ selectedNodeId: id }),
  
  setCompilationResult: (result) => set({ compilationResult: result }),
  
  setIsCompiling: (status) => set({ isCompiling: status }),

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
}));