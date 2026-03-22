import React, { useState } from 'react';
import './ImageFormatConverter.css';

const ImageFormatConverter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>('png');
  const [convertedImage, setConvertedImage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setConvertedImage('');
      setError('');
    }
  };

  const handleConvert = () => {
    if (!selectedFile) {
      setError('请选择要转换的图片');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          let dataURL = '';
          switch (outputFormat) {
            case 'png':
              dataURL = canvas.toDataURL('image/png');
              break;
            case 'jpeg':
              dataURL = canvas.toDataURL('image/jpeg', 0.9);
              break;
            case 'webp':
              dataURL = canvas.toDataURL('image/webp', 0.9);
              break;
            default:
              dataURL = canvas.toDataURL('image/png');
          }
          setConvertedImage(dataURL);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDownload = () => {
    if (!convertedImage) return;
    const link = document.createElement('a');
    link.href = convertedImage;
    link.download = `converted.${outputFormat}`;
    link.click();
  };

  const handleClear = () => {
    setSelectedFile(null);
    setConvertedImage('');
    setError('');
  };

  return (
    <div className="image-format-converter">
      <div className="tool-section">
        <h3>选择图片</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {selectedFile && (
          <p className="file-name">已选择: {selectedFile.name}</p>
        )}
      </div>

      <div className="tool-controls">
        <div className="control-group">
          <label>输出格式：</label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WebP</option>
          </select>
        </div>
        <button onClick={handleConvert} className="btn-primary">
          转换格式
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {convertedImage && (
        <div className="tool-section">
          <h3>转换结果</h3>
          <div className="image-preview">
            <img src={convertedImage} alt="转换后的图片" />
          </div>
          <button onClick={handleDownload} className="btn-secondary">
            下载图片
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageFormatConverter;