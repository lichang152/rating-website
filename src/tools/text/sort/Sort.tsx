import React, { useState } from 'react';
import './Sort.css';

const Sort: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [sortedText, setSortedText] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = () => {
    const lines = inputText.split('\n');
    const sortedLines = lines.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.localeCompare(b);
      } else {
        return b.localeCompare(a);
      }
    });
    setSortedText(sortedLines.join('\n'));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sortedText);
  };

  const handleClear = () => {
    setInputText('');
    setSortedText('');
  };

  return (
    <div className="sort-tool">
      <div className="tool-section">
        <h3>输入文本</h3>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="请输入需要排序的文本，每行一条..."
          rows={10}
        />
      </div>

      <div className="tool-controls">
        <div className="control-group">
          <label>排序顺序：</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          >
            <option value="asc">升序</option>
            <option value="desc">降序</option>
          </select>
        </div>
        <button onClick={handleSort} className="btn-primary">
          排序
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      <div className="tool-section">
        <h3>排序结果</h3>
        <textarea
          value={sortedText}
          readOnly
          rows={10}
        />
        <button onClick={handleCopy} className="btn-secondary">
          复制结果
        </button>
      </div>
    </div>
  );
};

export default Sort;