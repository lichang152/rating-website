import React, { useState } from 'react';
import './Base64.css';

const Base64: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(inputText)));
        setOutputText(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(inputText)));
        setOutputText(decoded);
      }
    } catch (error) {
      setOutputText('转换失败，请检查输入格式');
    }
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      alert('结果已复制到剪贴板');
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="base64">
      <div className="tool-section">
        <h3>转换模式</h3>
        <div className="mode-selector">
          <label className="radio-item">
            <input
              type="radio"
              name="mode"
              value="encode"
              checked={mode === 'encode'}
              onChange={(e) => setMode(e.target.value as 'encode')}
            />
            <span>Base64编码</span>
          </label>
          <label className="radio-item">
            <input
              type="radio"
              name="mode"
              value="decode"
              checked={mode === 'decode'}
              onChange={(e) => setMode(e.target.value as 'decode')}
            />
            <span>Base64解码</span>
          </label>
        </div>
      </div>

      <div className="tool-section">
        <h3>{mode === 'encode' ? '输入文本' : '输入Base64'}</h3>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={mode === 'encode' ? '请输入要编码的文本' : '请输入要解码的Base64'}
          rows={6}
        />
      </div>

      <div className="tool-controls">
        <button onClick={handleConvert} className="btn-primary">
          {mode === 'encode' ? '编码' : '解码'}
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      {outputText && (
        <div className="result-section">
          <h3>{mode === 'encode' ? 'Base64结果' : '解码结果'}</h3>
          <textarea
            value={outputText}
            readOnly
            rows={6}
          />
          <button onClick={handleCopy} className="btn-secondary">
            复制结果
          </button>
        </div>
      )}
    </div>
  );
};

export default Base64;