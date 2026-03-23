import React, { useState } from 'react';
import './TextRandom.css';

const TextRandom: React.FC = () => {
  const [length, setLength] = useState<number>(100);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [result, setResult] = useState('');

  const generateRandomText = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+[]{}|;:,.<>?';

    if (charset === '') {
      setResult('请至少选择一种字符类型');
      return;
    }

    let randomText = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomText += charset[randomIndex];
    }

    setResult(randomText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="text-random">
      <div className="input-section">
        <div className="settings">
          <div className="setting-item">
            <label>文本长度：</label>
            <input
              type="number"
              min="1"
              max="1000"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <div className="character-types">
            <h4>字符类型：</h4>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
                大写字母
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                />
                小写字母
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                数字
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                符号
              </label>
            </div>
          </div>
        </div>
        <button className="generate-button" onClick={generateRandomText}>
          生成随机文本
        </button>
      </div>
      <div className="output-section">
        <h3>生成结果</h3>
        <textarea
          value={result}
          readOnly
          rows={6}
        />
        {result && (
          <button className="copy-button" onClick={copyToClipboard}>
            复制结果
          </button>
        )}
      </div>
    </div>
  );
};

export default TextRandom;