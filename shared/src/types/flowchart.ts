export interface Position { x: number; y: number; }

export interface NodeData {
  code?: string;
  label?: string;
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