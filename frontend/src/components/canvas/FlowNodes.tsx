import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Process as ProcessShape } from '../shapes/Process';
import { Decision as DecisionShape } from '../shapes/Decision';
import { Terminator as TerminatorShape } from '../shapes/Terminator';
import { DataInput as DataInputShape } from '../shapes/DataInput';
import { Document as DocumentShape } from '../shapes/Document';

const BaseNode = ({ children, selected, type }: { children: React.ReactNode, selected?: boolean, type: string }) => {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-institutional-blue border-2 border-white" />
      {children}
      {type === 'Decision' ? (
        <>
          <Handle type="source" position={Position.Right} id="true" className="w-3 h-3 bg-green-500 border-2 border-white" />
          <Handle type="source" position={Position.Bottom} id="false" className="w-3 h-3 bg-red-500 border-2 border-white" />
        </>
      ) : (
        <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-institutional-blue border-2 border-white" />
      )}
    </div>
  );
};

export const ProcessNode = memo(({ data, selected }: NodeProps) => (
  <BaseNode selected={selected} type="Process">
    <ProcessShape label={data.label as string} selected={selected} />
  </BaseNode>
));

export const DecisionNode = memo(({ data, selected }: NodeProps) => (
  <BaseNode selected={selected} type="Decision">
    <DecisionShape label={data.label as string} selected={selected} />
  </BaseNode>
));

export const TerminatorNode = memo(({ data, selected }: NodeProps) => (
  <BaseNode selected={selected} type="Terminator">
    <TerminatorShape label={data.label as string} selected={selected} />
  </BaseNode>
));

export const DataInputNode = memo(({ data, selected }: NodeProps) => (
  <BaseNode selected={selected} type="DataInput">
    <DataInputShape label={data.label as string} selected={selected} />
  </BaseNode>
));

export const DocumentNode = memo(({ data, selected }: NodeProps) => (
  <BaseNode selected={selected} type="Document">
    <DocumentShape label={data.label as string} selected={selected} />
  </BaseNode>
));

ProcessNode.displayName = 'ProcessNode';
DecisionNode.displayName = 'DecisionNode';
TerminatorNode.displayName = 'TerminatorNode';
DataInputNode.displayName = 'DataInputNode';
DocumentNode.displayName = 'DocumentNode';
