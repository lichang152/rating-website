import React, { useState, useEffect } from 'react';
import './TextCharacterCount.css';

const TextCharacterCount: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    lines: 0,
    paragraphs: 0,
    sentences: 0
  });

  useEffect(() => {
    calculateStats();
  }, [inputText]);

  const calculateStats = () => {
    if (!inputText) {
      setStats({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        lines: 0,
        paragraphs: 0,
        sentences: 0
      });
      return;
    }

    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const lines = inputText.split('\n').length;
    const paragraphs = inputText.split(/\n\s*\n/).filter(p => p.trim()).length;
    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim()).length;

    setStats({
      characters,
      charactersNoSpaces,
      words,
      lines,
      paragraphs,
      sentences
    });
  };

  const handleClear = () => {
    setInputText('');
  };

  return (
    <div className="text-character-count">
      <div className="tool-section">
        <h3>输入文本</h3>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="请输入要统计的文本"
          rows={8}
        />
      </div>

      <div className="tool-controls">
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      <div className="stats-section">
        <h3>统计结果</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">字符数（含空格）：</span>
            <span className="stat-value">{stats.characters}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">字符数（不含空格）：</span>
            <span className="stat-value">{stats.charactersNoSpaces}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">单词数：</span>
            <span className="stat-value">{stats.words}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">行数：</span>
            <span className="stat-value">{stats.lines}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">段落数：</span>
            <span className="stat-value">{stats.paragraphs}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">句子数：</span>
            <span className="stat-value">{stats.sentences}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextCharacterCount;