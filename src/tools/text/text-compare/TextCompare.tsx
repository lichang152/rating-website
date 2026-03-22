import React, { useState } from 'react';

const TextCompare: React.FC = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffResult, setDiffResult] = useState<Array<{ text: string; type: 'added' | 'deleted' | 'unchanged' }>>([]);

  const compareText = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result: Array<{ text: string; type: 'added' | 'deleted' | 'unchanged' }> = [];

    const maxLength = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      if (line1 === line2) {
        result.push({ text: line1, type: 'unchanged' });
      } else if (!line1) {
        result.push({ text: line2, type: 'added' });
      } else if (!line2) {
        result.push({ text: line1, type: 'deleted' });
      } else {
        // 简单的行内差异比较
        result.push({ text: line1, type: 'deleted' });
        result.push({ text: line2, type: 'added' });
      }
    }

    setDiffResult(result);
  };

  return (
    <div className="text-compare">
      <div className="input-section">
        <div className="text-input-container">
          <h3>文本1</h3>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="请输入第一个文本..."
            rows={10}
          />
        </div>
        <div className="text-input-container">
          <h3>文本2</h3>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="请输入第二个文本..."
            rows={10}
          />
        </div>
      </div>

      <button 
        className="compare-button"
        onClick={compareText}
        disabled={!text1 || !text2}
      >
        对比文本
      </button>

      {diffResult.length > 0 && (
        <div className="result-section">
          <h3>对比结果</h3>
          <div className="diff-container">
            {diffResult.map((item, index) => (
              <div 
                key={index} 
                className={`diff-line diff-${item.type}`}
              >
                <span className="diff-marker">
                  {item.type === 'added' ? '+' : item.type === 'deleted' ? '-' : ' '}
                </span>
                <span className="diff-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextCompare;