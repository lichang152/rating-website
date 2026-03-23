import React, { useState } from 'react';
import './TextToEntities.css';

const TextToEntities: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const convertToEntities = () => {
    if (!text) {
      setResult('');
      return;
    }

    let entitiesText = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charCode = char.charCodeAt(0);
      // 只转换非ASCII字符
      if (charCode > 127) {
        entitiesText += `&#${charCode};`;
      } else {
        // 转换特殊HTML字符
        switch (char) {
          case '&':
            entitiesText += '&amp;';
            break;
          case '<':
            entitiesText += '&lt;';
            break;
          case '>':
            entitiesText += '&gt;';
            break;
          case '"':
            entitiesText += '&quot;';
            break;
          case "'":
            entitiesText += '&#39;';
            break;
          default:
            entitiesText += char;
        }
      }
    }

    setResult(entitiesText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="text-to-entities">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要转换为HTML实体的文本..."
          rows={6}
        />
        <button className="convert-button" onClick={convertToEntities}>
          转换为HTML实体
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

export default TextToEntities;