import { ASTNode, ASTNodeType, OutputNode as IOutputNode } from '../../../../../shared/src/types/ast';

export class OutputNode implements IOutputNode {
  public type: 'Output' = 'Output';
  constructor(
    public expression: string
  ) {}
}
