import React, { useState } from 'react';

const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('');
  const [text, setText] = useState('');
  const [flags, setFlags] = useState('g');
  const [matches, setMatches] = useState<Array<{ text: string; index: number }>>([]);
  const [error, setError] = useState('');

  const testRegex = () => {
    try {
      setError('');
      const regex = new RegExp(pattern, flags);
      const foundMatches: Array<{ text: string; index: number }> = [];
      let match;

      if (flags.includes('g')) {
        while ((match = regex.exec(text)) !== null) {
          foundMatches.push({ text: match[0], index: match.index });
          // 防止无限循环
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        match = regex.exec(text);
        if (match) {
          foundMatches.push({ text: match[0], index: match.index });
        }
      }

      setMatches(foundMatches);
    } catch (err) {
      setError('正则表达式语法错误');
      setMatches([]);
    }
  };

  return (
    <div className="regex-tester">
      <div className="input-section">
        <div className="pattern-container">
          <h3>正则表达式</h3>
          <div className="pattern-input-group">
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="输入正则表达式..."
              className="pattern-input"
            />
            <div className="flags-container">
              <label>标志：</label>
              <input
                type="text"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                placeholder="g, i, m, s, u, y"
                className="flags-input"
              />
            </div>
          </div>
        </div>

        <div className="text-container">
          <h3>测试文本</h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入要测试的文本..."
            rows={8}
          />
        </div>
      </div>

      <button 
        className="test-button"
        onClick={testRegex}
        disabled={!pattern || !text}
      >
        测试正则表达式
      </button>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {matches.length > 0 && (
        <div className="result-section">
          <h3>匹配结果</h3>
          <div className="matches-list">
            {matches.map((match, index) => (
              <div key={index} className="match-item">
                <span className="match-text">"{match.text}"</span>
                <span className="match-index">位置: {match.index}</span>
              </div>
            ))}
            <div className="match-count">
              共找到 {matches.length} 个匹配
            </div>
          </div>
        </div>
      )}

      {matches.length === 0 && !error && text && pattern && (
        <div className="no-matches">
          没有找到匹配
        </div>
      )}
    </div>
  );
};

export default RegexTester;