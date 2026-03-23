import React, { useState } from 'react';
import './JsonValidator.css';

const JsonValidator: React.FC = () => {
  const [inputJson, setInputJson] = useState<string>('');
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message: string } | null>(null);
  const [formattedJson, setFormattedJson] = useState<string>('');

  const handleValidate = () => {
    if (!inputJson) {
      setValidationResult({ valid: false, message: '请输入JSON文本' });
      setFormattedJson('');
      return;
    }

    try {
      const parsedJson = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsedJson, null, 2);
      setValidationResult({ valid: true, message: 'JSON格式有效' });
      setFormattedJson(formatted);
    } catch (error) {
      setValidationResult({ valid: false, message: `JSON格式无效: ${(error as Error).message}` });
      setFormattedJson('');
    }
  };

  const handleCopy = () => {
    if (formattedJson) {
      navigator.clipboard.writeText(formattedJson);
      alert('格式化后的JSON已复制到剪贴板');
    }
  };

  const handleClear = () => {
    setInputJson('');
    setValidationResult(null);
    setFormattedJson('');
  };

  return (
    <div className="json-validator">
      <div className="tool-section">
        <h3>输入JSON</h3>
        <textarea
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
          placeholder="请输入JSON文本"
          rows={8}
        />
      </div>

      <div className="tool-controls">
        <button onClick={handleValidate} className="btn-primary">
          验证
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      {validationResult && (
        <div className={`result-section ${validationResult.valid ? 'valid' : 'invalid'}`}>
          <h3>验证结果</h3>
          <p className="validation-message">{validationResult.message}</p>
          
          {validationResult.valid && formattedJson && (
            <div className="formatted-json">
              <h4>格式化后的JSON</h4>
              <pre>{formattedJson}</pre>
              <button onClick={handleCopy} className="btn-secondary">
                复制格式化结果
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JsonValidator;