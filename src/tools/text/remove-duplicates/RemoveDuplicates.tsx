import React, { useState } from 'react';

const RemoveDuplicates: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [option, setOption] = useState<string>('lines'); // lines, words, sentences

  const removeDuplicates = () => {
    if (!text) {
      setResult('');
      return;
    }

    let uniqueContent = '';

    switch (option) {
      case 'lines':
        const lines = text.split('\n');
        const uniqueLines = [...new Set(lines)];
        uniqueContent = uniqueLines.join('\n');
        break;
      case 'words':
        const words = text.split(/\s+/);
        const uniqueWords = [...new Set(words)];
        uniqueContent = uniqueWords.join(' ');
        break;
      case 'sentences':
        const sentences = text.split(/[.!?]+/).filter(s => s.trim());
        const uniqueSentences = [...new Set(sentences)];
        uniqueContent = uniqueSentences.join('. ');
        break;
      default:
        uniqueContent = text;
    }

    setResult(uniqueContent);
  };

  return (
    <div className="remove-duplicates">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入文本..."
          rows={10}
        />
      </div>
      
      <div className="options">
        <label>去重方式:</label>
        <select value={option} onChange={(e) => setOption(e.target.value)}>
          <option value="lines">按行去重</option>
          <option value="words">按单词去重</option>
          <option value="sentences">按句子去重</option>
        </select>
        <button onClick={removeDuplicates}>去重</button>
      </div>

      <div className="result-section">
        <h3>去重结果</h3>
        <textarea
          value={result}
          readOnly
          rows={10}
        />
      </div>

      <div className="actions">
        <button onClick={() => setText('')}>清空输入</button>
        <button onClick={() => navigator.clipboard.writeText(result)}>复制结果</button>
      </div>
    </div>
  );
};

export default RemoveDuplicates;
