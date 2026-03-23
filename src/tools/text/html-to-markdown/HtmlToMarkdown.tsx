import React, { useState } from 'react';
import './HtmlToMarkdown.css';

const HtmlToMarkdown: React.FC = () => {
  const [html, setHtml] = useState('');
  const [markdown, setMarkdown] = useState('');

  const convertToMarkdown = () => {
    if (!html) {
      setMarkdown('');
      return;
    }

    let result = html
      // 标题
      .replace(/<h1>(.*?)<\/h1>/g, '# $1\n')
      .replace(/<h2>(.*?)<\/h2>/g, '## $1\n')
      .replace(/<h3>(.*?)<\/h3>/g, '### $1\n')
      .replace(/<h4>(.*?)<\/h4>/g, '#### $1\n')
      .replace(/<h5>(.*?)<\/h5>/g, '##### $1\n')
      .replace(/<h6>(.*?)<\/h6>/g, '###### $1\n')
      // 粗体
      .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
      .replace(/<b>(.*?)<\/b>/g, '**$1**')
      // 斜体
      .replace(/<em>(.*?)<\/em>/g, '*$1*')
      .replace(/<i>(.*?)<\/i>/g, '*$1*')
      // 代码
      .replace(/<code>(.*?)<\/code>/g, '`$1`')
      // 代码块
      .replace(/<pre><code>(.*?)<\/code><\/pre>/g, '```\n$1\n```')
      // 链接
      .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)')
      // 图片
      .replace(/<img alt="(.*?)" src="(.*?)" \/>/g, '![$1]($2)')
      // 列表
      .replace(/<ul>(.*?)<\/ul>/s, (match, content) => {
        return content.replace(/<li>(.*?)<\/li>/g, '* $1\n');
      })
      .replace(/<ol>(.*?)<\/ol>/s, (match, content) => {
        let i = 1;
        return content.replace(/<li>(.*?)<\/li>/g, () => `${i++}. $1\n`);
      })
      // 引用
      .replace(/<blockquote>(.*?)<\/blockquote>/g, '> $1\n')
      // 水平线
      .replace(/<hr \/>/g, '---\n')
      // 换行
      .replace(/<br \/>/g, '\n')
      // 移除其他HTML标签
      .replace(/<[^>]*>/g, '')
      // 去除多余的空格
      .replace(/\s+/g, ' ')
      .trim();

    setMarkdown(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
  };

  return (
    <div className="html-to-markdown">
      <div className="input-section">
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="请输入HTML文本..."
          rows={10}
        />
        <button className="convert-button" onClick={convertToMarkdown}>
          转换为Markdown
        </button>
      </div>
      <div className="output-section">
        <h3>Markdown结果</h3>
        <textarea
          value={markdown}
          readOnly
          rows={10}
        />
        {markdown && (
          <button className="copy-button" onClick={copyToClipboard}>
            复制结果
          </button>
        )}
      </div>
    </div>
  );
};

export default HtmlToMarkdown;