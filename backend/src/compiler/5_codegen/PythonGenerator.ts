import { ProgramNode, ASTNode, InputNode, OutputNode, AssignmentNode } from '../../../../shared/src/types/ast';
import { BaseGenerator } from './BaseGenerator';
import { VariableDeclNode } from '../2_parser/ast_nodes/VariableDeclNode';
import { BinaryOpNode } from '../2_parser/ast_nodes/BinaryOpNode';
import { IfNode } from '../2_parser/ast_nodes/IfNode';
import { WhileNode } from '../2_parser/ast_nodes/WhileNode';
import { FunctionCallNode } from '../2_parser/ast_nodes/FunctionCallNode';
import { ReturnNode } from '../2_parser/ast_nodes/ReturnNode';

export class PythonGenerator extends BaseGenerator {
  private indentLevel = 0;

  private getIndent(): string {
    return '    '.repeat(this.indentLevel);
  }

  protected visitProgram(node: ProgramNode): string {
    if (node.body.length === 0) return 'pass\n';
    return node.body.map((n: ASTNode) => this.visitNode(n)).join('');
  }

  protected visitVariableDecl(node: ASTNode): string {
    const n = node as VariableDeclNode;
    if (n.init) {
      return `${this.getIndent()}${n.identifier} = ${this.visitNode(n.init).trim()}\n`;
    }
    return `${this.getIndent()}${n.identifier} = None\n`;
  }

  protected visitAssignment(node: ASTNode): string {
    const n = node as AssignmentNode;
    return `${this.getIndent()}${n.variableName} = ${n.expression}\n`;
  }

  protected visitInput(node: ASTNode): string {
    const n = node as InputNode;
    const prompt = n.prompt ? `"${n.prompt}: "` : '""';
    return `${this.getIndent()}${n.variableName} = input(${prompt})\n`;
  }

  protected visitOutput(node: ASTNode): string {
    const n = node as OutputNode;
    return `${this.getIndent()}print(${n.expression})\n`;
  }

  protected visitBinaryOp(node: ASTNode): string {
    const n = node as BinaryOpNode;
    const leftStr = 'expression' in n.left ? (n.left as any).expression : this.visitNode(n.left).replace('\n', '');
    const rightStr = 'expression' in n.right ? (n.right as any).expression : this.visitNode(n.right).replace('\n', '');
    return `${this.getIndent()}${leftStr} ${n.operator} ${rightStr}\n`;
  }

  protected visitIf(node: ASTNode): string {
    const n = node as IfNode;
    let result = `${this.getIndent()}if ${n.condition}:\n`;
    
    this.indentLevel++;
    result += n.consequent.length > 0 ? n.consequent.map((child: ASTNode) => this.visitNode(child)).join('') : `${this.getIndent()}pass\n`;
    this.indentLevel--;

    return result;
  }

  protected visitWhile(node: ASTNode): string {
    const n = node as WhileNode;
    let result = `${this.getIndent()}while ${n.condition}:\n`;
    
    this.indentLevel++;
    result += n.body.length > 0 ? n.body.map((child: ASTNode) => this.visitNode(child)).join('') : `${this.getIndent()}pass\n`;
    this.indentLevel--;

    return result;
  }

  protected visitFunctionCall(node: ASTNode): string {
    const n = node as FunctionCallNode;
    const args = n.args.map((arg: any) => 'expression' in arg ? (arg as any).expression : this.visitNode(arg).replace('\n', '')).join(', ');
    return `${this.getIndent()}${n.functionName}(${args})\n`;
  }

  protected visitReturn(node: ASTNode): string {
    const n = node as ReturnNode;
    if (n.argument) {
      const argStr = 'expression' in n.argument ? (n.argument as any).expression : this.visitNode(n.argument).replace('\n', '');
      return `${this.getIndent()}return ${argStr}\n`;
    }
    return `${this.getIndent()}return\n`;
  }
}