import React, { useState } from 'react';
import './TextEncrypt.css';

const TextEncrypt: React.FC = () => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  // 简单的文本加密/解密算法
  const encrypt = (text: string, password: string) => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const passwordCharCode = password.charCodeAt(i % password.length);
      const encryptedCharCode = charCode ^ passwordCharCode;
      result += String.fromCharCode(encryptedCharCode);
    }
    // 转为Base64以便显示
    return btoa(unescape(encodeURIComponent(result)));
  };

  const decrypt = (text: string, password: string) => {
    try {
      // 从Base64解码
      const decodedText = decodeURIComponent(escape(atob(text)));
      let result = '';
      for (let i = 0; i < decodedText.length; i++) {
        const charCode = decodedText.charCodeAt(i);
        const passwordCharCode = password.charCodeAt(i % password.length);
        const decryptedCharCode = charCode ^ passwordCharCode;
        result += String.fromCharCode(decryptedCharCode);
      }
      return result;
    } catch (error) {
      return '解密失败，请检查密码是否正确';
    }
  };

  const handleProcess = () => {
    if (!text || !password) {
      setResult('请输入文本和密码');
      return;
    }

    if (mode === 'encrypt') {
      setResult(encrypt(text, password));
    } else {
      setResult(decrypt(text, password));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="text-encrypt">
      <div className="input-section">
        <div className="mode-selector">
          <button
            className={`mode-button ${mode === 'encrypt' ? 'active' : ''}`}
            onClick={() => setMode('encrypt')}
          >
            加密
          </button>
          <button
            className={`mode-button ${mode === 'decrypt' ? 'active' : ''}`}
            onClick={() => setMode('decrypt')}
          >
            解密
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={mode === 'encrypt' ? '请输入要加密的文本...' : '请输入要解密的文本...'}
          rows={8}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="请输入密码"
        />
        <button className="process-button" onClick={handleProcess}>
          {mode === 'encrypt' ? '加密' : '解密'}
        </button>
      </div>
      <div className="output-section">
        <h3>{mode === 'encrypt' ? '加密结果' : '解密结果'}</h3>
        <textarea
          value={result}
          readOnly
          rows={8}
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

export default TextEncrypt;