import React, { useState, useRef, useEffect } from 'react';

const TxtReader: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(16);
  const [theme, setTheme] = useState<string>('light'); // light, dark
  const [fileName, setFileName] = useState<string>('');
  const readerRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
      };
      reader.readAsText(file, 'utf-8');
    }
  };

  const handleFontSizeChange = (change: number) => {
    setFontSize(prev => Math.max(12, Math.min(24, prev + change)));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const saveProgress = () => {
    if (readerRef.current) {
      const scrollTop = readerRef.current.scrollTop;
      localStorage.setItem('txtReaderProgress', scrollTop.toString());
    }
  };

  useEffect(() => {
    // 恢复阅读进度
    const savedProgress = localStorage.getItem('txtReaderProgress');
    if (savedProgress && readerRef.current) {
      readerRef.current.scrollTop = parseInt(savedProgress);
    }
  }, [text]);

  return (
    <div className={`txt-reader ${theme}`}>
      <div className="reader-header">
        <h3>{fileName || 'TXT在线阅读器'}</h3>
        <div className="controls">
          <label className="file-upload">
            上传文件
            <input type="file" accept=".txt" onChange={handleFileUpload} />
          </label>
          <div className="font-controls">
            <button onClick={() => handleFontSizeChange(-1)}>-</button>
            <span>{fontSize}px</span>
            <button onClick={() => handleFontSizeChange(1)}>+</button>
          </div>
          <button onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button onClick={saveProgress}>保存进度</button>
        </div>
      </div>
      
      <div 
        className="reader-content"
        ref={readerRef}
        style={{ fontSize: `${fontSize}px` }}
      >
        {text ? (
          <pre>{text}</pre>
        ) : (
          <div className="placeholder">
            <p>请上传TXT文件开始阅读</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TxtReader;
