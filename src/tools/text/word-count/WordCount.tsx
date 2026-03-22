import React, { useState, useEffect } from 'react';

const WordCount: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    lines: 0,
    paragraphs: 0
  });

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n').length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;

    setStats({
      characters,
      charactersNoSpaces,
      words,
      lines,
      paragraphs
    });
  }, [text]);

  return (
    <div className="word-count">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入文本..."
          rows={10}
        />
      </div>
      <div className="stats-section">
        <h3>统计结果</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">字符数（含空格）:</span>
            <span className="stat-value">{stats.characters}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">字符数（不含空格）:</span>
            <span className="stat-value">{stats.charactersNoSpaces}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">单词数:</span>
            <span className="stat-value">{stats.words}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">行数:</span>
            <span className="stat-value">{stats.lines}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">段落数:</span>
            <span className="stat-value">{stats.paragraphs}</span>
          </div>
        </div>
      </div>
      <div className="actions">
        <button onClick={() => setText('')}>清空</button>
        <button onClick={() => navigator.clipboard.writeText(text)}>复制文本</button>
      </div>
    </div>
  );
};

export default WordCount;
