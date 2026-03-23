import React, { useState, useRef } from 'react';
import './ImageToText.css';

const ImageToText: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setError('');
        
        // 预览图片
        const reader = new FileReader();
        reader.onload = (event) => {
          if (imageRef.current && event.target?.result) {
            imageRef.current.src = event.target.result as string;
          }
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setError('请选择图片文件');
        setFile(null);
      }
    }
  };

  const extractText = () => {
    if (!file) {
      setError('请选择图片文件');
      return;
    }

    setError('');
    setIsExtracting(true);

    // 模拟OCR过程
    setTimeout(() => {
      // 模拟提取的文本内容
      const mockExtractedText = `这是从图片中提取的文本内容。

OCR (Optical Character Recognition) 是一种将图片中的文字转换为可编辑文本的技术。

此工具模拟了从图片中提取文本的过程。
在实际应用中，需要使用专门的OCR库或API来实现真正的文本提取。`;

      setExtractedText(mockExtractedText);
      setIsExtracting(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    if (extractedText) {
      navigator.clipboard.writeText(extractedText);
    }
  };

  return (
    <div className="image-to-text">
      <h3>图片转文本</h3>

      <div className="input-section">
        <div className="form-group">
          <label>选择图片：</label>
          <input
            type="file"
            accept="image/*"
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

      {file && (
        <div className="preview-section">
          <h4>图片预览：</h4>
          <div className="image-container">
            <img
              ref={imageRef}
              alt="Image preview"
              className="preview-image"
            />
          </div>
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
          <li>点击"选择图片"按钮选择要转换的图片文件</li>
          <li>查看图片预览</li>
          <li>点击"提取文本"按钮开始OCR过程</li>
          <li>查看提取的文本内容</li>
          <li>点击"复制文本"按钮复制提取的文本</li>
          <li>注意：此工具使用模拟实现，实际应用中需要使用专门的OCR库或API</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageToText;