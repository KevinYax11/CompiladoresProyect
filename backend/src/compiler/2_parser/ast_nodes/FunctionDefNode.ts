import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export class FunctionDefNode implements ASTNode {
  public type: ASTNodeType = 'FunctionDef';
  constructor(
    public functionName: string,
    public params: string[],
    public returnType: string,
    public body: ASTNode[]
  ) {}
}