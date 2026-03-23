import React, { useState } from 'react';
import './TextMergeWithSeparator.css';

const TextMergeWithSeparator: React.FC = () => {
  const [texts, setTexts] = useState<string[]>(['', '', '']);
  const [separator, setSeparator] = useState<string>(',');
  const [result, setResult] = useState<string>('');

  const handleTextChange = (index: number, value: string) => {
    const newTexts = [...texts];
    newTexts[index] = value;
    setTexts(newTexts);
  };

  const addTextInput = () => {
    setTexts([...texts, '']);
  };

  const removeTextInput = (index: number) => {
    if (texts.length > 1) {
      const newTexts = texts.filter((_, i) => i !== index);
      setTexts(newTexts);
    }
  };

  const mergeTexts = () => {
    const filteredTexts = texts.filter(text => text.trim() !== '');
    const mergedText = filteredTexts.join(separator);
    setResult(mergedText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="text-merge-with-separator">
      <div className="input-section">
        <div className="separator-input">
          <label>分隔符：</label>
          <input
            type="text"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            placeholder="请输入分隔符"
          />
        </div>
        <div className="text-inputs">
          {texts.map((text, index) => (
            <div key={index} className="text-input-group">
              <textarea
                value={text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                placeholder={`请输入文本 ${index + 1}...`}
                rows={3}
              />
              <button 
                className="remove-button" 
                onClick={() => removeTextInput(index)}
                disabled={texts.length <= 1}
              >
                删除
              </button>
            </div>
          ))}
        </div>
        <button className="add-button" onClick={addTextInput}>
          添加文本
        </button>
        <button className="merge-button" onClick={mergeTexts}>
          合并文本
        </button>
      </div>
      <div className="output-section">
        <h3>合并结果</h3>
        <textarea
          value={result}
          readOnly
          rows={3}
        />
        {result && (
          <button className="copy-button" onClick={copyToClipboard}>
            复制结果
          </button>
        )}
      </div>
    </div>
  );
};

export default TextMergeWithSeparator;