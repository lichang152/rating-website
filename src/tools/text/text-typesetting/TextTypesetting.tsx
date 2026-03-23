import React, { useState } from 'react';
import './TextTypesetting.css';

const TextTypesetting: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [indent, setIndent] = useState<number>(0);
  const [alignment, setAlignment] = useState<string>('left');
  const [lineSpacing, setLineSpacing] = useState<number>(1.5);
  const [fontSize, setFontSize] = useState<number>(14);
  const [result, setResult] = useState<string>('');

  const handleTypeset = () => {
    if (!text) return;
    
    // 处理缩进
    const lines = text.split('\n');
    const indentedLines = lines.map(line => {
      const indentSpaces = ' '.repeat(indent * 2);
      return indentSpaces + line;
    });
    const indentedText = indentedLines.join('\n');
    
    setResult(indentedText);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };

  return (
    <div className="text-typesetting">
      <div className="input-section">
        <h3>文本排版</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要排版的文本..."
          rows={6}
        />
        
        <div className="typesetting-controls">
          <div className="control-group">
            <label>缩进（字符）：</label>
            <input
              type="number"
              min="0"
              max="10"
              value={indent}
              onChange={(e) => setIndent(parseInt(e.target.value) || 0)}
            />
          </div>
          
          <div className="control-group">
            <label>对齐方式：</label>
            <select
              value={alignment}
              onChange={(e) => setAlignment(e.target.value)}
            >
              <option value="left">左对齐</option>
              <option value="center">居中对齐</option>
              <option value="right">右对齐</option>
              <option value="justify">两端对齐</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>行间距：</label>
            <input
              type="number"
              min="0.5"
              max="3"
              step="0.1"
              value={lineSpacing}
              onChange={(e) => setLineSpacing(parseFloat(e.target.value) || 1.5)}
            />
          </div>
          
          <div className="control-group">
            <label>字体大小：</label>
            <input
              type="number"
              min="8"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value) || 14)}
            />
          </div>
        </div>
        
        <button 
          className="typeset-button" 
          onClick={handleTypeset}
          disabled={!text}
        >
          应用排版
        </button>
      </div>
      
      {result && (
        <div className="output-section">
          <h3>排版结果</h3>
          <div 
            className="typeset-text"
            style={{
              textAlign: alignment as 'left' | 'center' | 'right' | 'justify',
              lineHeight: lineSpacing,
              fontSize: `${fontSize}px`,
              whiteSpace: 'pre-wrap',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            {result}
          </div>
          <button className="copy-button" onClick={copyToClipboard}>
            复制结果
          </button>
        </div>
      )}
      
      <div className="info-section">
        <h4>使用说明</h4>
        <ul>
          <li>在文本框中输入要排版的文本</li>
          <li>调整缩进、对齐方式、行间距和字体大小</li>
          <li>点击"应用排版"按钮应用排版设置</li>
          <li>查看排版结果，调整设置直到满意</li>
          <li>点击"复制结果"按钮复制排版后的文本</li>
        </ul>
      </div>
    </div>
  );
};

export default TextTypesetting;