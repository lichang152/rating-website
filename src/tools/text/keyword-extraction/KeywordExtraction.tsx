import React, { useState, useEffect } from 'react';
import './KeywordExtraction.css';

const KeywordExtraction: React.FC = () => {
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [topN, setTopN] = useState<number>(10);

  const extractKeywords = () => {
    if (!text) {
      setKeywords([]);
      return;
    }

    // 简单的关键词提取算法：基于词频
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordCount: Record<string, number> = {};

    words.forEach(word => {
      // 过滤停用词
      const stopWords = new Set(['的', '了', '和', '是', '在', '有', '我', '他', '她', '它', '你', '这', '那', '上', '下', '前', '后', '来', '去', '里', '外', '大', '小', '多', '少', 'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by']);
      if (!stopWords.has(word) && word.length > 1) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });

    // 按词频排序并取前N个
    const sortedKeywords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN)
      .map(([word]) => word);

    setKeywords(sortedKeywords);
  };

  useEffect(() => {
    extractKeywords();
  }, [text, topN]);

  const copyToClipboard = () => {
    const keywordsText = keywords.join(', ');
    navigator.clipboard.writeText(keywordsText);
  };

  return (
    <div className="keyword-extraction">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入文本，系统将自动提取关键词..."
          rows={10}
        />
        <div className="settings">
          <label>
            提取数量：
            <input
              type="number"
              min="1"
              max="50"
              value={topN}
              onChange={(e) => setTopN(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
      <div className="output-section">
        <h3>提取的关键词</h3>
        <div className="keywords-list">
          {keywords.map((keyword, index) => (
            <span key={index} className="keyword-tag">
              {keyword}
            </span>
          ))}
        </div>
        {keywords.length > 0 && (
          <button className="copy-button" onClick={copyToClipboard}>
            复制关键词
          </button>
        )}
      </div>
    </div>
  );
};

export default KeywordExtraction;