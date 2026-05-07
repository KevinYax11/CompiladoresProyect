import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export class TryCatchNode implements ASTNode {
  public type: ASTNodeType = 'TryCatch';
  constructor(
    public tryBlock: ASTNode[],
    public catchVar: string | null,
    public catchBlock: ASTNode[],
    public finallyBlock: ASTNode[] | null
  ) {}
}