import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export class IfElseNode implements ASTNode {
  public type: ASTNodeType = 'IfElse';
  constructor(
    public condition: string,
    public consequent: ASTNode[],
    public alternate: ASTNode[]
  ) {}
}