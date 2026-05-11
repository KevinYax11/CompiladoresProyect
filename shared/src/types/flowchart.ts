export interface Position { x: number; y: number; }

export type FlowNodeType = 'Terminator' | 'Process' | 'Decision' | 'DataInput' | 'Document';

export interface NodeData {
  label: string;
  // Common fields
  variableName?: string;
  expression?: string;
  // Specific fields
  promptMessage?: string;
  outputExpression?: string;
  condition?: string;
  // For Decision nodes (alternative to raw condition)
  leftOperand?: string;
  operator?: string;
  rightOperand?: string;
  // Legacy/Internal
  code?: string;
  [key: string]: any;
}

export interface FlowNode {
  id: string;
  type: FlowNodeType;
  position: Position;
  data: NodeData;
  dragHandle?: string;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
}

export interface FlowchartGraph {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface CompilationResult {
  ast: any;
  code: {
    python: string;
    nasm: string;
    cpp: string;
    java: string;
    javascript: string;
    ruby: string;
  };
}