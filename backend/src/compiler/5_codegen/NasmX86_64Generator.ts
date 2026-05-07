import { ProgramNode, ASTNode } from '../../../../../shared/src/types/ast';
import { BaseGenerator } from './BaseGenerator';
import { VariableDeclNode } from '../2_parser/ast_nodes/VariableDeclNode';
import { BinaryOpNode } from '../2_parser/ast_nodes/BinaryOpNode';
import { IfNode } from '../2_parser/ast_nodes/IfNode';
import { WhileNode } from '../2_parser/ast_nodes/WhileNode';
import { FunctionCallNode } from '../2_parser/ast_nodes/FunctionCallNode';
import { ReturnNode } from '../2_parser/ast_nodes/ReturnNode';

export class NasmX86_64Generator extends BaseGenerator {
  private labelCounter = 0;

  private getNextLabel(): string {
    return `L${this.labelCounter++}`;
  }

  protected visitProgram(node: ProgramNode): string {
    let code = `section .data\nsection .bss\nsection .text\n    global main\n    extern printf\n\nmain:\n    push rbp\n    mov rbp, rsp\n\n`;
    code += node.body.map(n => this.visitNode(n)).join('');
    code += `\n    mov rsp, rbp\n    pop rbp\n    mov rax, 0\n    ret\n`;
    return code;
  }

  protected visitVariableDecl(node: ASTNode): string {
    const n = node as VariableDeclNode;
    return `    ; var ${n.identifier}\n`;
  }

  protected visitBinaryOp(node: ASTNode): string {
    const n = node as BinaryOpNode;
    return `    ; op ${n.operator}\n`;
  }

  protected visitIf(node: ASTNode): string {
    const n = node as IfNode;
    const endLabel = this.getNextLabel();

    let code = `    ; if ${n.condition}\n    cmp rax, 0\n    je ${endLabel}\n`;
    code += n.consequent.map(child => this.visitNode(child)).join('');
    code += `${endLabel}:\n`;
    return code;
  }

  protected visitWhile(node: ASTNode): string {
    const n = node as WhileNode;
    const startLabel = this.getNextLabel();
    const endLabel = this.getNextLabel();

    let code = `${startLabel}:\n`;
    code += `    ; while ${n.condition}\n    cmp rax, 0\n    je ${endLabel}\n`;
    code += n.body.map(child => this.visitNode(child)).join('');
    code += `    jmp ${startLabel}\n${endLabel}:\n`;
    return code;
  }

  protected visitFunctionCall(node: ASTNode): string {
    const n = node as FunctionCallNode;
    return `    call ${n.functionName}\n`;
  }

  protected visitReturn(node: ASTNode): string {
    return `    mov rax, 0\n    ret\n`;
  }
}