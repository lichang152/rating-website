import React, { useState } from 'react';
import './TextMerge.css';

const TextMerge: React.FC = () => {
  const [inputTexts, setInputTexts] = useState<string[]>(['', '']);
  const [delimiter, setDelimiter] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');

  const handleAddInput = () => {
    setInputTexts([...inputTexts, '']);
  };

  const handleRemoveInput = (index: number) => {
    if (inputTexts.length > 2) {
      setInputTexts(inputTexts.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputTexts = [...inputTexts];
    newInputTexts[index] = value;
    setInputTexts(newInputTexts);
  };

  const handleMerge = () => {
    const result = inputTexts.join(delimiter);
    setOutputText(result);
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      alert('合并结果已复制到剪贴板');
    }
  };

  const handleClear = () => {
    setInputTexts(['', '']);
    setDelimiter('');
    setOutputText('');
  };

  return (
    <div className="text-merge">
      <div className="tool-section">
        <h3>输入文本</h3>
        <div className="input-texts">
          {inputTexts.map((text, index) => (
            <div key={index} className="input-group">
              <textarea
                value={text}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder={`请输入文本 ${index + 1}`}
                rows={4}
              />
              {inputTexts.length > 2 && (
                <button
                  onClick={() => handleRemoveInput(index)}
                  className="remove-button"
                >
                  删除
                </button>
              )}
            </div>
          ))}
        </div>
        <button onClick={handleAddInput} className="btn-secondary">
          添加文本
        </button>
      </div>

      <div className="tool-section">
        <h3>合并设置</h3>
        <div className="merge-settings">
          <div className="setting-item">
            <label>分隔符：</label>
            <input
              type="text"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              placeholder="请输入分隔符（可选）"
            />
          </div>
        </div>
      </div>

      <div className="tool-controls">
        <button onClick={handleMerge} className="btn-primary">
          合并
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      {outputText && (
        <div className="result-section">
          <h3>合并结果</h3>
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

export default TextMerge;