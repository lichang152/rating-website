import React, { useState } from 'react';
import './TextSplit.css';

const TextSplit: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [delimiter, setDelimiter] = useState<string>(',');
  const [splitResult, setSplitResult] = useState<string[]>([]);
  const [useRegex, setUseRegex] = useState<boolean>(false);
  const [maxSplit, setMaxSplit] = useState<number>(0);

  const handleSplit = () => {
    if (!inputText) {
      setSplitResult([]);
      return;
    }

    let result: string[] = [];

    if (useRegex) {
      try {
        const regex = new RegExp(delimiter);
        if (maxSplit > 0) {
          result = inputText.split(regex, maxSplit);
        } else {
          result = inputText.split(regex);
        }
      } catch (error) {
        alert('正则表达式无效');
        return;
      }
    } else {
      if (maxSplit > 0) {
        result = inputText.split(delimiter, maxSplit);
      } else {
        result = inputText.split(delimiter);
      }
    }

    setSplitResult(result);
  };

  const handleCopy = () => {
    const textToCopy = splitResult.join('\n');
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      alert('分割结果已复制到剪贴板');
    }
  };

  const handleClear = () => {
    setInputText('');
    setDelimiter(',');
    setSplitResult([]);
    setUseRegex(false);
    setMaxSplit(0);
  };

  return (
    <div className="text-split">
      <div className="tool-section">
        <h3>输入文本</h3>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="请输入要分割的文本"
          rows={6}
        />
      </div>

      <div className="tool-section">
        <h3>分割设置</h3>
        <div className="split-settings">
          <div className="setting-item">
            <label>分隔符：</label>
            <input
              type="text"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              placeholder="请输入分隔符"
            />
          </div>
          <div className="setting-item">
            <label>最大分割数：</label>
            <input
              type="number"
              value={maxSplit}
              onChange={(e) => setMaxSplit(Number(e.target.value) || 0)}
              min="0"
              placeholder="0表示不限制"
            />
          </div>
          <div className="checkbox-group">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
              />
              <span>使用正则表达式</span>
            </label>
          </div>
        </div>
      </div>

      <div className="tool-controls">
        <button onClick={handleSplit} className="btn-primary">
          分割
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      {splitResult.length > 0 && (
        <div className="result-section">
          <h3>分割结果</h3>
          <div className="split-result">
            {splitResult.map((item, index) => (
              <div key={index} className="split-item">
                <span className="item-index">{index + 1}.</span>
                <span className="item-content">{item}</span>
              </div>
            ))}
          </div>
          <button onClick={handleCopy} className="btn-secondary">
            复制结果
          </button>
        </div>
      )}
    </div>
  );
};

export default TextSplit;