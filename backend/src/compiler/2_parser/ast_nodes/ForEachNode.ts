import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export class ForEachNode implements ASTNode {
  public type: ASTNodeType = 'ForEach';
  constructor(
    public variable: string,
    public iterable: string,
    public body: ASTNode[]
  ) {}
}