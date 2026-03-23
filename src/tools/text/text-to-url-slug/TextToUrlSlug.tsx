import React, { useState } from 'react';
import './TextToUrlSlug.css';

const TextToUrlSlug: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const convertToSlug = () => {
    if (!text) {
      setResult('');
      return;
    }

    let slug = text
      .toLowerCase()
      .trim()
      .replace(/[\s\t\n\r]+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    setResult(slug);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="text-to-url-slug">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要转换为URL Slug的文本..."
          rows={6}
        />
        <button className="convert-button" onClick={convertToSlug}>
          转换为URL Slug
        </button>
      </div>
      <div className="output-section">
        <h3>转换结果</h3>
        <textarea
          value={result}
          readOnly
          rows={2}
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

export default TextToUrlSlug;