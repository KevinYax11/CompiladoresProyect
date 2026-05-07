import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export class ForNode implements ASTNode {
  public type: ASTNodeType = 'For';
  constructor(
    public init: ASTNode | null,
    public condition: string,
    public update: ASTNode | null,
    public body: ASTNode[]
  ) {}
}