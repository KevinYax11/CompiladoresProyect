export enum TokenType {
  IDENTIFIER = "IDENTIFIER",
  NUMBER = "NUMBER",
  STRING = "STRING",
  OPERATOR = "OPERATOR",
  KEYWORD = "KEYWORD",
  PUNCTUATION = "PUNCTUATION",
  EOF = "EOF"
}

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}