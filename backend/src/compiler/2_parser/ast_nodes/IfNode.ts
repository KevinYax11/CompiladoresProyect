import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export class IfNode implements ASTNode {
  public type: ASTNodeType = 'If';
  constructor(
    public condition: string,
    public consequent: ASTNode[]
  ) {}
}