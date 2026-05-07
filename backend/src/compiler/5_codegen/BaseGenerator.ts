import { ProgramNode, ASTNode } from '../../../../../shared/src/types/ast';

export abstract class BaseGenerator {
  protected abstract visitProgram(node: ProgramNode): string;
  protected abstract visitVariableDecl(node: ASTNode): string;
  protected abstract visitBinaryOp(node: ASTNode): string;
  protected abstract visitIf(node: ASTNode): string;
  protected abstract visitWhile(node: ASTNode): string;
  protected abstract visitFunctionCall(node: ASTNode): string;
  protected abstract visitReturn(node: ASTNode): string;

  public generate(ast: ProgramNode): string {
    return this.visitProgram(ast);
  }

  protected visitNode(node: ASTNode): string {
    switch (node.type) {
      case 'VariableDecl': return this.visitVariableDecl(node);
      case 'BinaryOp': return this.visitBinaryOp(node);
      case 'If': return this.visitIf(node);
      case 'While': return this.visitWhile(node);
      case 'FunctionCall': return this.visitFunctionCall(node);
      case 'Return': return this.visitReturn(node);
      default: return '';
    }
  }
}