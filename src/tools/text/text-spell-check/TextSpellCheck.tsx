import React, { useState } from 'react';
import './TextSpellCheck.css';

interface Misspelling {
  word: string;
  suggestions: string[];
  index: number;
}

const TextSpellCheck: React.FC = () => {
  const [text, setText] = useState('');
  const [misspellings, setMisspellings] = useState<Misspelling[]>([]);

  // 简单的词典，包含一些常见词
  const dictionary = new Set([
    '你好', '世界', '中国', '北京', '上海', '广州', '深圳', '技术', '科技', '互联网',
    '人工智能', '计算机', '编程', '软件', '硬件', '网络', '系统', '数据', '信息', '安全',
    '学习', '教育', '学校', '学生', '老师', '课程', '考试', '知识', '书籍', '阅读',
    '电影', '音乐', '游戏', '明星', '娱乐', '综艺', '电视剧', '动漫', '体育', '足球',
    '篮球', '运动', '比赛', '运动员', '健身', '财经', '经济', '股票', '金融', '投资'
  ]);

  const checkSpelling = () => {
    if (!text) {
      setMisspellings([]);
      return;
    }

    const foundMisspellings: Misspelling[] = [];
    
    // 简单的分词和拼写检查
    const words = text.split(/\s+/);
    
    words.forEach((word, index) => {
      // 移除标点符号
      const cleanWord = word.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');
      
      if (cleanWord.length > 0 && !dictionary.has(cleanWord)) {
        // 生成简单的建议（这里只是示例，实际应该使用更复杂的算法）
        const suggestions = Array.from(dictionary).filter(dictWord => 
          dictWord.includes(cleanWord.substring(0, 2)) || 
          cleanWord.includes(dictWord.substring(0, 2))
        ).slice(0, 3);
        
        foundMisspellings.push({
          word: cleanWord,
          suggestions,
          index
        });
      }
    });

    setMisspellings(foundMisspellings);
  };

  return (
    <div className="text-spell-check">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要检查错别字的文本..."
          rows={6}
        />
        <button className="check-button" onClick={checkSpelling}>
          检查错别字
        </button>
      </div>
      <div className="output-section">
        <h3>错别字检查结果</h3>
        {misspellings.length > 0 ? (
          <div className="misspellings-list">
            {misspellings.map((misspelling, idx) => (
              <div key={idx} className="misspelling-item">
                <span className="misspelled-word">{misspelling.word}</span>
                {misspelling.suggestions.length > 0 ? (
                  <div className="suggestions">
                    <span>建议：</span>
                    {misspelling.suggestions.map((suggestion, sidx) => (
                      <span key={sidx} className="suggestion">
                        {suggestion}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="no-suggestions">无建议</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>未发现错别字</p>
        )}
      </div>
    </div>
  );
};

export default TextSpellCheck;