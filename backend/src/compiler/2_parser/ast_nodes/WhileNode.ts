import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export class WhileNode implements ASTNode {
  public type: ASTNodeType = 'While';
  constructor(
    public condition: string,
    public body: ASTNode[]
  ) {}
}