import { FlowchartGraph, FlowNode, FlowEdge } from '../../../../../shared/src/types/flowchart';
import { ASTNode, ProgramNode } from '../../../../../shared/src/types/ast';
import { IfNode } from '../2_parser/ast_nodes/IfNode';
import { WhileNode } from '../2_parser/ast_nodes/WhileNode';
import { Tokenizer } from '../1_lexer/Tokenizer';
import { ASTBuilder } from '../2_parser/ASTBuilder';

export class GraphToAST {
  private nodesMap = new Map<string, FlowNode>();
  private edgesBySource = new Map<string, FlowEdge[]>();

  constructor(private graph: FlowchartGraph) {
    this.graph.nodes.forEach(n => this.nodesMap.set(n.id, n));
    this.graph.edges.forEach(e => {
      const edges = this.edgesBySource.get(e.source) || [];
      edges.push(e);
      this.edgesBySource.set(e.source, edges);
    });
  }

  public buildAST(): ProgramNode {
    const startNode = this.graph.nodes.find(n => n.type === 'Terminator' && n.data?.label === 'Inicio');
    if (!startNode) throw new Error("StartNodeNotFound");

    const body = this.traverse(startNode.id);
    return { type: 'Program', body };
  }

  private parseNodeCode(code: string): ASTNode[] {
    if (!code) return [];
    const tokenizer = new Tokenizer(code);
    const tokens = tokenizer.tokenize();
    const builder = new ASTBuilder(tokens);
    return builder.parse();
  }

  private traverse(nodeId: string, visited = new Set<string>()): ASTNode[] {
    if (visited.has(nodeId)) return [];
    visited.add(nodeId);

    const node = this.nodesMap.get(nodeId);
    if (!node) return [];

    const nodes: ASTNode[] = [];
    const outgoingEdges = this.edgesBySource.get(nodeId) || [];

    if (node.type === 'Process' || node.type === 'DataInput' || node.type === 'Document') {
      if (node.data.code) {
        nodes.push(...this.parseNodeCode(node.data.code));
      }
      if (outgoingEdges.length > 0) {
        nodes.push(...this.traverse(outgoingEdges[0].target, visited));
      }
    } else if (node.type === 'Decision') {
      const trueEdge = outgoingEdges.find(e => e.label === 'True' || e.label === 'Si');
      const falseEdge = outgoingEdges.find(e => e.label === 'False' || e.label === 'No');

      const isLoop = outgoingEdges.some(e => visited.has(e.target));

      if (isLoop) {
        nodes.push(new WhileNode(
          node.data.code || '',
          trueEdge ? this.traverse(trueEdge.target, new Set(visited)) : []
        ));
        
        if (falseEdge) {
            nodes.push(...this.traverse(falseEdge.target, new Set(visited)));
        }
      } else {
        nodes.push(new IfNode(
          node.data.code || '',
          trueEdge ? this.traverse(trueEdge.target, new Set(visited)) : []
        ));
      }
    } else if (node.type === 'Terminator' && outgoingEdges.length > 0) {
      nodes.push(...this.traverse(outgoingEdges[0].target, visited));
    }

    return nodes;
  }
}