import { ASTNode, ASTNodeType, AssignmentNode as IAssignmentNode } from '../../../../../shared/src/types/ast';

export class AssignmentNode implements IAssignmentNode {
  public type: 'Assignment' = 'Assignment';
  constructor(
    public variableName: string,
    public expression: string
  ) {}
}
