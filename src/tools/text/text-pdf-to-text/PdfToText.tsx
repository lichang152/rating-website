import React, { useState } from 'react';
import './PdfToText.css';

const PdfToText: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError('');
      } else {
        setError('请选择PDF文件');
        setFile(null);
      }
    }
  };

  const extractText = () => {
    if (!file) {
      setError('请选择PDF文件');
      return;
    }

    setError('');
    setIsExtracting(true);

    // 模拟PDF文本提取过程
    setTimeout(() => {
      // 模拟提取的文本内容
      const mockExtractedText = `PDF文件内容示例

这是从PDF文件中提取的文本内容。

PDF文件通常包含以下内容：
1. 文本
2. 图像
3. 表格
4. 图表

此工具模拟了从PDF文件中提取文本的过程。
在实际应用中，需要使用专门的PDF处理库来实现真正的文本提取。`;

      setExtractedText(mockExtractedText);
      setIsExtracting(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    if (extractedText) {
      navigator.clipboard.writeText(extractedText);
    }
  };

  return (
    <div className="pdf-to-text">
      <h3>PDF转文本</h3>

      <div className="input-section">
        <div className="form-group">
          <label>选择PDF文件：</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
          {file && (
            <div className="file-info">
              已选择：{file.name}
            </div>
          )}
        </div>

        <button
          className="extract-button"
          onClick={extractText}
          disabled={isExtracting || !file}
        >
          {isExtracting ? '提取中...' : '提取文本'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {extractedText && (
        <div className="output-section">
          <h4>提取的文本：</h4>
          <textarea
            value={extractedText}
            readOnly
            rows={10}
            placeholder="提取的文本将显示在这里..."
          />
          <button className="copy-button" onClick={copyToClipboard}>
            复制文本
          </button>
        </div>
      )}

      <div className="info-section">
        <h4>使用说明</h4>
        <ul>
          <li>点击"选择PDF文件"按钮选择要转换的PDF文件</li>
          <li>点击"提取文本"按钮开始提取文本</li>
          <li>查看提取的文本内容</li>
          <li>点击"复制文本"按钮复制提取的文本</li>
          <li>注意：此工具使用模拟实现，实际应用中需要使用专门的PDF处理库</li>
        </ul>
      </div>
    </div>
  );
};

export default PdfToText;