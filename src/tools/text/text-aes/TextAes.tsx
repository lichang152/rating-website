import React, { useState } from 'react';
import './TextAes.css';

const TextAes: React.FC = () => {
  const [plaintext, setPlaintext] = useState<string>('');
  const [ciphertext, setCiphertext] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [operation, setOperation] = useState<string>('encrypt'); // 'encrypt' or 'decrypt'
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // 生成密钥
  const generateKey = async (password: string): Promise<CryptoKey> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return crypto.subtle.importKey(
      'raw',
      hash,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );
  };

  // 加密函数
  const encrypt = async (text: string, password: string): Promise<string> => {
    const key = await generateKey(password);
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 12 bytes IV for AES-GCM
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      data
    );
    
    // 将IV和密文组合并转换为Base64
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encrypted), iv.length);
    
    return btoa(String.fromCharCode(...combined));
  };

  // 解密函数
  const decrypt = async (encryptedText: string, password: string): Promise<string> => {
    const key = await generateKey(password);
    const combined = new Uint8Array([...atob(encryptedText)].map(c => c.charCodeAt(0)));
    const iv = combined.slice(0, 12);
    const data = combined.slice(12);
    
    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      data
    );
    
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  };

  const handleProcess = async () => {
    if (!key) {
      setError('请输入密钥');
      return;
    }
    
    if (operation === 'encrypt' && !plaintext) {
      setError('请输入要加密的文本');
      return;
    }
    
    if (operation === 'decrypt' && !ciphertext) {
      setError('请输入要解密的文本');
      return;
    }
    
    setError('');
    setIsProcessing(true);
    
    try {
      if (operation === 'encrypt') {
        const result = await encrypt(plaintext, key);
        setCiphertext(result);
      } else {
        const result = await decrypt(ciphertext, key);
        setPlaintext(result);
      }
    } catch (err) {
      setError('操作失败：' + (err instanceof Error ? err.message : '未知错误'));
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="text-aes">
      <h3>AES加密解密</h3>
      
      <div className="operation-selector">
        <label>
          <input
            type="radio"
            value="encrypt"
            checked={operation === 'encrypt'}
            onChange={() => setOperation('encrypt')}
          />
          加密
        </label>
        <label>
          <input
            type="radio"
            value="decrypt"
            checked={operation === 'decrypt'}
            onChange={() => setOperation('decrypt')}
          />
          解密
        </label>
      </div>
      
      <div className="input-section">
        <div className="form-group">
          <label>密钥：</label>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="请输入密钥"
          />
        </div>
        
        {operation === 'encrypt' ? (
          <div className="form-group">
            <label>明文：</label>
            <textarea
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              placeholder="请输入要加密的文本..."
              rows={4}
            />
          </div>
        ) : (
          <div className="form-group">
            <label>密文：</label>
            <textarea
              value={ciphertext}
              onChange={(e) => setCiphertext(e.target.value)}
              placeholder="请输入要解密的文本..."
              rows={4}
            />
          </div>
        )}
        
        <button 
          className="process-button" 
          onClick={handleProcess}
          disabled={isProcessing}
        >
          {isProcessing ? '处理中...' : operation === 'encrypt' ? '加密' : '解密'}
        </button>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="output-section">
        <h4>结果：</h4>
        {operation === 'encrypt' ? (
          <div>
            <textarea
              value={ciphertext}
              readOnly
              rows={4}
              placeholder="加密结果将显示在这里..."
            />
            {ciphertext && (
              <button 
                className="copy-button" 
                onClick={() => copyToClipboard(ciphertext)}
              >
                复制密文
              </button>
            )}
          </div>
        ) : (
          <div>
            <textarea
              value={plaintext}
              readOnly
              rows={4}
              placeholder="解密结果将显示在这里..."
            />
            {plaintext && (
              <button 
                className="copy-button" 
                onClick={() => copyToClipboard(plaintext)}
              >
                复制明文
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="info-section">
        <h4>使用说明</h4>
        <ul>
          <li>选择操作类型：加密或解密</li>
          <li>输入密钥（用于加密和解密）</li>
          <li>根据操作类型输入明文或密文</li>
          <li>点击相应按钮进行加密或解密</li>
          <li>复制结果到剪贴板</li>
          <li>注意：密钥必须保密，丢失密钥将无法解密数据</li>
        </ul>
      </div>
    </div>
  );
};

export default TextAes;