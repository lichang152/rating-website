import React, { useState } from 'react';
import './NumberToText.css';

const NumberToText: React.FC = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');

  const convertToText = () => {
    if (!number) {
      setResult('');
      return;
    }

    const num = parseFloat(number);
    if (isNaN(num)) {
      setResult('请输入有效的数字');
      return;
    }

    // 简单的数字转文本（仅支持整数）
    const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const units = ['', '十', '百', '千', '万', '十', '百', '千', '亿'];

    const numStr = number.toString();
    let text = '';

    for (let i = 0; i < numStr.length; i++) {
      const digit = parseInt(numStr[i]);
      const unitIndex = numStr.length - i - 1;
      
      if (digit !== 0) {
        text += digits[digit] + units[unitIndex];
      } else if (i > 0 && parseInt(numStr[i-1]) !== 0) {
        text += digits[digit];
      }
    }

    // 特殊处理
    text = text.replace('一十', '十');
    text = text.replace('零万', '万');
    text = text.replace('零亿', '亿');
    text = text.replace('零零', '零');
    text = text.replace(/零+$/, '');

    setResult(text);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="number-to-text">
      <div className="input-section">
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="请输入数字..."
        />
        <button className="convert-button" onClick={convertToText}>
          转换为文本
        </button>
      </div>
      <div className="output-section">
        <h3>转换结果</h3>
        <textarea
          value={result}
          readOnly
          rows={6}
        />
        {result && (
          <button className="copy-button" onClick={copyToClipboard}>
            复制结果
          </button>
        )}
      </div>
    </div>
  );
};

export default NumberToText;