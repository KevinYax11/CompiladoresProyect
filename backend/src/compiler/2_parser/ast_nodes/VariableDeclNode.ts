import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export class VariableDeclNode implements ASTNode {
  public type: ASTNodeType = 'VariableDecl';
  constructor(
    public varType: string,
    public identifier: string,
    public init: ASTNode | null
  ) {}
}