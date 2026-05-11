import { FlowchartGraph, FlowNode, FlowEdge } from '../../../../shared/src/types/flowchart';
import { ASTNode, ProgramNode } from '../../../../shared/src/types/ast';
import { IfNode } from '../2_parser/ast_nodes/IfNode';
import { WhileNode } from '../2_parser/ast_nodes/WhileNode';
import { AssignmentNode } from '../2_parser/ast_nodes/AssignmentNode';
import { InputNode } from '../2_parser/ast_nodes/InputNode';
import { OutputNode } from '../2_parser/ast_nodes/OutputNode';

export class GraphToAST {
  private nodesMap = new Map<string, FlowNode>();
  private edgesBySource = new Map<string, FlowEdge[]>();

  constructor(private graph: FlowchartGraph) {
    this.graph.nodes.forEach((n: FlowNode) => this.nodesMap.set(n.id, n));
    this.graph.edges.forEach((e: FlowEdge) => {
      const edges = this.edgesBySource.get(e.source) || [];
      edges.push(e);
      this.edgesBySource.set(e.source, edges);
    });
  }

  public buildAST(): ProgramNode {
    // Buscar nodo Inicio (Terminator con etiqueta Inicio o simplemente el primero de tipo Terminator)
    const startNode = this.graph.nodes.find((n: FlowNode) => n.type === 'Terminator' && (n.data?.label?.toLowerCase().includes('inicio') || true));
    if (!startNode) throw new Error("StartNodeNotFound");

    const body = this.traverse(startNode.id);
    return { type: 'Program', body };
  }

  private traverse(nodeId: string, visited = new Set<string>()): ASTNode[] {
    if (visited.has(nodeId)) return [];
    
    const node = this.nodesMap.get(nodeId);
    if (!node) return [];

    // Detect loops: if we encounter a node already in our current path
    // But for a simple acyclic traversal, we just keep track of visited.
    // For while loops, the 'Decision' node logic will handle it if it detects a back-edge.
    visited.add(nodeId);

    const nodes: ASTNode[] = [];
    const outgoingEdges = this.edgesBySource.get(nodeId) || [];

    // Map semantic data to AST Nodes
    if (node.type === 'Process') {
      if (node.data.variableName && node.data.expression) {
        nodes.push(new AssignmentNode(node.data.variableName, node.data.expression));
      }
    } else if (node.type === 'DataInput') {
      if (node.data.variableName) {
        nodes.push(new InputNode(node.data.variableName, node.data.promptMessage));
      }
    } else if (node.type === 'Document') {
      if (node.data.outputExpression) {
        nodes.push(new OutputNode(node.data.outputExpression));
      }
    }

    // Handle flow control
    if (node.type === 'Decision') {
      const trueEdge = outgoingEdges.find(e => e.sourceHandle === 'true' || e.label === 'True' || e.label === 'Si');
      const falseEdge = outgoingEdges.find(e => e.sourceHandle === 'false' || e.label === 'False' || e.label === 'No');

      // Simple loop detection: if an edge points to an already visited node
      const isLoop = outgoingEdges.some(e => visited.has(e.target));

      if (isLoop) {
        nodes.push(new WhileNode(
          node.data.condition || '',
          trueEdge ? this.traverse(trueEdge.target, new Set(visited)) : []
        ));
        if (falseEdge) {
            nodes.push(...this.traverse(falseEdge.target, visited));
        }
      } else {
        nodes.push(new IfNode(
          node.data.condition || '',
          trueEdge ? this.traverse(trueEdge.target, new Set(visited)) : []
        ));
        if (falseEdge) {
            // This is a simplification. Real If-Else would need an Else branch in AST.
            // For now, we append the false branch after the if.
            nodes.push(...this.traverse(falseEdge.target, visited));
        }
      }
    } else if (outgoingEdges.length > 0) {
      // Linear flow
      nodes.push(...this.traverse(outgoingEdges[0].target, visited));
    }

    return nodes;
  }
}