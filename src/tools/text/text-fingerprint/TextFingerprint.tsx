import React, { useState } from 'react';
import './TextFingerprint.css';

const TextFingerprint: React.FC = () => {
  const [text, setText] = useState('');
  const [algorithm, setAlgorithm] = useState('md5');
  const [result, setResult] = useState('');

  const calculateFingerprint = () => {
    if (!text) {
      setResult('');
      return;
    }

    let fingerprint = '';
    
    switch (algorithm) {
      case 'md5':
        fingerprint = md5(text);
        break;
      case 'sha1':
        fingerprint = sha1(text);
        break;
      case 'sha256':
        fingerprint = sha256(text);
        break;
      default:
        fingerprint = md5(text);
    }

    setResult(fingerprint);
  };

  const md5 = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  };

  const sha1 = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  };

  const sha256 = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="text-fingerprint">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要生成指纹的文本..."
          rows={6}
        />
        <div className="algorithm-selector">
          <label>算法：</label>
          <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
            <option value="md5">MD5</option>
            <option value="sha1">SHA1</option>
            <option value="sha256">SHA256</option>
          </select>
        </div>
        <button className="calculate-button" onClick={calculateFingerprint}>
          生成指纹
        </button>
      </div>
      <div className="output-section">
        <h3>指纹结果</h3>
        <textarea
          value={result}
          readOnly
          rows={2}
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

export default TextFingerprint;