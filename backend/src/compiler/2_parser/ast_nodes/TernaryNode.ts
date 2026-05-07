import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export class TernaryNode implements ASTNode {
  public type: ASTNodeType = 'Ternary';
  constructor(
    public condition: string,
    public trueExpr: ASTNode,
    public falseExpr: ASTNode
  ) {}
}