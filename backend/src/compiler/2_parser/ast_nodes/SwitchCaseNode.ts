import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export interface SwitchCase {
  value: string;
  body: ASTNode[];
}

export class SwitchCaseNode implements ASTNode {
  public type: ASTNodeType = 'SwitchCase';
  constructor(
    public discriminant: string,
    public cases: SwitchCase[],
    public defaultCase: ASTNode[] | null
  ) {}
}