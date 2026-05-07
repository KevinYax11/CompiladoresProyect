import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export class ReturnNode implements ASTNode {
  public type: ASTNodeType = 'Return';
  constructor(public argument: ASTNode | null) {}
}