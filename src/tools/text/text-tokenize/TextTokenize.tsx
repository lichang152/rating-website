import React, { useState } from 'react';
import './TextTokenize.css';

const TextTokenize: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const tokenizeText = () => {
    if (!text) {
      setResult([]);
      return;
    }

    // 简单的分词实现，支持中英文
    let tokens: string[] = [];
    
    // 处理中文
    const chineseRegex = /[\u4e00-\u9fa5]+/g;
    const chineseMatches = text.match(chineseRegex);
    if (chineseMatches) {
      chineseMatches.forEach(match => {
        // 中文字符逐个分词
        for (let i = 0; i < match.length; i++) {
          tokens.push(match[i]);
        }
      });
    }

    // 处理英文和数字
    const englishRegex = /[a-zA-Z0-9]+/g;
    const englishMatches = text.match(englishRegex);
    if (englishMatches) {
      tokens = tokens.concat(englishMatches);
    }

    setResult(tokens);
  };

  const copyToClipboard = () => {
    const tokensText = result.join(' ');
    navigator.clipboard.writeText(tokensText);
  };

  return (
    <div className="text-tokenize">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要分词的文本..."
          rows={6}
        />
        <button className="tokenize-button" onClick={tokenizeText}>
          分词
        </button>
      </div>
      <div className="output-section">
        <h3>分词结果</h3>
        <div className="tokens-container">
          {result.map((token, index) => (
            <span key={index} className="token">
              {token}
            </span>
          ))}
        </div>
        <textarea
          value={result.join(' ')}
          readOnly
          rows={4}
        />
        {result.length > 0 && (
          <button className="copy-button" onClick={copyToClipboard}>
            复制结果
          </button>
        )}
      </div>
    </div>
  );
};

export default TextTokenize;