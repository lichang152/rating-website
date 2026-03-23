import React, { useState } from 'react';
import './TextCompress.css';

const TextCompress: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [compressedText, setCompressedText] = useState<string>('');
  const [operation, setOperation] = useState<string>('compress'); // 'compress' or 'decompress'
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // 简单的文本压缩（使用Base64编码模拟）
  const compress = (input: string): string => {
    try {
      // 使用UTF-8编码
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      // 转换为Base64
      return btoa(String.fromCharCode(...data));
    } catch (err) {
      throw new Error('压缩失败');
    }
  };

  // 解压文本
  const decompress = (input: string): string => {
    try {
      // 从Base64解码
      const decoded = atob(input);
      // 转换为UTF-8
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      return decoder.decode(encoder.encode(decoded));
    } catch (err) {
      throw new Error('解压失败，请确保输入是有效的Base64编码');
    }
  };

  const handleProcess = () => {
    if (!text) {
      setError('请输入要处理的文本');
      return;
    }

    setError('');
    setIsProcessing(true);

    try {
      if (operation === 'compress') {
        const result = compress(text);
        setCompressedText(result);
      } else {
        const result = decompress(text);
        setCompressedText(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '处理失败');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    if (compressedText) {
      navigator.clipboard.writeText(compressedText);
    }
  };

  const calculateCompressionRatio = () => {
    if (!text || !compressedText) return null;
    const originalSize = new Blob([text]).size;
    const compressedSize = new Blob([compressedText]).size;
    const ratio = (compressedSize / originalSize) * 100;
    return ratio.toFixed(2);
  };

  return (
    <div className="text-compress">
      <h3>文本压缩解压</h3>

      <div className="operation-selector">
        <label>
          <input
            type="radio"
            value="compress"
            checked={operation === 'compress'}
            onChange={() => setOperation('compress')}
          />
          压缩
        </label>
        <label>
          <input
            type="radio"
            value="decompress"
            checked={operation === 'decompress'}
            onChange={() => setOperation('decompress')}
          />
          解压
        </label>
      </div>

      <div className="input-section">
        <div className="form-group">
          <label>{operation === 'compress' ? '原始文本：' : '压缩文本：'}</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={operation === 'compress' ? '请输入要压缩的文本...' : '请输入要解压的文本...'}
            rows={6}
          />
        </div>

        <button
          className="process-button"
          onClick={handleProcess}
          disabled={isProcessing || !text}
        >
          {isProcessing ? '处理中...' : operation === 'compress' ? '压缩' : '解压'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {compressedText && (
        <div className="output-section">
          <h4>处理结果：</h4>
          <textarea
            value={compressedText}
            readOnly
            rows={6}
            placeholder={operation === 'compress' ? '压缩结果将显示在这里...' : '解压结果将显示在这里...'}
          />
          {operation === 'compress' && calculateCompressionRatio() && (
            <div className="compression-info">
              压缩率：{calculateCompressionRatio()}%
            </div>
          )}
          <button className="copy-button" onClick={copyToClipboard}>
            复制结果
          </button>
        </div>
      )}

      <div className="info-section">
        <h4>使用说明</h4>
        <ul>
          <li>选择操作类型：压缩或解压</li>
          <li>输入要处理的文本</li>
          <li>点击相应按钮进行压缩或解压</li>
          <li>查看处理结果</li>
          <li>复制结果到剪贴板</li>
          <li>注意：此工具使用Base64编码进行压缩，实际压缩效果可能有限</li>
        </ul>
      </div>
    </div>
  );
};

export default TextCompress;