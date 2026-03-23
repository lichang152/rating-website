import React, { useState } from 'react';
import './TextToNumber.css';

const TextToNumber: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const convertToNumber = () => {
    if (!text) {
      setResult('');
      return;
    }

    // 提取文本中的数字
    const numbers = text.match(/\d+(\.\d+)?/g);
    
    if (numbers) {
      const numberString = numbers.join(' ');
      const sum = numbers.reduce((acc, num) => acc + parseFloat(num), 0);
      setResult(`提取的数字: ${numberString}\n总和: ${sum}`);
    } else {
      setResult('未找到数字');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="text-to-number">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入包含数字的文本..."
          rows={6}
        />
        <button className="convert-button" onClick={convertToNumber}>
          转换为数字
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

export default TextToNumber;