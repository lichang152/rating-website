import React, { useState } from 'react';
import './ImageWatermark.css';

const ImageWatermark: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState<string>('Watermark');
  const [fontSize, setFontSize] = useState<number>(24);
  const [opacity, setOpacity] = useState<number>(0.5);
  const [position, setPosition] = useState<string>('bottom-right');
  const [watermarkedImage, setWatermarkedImage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setWatermarkedImage('');
      setError('');
    }
  };

  const handleAddWatermark = () => {
    if (!selectedFile) {
      setError('请选择要添加水印的图片');
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
          // 绘制原始图片
          ctx.drawImage(img, 0, 0);

          // 设置水印样式
          ctx.font = `${fontSize}px Arial`;
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // 计算水印位置
          let x = 0;
          let y = 0;
          const padding = 20;

          switch (position) {
            case 'top-left':
              ctx.textAlign = 'left';
              ctx.textBaseline = 'top';
              x = padding;
              y = padding;
              break;
            case 'top-right':
              ctx.textAlign = 'right';
              ctx.textBaseline = 'top';
              x = img.width - padding;
              y = padding;
              break;
            case 'bottom-left':
              ctx.textAlign = 'left';
              ctx.textBaseline = 'bottom';
              x = padding;
              y = img.height - padding;
              break;
            case 'bottom-right':
              ctx.textAlign = 'right';
              ctx.textBaseline = 'bottom';
              x = img.width - padding;
              y = img.height - padding;
              break;
            case 'center':
              x = img.width / 2;
              y = img.height / 2;
              break;
          }

          // 绘制水印
          ctx.fillText(watermarkText, x, y);

          // 生成带水印的图片
          const dataURL = canvas.toDataURL('image/png');
          setWatermarkedImage(dataURL);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDownload = () => {
    if (!watermarkedImage) return;
    const link = document.createElement('a');
    link.href = watermarkedImage;
    link.download = 'watermarked.png';
    link.click();
  };

  const handleClear = () => {
    setSelectedFile(null);
    setWatermarkText('Watermark');
    setFontSize(24);
    setOpacity(0.5);
    setPosition('bottom-right');
    setWatermarkedImage('');
    setError('');
  };

  return (
    <div className="image-watermark">
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

      <div className="tool-section">
        <h3>水印设置</h3>
        <div className="settings-grid">
          <div className="setting-item">
            <label>水印文本：</label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
            />
          </div>
          <div className="setting-item">
            <label>字体大小：</label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              min="8"
              max="100"
            />
          </div>
          <div className="setting-item">
            <label>透明度：</label>
            <input
              type="range"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              min="0"
              max="1"
              step="0.1"
            />
            <span>{opacity.toFixed(1)}</span>
          </div>
          <div className="setting-item">
            <label>位置：</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="top-left">左上角</option>
              <option value="top-right">右上角</option>
              <option value="bottom-left">左下角</option>
              <option value="bottom-right">右下角</option>
              <option value="center">中心</option>
            </select>
          </div>
        </div>
      </div>

      <div className="tool-controls">
        <button onClick={handleAddWatermark} className="btn-primary">
          添加水印
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

      {watermarkedImage && (
        <div className="tool-section">
          <h3>结果</h3>
          <div className="image-preview">
            <img src={watermarkedImage} alt="带水印的图片" />
          </div>
          <button onClick={handleDownload} className="btn-secondary">
            下载图片
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageWatermark;