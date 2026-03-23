import React, { useState } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [strength, setStrength] = useState<string>('');

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allowedChars = '';
    if (includeUppercase) allowedChars += uppercaseChars;
    if (includeLowercase) allowedChars += lowercaseChars;
    if (includeNumbers) allowedChars += numberChars;
    if (includeSymbols) allowedChars += symbolChars;

    if (allowedChars.length === 0) {
      setPassword('请至少选择一种字符类型');
      setStrength('');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      generatedPassword += allowedChars[randomIndex];
    }

    setPassword(generatedPassword);
    calculateStrength(generatedPassword);
  };

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[!@#$%^&*()_+[]{}|;:,.<>?]/.test(pass)) score += 1;

    if (score <= 2) {
      setStrength('弱');
    } else if (score <= 4) {
      setStrength('中等');
    } else {
      setStrength('强');
    }
  };

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      alert('密码已复制到剪贴板');
    }
  };

  const handleClear = () => {
    setPassword('');
    setStrength('');
  };

  return (
    <div className="password-generator">
      <div className="tool-section">
        <h3>密码长度</h3>
        <div className="length-control">
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <span className="length-value">{length}</span>
        </div>
      </div>

      <div className="tool-section">
        <h3>字符类型</h3>
        <div className="checkbox-group">
          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            <span>大写字母 (A-Z)</span>
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            <span>小写字母 (a-z)</span>
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            <span>数字 (0-9)</span>
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            <span>特殊符号 (!@#$%^&*)</span>
          </label>
        </div>
      </div>

      <div className="tool-controls">
        <button onClick={generatePassword} className="btn-primary">
          生成密码
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      {password && (
        <div className="result-section">
          <h3>生成的密码</h3>
          <div className="password-container">
            <input
              type="text"
              value={password}
              readOnly
              className="password-input"
            />
            <button onClick={handleCopy} className="copy-button">
              复制
            </button>
          </div>
          {strength && (
            <div className="strength-section">
              <span>密码强度：</span>
              <span className={`strength-indicator strength-${strength}`}>{strength}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;