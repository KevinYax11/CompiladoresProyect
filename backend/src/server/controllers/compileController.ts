import { Request, Response } from 'express';
import { FlowchartGraph } from '../../../../../shared/src/types/flowchart';
import { compileGraph } from '../../compiler/CompilerOrchestrator';

export const compileController = (req: Request, res: Response) => {
  try {
    const graph: FlowchartGraph = req.body;
    const result = compileGraph(graph);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};