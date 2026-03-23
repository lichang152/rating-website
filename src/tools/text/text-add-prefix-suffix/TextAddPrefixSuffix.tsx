import React, { useState } from 'react';
import './TextAddPrefixSuffix.css';

const TextAddPrefixSuffix: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [prefix, setPrefix] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [addMode, setAddMode] = useState<'all' | 'each'>('all');

  const handleAdd = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    let result = '';

    if (addMode === 'all') {
      // 为整个文本添加前缀和后缀
      result = prefix + inputText + suffix;
    } else {
      // 为每一行添加前缀和后缀
      const lines = inputText.split('\n');
      result = lines.map(line => prefix + line + suffix).join('\n');
    }

    setOutputText(result);
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      alert('文本已复制到剪贴板');
    }
  };

  const handleClear = () => {
    setInputText('');
    setPrefix('');
    setSuffix('');
    setOutputText('');
  };

  return (
    <div className="text-add-prefix-suffix">
      <div className="tool-section">
        <h3>输入文本</h3>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="请输入要处理的文本"
          rows={6}
        />
      </div>

      <div className="tool-section">
        <h3>前缀和后缀</h3>
        <div className="prefix-suffix-inputs">
          <div className="input-group">
            <label>前缀：</label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="请输入前缀"
            />
          </div>
          <div className="input-group">
            <label>后缀：</label>
            <input
              type="text"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              placeholder="请输入后缀"
            />
          </div>
        </div>
      </div>

      <div className="tool-section">
        <h3>添加模式</h3>
        <div className="add-mode-selector">
          <label className="radio-item">
            <input
              type="radio"
              name="addMode"
              value="all"
              checked={addMode === 'all'}
              onChange={(e) => setAddMode(e.target.value as 'all')}
            />
            <span>为整个文本添加</span>
          </label>
          <label className="radio-item">
            <input
              type="radio"
              name="addMode"
              value="each"
              checked={addMode === 'each'}
              onChange={(e) => setAddMode(e.target.value as 'each')}
            />
            <span>为每一行添加</span>
          </label>
        </div>
      </div>

      <div className="tool-controls">
        <button onClick={handleAdd} className="btn-primary">
          添加前缀/后缀
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      {outputText && (
        <div className="result-section">
          <h3>处理结果</h3>
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

export default TextAddPrefixSuffix;