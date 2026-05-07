export class CompilerError extends Error {
  constructor(
    public message: string,
    public nodeId?: string,
    public line?: number,
    public column?: number
  ) {
    super(message);
    this.name = 'CompilerError';
  }
}

export class ErrorHandler {
  public static throw(message: string, nodeId?: string, line?: number, column?: number): never {
    throw new CompilerError(message, nodeId, line, column);
  }

  public static formatError(error: unknown): Record<string, any> {
    if (error instanceof CompilerError) {
      return {
        type: 'CompilerError',
        message: error.message,
        nodeId: error.nodeId,
        line: error.line,
        column: error.column
      };
    }
    if (error instanceof Error) {
      return {
        type: 'GeneralError',
        message: error.message
      };
    }
    return {
      type: 'UnknownError',
      message: String(error)
    };
  }
}