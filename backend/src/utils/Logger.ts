export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export class Logger {
  public static log(level: LogLevel, message: string, context?: any): void {
    const timestamp = new Date().toISOString();
    const contextStr = context ? JSON.stringify(context) : '';
    console.log(`[${timestamp}] [${level}] ${message} ${contextStr}`);
  }

  public static info(message: string, context?: any): void {
    this.log(LogLevel.INFO, message, context);
  }

  public static warn(message: string, context?: any): void {
    this.log(LogLevel.WARN, message, context);
  }

  public static error(message: string, context?: any): void {
    this.log(LogLevel.ERROR, message, context);
  }
}