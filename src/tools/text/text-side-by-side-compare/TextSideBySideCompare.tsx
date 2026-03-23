import React, { useState, useEffect } from 'react';
import './TextSideBySideCompare.css';

const TextSideBySideCompare: React.FC = () => {
  const [text1, setText1] = useState<string>('');
  const [text2, setText2] = useState<string>('');
  const [differences, setDifferences] = useState<{text1: string, text2: string}>({text1: '', text2: ''});
  const [showDifferences, setShowDifferences] = useState<boolean>(false);

  // 简单的文本差异对比实现
  const compareTexts = () => {
    if (!text1 || !text2) return;

    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');

    let result1 = '';
    let result2 = '';

    const maxLines = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      if (line1 === line2) {
        // 相同的行
        result1 += line1 + '\n';
        result2 += line2 + '\n';
      } else {
        // 不同的行
        result1 += `<span class="diff">${line1}</span>\n`;
        result2 += `<span class="diff">${line2}</span>\n`;
      }
    }

    setDifferences({ text1: result1, text2: result2 });
    setShowDifferences(true);
  };

  // 当文本变化时自动重新对比
  useEffect(() => {
    if (text1 && text2) {
      compareTexts();
    } else {
      setShowDifferences(false);
    }
  }, [text1, text2]);

  return (
    <div className="text-side-by-side-compare">
      <h3>并排高亮对比</h3>

      <div className="input-section">
        <div className="text-inputs">
          <div className="text-input-group">
            <label>文本 1：</label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="请输入第一个文本..."
              rows={10}
            />
          </div>
          <div className="text-input-group">
            <label>文本 2：</label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="请输入第二个文本..."
              rows={10}
            />
          </div>
        </div>
      </div>

      {showDifferences && (
        <div className="comparison-section">
          <h4>对比结果：</h4>
          <div className="comparison-container">
            <div className="comparison-column">
              <h5>文本 1</h5>
              <div 
                className="comparison-content"
                dangerouslySetInnerHTML={{ __html: differences.text1 }}
              />
            </div>
            <div className="comparison-column">
              <h5>文本 2</h5>
              <div 
                className="comparison-content"
                dangerouslySetInnerHTML={{ __html: differences.text2 }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="info-section">
        <h4>使用说明</h4>
        <ul>
          <li>在左侧文本框中输入第一个文本</li>
          <li>在右侧文本框中输入第二个文本</li>
          <li>系统会自动对比两个文本的差异</li>
          <li>不同的行将被高亮显示</li>
          <li>滚动两个文本区域以查看所有差异</li>
        </ul>
      </div>
    </div>
  );
};

export default TextSideBySideCompare;