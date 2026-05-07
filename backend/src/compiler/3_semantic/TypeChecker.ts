import { ProgramNode, ASTNode, IfStatementNode, WhileStatementNode, ExpressionStatementNode, InputStatementNode } from '../../../../../shared/src/types/ast';
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
      case 'ExpressionStatement':
        this.checkExpression((node as ExpressionStatementNode).expression);
        break;
      case 'IfStatement':
        const ifNode = node as IfStatementNode;
        this.checkExpression(ifNode.condition);
        this.symbolTable.enterScope();
        this.visitNodes(ifNode.consequent);
        this.symbolTable.exitScope();
        if (ifNode.alternate) {
          this.symbolTable.enterScope();
          this.visitNodes(ifNode.alternate);
          this.symbolTable.exitScope();
        }
        break;
      case 'WhileStatement':
        const whileNode = node as WhileStatementNode;
        this.checkExpression(whileNode.condition);
        this.symbolTable.enterScope();
        this.visitNodes(whileNode.body);
        this.symbolTable.exitScope();
        break;
      case 'InputStatement':
        const inputNode = node as InputStatementNode;
        if (!this.symbolTable.resolve(inputNode.variable)) {
          this.symbolTable.define(inputNode.variable, "any");
        }
        break;
    }
  }

  private checkExpression(expression: string): void {
    const tokenizer = new Tokenizer(expression);
    const tokens = tokenizer.tokenize();
    
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.type === TokenType.IDENTIFIER) {
        if (i < tokens.length - 1 && tokens[i + 1].value === '=') {
          if (!this.symbolTable.resolve(token.value)) {
            this.symbolTable.define(token.value, "any");
          }
        } else {
          if (!this.symbolTable.resolve(token.value)) {
            throw new Error(`UndefinedVariable:${token.value}`);
          }
        }
      }
    }
  }
}