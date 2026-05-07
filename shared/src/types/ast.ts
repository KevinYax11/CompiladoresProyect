export type ASTNodeType = 'Program' | 'IfStatement' | 'WhileStatement' | 'ExpressionStatement' | 'VariableDeclaration';

export interface ASTNode {
  type: ASTNodeType;
}

export interface ProgramNode extends ASTNode {
  type: 'Program';
  body: ASTNode[];
}

export interface ExpressionStatementNode extends ASTNode {
  type: 'ExpressionStatement';
  expression: string;
}

export interface IfStatementNode extends ASTNode {
  type: 'IfStatement';
  condition: string;
  consequent: ASTNode[];
  alternate?: ASTNode[];
}