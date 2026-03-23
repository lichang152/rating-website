import React, { useState } from 'react';
import './UnicodeToText.css';

const UnicodeToText: React.FC = () => {
  const [unicode, setUnicode] = useState('');
  const [result, setResult] = useState('');

  const convertToText = () => {
    if (!unicode) {
      setResult('');
      return;
    }

    // 匹配Unicode编码格式 \uXXXX
    const unicodeRegex = /\\u([0-9a-fA-F]{4})/g;
    const text = unicode.replace(unicodeRegex, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });

    setResult(text);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="unicode-to-text">
      <div className="input-section">
        <textarea
          value={unicode}
          onChange={(e) => setUnicode(e.target.value)}
          placeholder="请输入Unicode编码（例如：\u4f60\u597d）..."
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

export default UnicodeToText;