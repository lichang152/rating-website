import React, { useState } from 'react';
import './MarkdownToHtml.css';

const MarkdownToHtml: React.FC = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

  const convertToHtml = () => {
    if (!markdown) {
      setHtml('');
      return;
    }

    let result = markdown
      // 标题
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
      .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
      .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
      // 粗体
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      // 斜体
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      // 代码
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // 代码块
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // 链接
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      // 图片
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />')
      // 列表
      .replace(/^\* (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>')
      // 引用
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      // 水平线
      .replace(/^---$/gm, '<hr />')
      // 换行
      .replace(/\n/g, '<br />');

    setHtml(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html);
  };

  return (
    <div className="markdown-to-html">
      <div className="input-section">
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="请输入Markdown文本..."
          rows={10}
        />
        <button className="convert-button" onClick={convertToHtml}>
          转换为HTML
        </button>
      </div>
      <div className="output-section">
        <h3>HTML结果</h3>
        <textarea
          value={html}
          readOnly
          rows={10}
        />
        {html && (
          <button className="copy-button" onClick={copyToClipboard}>
            复制结果
          </button>
        )}
      </div>
    </div>
  );
};

export default MarkdownToHtml;