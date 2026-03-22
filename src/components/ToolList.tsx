import React from 'react';
import type { Tool } from '../types/tool';

interface ToolListProps {
  tools: Tool[];
  onToolSelect: (tool: Tool) => void;
}

const ToolList: React.FC<ToolListProps> = ({ tools, onToolSelect }) => {
  return (
    <div className="tool-list">
      <h2>工具列表</h2>
      <div className="tool-grid">
        {tools.map((tool) => (
          <div 
            key={tool.id}
            className="tool-card"
            onClick={() => onToolSelect(tool)}
          >
            <div className="tool-icon">{tool.icon}</div>
            <h3 className="tool-name">{tool.name}</h3>
            <p className="tool-description">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolList;
