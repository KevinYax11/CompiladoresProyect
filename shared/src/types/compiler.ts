import { FlowchartGraph } from './flowchart';

export interface CompileRequest extends FlowchartGraph {}

export interface CompileResponse {
  ast: any;
  code: {
    python?: string;
    nasm?: string;
    cpp?: string;
    java?: string;
    javascript?: string;
    ruby?: string;
  };
  errors?: Array<{
    message: string;
    nodeId?: string;
    line?: number;
    column?: number;
  }>;
}