import React, { useState } from 'react';
import './RemoveHtml.css';

const RemoveHtml: React.FC = () => {
  const [html, setHtml] = useState('');
  const [result, setResult] = useState('');

  const removeHtmlTags = () => {
    if (!html) {
      setResult('');
      return;
    }

    // 去除HTML标签
    const text = html.replace(/<[^>]*>/g, '');
    // 去除多余的空格和换行
    const cleanedText = text.replace(/\s+/g, ' ').trim();
    
    setResult(cleanedText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="remove-html">
      <div className="input-section">
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="请输入包含HTML标签的文本..."
          rows={10}
        />
        <button className="remove-button" onClick={removeHtmlTags}>
          去除HTML标签
        </button>
      </div>
      <div className="output-section">
        <h3>处理结果</h3>
        <textarea
          value={result}
          readOnly
          rows={10}
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

export default RemoveHtml;