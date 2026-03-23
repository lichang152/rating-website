import React, { useState } from 'react';
import './RemoveEmptyLines.css';

const RemoveEmptyLines: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [removeOnlyWhitespace, setRemoveOnlyWhitespace] = useState<boolean>(true);

  const handleRemoveEmptyLines = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    let result = '';

    if (removeOnlyWhitespace) {
      // 只移除完全空白的行（包括空格、制表符等）
      result = inputText
        .split('\n')
        .filter(line => line.trim() !== '')
        .join('\n');
    } else {
      // 移除所有空行（包括只包含换行符的行）
      result = inputText
        .split('\n')
        .filter(line => line !== '')
        .join('\n');
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
    <div className="remove-empty-lines">
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
        <h3>设置</h3>
        <div className="checkbox-group">
          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={removeOnlyWhitespace}
              onChange={(e) => setRemoveOnlyWhitespace(e.target.checked)}
            />
            <span>只移除空白行（保留包含空格的行）</span>
          </label>
        </div>
      </div>

      <div className="tool-controls">
        <button onClick={handleRemoveEmptyLines} className="btn-primary">
          去除空白行
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

export default RemoveEmptyLines;