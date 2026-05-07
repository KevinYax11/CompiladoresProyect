export type ASTNodeType = 
  | 'Program'
  | 'BinaryOp'
  | 'BreakContinue'
  | 'DoWhile'
  | 'ForEach'
  | 'For'
  | 'FunctionCall'
  | 'FunctionDef'
  | 'IfElse'
  | 'If'
  | 'Return'
  | 'SwitchCase'
  | 'Ternary'
  | 'TryCatch'
  | 'VariableDecl'
  | 'While'
  | 'ExpressionStatement';

export interface ASTNode {
  type: ASTNodeType;
}

export interface ProgramNode extends ASTNode {
  type: 'Program';
  body: ASTNode[];
}