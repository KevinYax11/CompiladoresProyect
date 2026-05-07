import { ProgramNode, ASTNode, IfStatementNode, WhileStatementNode } from '../../../../../shared/src/types/ast';

export class DeadCodeRemoval {
  public optimize(program: ProgramNode): ProgramNode {
    program.body = this.removeDeadCode(program.body);
    return program;
  }

  private removeDeadCode(nodes: ASTNode[]): ASTNode[] {
    const optimizedNodes: ASTNode[] = [];

    for (const node of nodes) {
      if (node.type === 'IfStatement') {
        const ifNode = node as IfStatementNode;
        if (ifNode.condition === 'true' || ifNode.condition === '1') {
          optimizedNodes.push(...this.removeDeadCode(ifNode.consequent));
          continue;
        }
        if (ifNode.condition === 'false' || ifNode.condition === '0') {
          if (ifNode.alternate) {
            optimizedNodes.push(...this.removeDeadCode(ifNode.alternate));
          }
          continue;
        }
        ifNode.consequent = this.removeDeadCode(ifNode.consequent);
        if (ifNode.alternate) {
          ifNode.alternate = this.removeDeadCode(ifNode.alternate);
        }
        optimizedNodes.push(ifNode);
      } else if (node.type === 'WhileStatement') {
        const whileNode = node as WhileStatementNode;
        if (whileNode.condition === 'false' || whileNode.condition === '0') {
          continue;
        }
        whileNode.body = this.removeDeadCode(whileNode.body);
        optimizedNodes.push(whileNode);
      } else {
        optimizedNodes.push(node);
      }
    }

    return optimizedNodes;
  }
}