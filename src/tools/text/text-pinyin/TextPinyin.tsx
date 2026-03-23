import React, { useState } from 'react';
import './TextPinyin.css';

const TextPinyin: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [withTone, setWithTone] = useState(true);
  const [firstLetterOnly, setFirstLetterOnly] = useState(false);

  // 简单的汉字转拼音映射（简化版）
  const chineseToPinyin: Record<string, string> = {
    '一': 'yī',
    '二': 'èr',
    '三': 'sān',
    '四': 'sì',
    '五': 'wǔ',
    '六': 'liù',
    '七': 'qī',
    '八': 'bā',
    '九': 'jiǔ',
    '十': 'shí',
    '百': 'bǎi',
    '千': 'qiān',
    '万': 'wàn',
    '亿': 'yì',
    '人': 'rén',
    '口': 'kǒu',
    '日': 'rì',
    '月': 'yuè',
    '水': 'shuǐ',
    '火': 'huǒ',
    '土': 'tǔ',
    '金': 'jīn',
    '木': 'mù',
    '草': 'cǎo',
    '花': 'huā',
    '鸟': 'niǎo',
    '鱼': 'yú',
    '虫': 'chóng',
    '马': 'mǎ',
    '牛': 'niú',
    '羊': 'yáng',
    '狗': 'gǒu',
    '猫': 'māo',
    '鸡': 'jī',
    '鸭': 'yā',
    '鹅': 'é',
    '猪': 'zhū',
    '父': 'fù',
    '母': 'mǔ',
    '子': 'zǐ',
    '女': 'nǚ',
    '兄': 'xiōng',
    '弟': 'dì',
    '姐': 'jiě',
    '妹': 'mèi',
    '天': 'tiān',
    '地': 'dì',
    '风': 'fēng',
    '雨': 'yǔ',
    '雪': 'xuě',
    '山': 'shān',
    '石': 'shí',
    '田': 'tián',
    '河': 'hé',
    '海': 'hǎi',
    '湖': 'hú',
    '江': 'jiāng',
    '城': 'chéng',
    '市': 'shì',
    '乡': 'xiāng',
    '村': 'cūn',
    '学': 'xué',
    '校': 'xiào',
    '教': 'jiào',
    '师': 'shī',
    '生': 'shēng',
    '书': 'shū',
    '本': 'běn',
    '笔': 'bǐ',
    '纸': 'zhǐ',
    '墨': 'mò',
    '文': 'wén',
    '字': 'zì',
    '词': 'cí',
    '句': 'jù',
    '章': 'zhāng',
    '语': 'yǔ',
    '言': 'yán',
    '汉': 'hàn',
    '英': 'yīng',
    '法': 'fǎ',
    '德': 'dé',
    '日': 'rì',
    '韩': 'hán',
    '俄': 'é',
    '西': 'xī',
    '葡': 'pú',
    '意': 'yì',
    '希': 'xī',
    '拉': 'lā',
  };

  const convertToPinyin = () => {
    let converted = '';
    for (let char of text) {
      if (chineseToPinyin[char]) {
        let pinyin = chineseToPinyin[char];
        if (!withTone) {
          // 移除声调
          pinyin = pinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]/g, (match) => {
            return match.charAt(0);
          });
        }
        if (firstLetterOnly) {
          converted += pinyin.charAt(0).toUpperCase();
        } else {
          converted += pinyin + ' ';
        }
      } else {
        converted += char;
      }
    }
    setResult(converted.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="text-pinyin">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要转换的汉字..."
          rows={10}
        />
        <div className="settings">
          <label>
            <input
              type="checkbox"
              checked={withTone}
              onChange={(e) => setWithTone(e.target.checked)}
            />
            保留声调
          </label>
          <label>
            <input
              type="checkbox"
              checked={firstLetterOnly}
              onChange={(e) => setFirstLetterOnly(e.target.checked)}
            />
            只显示首字母
          </label>
        </div>
        <button className="convert-button" onClick={convertToPinyin}>
          转换为拼音
        </button>
      </div>
      <div className="output-section">
        <h3>转换结果</h3>
        <textarea
          value={result}
          readOnly
          rows={10}
        />
        {result && (
          <button className="copy-button" onClick={copyToClipboard}>
            复制结果
          </button>
        )}
      </div>
    </div>
  );
};

export default TextPinyin;