import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import type { QRCodeErrorCorrectionLevel } from 'qrcode';

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState<string>('https://example.com');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [size, setSize] = useState<number>(200);
  const [errorLevel, setErrorLevel] = useState<QRCodeErrorCorrectionLevel>('M'); // L, M, Q, H
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    try {
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, text, {
          width: size,
          margin: 1,
          errorCorrectionLevel: errorLevel
        });
        const url = canvasRef.current.toDataURL('image/png');
        setQrCodeUrl(url);
      }
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'qrcode.png';
      link.click();
    }
  };

  return (
    <div className="qr-generator">
      <div className="input-section">
        <h3>输入内容</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要生成二维码的内容（URL、文本等）..."
          rows={5}
        />
      </div>

      <div className="options">
        <div className="option">
          <label>二维码大小:</label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            min="100"
            max="500"
          />
        </div>
        <div className="option">
          <label>纠错级别:</label>
          <select value={errorLevel} onChange={(e) => setErrorLevel(e.target.value as QRCodeErrorCorrectionLevel)}>
            <option value="L">低 (7%)</option>
            <option value="M">中 (15%)</option>
            <option value="Q">较高 (25%)</option>
            <option value="H">高 (30%)</option>
          </select>
        </div>
        <button onClick={generateQRCode}>生成二维码</button>
      </div>

      <div className="result-section">
        <h3>二维码</h3>
        <div className="qr-code-container">
          <canvas ref={canvasRef} width={size} height={size} />
        </div>
      </div>

      <div className="actions">
        <button onClick={() => setText('')}>清空输入</button>
        <button onClick={downloadQRCode} disabled={!qrCodeUrl}>下载二维码</button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
