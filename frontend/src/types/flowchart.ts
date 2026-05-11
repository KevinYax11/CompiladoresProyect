export interface Position {
  x: number;
  y: number;
}

export interface NodeData {
  label?: string;
  code?: string;
  [key: string]: any;
}

export interface FlowNode {
  id: string;
  type: string;
  position: Position;
  data: NodeData;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface FlowchartGraph {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface CompilationResult {
  ast: any;
  code: {
    python?: string;
    nasm?: string;
    cpp?: string;
    java?: string;
    javascript?: string;
    ruby?: string;
  };
}