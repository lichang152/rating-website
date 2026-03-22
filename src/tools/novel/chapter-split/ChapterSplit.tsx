import React, { useState } from 'react';

const ChapterSplit: React.FC = () => {
  const [text, setText] = useState('');
  const [chapters, setChapters] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setText(content);
    };
    reader.readAsText(file, 'utf-8');
  };

  const splitChapters = () => {
    setLoading(true);
    
    // 模拟章节分割逻辑
    setTimeout(() => {
      const chapterRegex = /第[零一二三四五六七八九十百千]+[章回卷节集]/g;
      const matches = text.match(chapterRegex);
      
      if (matches) {
        const chapterList: string[] = [];
        let lastIndex = 0;
        
        matches.forEach((match, index) => {
          const matchIndex = text.indexOf(match, lastIndex);
          if (index > 0) {
            const chapterContent = text.substring(lastIndex, matchIndex).trim();
            chapterList.push(chapterContent);
          }
          lastIndex = matchIndex;
        });
        
        // 添加最后一章
        if (lastIndex < text.length) {
          const lastChapter = text.substring(lastIndex).trim();
          chapterList.push(lastChapter);
        }
        
        setChapters(chapterList);
      } else {
        setChapters([text]);
      }
      
      setLoading(false);
    }, 500);
  };

  const downloadChapters = () => {
    chapters.forEach((chapter, index) => {
      const blob = new Blob([chapter], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chapter-${index + 1}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="chapter-split">
      <div className="input-section">
        <h3>上传TXT文件</h3>
        <input type="file" accept=".txt" onChange={handleFileUpload} />
        
        <h3>或直接输入文本</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入小说文本..."
          rows={10}
        />
      </div>
      
      <button 
        className="split-button"
        onClick={splitChapters}
        disabled={!text || loading}
      >
        {loading ? '分割中...' : '智能分割章节'}
      </button>
      
      {chapters.length > 0 && (
        <div className="result-section">
          <h3>分割结果 ({chapters.length} 章)</h3>
          <div className="chapters-list">
            {chapters.map((chapter, index) => (
              <div key={index} className="chapter-item">
                <h4>第 {index + 1} 章</h4>
                <p className="chapter-preview">{chapter.substring(0, 100)}...</p>
                <p className="chapter-length">{chapter.length} 字符</p>
              </div>
            ))}
          </div>
          
          <button 
            className="download-button"
            onClick={downloadChapters}
          >
            下载章节文件
          </button>
        </div>
      )}
    </div>
  );
};

export default ChapterSplit;