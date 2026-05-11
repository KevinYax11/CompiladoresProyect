import { z } from 'zod';

export const positionSchema = z.object({
  x: z.number(),
  y: z.number()
});

export const nodeDataSchema = z.record(z.any());

export const nodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  position: positionSchema,
  data: nodeDataSchema
});

export const edgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  label: z.string().optional()
});

export const flowchartSchema = z.object({
  nodes: z.array(nodeSchema),
  edges: z.array(edgeSchema)
});