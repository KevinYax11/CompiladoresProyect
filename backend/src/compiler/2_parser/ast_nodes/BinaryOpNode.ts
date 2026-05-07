import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export class BinaryOpNode implements ASTNode {
  public type: ASTNodeType = 'BinaryOp';
  constructor(
    public left: ASTNode,
    public operator: string,
    public right: ASTNode
  ) {}
}