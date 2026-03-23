import React, { useState } from 'react';
import './TextClassification.css';

interface Category {
  name: string;
  keywords: string[];
}

const TextClassification: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string>('');

  // 预定义分类和关键词
  const categories: Category[] = [
    {
      name: '科技',
      keywords: ['技术', '科技', '互联网', '人工智能', '计算机', '编程', '软件', '硬件', '网络']
    },
    {
      name: '娱乐',
      keywords: ['电影', '音乐', '游戏', '明星', '娱乐', '综艺', '电视剧', '动漫']
    },
    {
      name: '体育',
      keywords: ['体育', '足球', '篮球', '运动', '比赛', '运动员', '健身']
    },
    {
      name: '财经',
      keywords: ['财经', '经济', '股票', '金融', '投资', '市场', '商业', '公司']
    },
    {
      name: '教育',
      keywords: ['教育', '学习', '学校', '学生', '老师', '课程', '考试', '知识']
    }
  ];

  const classifyText = () => {
    if (!text) {
      setResult('');
      return;
    }

    const scores: { category: string; score: number }[] = [];

    // 计算每个分类的得分
    categories.forEach(category => {
      let score = 0;
      category.keywords.forEach(keyword => {
        if (text.toLowerCase().includes(keyword.toLowerCase())) {
          score++;
        }
      });
      scores.push({ category: category.name, score });
    });

    // 排序并获取得分最高的分类
    scores.sort((a, b) => b.score - a.score);
    
    if (scores[0].score > 0) {
      setResult(`文本分类结果：${scores[0].category}（得分：${scores[0].score}）`);
    } else {
      setResult('无法确定文本分类');
    }
  };

  return (
    <div className="text-classification">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要分类的文本..."
          rows={6}
        />
        <button className="classify-button" onClick={classifyText}>
          分类文本
        </button>
      </div>
      <div className="output-section">
        <h3>分类结果</h3>
        {result ? (
          <div className="result">{result}</div>
        ) : (
          <p>请输入文本进行分类</p>
        )}
      </div>
    </div>
  );
};

export default TextClassification;