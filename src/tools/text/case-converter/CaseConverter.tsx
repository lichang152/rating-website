import React, { useState } from 'react';

const CaseConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [conversionType, setConversionType] = useState('lowercase');

  const convertCase = () => {
    let result = '';
    switch (conversionType) {
      case 'lowercase':
        result = input.toLowerCase();
        break;
      case 'uppercase':
        result = input.toUpperCase();
        break;
      case 'titlecase':
        result = input
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        break;
      case 'sentencecase':
        result = input
          .toLowerCase()
          .replace(/^\w|\.\s*\w/g, match => match.toUpperCase());
        break;
      default:
        result = input;
    }
    setOutput(result);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      alert('转换结果已复制到剪贴板');
    }
  };

  return (
    <div className="case-converter">
      <div className="input-section">
        <h3>输入文本</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入要转换大小写的文本..."
          rows={5}
        />
      </div>

      <div className="conversion-options">
        <label>转换类型：</label>
        <select value={conversionType} onChange={(e) => setConversionType(e.target.value)}>
          <option value="lowercase">全部小写</option>
          <option value="uppercase">全部大写</option>
          <option value="titlecase">首字母大写</option>
          <option value="sentencecase">句子首字母大写</option>
        </select>
      </div>

      <button 
        className="convert-button"
        onClick={convertCase}
        disabled={!input}
      >
        转换
      </button>

      {output && (
        <div className="result-section">
          <h3>转换结果</h3>
          <div className="result-container">
            <textarea
              value={output}
              readOnly
              rows={5}
            />
            <button 
              className="copy-button"
              onClick={handleCopy}
            >
              复制
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseConverter;