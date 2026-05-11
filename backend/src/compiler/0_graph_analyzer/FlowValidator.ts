import { FlowchartGraph, FlowNode } from '../../../../shared/src/types/flowchart';

export class FlowValidator {
  public validate(graph: FlowchartGraph): void {
    if (!graph.nodes || graph.nodes.length === 0) {
      throw new Error("EmptyGraph");
    }
    const startNodes = graph.nodes.filter((n: FlowNode) => n.type === 'Terminator' && n.data?.label === 'Inicio');
    if (startNodes.length === 0) {
      throw new Error("MissingStartNode");
    }
    if (startNodes.length > 1) {
      throw new Error("MultipleStartNodes");
    }
    const nodeIds = new Set(graph.nodes.map((n: FlowNode) => n.id));
    for (const edge of graph.edges) {
      if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
        throw new Error("InvalidEdgeTargetOrSource");
      }
    }
  }
}