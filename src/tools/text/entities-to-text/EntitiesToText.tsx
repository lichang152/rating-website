import React, { useState } from 'react';
import './EntitiesToText.css';

const EntitiesToText: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const convertToText = () => {
    if (!text) {
      setResult('');
      return;
    }

    let decodedText = text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#(\d+);/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 10));
      });

    setResult(decodedText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="entities-to-text">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入HTML实体文本..."
          rows={6}
        />
        <button className="convert-button" onClick={convertToText}>
          转换为文本
        </button>
      </div>
      <div className="output-section">
        <h3>转换结果</h3>
        <textarea
          value={result}
          readOnly
          rows={6}
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

export default EntitiesToText;