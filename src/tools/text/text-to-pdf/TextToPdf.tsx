import React, { useState } from 'react';
import './TextToPdf.css';

const TextToPdf: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('document');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const generatePdf = () => {
    if (!text) {
      setError('请输入要转换的文本');
      return;
    }

    setError('');
    setIsGenerating(true);

    // 模拟PDF生成过程
    setTimeout(() => {
      // 创建一个包含文本的Blob对象
      const blob = new Blob([text], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      // 创建下载链接
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 释放URL对象
      URL.revokeObjectURL(url);
      
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="text-to-pdf">
      <h3>文本转PDF</h3>

      <div className="input-section">
        <div className="form-group">
          <label>文件名：</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="请输入文件名"
          />
        </div>

        <div className="form-group">
          <label>文本内容：</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="请输入要转换为PDF的文本..."
            rows={8}
          />
        </div>

        <button
          className="generate-button"
          onClick={generatePdf}
          disabled={isGenerating || !text}
        >
          {isGenerating ? '生成中...' : '生成PDF'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="info-section">
        <h4>使用说明</h4>
        <ul>
          <li>输入要转换为PDF的文本</li>
          <li>输入文件名（可选）</li>
          <li>点击"生成PDF"按钮</li>
          <li>浏览器将下载生成的PDF文件</li>
          <li>注意：此工具使用模拟实现，实际生成的PDF可能只是包含文本的文件</li>
        </ul>
      </div>
    </div>
  );
};

export default TextToPdf;