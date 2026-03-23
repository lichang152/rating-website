import React, { useState, useEffect } from 'react';
import './TextSimilarity.css';

const TextSimilarity: React.FC = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [similarity, setSimilarity] = useState<number>(0);

  // 计算文本相似度（使用简单的余弦相似度算法）
  const calculateSimilarity = () => {
    if (!text1 || !text2) {
      setSimilarity(0);
      return;
    }

    // 分词
    const words1 = text1.toLowerCase().match(/\b\w+\b/g) || [];
    const words2 = text2.toLowerCase().match(/\b\w+\b/g) || [];

    // 构建词袋
    const wordSet = new Set([...words1, ...words2]);
    const wordMap = new Map<string, number>();
    Array.from(wordSet).forEach((word, index) => wordMap.set(word, index));

    // 构建词频向量
    const vector1 = Array(wordSet.size).fill(0);
    const vector2 = Array(wordSet.size).fill(0);

    words1.forEach(word => {
      const index = wordMap.get(word);
      if (index !== undefined) {
        vector1[index]++;
      }
    });

    words2.forEach(word => {
      const index = wordMap.get(word);
      if (index !== undefined) {
        vector2[index]++;
      }
    });

    // 计算余弦相似度
    const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
    const norm1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
    const norm2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));

    if (norm1 === 0 || norm2 === 0) {
      setSimilarity(0);
      return;
    }

    const similarityScore = dotProduct / (norm1 * norm2);
    setSimilarity(parseFloat((similarityScore * 100).toFixed(2)));
  };

  useEffect(() => {
    calculateSimilarity();
  }, [text1, text2]);

  return (
    <div className="text-similarity">
      <div className="input-section">
        <div className="text-input">
          <h3>文本 1</h3>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="请输入第一个文本..."
            rows={8}
          />
        </div>
        <div className="text-input">
          <h3>文本 2</h3>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="请输入第二个文本..."
            rows={8}
          />
        </div>
      </div>
      <div className="output-section">
        <h3>相似度</h3>
        <div className="similarity-result">
          <div className="similarity-score">{similarity}%</div>
          <div className="similarity-bar">
            <div 
              className="similarity-fill" 
              style={{ width: `${similarity}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSimilarity;