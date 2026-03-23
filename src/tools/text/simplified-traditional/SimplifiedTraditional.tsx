import React, { useState } from 'react';
import './SimplifiedTraditional.css';

const SimplifiedTraditional: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  // 简繁转换映射表（简化版）
  const simplifiedToTraditional: Record<string, string> = {
    '的': '的',
    '了': '了',
    '和': '和',
    '是': '是',
    '在': '在',
    '有': '有',
    '我': '我',
    '他': '他',
    '她': '她',
    '它': '它',
    '你': '你',
    '这': '這',
    '那': '那',
    '上': '上',
    '下': '下',
    '前': '前',
    '后': '後',
    '来': '來',
    '去': '去',
    '里': '裡',
    '外': '外',
    '大': '大',
    '小': '小',
    '多': '多',
    '少': '少',
    '中': '中',
    '国': '國',
    '人': '人',
    '民': '民',
    '年': '年',
    '月': '月',
    '日': '日',
    '天': '天',
    '地': '地',
    '水': '水',
    '火': '火',
    '风': '風',
    '雨': '雨',
    '雪': '雪',
    '山': '山',
    '石': '石',
    '田': '田',
    '土': '土',
    '金': '金',
    '木': '木',
    '草': '草',
    '花': '花',
    '鸟': '鳥',
    '兽': '獸',
    '鱼': '魚',
    '虫': '蟲',
    '马': '馬',
    '牛': '牛',
    '羊': '羊',
    '狗': '狗',
    '猫': '貓',
    '鸡': '雞',
    '鸭': '鴨',
    '鹅': '鵝',
    '猪': '豬',
    '狗': '狗',
    '猫': '貓',
    '学': '學',
    '习': '習',
    '教': '教',
    '育': '育',
    '文': '文',
    '化': '化',
    '科': '科',
    '技': '技',
    '工': '工',
    '业': '業',
    '商': '商',
    '业': '業',
    '金': '金',
    '融': '融',
    '经': '經',
    '济': '濟',
    '政': '政',
    '治': '治',
    '法': '法',
    '律': '律',
    '军': '軍',
    '事': '事',
    '民': '民',
    '族': '族',
    '国': '國',
    '家': '家',
    '社': '社',
    '会': '會',
    '主': '主',
    '义': '義',
    '共': '共',
    '产': '產',
    '党': '黨',
    '人': '人',
    '民': '民',
    '代': '代',
    '表': '表',
    '大': '大',
    '会': '會',
    '人': '人',
    '民': '民',
    '政': '政',
    '府': '府',
    '国': '國',
    '务': '務',
    '院': '院',
  };

  const traditionalToSimplified: Record<string, string> = Object.fromEntries(
    Object.entries(simplifiedToTraditional).map(([key, value]) => [value, key])
  );

  const convertToTraditional = () => {
    let converted = '';
    for (let char of text) {
      converted += simplifiedToTraditional[char] || char;
    }
    setResult(converted);
  };

  const convertToSimplified = () => {
    let converted = '';
    for (let char of text) {
      converted += traditionalToSimplified[char] || char;
    }
    setResult(converted);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="simplified-traditional">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要转换的文本..."
          rows={10}
        />
        <div className="buttons">
          <button className="convert-button" onClick={convertToTraditional}>
            简体转繁体
          </button>
          <button className="convert-button" onClick={convertToSimplified}>
            繁体转简体
          </button>
        </div>
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

export default SimplifiedTraditional;