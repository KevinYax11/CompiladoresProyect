import { ASTNode, ASTNodeType, InputNode as IInputNode } from '../../../../../shared/src/types/ast';

export class InputNode implements IInputNode {
  public type: 'Input' = 'Input';
  constructor(
    public variableName: string,
    public prompt?: string
  ) {}
}
