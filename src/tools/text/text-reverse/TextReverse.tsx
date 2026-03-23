import React, { useState } from 'react';
import './TextReverse.css';

const TextReverse: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [reverseBy, setReverseBy] = useState<'character' | 'word' | 'line'>('character');

  const handleReverse = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    let result = '';

    switch (reverseBy) {
      case 'character':
        result = inputText.split('').reverse().join('');
        break;
      case 'word':
        result = inputText.split(/\s+/).reverse().join(' ');
        break;
      case 'line':
        result = inputText.split('\n').reverse().join('\n');
        break;
      default:
        result = inputText.split('').reverse().join('');
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
    <div className="text-reverse">
      <div className="tool-section">
        <h3>输入文本</h3>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="请输入要倒序的文本"
          rows={6}
        />
      </div>

      <div className="tool-section">
        <h3>倒序方式</h3>
        <div className="reverse-options">
          <label className="radio-item">
            <input
              type="radio"
              name="reverseBy"
              value="character"
              checked={reverseBy === 'character'}
              onChange={(e) => setReverseBy(e.target.value as 'character')}
            />
            <span>按字符倒序</span>
          </label>
          <label className="radio-item">
            <input
              type="radio"
              name="reverseBy"
              value="word"
              checked={reverseBy === 'word'}
              onChange={(e) => setReverseBy(e.target.value as 'word')}
            />
            <span>按单词倒序</span>
          </label>
          <label className="radio-item">
            <input
              type="radio"
              name="reverseBy"
              value="line"
              checked={reverseBy === 'line'}
              onChange={(e) => setReverseBy(e.target.value as 'line')}
            />
            <span>按行倒序</span>
          </label>
        </div>
      </div>

      <div className="tool-controls">
        <button onClick={handleReverse} className="btn-primary">
          倒序
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      {outputText && (
        <div className="result-section">
          <h3>倒序结果</h3>
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

export default TextReverse;