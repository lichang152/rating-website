import React, { useState } from 'react';

const JsonFormatter: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [indent, setIndent] = useState<number>(2);

  const formatJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const formattedJson = JSON.stringify(parsedJson, null, indent);
      setJsonOutput(formattedJson);
      setError('');
    } catch (err) {
      setError('无效的JSON格式');
      setJsonOutput('');
    }
  };

  const compressJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const compressedJson = JSON.stringify(parsedJson);
      setJsonOutput(compressedJson);
      setError('');
    } catch (err) {
      setError('无效的JSON格式');
      setJsonOutput('');
    }
  };

  return (
    <div className="json-formatter">
      <div className="input-section">
        <h3>输入JSON</h3>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="请输入JSON..."
          rows={10}
        />
      </div>

      <div className="options">
        <div className="indent-option">
          <label>缩进空格数:</label>
          <input
            type="number"
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            min="0"
            max="8"
          />
        </div>
        <div className="action-buttons">
          <button onClick={formatJson}>格式化</button>
          <button onClick={compressJson}>压缩</button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="output-section">
        <h3>输出</h3>
        <textarea
          value={jsonOutput}
          readOnly
          rows={10}
        />
      </div>

      <div className="actions">
        <button onClick={() => setJsonInput('')}>清空输入</button>
        <button onClick={() => navigator.clipboard.writeText(jsonOutput)}>复制结果</button>
      </div>
    </div>
  );
};

export default JsonFormatter;
