import React, { useState } from 'react';
import './TextWordFrequency.css';

interface WordFrequency {
  word: string;
  count: number;
}

const TextWordFrequency: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<WordFrequency[]>([]);

  const calculateWordFrequency = () => {
    if (!text) {
      setResult([]);
      return;
    }

    const wordCounts: Record<string, number> = {};
    
    // 简单的分词和计数
    const words = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 0);

    words.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    // 转换为数组并排序
    const frequencyArray: WordFrequency[] = Object.entries(wordCounts)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count);

    setResult(frequencyArray);
  };

  return (
    <div className="text-word-frequency">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要统计词频的文本..."
          rows={6}
        />
        <button className="calculate-button" onClick={calculateWordFrequency}>
          统计词频
        </button>
      </div>
      <div className="output-section">
        <h3>词频统计结果</h3>
        {result.length > 0 ? (
          <table className="frequency-table">
            <thead>
              <tr>
                <th>词语</th>
                <th>频率</th>
              </tr>
            </thead>
            <tbody>
              {result.map((item, index) => (
                <tr key={index}>
                  <td>{item.word}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>请输入文本进行词频统计</p>
        )}
      </div>
    </div>
  );
};

export default TextWordFrequency;