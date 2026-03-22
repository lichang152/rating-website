import React, { useState } from 'react';
import './Filter.css';

const Filter: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [filterText, setFilterText] = useState<string>('');
  const [filteredText, setFilteredText] = useState<string>('');
  const [filterType, setFilterType] = useState<'include' | 'exclude'>('include');
  const [useRegex, setUseRegex] = useState<boolean>(false);

  const handleFilter = () => {
    if (!inputText) {
      setFilteredText('');
      return;
    }

    const lines = inputText.split('\n');
    let filteredLines: string[] = [];

    if (useRegex) {
      try {
        const regex = new RegExp(filterText);
        filteredLines = filterType === 'include'
          ? lines.filter(line => regex.test(line))
          : lines.filter(line => !regex.test(line));
      } catch (error) {
        setFilteredText('正则表达式无效');
        return;
      }
    } else {
      filteredLines = filterType === 'include'
        ? lines.filter(line => line.includes(filterText))
        : lines.filter(line => !line.includes(filterText));
    }

    setFilteredText(filteredLines.join('\n'));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(filteredText);
  };

  const handleClear = () => {
    setInputText('');
    setFilterText('');
    setFilteredText('');
  };

  return (
    <div className="filter-tool">
      <div className="tool-section">
        <h3>输入文本</h3>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="请输入需要过滤的文本，每行一条..."
          rows={10}
        />
      </div>

      <div className="tool-controls">
        <div className="control-group">
          <label>过滤类型：</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'include' | 'exclude')}
          >
            <option value="include">包含</option>
            <option value="exclude">排除</option>
          </select>
        </div>

        <div className="control-group">
          <label>过滤条件：</label>
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="请输入过滤条件..."
          />
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={useRegex}
              onChange={(e) => setUseRegex(e.target.checked)}
            />
            使用正则表达式
          </label>
        </div>

        <button onClick={handleFilter} className="btn-primary">
          过滤
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      <div className="tool-section">
        <h3>过滤结果</h3>
        <textarea
          value={filteredText}
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

export default Filter;