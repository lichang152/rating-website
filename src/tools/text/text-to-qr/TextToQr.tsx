import React, { useState, useEffect } from 'react';
import './TextToQr.css';

const TextToQr: React.FC = () => {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [size, setSize] = useState<number>(200);
  const [errorCorrection, setErrorCorrection] = useState<string>('M');

  const generateQRCode = () => {
    if (!text) {
      setQrCodeUrl('');
      return;
    }

    // 使用Google Charts API生成二维码
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&ecc=${errorCorrection}&data=${encodeURIComponent(text)}`;
    setQrCodeUrl(url);
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    link.click();
  };

  useEffect(() => {
    generateQRCode();
  }, [text, size, errorCorrection]);

  return (
    <div className="text-to-qr">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要转换为二维码的文本..."
          rows={6}
        />
        <div className="settings">
          <div className="setting-item">
            <label>二维码大小：{size}x{size}</label>
            <input
              type="range"
              min="100"
              max="500"
              step="50"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
          </div>
          <div className="setting-item">
            <label>错误校正级别：</label>
            <select
              value={errorCorrection}
              onChange={(e) => setErrorCorrection(e.target.value)}
            >
              <option value="L">低 (7%)</option>
              <option value="M">中 (15%)</option>
              <option value="Q">较高 (25%)</option>
              <option value="H">高 (30%)</option>
            </select>
          </div>
        </div>
      </div>
      <div className="output-section">
        <h3>二维码结果</h3>
        {qrCodeUrl ? (
          <div className="qr-code-container">
            <img src={qrCodeUrl} alt="QR Code" />
            <button className="download-button" onClick={downloadQRCode}>
              下载二维码
            </button>
          </div>
        ) : (
          <div className="placeholder">
            请输入文本以生成二维码
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToQr;