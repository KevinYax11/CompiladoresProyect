import { Token, TokenType } from './TokenTypes';

export class Tokenizer {
  private input: string;
  private position: number = 0;
  private line: number = 1;
  private column: number = 1;

  constructor(input: string) {
    this.input = input;
  }

  private advance(): string {
    const char = this.input[this.position++];
    if (char === '\n') {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }
    return char;
  }

  private peek(): string {
    return this.position < this.input.length ? this.input[this.position] : '\0';
  }

  private isWhitespace(char: string): boolean {
    return /\s/.test(char);
  }

  private isAlpha(char: string): boolean {
    return /[a-zA-Z_]/.test(char);
  }

  private isDigit(char: string): boolean {
    return /[0-9]/.test(char);
  }

  public tokenize(): Token[] {
    const tokens: Token[] = [];
    while (this.position < this.input.length) {
      const char = this.peek();
      if (this.isWhitespace(char)) {
        this.advance();
        continue;
      }
      if (this.isAlpha(char)) {
        tokens.push(this.readIdentifier());
        continue;
      }
      if (this.isDigit(char)) {
        tokens.push(this.readNumber());
        continue;
      }
      if (/[+\-*/=<>!&|]/.test(char)) {
        tokens.push(this.readOperator());
        continue;
      }
      if (/[()[\]{},;]/.test(char)) {
        tokens.push({
          type: TokenType.PUNCTUATION,
          value: this.advance(),
          line: this.line,
          column: this.column - 1
        });
        continue;
      }
      throw new Error(`UnexpectedCharacterAtLine${this.line}Col${this.column}`);
    }
    tokens.push({ type: TokenType.EOF, value: "", line: this.line, column: this.column });
    return tokens;
  }

  private readIdentifier(): Token {
    const startCol = this.column;
    let value = "";
    while (this.position < this.input.length && (this.isAlpha(this.peek()) || this.isDigit(this.peek()))) {
      value += this.advance();
    }
    const keywords = ["if", "else", "while", "return", "int", "string", "void"];
    return {
      type: keywords.includes(value) ? TokenType.KEYWORD : TokenType.IDENTIFIER,
      value,
      line: this.line,
      column: startCol
    };
  }

  private readNumber(): Token {
    const startCol = this.column;
    let value = "";
    while (this.position < this.input.length && this.isDigit(this.peek())) {
      value += this.advance();
    }
    return {
      type: TokenType.NUMBER,
      value,
      line: this.line,
      column: startCol
    };
  }

  private readOperator(): Token {
    const startCol = this.column;
    let value = this.advance();
    const nextChar = this.peek();
    if ((value === '=' || value === '!' || value === '<' || value === '>') && nextChar === '=') {
      value += this.advance();
    } else if ((value === '&' && nextChar === '&') || (value === '|' && nextChar === '|')) {
      value += this.advance();
    }
    return {
      type: TokenType.OPERATOR,
      value,
      line: this.line,
      column: startCol
    };
  }
}