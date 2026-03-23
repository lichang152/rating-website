import React, { useState } from 'react';
import './TextSummary.css';

const TextSummary: React.FC = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [sentenceCount, setSentenceCount] = useState<number>(3);

  const generateSummary = () => {
    if (!text) {
      setSummary('');
      return;
    }

    // 简单的文本摘要算法：基于句子重要性排序
    const sentences = text.split(/[。！？.!?]/).filter(s => s.trim().length > 0);
    
    if (sentences.length <= sentenceCount) {
      setSummary(text);
      return;
    }

    // 计算每个句子的重要性分数（基于词频）
    const wordCount: Record<string, number> = {};
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // 计算每个句子的分数
    const sentenceScores = sentences.map((sentence, index) => {
      const sentenceWords = sentence.toLowerCase().match(/\b\w+\b/g) || [];
      const score = sentenceWords.reduce((sum, word) => sum + (wordCount[word] || 0), 0);
      return { index, score, sentence };
    });

    // 按分数排序并取前N个句子
    const topSentences = sentenceScores
      .sort((a, b) => b.score - a.score)
      .slice(0, sentenceCount)
      .sort((a, b) => a.index - b.index)
      .map(item => item.sentence);

    setSummary(topSentences.join('。') + '。');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
  };

  return (
    <div className="text-summary">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要生成摘要的文本..."
          rows={10}
        />
        <div className="settings">
          <label>
            摘要句子数：
            <input
              type="number"
              min="1"
              max="10"
              value={sentenceCount}
              onChange={(e) => setSentenceCount(Number(e.target.value))}
            />
          </label>
        </div>
        <button className="generate-button" onClick={generateSummary}>
          生成摘要
        </button>
      </div>
      <div className="output-section">
        <h3>摘要结果</h3>
        <textarea
          value={summary}
          readOnly
          rows={6}
        />
        {summary && (
          <button className="copy-button" onClick={copyToClipboard}>
            复制结果
          </button>
        )}
      </div>
    </div>
  );
};

export default TextSummary;