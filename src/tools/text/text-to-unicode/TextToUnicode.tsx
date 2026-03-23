import React, { useState } from 'react';
import './TextToUnicode.css';

const TextToUnicode: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const convertToUnicode = () => {
    if (!text) {
      setResult('');
      return;
    }

    let unicodeText = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const unicode = char.charCodeAt(0);
      unicodeText += `\\u${unicode.toString(16).padStart(4, '0')} `;
    }

    setResult(unicodeText.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="text-to-unicode">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要转换为Unicode的文本..."
          rows={6}
        />
        <button className="convert-button" onClick={convertToUnicode}>
          转换为Unicode
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

export default TextToUnicode;