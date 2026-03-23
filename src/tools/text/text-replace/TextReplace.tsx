import React, { useState } from 'react';
import './TextReplace.css';

const TextReplace: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [replaceText, setReplaceText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [useRegex, setUseRegex] = useState<boolean>(false);
  const [caseSensitive, setCaseSensitive] = useState<boolean>(true);

  const handleReplace = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    let result = inputText;

    if (searchText) {
      if (useRegex) {
        try {
          const regex = new RegExp(searchText, caseSensitive ? 'g' : 'gi');
          result = inputText.replace(regex, replaceText);
        } catch (error) {
          alert('正则表达式无效');
          return;
        }
      } else {
        const searchValue = caseSensitive ? searchText : searchText.toLowerCase();
        const inputValue = caseSensitive ? inputText : inputText.toLowerCase();
        let index = 0;
        let newText = '';

        while (index < inputText.length) {
          const searchIndex = inputValue.indexOf(searchValue, index);
          if (searchIndex === -1) {
            newText += inputText.substring(index);
            break;
          }
          newText += inputText.substring(index, searchIndex) + replaceText;
          index = searchIndex + searchValue.length;
        }

        result = newText;
      }
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
    setSearchText('');
    setReplaceText('');
    setOutputText('');
  };

  return (
    <div className="text-replace">
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
        <h3>替换设置</h3>
        <div className="replace-settings">
          <div className="setting-item">
            <label>查找内容：</label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="请输入要查找的内容"
            />
          </div>
          <div className="setting-item">
            <label>替换为：</label>
            <input
              type="text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="请输入替换内容"
            />
          </div>
          <div className="checkbox-group">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
              />
              <span>使用正则表达式</span>
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
              />
              <span>区分大小写</span>
            </label>
          </div>
        </div>
      </div>

      <div className="tool-controls">
        <button onClick={handleReplace} className="btn-primary">
          替换
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      {outputText && (
        <div className="result-section">
          <h3>替换结果</h3>
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

export default TextReplace;