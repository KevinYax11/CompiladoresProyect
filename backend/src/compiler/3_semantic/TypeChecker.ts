import { ProgramNode, ASTNode, InputNode, AssignmentNode } from '../../../../shared/src/types/ast';
import { SymbolTable } from './SymbolTable';
import { Tokenizer } from '../1_lexer/Tokenizer';
import { TokenType } from '../1_lexer/TokenTypes';

export class TypeChecker {
  private symbolTable: SymbolTable;

  constructor() {
    this.symbolTable = new SymbolTable();
  }

  public check(program: ProgramNode): void {
    this.visitNodes(program.body);
  }

  private visitNodes(nodes: ASTNode[]): void {
    for (const node of nodes) {
      this.visitNode(node);
    }
  }

  private visitNode(node: ASTNode): void {
    switch (node.type) {
      case 'Assignment':
        const assignNode = node as AssignmentNode;
        if (!this.symbolTable.resolve(assignNode.variableName)) {
           this.symbolTable.define(assignNode.variableName, "any");
        }
        this.checkExpression(assignNode.expression);
        break;
      case 'If':
        const ifNode = node as any; // Using any to avoid complex type casting for now
        this.checkExpression(ifNode.condition);
        this.symbolTable.enterScope();
        this.visitNodes(ifNode.consequent || []);
        this.symbolTable.exitScope();
        break;
      case 'While':
        const whileNode = node as any;
        this.checkExpression(whileNode.condition);
        this.symbolTable.enterScope();
        this.visitNodes(whileNode.body || []);
        this.symbolTable.exitScope();
        break;
      case 'Input':
        const inputNode = node as InputNode;
        if (!this.symbolTable.resolve(inputNode.variableName)) {
          this.symbolTable.define(inputNode.variableName, "any");
        }
        break;
      case 'Output':
        const outputNode = node as any;
        this.checkExpression(outputNode.expression);
        break;
    }
  }

  private checkExpression(expression: string): void {
    if (!expression) return;
    const tokenizer = new Tokenizer(expression);
    try {
      const tokens = tokenizer.tokenize();
      for (const token of tokens) {
        if (token.type === TokenType.IDENTIFIER) {
          // If it's a keyword or something, skip. 
          // But for now, just check if it's defined.
          if (!this.symbolTable.resolve(token.value)) {
            // Auto-define for simplicity in this visual environment
            this.symbolTable.define(token.value, "any");
          }
        }
      }
    } catch (e) {
      // If tokenizer fails, we just skip for now
    }
  }
}