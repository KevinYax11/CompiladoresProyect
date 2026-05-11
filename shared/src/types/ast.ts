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
  | 'ExpressionStatement'
  | 'Input'
  | 'Output'
  | 'Assignment';

export interface ASTNode {
  type: ASTNodeType;
}

export interface ProgramNode extends ASTNode {
  type: 'Program';
  body: ASTNode[];
}

export interface InputNode extends ASTNode {
  type: 'Input';
  variableName: string;
  prompt?: string;
}

export interface OutputNode extends ASTNode {
  type: 'Output';
  expression: string;
}

export interface AssignmentNode extends ASTNode {
  type: 'Assignment';
  variableName: string;
  expression: string;
}