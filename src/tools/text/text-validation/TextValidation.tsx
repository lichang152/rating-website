import React, { useState } from 'react';
import './TextValidation.css';

interface ValidationRule {
  id: string;
  name: string;
  pattern: RegExp;
  message: string;
}

const TextValidation: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [validationType, setValidationType] = useState<string>('email');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationMessage, setValidationMessage] = useState<string>('');

  // 验证规则
  const validationRules: ValidationRule[] = [
    {
      id: 'email',
      name: '邮箱地址',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '请输入有效的邮箱地址'
    },
    {
      id: 'phone',
      name: '手机号码',
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入有效的手机号码'
    },
    {
      id: 'idcard',
      name: '身份证号码',
      pattern: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/,
      message: '请输入有效的身份证号码'
    },
    {
      id: 'url',
      name: 'URL地址',
      pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      message: '请输入有效的URL地址'
    },
    {
      id: 'password',
      name: '强密码',
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: '密码至少8位，包含大小写字母、数字和特殊字符'
    },
    {
      id: 'date',
      name: '日期格式 (YYYY-MM-DD)',
      pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      message: '请输入有效的日期格式 (YYYY-MM-DD)'
    },
    {
      id: 'time',
      name: '时间格式 (HH:MM:SS)',
      pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
      message: '请输入有效的时间格式 (HH:MM:SS)'
    },
    {
      id: 'ip',
      name: 'IP地址',
      pattern: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      message: '请输入有效的IP地址'
    }
  ];

  const validateText = () => {
    if (!text) {
      setIsValid(null);
      setValidationMessage('');
      return;
    }

    const rule = validationRules.find(r => r.id === validationType);
    if (rule) {
      const isValidResult = rule.pattern.test(text);
      setIsValid(isValidResult);
      setValidationMessage(isValidResult ? '验证通过！' : rule.message);
    }
  };

  return (
    <div className="text-validation">
      <h3>文本校验</h3>
      
      <div className="input-section">
        <div className="form-group">
          <label>校验类型：</label>
          <select
            value={validationType}
            onChange={(e) => {
              setValidationType(e.target.value);
              setIsValid(null);
              setValidationMessage('');
            }}
          >
            {validationRules.map(rule => (
              <option key={rule.id} value={rule.id}>
                {rule.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>待校验文本：</label>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setIsValid(null);
              setValidationMessage('');
            }}
            placeholder={`请输入${validationRules.find(r => r.id === validationType)?.name}...`}
          />
        </div>
        
        <button 
          className="validate-button" 
          onClick={validateText}
          disabled={!text}
        >
          开始校验
        </button>
      </div>
      
      {isValid !== null && (
        <div className={`result-section ${isValid ? 'valid' : 'invalid'}`}>
          <h4>校验结果：</h4>
          <p className="validation-message">{validationMessage}</p>
        </div>
      )}
      
      <div className="info-section">
        <h4>使用说明</h4>
        <ul>
          <li>选择要校验的文本类型</li>
          <li>输入待校验的文本</li>
          <li>点击"开始校验"按钮进行验证</li>
          <li>查看校验结果</li>
        </ul>
      </div>
    </div>
  );
};

export default TextValidation;