import React, { useState } from 'react';
import './TextSentiment.css';

const TextSentiment: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  // 情感词典
  const positiveWords = ['好', '优秀', '棒', '喜欢', '满意', '开心', '快乐', '高兴', '兴奋', '激动', '美丽', '精彩', '成功', '完美', '赞', '支持', '推荐', '期待', '惊喜', '舒适'];
  const negativeWords = ['差', '糟糕', '坏', '讨厌', '不满意', '伤心', '难过', '生气', '愤怒', '失望', '痛苦', '无聊', '失败', '丑陋', '烂', '反对', '不推荐', '担忧', '惊吓', '难受'];

  const analyzeSentiment = () => {
    if (!text) {
      setResult('');
      setScore(0);
      return;
    }

    let sentimentScore = 0;
    let positiveCount = 0;
    let negativeCount = 0;

    // 计算情感得分
    positiveWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      const matches = text.match(regex);
      if (matches) {
        positiveCount += matches.length;
        sentimentScore += matches.length;
      }
    });

    negativeWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      const matches = text.match(regex);
      if (matches) {
        negativeCount += matches.length;
        sentimentScore -= matches.length;
      }
    });

    setScore(sentimentScore);

    // 确定情感倾向
    if (sentimentScore > 0) {
      setResult(`情感分析结果：积极（得分：${sentimentScore}）`);
    } else if (sentimentScore < 0) {
      setResult(`情感分析结果：消极（得分：${sentimentScore}）`);
    } else {
      setResult('情感分析结果：中性');
    }
  };

  return (
    <div className="text-sentiment">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要分析情感的文本..."
          rows={6}
        />
        <button className="analyze-button" onClick={analyzeSentiment}>
          分析情感
        </button>
      </div>
      <div className="output-section">
        <h3>情感分析结果</h3>
        {result ? (
          <div className="result">
            <p>{result}</p>
            <div className="sentiment-bar">
              <div 
                className={`sentiment-indicator ${score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral'}`}
                style={{ width: `${Math.abs(score) * 10 + 50}%` }}
              />
            </div>
          </div>
        ) : (
          <p>请输入文本进行情感分析</p>
        )}
      </div>
    </div>
  );
};

export default TextSentiment;