import React, { useState } from 'react';
import './TextTrim.css';

const TextTrim: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [trimMode, setTrimMode] = useState<'both' | 'left' | 'right'>('both');

  const handleTrim = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    let result = '';

    switch (trimMode) {
      case 'both':
        result = inputText.trim();
        break;
      case 'left':
        result = inputText.trimStart();
        break;
      case 'right':
        result = inputText.trimEnd();
        break;
      default:
        result = inputText.trim();
    }

    setOutputText(result);
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      alert('文本已复制到剪贴板');
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="text-trim">
      <div className="tool-section">
        <h3>输入文本</h3>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="请输入要处理的文本"
          rows={6}
        />
      </div>

      <div className="tool-section">
        <h3>修剪模式</h3>
        <div className="trim-mode-selector">
          <label className="radio-item">
            <input
              type="radio"
              name="trimMode"
              value="both"
              checked={trimMode === 'both'}
              onChange={(e) => setTrimMode(e.target.value as 'both')}
            />
            <span>去除首尾空格</span>
          </label>
          <label className="radio-item">
            <input
              type="radio"
              name="trimMode"
              value="left"
              checked={trimMode === 'left'}
              onChange={(e) => setTrimMode(e.target.value as 'left')}
            />
            <span>只去除左侧空格</span>
          </label>
          <label className="radio-item">
            <input
              type="radio"
              name="trimMode"
              value="right"
              checked={trimMode === 'right'}
              onChange={(e) => setTrimMode(e.target.value as 'right')}
            />
            <span>只去除右侧空格</span>
          </label>
        </div>
      </div>

      <div className="tool-controls">
        <button onClick={handleTrim} className="btn-primary">
          去除空格
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      {outputText && (
        <div className="result-section">
          <h3>处理结果</h3>
          <textarea
            value={outputText}
            readOnly
            rows={6}
          />
          <button onClick={handleCopy} className="btn-secondary">
            复制结果
          </button>
        </div>
      )}
    </div>
  );
};

export default TextTrim;