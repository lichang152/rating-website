import React, { useState } from 'react';
import './JsonToXml.css';

const JsonToXml: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [xmlOutput, setXmlOutput] = useState<string>('');
  const [error, setError] = useState<string>('');

  const jsonToXml = (obj: any, rootName: string = 'root'): string => {
    let xml = `<${rootName}>`;
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (Array.isArray(value)) {
          value.forEach(item => {
            xml += jsonToXml(item, key);
          });
        } else if (typeof value === 'object' && value !== null) {
          xml += jsonToXml(value, key);
        } else {
          xml += `<${key}>${value}</${key}>`;
        }
      }
    }
    
    xml += `</${rootName}>`;
    return xml;
  };

  const handleConvert = () => {
    try {
      setError('');
      const jsonObj = JSON.parse(jsonInput);
      const xml = jsonToXml(jsonObj);
      setXmlOutput(xml);
    } catch (err) {
      setError('JSON格式无效，请检查输入');
      setXmlOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlOutput);
  };

  const handleClear = () => {
    setJsonInput('');
    setXmlOutput('');
    setError('');
  };

  return (
    <div className="json-to-xml-tool">
      <div className="tool-section">
        <h3>输入JSON</h3>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="请输入JSON数据..."
          rows={10}
        />
      </div>

      <div className="tool-controls">
        <button onClick={handleConvert} className="btn-primary">
          转换为XML
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="tool-section">
        <h3>XML输出</h3>
        <textarea
          value={xmlOutput}
          readOnly
          rows={10}
        />
        <button onClick={handleCopy} className="btn-secondary">
          复制结果
        </button>
      </div>
    </div>
  );
};

export default JsonToXml;