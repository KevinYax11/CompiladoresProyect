import { ProgramNode, ASTNode } from '../../../../shared/src/types/ast';

export class DeadCodeRemoval {
  public optimize(program: ProgramNode): ProgramNode {
    program.body = this.removeDeadCode(program.body);
    return program;
  }

  private removeDeadCode(nodes: ASTNode[]): ASTNode[] {
    const optimizedNodes: ASTNode[] = [];

    for (const node of nodes) {
      if (node.type === 'If') {
        const ifNode = node as any;
        if (ifNode.condition === 'true' || ifNode.condition === '1') {
          optimizedNodes.push(...this.removeDeadCode(ifNode.consequent || []));
          continue;
        }
        if (ifNode.condition === 'false' || ifNode.condition === '0') {
          continue;
        }
        ifNode.consequent = this.removeDeadCode(ifNode.consequent || []);
        optimizedNodes.push(ifNode);
      } else if (node.type === 'While') {
        const whileNode = node as any;
        if (whileNode.condition === 'false' || whileNode.condition === '0') {
          continue;
        }
        whileNode.body = this.removeDeadCode(whileNode.body || []);
        optimizedNodes.push(whileNode);
      } else {
        optimizedNodes.push(node);
      }
    }

    return optimizedNodes;
  }
}