import React from 'react';
import type { Tool } from '../types/tool';
import WordCount from '../tools/text/word-count/WordCount';
import RemoveDuplicates from '../tools/text/remove-duplicates/RemoveDuplicates';
import CaseConverter from '../tools/text/case-converter/CaseConverter';
import TextCompare from '../tools/text/text-compare/TextCompare';
import RegexTester from '../tools/text/regex-tester/RegexTester';
import Sort from '../tools/text/sort/Sort';
import Filter from '../tools/text/filter/Filter';
import JsonFormatter from '../tools/dev/json-formatter/JsonFormatter';
import JsonToXml from '../tools/dev/json-to-xml/JsonToXml';
import XmlToJson from '../tools/dev/xml-to-json/XmlToJson';
import QRCodeGenerator from '../tools/media/qr-generator/QRCodeGenerator';
import ImageFormatConverter from '../tools/media/image-format-converter/ImageFormatConverter';
import ImageWatermark from '../tools/media/image-watermark/ImageWatermark';
import DateCalculator from '../tools/life/date-calculator/DateCalculator';
import TxtReader from '../tools/novel/txt-reader/TxtReader';
import ChapterSplit from '../tools/novel/chapter-split/ChapterSplit';
import ReadingProgress from '../tools/novel/reading-progress/ReadingProgress';
import ScientificCalculator from '../tools/data/scientific-calculator/ScientificCalculator';
import MatrixCalculator from '../tools/data/matrix-calculator/MatrixCalculator';
import MD5Hash from '../tools/crypto/md5/MD5Hash';
import SHAHash from '../tools/crypto/sha/SHAHash';
import AES from '../tools/crypto/aes/AES';
import '../tools/text/word-count/WordCount.css';
import '../tools/text/remove-duplicates/RemoveDuplicates.css';
import '../tools/text/case-converter/CaseConverter.css';
import '../tools/text/text-compare/TextCompare.css';
import '../tools/text/regex-tester/RegexTester.css';
import '../tools/text/sort/Sort.css';
import '../tools/text/filter/Filter.css';
import '../tools/dev/json-formatter/JsonFormatter.css';
import '../tools/dev/json-to-xml/JsonToXml.css';
import '../tools/dev/xml-to-json/XmlToJson.css';
import '../tools/media/qr-generator/QRCodeGenerator.css';
import '../tools/media/image-format-converter/ImageFormatConverter.css';
import '../tools/media/image-watermark/ImageWatermark.css';
import '../tools/life/date-calculator/DateCalculator.css';
import '../tools/novel/txt-reader/TxtReader.css';
import '../tools/novel/chapter-split/ChapterSplit.css';
import '../tools/novel/reading-progress/ReadingProgress.css';
import '../tools/data/scientific-calculator/ScientificCalculator.css';
import '../tools/data/matrix-calculator/MatrixCalculator.css';
import '../tools/crypto/md5/MD5Hash.css';
import '../tools/crypto/sha/SHAHash.css';
import '../tools/crypto/aes/AES.css';

interface ToolDetailProps {
  tool: Tool | null;
  onBack: () => void;
}

const ToolDetail: React.FC<ToolDetailProps> = ({ tool, onBack }) => {
  if (!tool) {
    return null;
  }

  const renderToolComponent = () => {
    switch (tool.id) {
      case 'text-word-count':
        return <WordCount />;
      case 'text-remove-duplicates':
        return <RemoveDuplicates />;
      case 'text-case-converter':
        return <CaseConverter />;
      case 'text-compare':
        return <TextCompare />;
      case 'text-regex-tester':
        return <RegexTester />;
      case 'text-sort':
        return <Sort />;
      case 'text-filter':
        return <Filter />;
      case 'dev-json-formatter':
        return <JsonFormatter />;
      case 'dev-json-to-xml':
        return <JsonToXml />;
      case 'dev-xml-to-json':
        return <XmlToJson />;
      case 'media-qr-generator':
        return <QRCodeGenerator />;
      case 'media-image-format-converter':
        return <ImageFormatConverter />;
      case 'media-image-watermark':
        return <ImageWatermark />;
      case 'life-date-calculator':
        return <DateCalculator />;
      case 'novel-txt-reader':
        return <TxtReader />;
      case 'novel-chapter-split':
        return <ChapterSplit />;
      case 'novel-reading-progress':
        return <ReadingProgress />;
      case 'data-scientific-calculator':
        return <ScientificCalculator />;
      case 'data-matrix-calculator':
        return <MatrixCalculator />;
      case 'crypto-md5':
        return <MD5Hash />;
      case 'crypto-sha':
        return <SHAHash />;
      case 'crypto-aes':
        return <AES />;
      default:
        return (
          <div className="placeholder">
            <p>工具功能正在开发中...</p>
          </div>
        );
    }
  };

  return (
    <div className="tool-detail">
      <button className="back-button" onClick={onBack}>
        ← 返回工具列表
      </button>
      <div className="tool-header">
        <div className="tool-icon-large">{tool.icon}</div>
        <h2>{tool.name}</h2>
        <p>{tool.description}</p>
      </div>
      <div className="tool-content">
        {renderToolComponent()}
      </div>
    </div>
  );
};

export default ToolDetail;
