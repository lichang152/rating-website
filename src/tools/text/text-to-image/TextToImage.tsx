import React, { useState, useRef, useEffect } from 'react';
import './TextToImage.css';

const TextToImage: React.FC = () => {
  const [text, setText] = useState<string>('Hello, World!');
  const [fontSize, setFontSize] = useState<number>(24);
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [textColor, setTextColor] = useState<string>('#000000');
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [imageWidth, setImageWidth] = useState<number>(400);
  const [imageHeight, setImageHeight] = useState<number>(200);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const generateImage = () => {
    if (!text) {
      setError('请输入要转换的文本');
      return;
    }

    setError('');
    setIsGenerating(true);

    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 设置画布尺寸
      canvas.width = imageWidth;
      canvas.height = imageHeight;

      // 绘制背景
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, imageWidth, imageHeight);

      // 设置文本样式
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 绘制文本（支持换行）
      const lines = text.split('\n');
      const lineHeight = fontSize * 1.5;
      const startY = imageHeight / 2 - (lines.length - 1) * lineHeight / 2;

      lines.forEach((line, index) => {
        const y = startY + index * lineHeight;
        ctx.fillText(line, imageWidth / 2, y);
      });

      // 转换为图片
      const dataURL = canvas.toDataURL('image/png');
      if (imageRef.current) {
        imageRef.current.src = dataURL;
      }

      setIsGenerating(false);
    }, 500);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'text-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 当参数变化时重新生成图片
  useEffect(() => {
    generateImage();
  }, [text, fontSize, fontFamily, textColor, backgroundColor, imageWidth, imageHeight]);

  return (
    <div className="text-to-image">
      <h3>文本转图片</h3>

      <div className="input-section">
        <div className="form-group">
          <label>文本内容：</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="请输入要转换为图片的文本..."
            rows={4}
          />
        </div>

        <div className="controls-grid">
          <div className="form-group">
            <label>字体大小：</label>
            <input
              type="number"
              min="8"
              max="120"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value) || 24)}
            />
          </div>

          <div className="form-group">
            <label>字体：</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>

          <div className="form-group">
            <label>文本颜色：</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>背景颜色：</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>图片宽度：</label>
            <input
              type="number"
              min="100"
              max="1200"
              value={imageWidth}
              onChange={(e) => setImageWidth(parseInt(e.target.value) || 400)}
            />
          </div>

          <div className="form-group">
            <label>图片高度：</label>
            <input
              type="number"
              min="100"
              max="1200"
              value={imageHeight}
              onChange={(e) => setImageHeight(parseInt(e.target.value) || 200)}
            />
          </div>
        </div>

        <button
          className="download-button"
          onClick={downloadImage}
          disabled={isGenerating || !text}
        >
          下载图片
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="preview-section">
        <h4>预览：</h4>
        <div className="canvas-container">
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <img
            ref={imageRef}
            alt="Text to image preview"
            className="preview-image"
          />
        </div>
      </div>

      <div className="info-section">
        <h4>使用说明</h4>
        <ul>
          <li>输入要转换为图片的文本</li>
          <li>调整字体大小、字体、文本颜色和背景颜色</li>
          <li>设置图片的宽度和高度</li>
          <li>实时预览生成的图片</li>
          <li>点击"下载图片"按钮下载生成的图片</li>
        </ul>
      </div>
    </div>
  );
};

export default TextToImage;