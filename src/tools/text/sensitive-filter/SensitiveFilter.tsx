import React, { useState } from 'react';
import './SensitiveFilter.css';

const SensitiveFilter: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [customSensitiveWords, setCustomSensitiveWords] = useState('');
  const [replacement, setReplacement] = useState('*');

  // 默认敏感词列表（简化版）
  const defaultSensitiveWords = [
    '敏感词1', '敏感词2', '敏感词3', '不良信息', '违法内容', '色情', '暴力', '赌博'
  ];

  const filterSensitiveWords = () => {
    if (!text) {
      setResult('');
      return;
    }

    let filteredText = text;
    const sensitiveWords = [...defaultSensitiveWords];

    // 添加自定义敏感词
    if (customSensitiveWords) {
      const customWords = customSensitiveWords.split(',').map(word => word.trim()).filter(word => word);
      sensitiveWords.push(...customWords);
    }

    // 过滤敏感词
    sensitiveWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      const replacementStr = replacement.repeat(word.length);
      filteredText = filteredText.replace(regex, replacementStr);
    });

    setResult(filteredText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="sensitive-filter">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要过滤的文本..."
          rows={8}
        />
        <div className="settings">
          <div className="setting-item">
            <label>自定义敏感词（用逗号分隔）：</label>
            <input
              type="text"
              value={customSensitiveWords}
              onChange={(e) => setCustomSensitiveWords(e.target.value)}
              placeholder="例如：敏感词1,敏感词2"
            />
          </div>
          <div className="setting-item">
            <label>替换字符：</label>
            <input
              type="text"
              value={replacement}
              onChange={(e) => setReplacement(e.target.value.charAt(0))}
              maxLength={1}
            />
          </div>
        </div>
        <button className="filter-button" onClick={filterSensitiveWords}>
          过滤敏感词
        </button>
      </div>
      <div className="output-section">
        <h3>过滤结果</h3>
        <textarea
          value={result}
          readOnly
          rows={8}
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

export default SensitiveFilter;