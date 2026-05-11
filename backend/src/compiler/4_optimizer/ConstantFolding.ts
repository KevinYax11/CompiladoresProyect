import { ProgramNode, ASTNode, OutputNode, AssignmentNode } from '../../../../shared/src/types/ast';

export class ConstantFolding {
  public optimize(program: ProgramNode): ProgramNode {
    program.body = this.optimizeNodes(program.body);
    return program;
  }

  private optimizeNodes(nodes: ASTNode[]): ASTNode[] {
    return nodes.map(node => this.optimizeNode(node));
  }

  private optimizeNode(node: ASTNode): ASTNode {
    switch (node.type) {
      case 'Assignment':
        const assignNode = node as AssignmentNode;
        assignNode.expression = this.evaluateSimpleMath(assignNode.expression);
        return assignNode;
      case 'Output':
        const outNode = node as OutputNode;
        outNode.expression = this.evaluateSimpleMath(outNode.expression);
        return outNode;
      case 'If':
        const ifNode = node as any;
        ifNode.condition = this.evaluateSimpleMath(ifNode.condition);
        ifNode.consequent = this.optimizeNodes(ifNode.consequent || []);
        return ifNode;
      case 'While':
        const whileNode = node as any;
        whileNode.condition = this.evaluateSimpleMath(whileNode.condition);
        whileNode.body = this.optimizeNodes(whileNode.body || []);
        return whileNode;
      default:
        return node;
    }
  }

  private evaluateSimpleMath(expression: string): string {
    if (!expression) return expression;
    try {
      if (/^[0-9+\-*/().\s]+$/.test(expression)) {
        const result = new Function(`return ${expression}`)();
        return String(result);
      }
      return expression;
    } catch {
      return expression;
    }
  }
}