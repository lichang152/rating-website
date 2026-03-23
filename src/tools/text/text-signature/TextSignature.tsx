import React, { useState } from 'react';
import './TextSignature.css';

const TextSignature: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [algorithm, setAlgorithm] = useState<string>('SHA-256');
  const [signature, setSignature] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // 支持的哈希算法
  const algorithms = [
    { value: 'SHA-1', name: 'SHA-1' },
    { value: 'SHA-256', name: 'SHA-256' },
    { value: 'SHA-384', name: 'SHA-384' },
    { value: 'SHA-512', name: 'SHA-512' }
  ];

  // 生成签名（哈希值）
  const generateSignature = async () => {
    if (!text) return;
    
    setIsGenerating(true);
    
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hash = await crypto.subtle.digest(algorithm, data);
      
      // 将ArrayBuffer转换为十六进制字符串
      const hexString = Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
      
      setSignature(hexString);
    } catch (error) {
      console.error('生成签名失败:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (signature) {
      navigator.clipboard.writeText(signature);
    }
  };

  return (
    <div className="text-signature">
      <h3>文本签名</h3>
      
      <div className="input-section">
        <div className="form-group">
          <label>哈希算法：</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            {algorithms.map(alg => (
              <option key={alg.value} value={alg.value}>
                {alg.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>文本：</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="请输入要签名的文本..."
            rows={6}
          />
        </div>
        
        <button 
          className="generate-button" 
          onClick={generateSignature}
          disabled={isGenerating || !text}
        >
          {isGenerating ? '生成中...' : '生成签名'}
        </button>
      </div>
      
      {signature && (
        <div className="output-section">
          <h4>签名结果：</h4>
          <div className="signature-display">
            {signature}
          </div>
          <button className="copy-button" onClick={copyToClipboard}>
            复制签名
          </button>
        </div>
      )}
      
      <div className="info-section">
        <h4>使用说明</h4>
        <ul>
          <li>选择哈希算法（推荐使用SHA-256或更高版本）</li>
          <li>输入要签名的文本</li>
          <li>点击"生成签名"按钮生成文本的哈希值</li>
          <li>复制签名结果用于验证文本的完整性</li>
          <li>注意：签名是单向的，无法从签名还原原始文本</li>
        </ul>
      </div>
    </div>
  );
};

export default TextSignature;