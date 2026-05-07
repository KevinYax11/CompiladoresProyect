import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export class DoWhileNode implements ASTNode {
  public type: ASTNodeType = 'DoWhile';
  constructor(
    public condition: string,
    public body: ASTNode[]
  ) {}
}