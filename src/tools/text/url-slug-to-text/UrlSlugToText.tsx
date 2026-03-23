import React, { useState } from 'react';
import './UrlSlugToText.css';

const UrlSlugToText: React.FC = () => {
  const [slug, setSlug] = useState('');
  const [result, setResult] = useState('');

  const convertToText = () => {
    if (!slug) {
      setResult('');
      return;
    }

    let text = slug
      .replace(/-+/g, ' ')
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());

    setResult(text);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="url-slug-to-text">
      <div className="input-section">
        <textarea
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="请输入URL Slug..."
          rows={2}
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

export default UrlSlugToText;