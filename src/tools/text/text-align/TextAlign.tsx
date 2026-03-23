import React, { useState } from 'react';
import './TextAlign.css';

const TextAlign: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [alignMode, setAlignMode] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [width, setWidth] = useState<number>(80);

  const handleAlign = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    const lines = inputText.split('\n');
    let result = '';

    switch (alignMode) {
      case 'left':
        result = lines.join('\n');
        break;
      case 'center':
        result = lines.map(line => {
          const padding = Math.max(0, Math.floor((width - line.length) / 2));
          return ' '.repeat(padding) + line;
        }).join('\n');
        break;
      case 'right':
        result = lines.map(line => {
          const padding = Math.max(0, width - line.length);
          return ' '.repeat(padding) + line;
        }).join('\n');
        break;
      case 'justify':
        result = lines.map(line => {
          const words = line.split(/\s+/);
          if (words.length <= 1) return line;
          
          const totalSpaces = width - words.reduce((sum, word) => sum + word.length, 0);
          const spacesPerGap = Math.floor(totalSpaces / (words.length - 1));
          const extraSpaces = totalSpaces % (words.length - 1);
          
          let justifiedLine = words[0];
          for (let i = 1; i < words.length; i++) {
            const spaces = spacesPerGap + (i <= extraSpaces ? 1 : 0);
            justifiedLine += ' '.repeat(spaces) + words[i];
          }
          return justifiedLine;
        }).join('\n');
        break;
      default:
        result = lines.join('\n');
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
    <div className="text-align">
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
        <h3>对齐设置</h3>
        <div className="align-settings">
          <div className="setting-item">
            <label>对齐方式：</label>
            <div className="align-mode-selector">
              <label className="radio-item">
                <input
                  type="radio"
                  name="alignMode"
                  value="left"
                  checked={alignMode === 'left'}
                  onChange={(e) => setAlignMode(e.target.value as 'left')}
                />
                <span>左对齐</span>
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  name="alignMode"
                  value="center"
                  checked={alignMode === 'center'}
                  onChange={(e) => setAlignMode(e.target.value as 'center')}
                />
                <span>居中对齐</span>
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  name="alignMode"
                  value="right"
                  checked={alignMode === 'right'}
                  onChange={(e) => setAlignMode(e.target.value as 'right')}
                />
                <span>右对齐</span>
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  name="alignMode"
                  value="justify"
                  checked={alignMode === 'justify'}
                  onChange={(e) => setAlignMode(e.target.value as 'justify')}
                />
                <span>两端对齐</span>
              </label>
            </div>
          </div>
          <div className="setting-item">
            <label>宽度：</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value) || 80)}
              min="10"
              max="200"
            />
          </div>
        </div>
      </div>

      <div className="tool-controls">
        <button onClick={handleAlign} className="btn-primary">
          对齐文本
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

export default TextAlign;