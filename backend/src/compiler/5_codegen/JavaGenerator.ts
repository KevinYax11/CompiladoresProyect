import { ProgramNode, ASTNode } from '../../../../../shared/src/types/ast';
import { BaseGenerator } from './BaseGenerator';
import { VariableDeclNode } from '../2_parser/ast_nodes/VariableDeclNode';
import { BinaryOpNode } from '../2_parser/ast_nodes/BinaryOpNode';
import { IfNode } from '../2_parser/ast_nodes/IfNode';
import { WhileNode } from '../2_parser/ast_nodes/WhileNode';
import { FunctionCallNode } from '../2_parser/ast_nodes/FunctionCallNode';
import { ReturnNode } from '../2_parser/ast_nodes/ReturnNode';

export class JavaGenerator extends BaseGenerator {
  private indentLevel = 2;

  private getIndent(): string {
    return '    '.repeat(this.indentLevel);
  }

  protected visitProgram(node: ProgramNode): string {
    let result = 'public class Main {\n    public static void main(String[] args) {\n';
    result += node.body.map(n => this.visitNode(n)).join('');
    result += '    }\n}\n';
    return result;
  }

  protected visitVariableDecl(node: ASTNode): string {
    const n = node as VariableDeclNode;
    let javaType = n.varType;
    if (javaType === 'string') javaType = 'String';
    if (javaType === 'boolean') javaType = 'boolean';
    
    if (n.init) {
      return `${this.getIndent()}${javaType} ${n.identifier} = ${this.visitNode(n.init).trim()};\n`;
    }
    return `${this.getIndent()}${javaType} ${n.identifier};\n`;
  }

  protected visitBinaryOp(node: ASTNode): string {
    const n = node as BinaryOpNode;
    const leftStr = 'expression' in n.left ? (n.left as any).expression : this.visitNode(n.left).replace(';\n', '');
    const rightStr = 'expression' in n.right ? (n.right as any).expression : this.visitNode(n.right).replace(';\n', '');
    return `${this.getIndent()}${leftStr} ${n.operator} ${rightStr};\n`;
  }

  protected visitIf(node: ASTNode): string {
    const n = node as IfNode;
    let result = `${this.getIndent()}if (${n.condition}) {\n`;
    
    this.indentLevel++;
    result += n.consequent.map(child => this.visitNode(child)).join('');
    this.indentLevel--;
    
    result += `${this.getIndent()}}\n`;
    return result;
  }

  protected visitWhile(node: ASTNode): string {
    const n = node as WhileNode;
    let result = `${this.getIndent()}while (${n.condition}) {\n`;
    
    this.indentLevel++;
    result += n.body.map(child => this.visitNode(child)).join('');
    this.indentLevel--;
    
    result += `${this.getIndent()}}\n`;
    return result;
  }

  protected visitFunctionCall(node: ASTNode): string {
    const n = node as FunctionCallNode;
    const args = n.args.map(arg => 'expression' in arg ? (arg as any).expression : this.visitNode(arg).replace(';\n', '')).join(', ');
    return `${this.getIndent()}${n.functionName}(${args});\n`;
  }

  protected visitReturn(node: ASTNode): string {
    const n = node as ReturnNode;
    if (n.argument) {
      const argStr = 'expression' in n.argument ? (n.argument as any).expression : this.visitNode(n.argument).replace(';\n', '');
      return `${this.getIndent()}return ${argStr};\n`;
    }
    return `${this.getIndent()}return;\n`;
  }
}