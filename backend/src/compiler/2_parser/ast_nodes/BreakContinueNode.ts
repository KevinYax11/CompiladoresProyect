import { ASTNode, ASTNodeType } from '../../../../../shared/src/types/ast';

export class BreakContinueNode implements ASTNode {
  public type: ASTNodeType = 'BreakContinue';
  constructor(public isBreak: boolean) {}
}