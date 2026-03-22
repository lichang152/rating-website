import React, { useState } from 'react';
import './XmlToJson.css';

const XmlToJson: React.FC = () => {
  const [xmlInput, setXmlInput] = useState<string>('');
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [error, setError] = useState<string>('');

  const xmlToJson = (xml: string): any => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    
    const parseElement = (element: Element): any => {
      const obj: any = {};
      
      // 处理属性
      if (element.attributes.length > 0) {
        for (let i = 0; i < element.attributes.length; i++) {
          const attr = element.attributes[i];
          obj[`@${attr.name}`] = attr.value;
        }
      }
      
      // 处理子元素
      if (element.hasChildNodes()) {
        const children = element.childNodes;
        let textContent = '';
        const childElements: any[] = [];
        
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.nodeType === Node.TEXT_NODE) {
            textContent += child.textContent?.trim() || '';
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            childElements.push(parseElement(child as Element));
          }
        }
        
        // 处理文本内容
        if (textContent && childElements.length === 0) {
          return textContent;
        }
        
        // 处理子元素
        childElements.forEach((child, index) => {
          const tagName = children[index + (textContent ? 1 : 0)].nodeName;
          if (obj[tagName]) {
            if (!Array.isArray(obj[tagName])) {
              obj[tagName] = [obj[tagName]];
            }
            obj[tagName].push(child);
          } else {
            obj[tagName] = child;
          }
        });
      }
      
      return obj;
    };
    
    const root = xmlDoc.documentElement;
    return { [root.nodeName]: parseElement(root) };
  };

  const handleConvert = () => {
    try {
      setError('');
      const jsonObj = xmlToJson(xmlInput);
      const jsonString = JSON.stringify(jsonObj, null, 2);
      setJsonOutput(jsonString);
    } catch (err) {
      setError('XML格式无效，请检查输入');
      setJsonOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
  };

  const handleClear = () => {
    setXmlInput('');
    setJsonOutput('');
    setError('');
  };

  return (
    <div className="xml-to-json-tool">
      <div className="tool-section">
        <h3>输入XML</h3>
        <textarea
          value={xmlInput}
          onChange={(e) => setXmlInput(e.target.value)}
          placeholder="请输入XML数据..."
          rows={10}
        />
      </div>

      <div className="tool-controls">
        <button onClick={handleConvert} className="btn-primary">
          转换为JSON
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
        <h3>JSON输出</h3>
        <textarea
          value={jsonOutput}
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

export default XmlToJson;