import React from 'react';

interface Props {
  code: string;
  language: string;
}

export const SyntaxHighlighter = ({ code, language }: Props) => {
  return (
    <pre className="p-4 bg-[#1e1e1e] rounded overflow-auto h-full font-mono text-sm text-green-400 m-0">
      <code className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
};