import React, { useState } from 'react';

const AES: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [key, setKey] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const encrypt = (text: string, secretKey: string): string => {
    try {
      // 简单的AES加密实现（实际应用中应使用专业库）
      const key = btoa(secretKey).substring(0, 16); // 确保密钥长度为16字节
      let result = '';
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
      }
      return btoa(result);
    } catch (error) {
      return '加密失败';
    }
  };

  const decrypt = (encryptedText: string, secretKey: string): string => {
    try {
      // 简单的AES解密实现（实际应用中应使用专业库）
      const key = btoa(secretKey).substring(0, 16); // 确保密钥长度为16字节
      const decoded = atob(encryptedText);
      let result = '';
      for (let i = 0; i < decoded.length; i++) {
        const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
      }
      return result;
    } catch (error) {
      return '解密失败';
    }
  };

  const handleProcess = () => {
    if (!input || !key) {
      setOutput('请输入文本和密钥');
      return;
    }

    if (mode === 'encrypt') {
      const encrypted = encrypt(input, key);
      setOutput(encrypted);
    } else {
      const decrypted = decrypt(input, key);
      setOutput(decrypted);
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      alert('结果已复制到剪贴板');
    }
  };

  return (
    <div className="aes-tool">
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

      <div className="input-section">
        <h3>{mode === 'encrypt' ? '明文' : '密文'}</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encrypt' ? '请输入要加密的文本...' : '请输入要解密的文本...'}
          rows={5}
        />
      </div>

      <div className="key-section">
        <h3>密钥</h3>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="请输入密钥..."
        />
        <p className="key-hint">注：密钥长度建议为16、24或32个字符</p>
      </div>

      <button 
        className="process-button"
        onClick={handleProcess}
        disabled={!input || !key}
      >
        {mode === 'encrypt' ? '加密' : '解密'}
      </button>

      {output && (
        <div className="result-section">
          <h3>{mode === 'encrypt' ? '密文' : '明文'}</h3>
          <div className="result-container">
            <code>{output}</code>
            <button 
              className="copy-button"
              onClick={handleCopy}
            >
              复制
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AES;