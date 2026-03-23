import React, { useState } from 'react';
import './TextTranslate.css';

// 模拟语言列表
const languages = [
  { code: 'zh', name: '中文' },
  { code: 'en', name: '英语' },
  { code: 'ja', name: '日语' },
  { code: 'ko', name: '韩语' },
  { code: 'fr', name: '法语' },
  { code: 'de', name: '德语' },
  { code: 'es', name: '西班牙语' },
  { code: 'ru', name: '俄语' }
];

// 模拟翻译函数
const mockTranslate = (text: string, sourceLang: string, targetLang: string): string => {
  // 简单的模拟翻译，实际项目中应使用真实的翻译API
  if (sourceLang === targetLang) return text;
  
  const translations: Record<string, Record<string, string>> = {
    zh: {
      en: 'This is a mock translation from Chinese to English.',
      ja: 'これは中国語から日本語へのモック翻訳です。',
      ko: '이것은 중국어에서 일본어로의 모의 번역입니다.',
      fr: 'Ceci est une traduction mock du chinois vers langlais.',
      de: 'Dies ist eine Mock-Übersetzung vom Chinesischen ins Englische.',
      es: 'Esta es una traducción simulada del chino al inglés.',
      ru: 'Это имитация перевода с китайского на английский.'
    },
    en: {
      zh: '这是从英语到中文的模拟翻译。',
      ja: 'これは英語から日本語へのモック翻訳です。',
      ko: '이것은 영어에서 한국어로의 모의 번역입니다.',
      fr: 'Ceci est une traduction mock de langlais vers le chinois.',
      de: 'Dies ist eine Mock-Übersetzung vom Englischen ins Chinesische.',
      es: 'Esta es una traducción simulada del inglés al chino.',
      ru: 'Это имитация перевода с английского на китайский.'
    }
  };
  
  // 如果有对应语言的翻译，返回翻译结果
  if (translations[sourceLang] && translations[sourceLang][targetLang]) {
    return translations[sourceLang][targetLang];
  }
  
  // 否则返回一个通用的模拟翻译结果
  return `[模拟翻译] ${text} (${sourceLang} → ${targetLang})`;
};

const TextTranslate: React.FC = () => {
  const [sourceText, setSourceText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [sourceLang, setSourceLang] = useState<string>('zh');
  const [targetLang, setTargetLang] = useState<string>('en');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const handleTranslate = () => {
    if (!sourceText) return;
    
    setIsTranslating(true);
    
    // 模拟翻译延迟
    setTimeout(() => {
      const result = mockTranslate(sourceText, sourceLang, targetLang);
      setTranslatedText(result);
      setIsTranslating(false);
    }, 800);
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const copyToClipboard = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
    }
  };

  return (
    <div className="text-translate">
      <div className="translation-container">
        <div className="source-section">
          <div className="lang-selector">
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <button className="swap-button" onClick={swapLanguages}>
              ↕️
            </button>
          </div>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="请输入要翻译的文本..."
            rows={6}
          />
        </div>
        
        <div className="target-section">
          <div className="lang-selector">
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={translatedText}
            readOnly
            rows={6}
            placeholder="翻译结果将显示在这里..."
          />
          {translatedText && (
            <button className="copy-button" onClick={copyToClipboard}>
              复制结果
            </button>
          )}
        </div>
      </div>
      
      <div className="action-section">
        <button 
          className="translate-button" 
          onClick={handleTranslate}
          disabled={isTranslating || !sourceText}
        >
          {isTranslating ? '翻译中...' : '开始翻译'}
        </button>
      </div>
      
      <div className="info-section">
        <h4>使用说明</h4>
        <ul>
          <li>在左侧文本框中输入要翻译的文本</li>
          <li>选择源语言和目标语言</li>
          <li>点击"开始翻译"按钮进行翻译</li>
          <li>点击语言选择器之间的按钮可以交换源语言和目标语言</li>
          <li>翻译完成后，可以点击"复制结果"按钮复制翻译结果</li>
        </ul>
      </div>
    </div>
  );
};

export default TextTranslate;