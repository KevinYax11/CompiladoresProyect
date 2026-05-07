import { ProgramNode, ASTNode, ExpressionStatementNode, IfStatementNode, WhileStatementNode, OutputStatementNode } from '../../../../../shared/src/types/ast';

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
      case 'ExpressionStatement':
        const exprNode = node as ExpressionStatementNode;
        exprNode.expression = this.evaluateSimpleMath(exprNode.expression);
        return exprNode;
      case 'OutputStatement':
        const outNode = node as OutputStatementNode;
        outNode.expression = this.evaluateSimpleMath(outNode.expression);
        return outNode;
      case 'IfStatement':
        const ifNode = node as IfStatementNode;
        ifNode.condition = this.evaluateSimpleMath(ifNode.condition);
        ifNode.consequent = this.optimizeNodes(ifNode.consequent);
        if (ifNode.alternate) {
          ifNode.alternate = this.optimizeNodes(ifNode.alternate);
        }
        return ifNode;
      case 'WhileStatement':
        const whileNode = node as WhileStatementNode;
        whileNode.condition = this.evaluateSimpleMath(whileNode.condition);
        whileNode.body = this.optimizeNodes(whileNode.body);
        return whileNode;
      default:
        return node;
    }
  }

  private evaluateSimpleMath(expression: string): string {
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