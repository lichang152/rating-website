import React, { useState } from 'react';
import './TextGrammarCheck.css';

// 模拟语法检查结果
interface GrammarError {
  start: number;
  end: number;
  message: string;
  suggestion: string;
}

// 模拟语法检查函数
const mockGrammarCheck = (text: string): GrammarError[] => {
  // 简单的模拟语法检查，实际项目中应使用真实的语法检查API
  const errors: GrammarError[] = [];
  
  // 模拟一些常见的语法错误
  if (text.includes('I is')) {
    const index = text.indexOf('I is');
    errors.push({
      start: index,
      end: index + 4,
      message: '主谓不一致',
      suggestion: 'I am'
    });
  }
  
  if (text.includes('he have')) {
    const index = text.indexOf('he have');
    errors.push({
      start: index,
      end: index + 7,
      message: '主谓不一致',
      suggestion: 'he has'
    });
  }
  
  if (text.includes('we is')) {
    const index = text.indexOf('we is');
    errors.push({
      start: index,
      end: index + 5,
      message: '主谓不一致',
      suggestion: 'we are'
    });
  }
  
  if (text.includes('it are')) {
    const index = text.indexOf('it are');
    errors.push({
      start: index,
      end: index + 5,
      message: '主谓不一致',
      suggestion: 'it is'
    });
  }
  
  if (text.includes('they is')) {
    const index = text.indexOf('they is');
    errors.push({
      start: index,
      end: index + 7,
      message: '主谓不一致',
      suggestion: 'they are'
    });
  }
  
  return errors;
};

const TextGrammarCheck: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [errors, setErrors] = useState<GrammarError[]>([]);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [checkedText, setCheckedText] = useState<string>('');

  const handleCheckGrammar = () => {
    if (!text) return;
    
    setIsChecking(true);
    
    // 模拟语法检查延迟
    setTimeout(() => {
      const foundErrors = mockGrammarCheck(text);
      setErrors(foundErrors);
      
      // 生成带有错误标记的文本
      let result = text;
      let offset = 0;
      
      // 按起始位置排序，从后往前处理以避免索引偏移
      foundErrors.sort((a, b) => b.start - a.start).forEach(error => {
        const before = result.substring(0, error.start + offset);
        const errorText = result.substring(error.start + offset, error.end + offset);
        const after = result.substring(error.end + offset);
        
        result = before + 
          `<span class="grammar-error" title="${error.message}: ${error.suggestion}">${errorText}</span>` + 
          after;
        
        offset += `<span class="grammar-error" title="${error.message}: ${error.suggestion}"></span>`.length;
      });
      
      setCheckedText(result);
      setIsChecking(false);
    }, 1000);
  };

  const applySuggestion = (index: number) => {
    const error = errors[index];
    if (!error) return;
    
    const newText = text.substring(0, error.start) + 
      error.suggestion + 
      text.substring(error.end);
    
    setText(newText);
    
    // 重新检查语法
    handleCheckGrammar();
  };

  return (
    <div className="text-grammar-check">
      <div className="input-section">
        <h3>文本语法检查</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要检查语法的文本..."
          rows={6}
        />
        
        <button 
          className="check-button" 
          onClick={handleCheckGrammar}
          disabled={isChecking || !text}
        >
          {isChecking ? '检查中...' : '检查语法'}
        </button>
      </div>
      
      {errors.length > 0 && (
        <div className="errors-section">
          <h4>语法错误 ({errors.length}):</h4>
          <ul className="errors-list">
            {errors.map((error, index) => (
              <li key={index} className="error-item">
                <span className="error-message">{error.message}</span>
                <span className="error-text">"{text.substring(error.start, error.end)}"</span>
                <span className="error-suggestion">建议: "{error.suggestion}"</span>
                <button 
                  className="apply-button" 
                  onClick={() => applySuggestion(index)}
                >
                  应用建议
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {errors.length === 0 && checkedText && (
        <div className="no-errors-section">
          <h4>检查结果</h4>
          <p>未发现语法错误！</p>
        </div>
      )}
      
      {checkedText && (
        <div className="result-section">
          <h4>检查后的文本</h4>
          <div 
            className="checked-text"
            dangerouslySetInnerHTML={{ __html: checkedText }}
          />
        </div>
      )}
      
      <div className="info-section">
        <h4>使用说明</h4>
        <ul>
          <li>在文本框中输入要检查语法的文本</li>
          <li>点击"检查语法"按钮进行语法检查</li>
          <li>查看检查结果和错误建议</li>
          <li>点击"应用建议"按钮应用推荐的修改</li>
          <li>检查后的文本会显示错误标记</li>
        </ul>
      </div>
    </div>
  );
};

export default TextGrammarCheck;