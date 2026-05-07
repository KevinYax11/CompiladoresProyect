import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export class FunctionCallNode implements ASTNode {
  public type: ASTNodeType = 'FunctionCall';
  constructor(
    public functionName: string,
    public args: ASTNode[]
  ) {}
}