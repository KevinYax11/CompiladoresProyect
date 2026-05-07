import { Token, TokenType } from '../1_lexer/TokenTypes';
import { ASTNode } from '../../../../shared/src/types/ast';
import { ErrorHandler } from '../../utils/ErrorHandler';
import { BinaryOpNode } from './ast_nodes/BinaryOpNode';
import { VariableDeclNode } from './ast_nodes/VariableDeclNode';
import { FunctionCallNode } from './ast_nodes/FunctionCallNode';
import { ReturnNode } from './ast_nodes/ReturnNode';
import { BreakContinueNode } from './ast_nodes/BreakContinueNode';

export class ASTBuilder {
  private tokens: Token[];
  private current: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  public parse(): ASTNode[] {
    const nodes: ASTNode[] = [];
    while (!this.isAtEnd()) {
      nodes.push(this.parseStatement());
    }
    return nodes;
  }

  private parseStatement(): ASTNode {
    if (this.match(TokenType.KEYWORD)) {
      const keyword = this.previous().value;
      switch (keyword) {
        case 'int':
        case 'string':
        case 'float':
        case 'boolean':
          return this.parseVariableDeclaration(keyword);
        case 'return':
          return this.parseReturnStatement();
        case 'break':
          return new BreakContinueNode(true);
        case 'continue':
          return new BreakContinueNode(false);
      }
    }
    return this.parseExpressionStatement();
  }

  private parseVariableDeclaration(varType: string): ASTNode {
    const identifier = this.consume(TokenType.IDENTIFIER, "Expected identifier after type").value;
    let init: ASTNode | null = null;
    if (this.match(TokenType.OPERATOR) && this.previous().value === '=') {
      init = this.parseExpressionStatement();
    }
    this.consumeIf(TokenType.PUNCTUATION, ';');
    return new VariableDeclNode(varType, identifier, init);
  }

  private parseReturnStatement(): ASTNode {
    let value: ASTNode | null = null;
    if (!this.check(TokenType.PUNCTUATION, ';')) {
      value = this.parseExpressionStatement();
    }
    this.consumeIf(TokenType.PUNCTUATION, ';');
    return new ReturnNode(value);
  }

  private parseExpressionStatement(): ASTNode {
    const leftToken = this.advance();
    
    if (this.match(TokenType.PUNCTUATION) && this.previous().value === '(') {
      return this.parseFunctionCall(leftToken.value);
    }

    if (this.match(TokenType.OPERATOR)) {
      const operator = this.previous().value;
      const rightNode = this.parseExpressionStatement();
      return new BinaryOpNode({ type: 'ExpressionStatement', expression: leftToken.value } as any, operator, rightNode);
    }

    return { type: 'ExpressionStatement', expression: leftToken.value } as any;
  }

  private parseFunctionCall(functionName: string): ASTNode {
    const args: ASTNode[] = [];
    if (!this.check(TokenType.PUNCTUATION, ')')) {
      do {
        args.push(this.parseExpressionStatement());
      } while (this.match(TokenType.PUNCTUATION) && this.previous().value === ',');
    }
    this.consume(TokenType.PUNCTUATION, "Expected ')' after arguments", ')');
    this.consumeIf(TokenType.PUNCTUATION, ';');
    return new FunctionCallNode(functionName, args);
  }

  private match(type: TokenType): boolean {
    if (this.check(type)) {
      this.advance();
      return true;
    }
    return false;
  }

  private check(type: TokenType, value?: string): boolean {
    if (this.isAtEnd()) return false;
    if (this.peek().type !== type) return false;
    if (value && this.peek().value !== value) return false;
    return true;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private consume(type: TokenType, message: string, value?: string): Token {
    if (this.check(type, value)) return this.advance();
    ErrorHandler.throw(message, undefined, this.peek().line, this.peek().column);
  }

  private consumeIf(type: TokenType, value: string): void {
    if (this.check(type, value)) {
      this.advance();
    }
  }
}