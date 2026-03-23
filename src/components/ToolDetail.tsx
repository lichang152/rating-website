import React from 'react';
import type { Tool } from '../types/tool';
import WordCount from '../tools/text/word-count/WordCount';
import RemoveDuplicates from '../tools/text/remove-duplicates/RemoveDuplicates';
import CaseConverter from '../tools/text/case-converter/CaseConverter';
import TextCompare from '../tools/text/text-compare/TextCompare';
import RegexTester from '../tools/text/regex-tester/RegexTester';
import Sort from '../tools/text/sort/Sort';
import Filter from '../tools/text/filter/Filter';
import TextReplace from '../tools/text/text-replace/TextReplace';
import TextReverse from '../tools/text/text-reverse/TextReverse';
import TextSplit from '../tools/text/text-split/TextSplit';
import TextMerge from '../tools/text/text-merge/TextMerge';
import RemoveEmptyLines from '../tools/text/remove-empty-lines/RemoveEmptyLines';
import TextTrim from '../tools/text/text-trim/TextTrim';
import TextAddPrefixSuffix from '../tools/text/text-add-prefix-suffix/TextAddPrefixSuffix';
import TextAlign from '../tools/text/text-align/TextAlign';
import TextCharacterCount from '../tools/text/text-character-count/TextCharacterCount';
import KeywordExtraction from '../tools/text/keyword-extraction/KeywordExtraction';
import TextSimilarity from '../tools/text/text-similarity/TextSimilarity';
import SimplifiedTraditional from '../tools/text/simplified-traditional/SimplifiedTraditional';
import TextPinyin from '../tools/text/text-pinyin/TextPinyin';
import RemoveHtml from '../tools/text/remove-html/RemoveHtml';
import MarkdownToHtml from '../tools/text/markdown-to-html/MarkdownToHtml';
import HtmlToMarkdown from '../tools/text/html-to-markdown/HtmlToMarkdown';
import TextEncrypt from '../tools/text/text-encrypt/TextEncrypt';
import TextSummary from '../tools/text/text-summary/TextSummary';
import SensitiveFilter from '../tools/text/sensitive-filter/SensitiveFilter';
import TextToSpeech from '../tools/text/text-to-speech/TextToSpeech';
import TextToQr from '../tools/text/text-to-qr/TextToQr';
import TextRandom from '../tools/text/text-random/TextRandom';
import TextToNumber from '../tools/text/text-to-number/TextToNumber';
import NumberToText from '../tools/text/number-to-text/NumberToText';
import TextToUnicode from '../tools/text/text-to-unicode/TextToUnicode';
import UnicodeToText from '../tools/text/unicode-to-text/UnicodeToText';
import TextToEntities from '../tools/text/text-to-entities/TextToEntities';
import EntitiesToText from '../tools/text/entities-to-text/EntitiesToText';
import TextToUrlSlug from '../tools/text/text-to-url-slug/TextToUrlSlug';
import UrlSlugToText from '../tools/text/url-slug-to-text/UrlSlugToText';
import TextFingerprint from '../tools/text/text-fingerprint/TextFingerprint';
import TextTokenize from '../tools/text/text-tokenize/TextTokenize';
import TextWordFrequency from '../tools/text/text-word-frequency/TextWordFrequency';
import TextClustering from '../tools/text/text-clustering/TextClustering';
import TextClassification from '../tools/text/text-classification/TextClassification';
import TextSentiment from '../tools/text/text-sentiment/TextSentiment';
import TextSpellCheck from '../tools/text/text-spell-check/TextSpellCheck';
import TextReadAloud from '../tools/text/text-read-aloud/TextReadAloud';
import TextTranslate from '../tools/text/text-translate/TextTranslate';
import TextGrammarCheck from '../tools/text/text-grammar-check/TextGrammarCheck';
import TextTypesetting from '../tools/text/text-typesetting/TextTypesetting';
import TextAes from '../tools/text/text-aes/TextAes';
import TextSignature from '../tools/text/text-signature/TextSignature';
import TextValidation from '../tools/text/text-validation/TextValidation';
import TextCompress from '../tools/text/text-compress/TextCompress';
import TextToPdf from '../tools/text/text-to-pdf/TextToPdf';
import PdfToText from '../tools/text/text-pdf-to-text/PdfToText';
import TextToImage from '../tools/text/text-to-image/TextToImage';
import ImageToText from '../tools/text/text-image-to-text/ImageToText';
import TextSideBySideCompare from '../tools/text/text-side-by-side-compare/TextSideBySideCompare';
import TextMergeWithSeparator from '../tools/text/text-merge-with-separator/TextMergeWithSeparator';
import JsonFormatter from '../tools/dev/json-formatter/JsonFormatter';
import JsonValidator from '../tools/dev/json-validator/JsonValidator';
import Base64 from '../tools/dev/base64/Base64';
import JsonToXml from '../tools/dev/json-to-xml/JsonToXml';
import XmlToJson from '../tools/dev/xml-to-json/XmlToJson';
import QRCodeGenerator from '../tools/media/qr-generator/QRCodeGenerator';
import ImageFormatConverter from '../tools/media/image-format-converter/ImageFormatConverter';
import ImageWatermark from '../tools/media/image-watermark/ImageWatermark';
import DateCalculator from '../tools/life/date-calculator/DateCalculator';
import AgeCalculator from '../tools/life/age-calculator/AgeCalculator';
import UnitConverter from '../tools/life/unit-converter/UnitConverter';
import PasswordGenerator from '../tools/life/password-generator/PasswordGenerator';
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
import '../tools/text/text-replace/TextReplace.css';
import '../tools/text/text-reverse/TextReverse.css';
import '../tools/text/text-split/TextSplit.css';
import '../tools/text/text-merge/TextMerge.css';
import '../tools/text/remove-empty-lines/RemoveEmptyLines.css';
import '../tools/text/text-trim/TextTrim.css';
import '../tools/text/text-add-prefix-suffix/TextAddPrefixSuffix.css';
import '../tools/text/text-align/TextAlign.css';
import '../tools/text/text-character-count/TextCharacterCount.css';
import '../tools/text/keyword-extraction/KeywordExtraction.css';
import '../tools/text/text-similarity/TextSimilarity.css';
import '../tools/text/simplified-traditional/SimplifiedTraditional.css';
import '../tools/text/text-pinyin/TextPinyin.css';
import '../tools/text/remove-html/RemoveHtml.css';
import '../tools/text/markdown-to-html/MarkdownToHtml.css';
import '../tools/text/html-to-markdown/HtmlToMarkdown.css';
import '../tools/text/text-encrypt/TextEncrypt.css';
import '../tools/text/text-summary/TextSummary.css';
import '../tools/text/sensitive-filter/SensitiveFilter.css';
import '../tools/text/text-to-speech/TextToSpeech.css';
import '../tools/text/text-to-qr/TextToQr.css';
import '../tools/text/text-random/TextRandom.css';
import '../tools/text/text-to-number/TextToNumber.css';
import '../tools/text/number-to-text/NumberToText.css';
import '../tools/text/text-to-unicode/TextToUnicode.css';
import '../tools/text/unicode-to-text/UnicodeToText.css';
import '../tools/text/text-to-entities/TextToEntities.css';
import '../tools/text/entities-to-text/EntitiesToText.css';
import '../tools/text/text-to-url-slug/TextToUrlSlug.css';
import '../tools/text/url-slug-to-text/UrlSlugToText.css';
import '../tools/text/text-fingerprint/TextFingerprint.css';
import '../tools/text/text-tokenize/TextTokenize.css';
import '../tools/text/text-word-frequency/TextWordFrequency.css';
import '../tools/text/text-clustering/TextClustering.css';
import '../tools/text/text-classification/TextClassification.css';
import '../tools/text/text-sentiment/TextSentiment.css';
import '../tools/text/text-spell-check/TextSpellCheck.css';
import '../tools/text/text-read-aloud/TextReadAloud.css';
import '../tools/text/text-translate/TextTranslate.css';
import '../tools/text/text-grammar-check/TextGrammarCheck.css';
import '../tools/text/text-typesetting/TextTypesetting.css';
import '../tools/text/text-aes/TextAes.css';
import '../tools/text/text-signature/TextSignature.css';
import '../tools/text/text-validation/TextValidation.css';
import '../tools/text/text-compress/TextCompress.css';
import '../tools/text/text-to-pdf/TextToPdf.css';
import '../tools/text/text-pdf-to-text/PdfToText.css';
import '../tools/text/text-to-image/TextToImage.css';
import '../tools/text/text-image-to-text/ImageToText.css';
import '../tools/text/text-side-by-side-compare/TextSideBySideCompare.css';
import '../tools/text/text-merge-with-separator/TextMergeWithSeparator.css';
import '../tools/dev/json-formatter/JsonFormatter.css';
import '../tools/dev/json-validator/JsonValidator.css';
import '../tools/dev/base64/Base64.css';
import '../tools/dev/json-to-xml/JsonToXml.css';
import '../tools/dev/xml-to-json/XmlToJson.css';
import '../tools/media/qr-generator/QRCodeGenerator.css';
import '../tools/media/image-format-converter/ImageFormatConverter.css';
import '../tools/media/image-watermark/ImageWatermark.css';
import '../tools/life/date-calculator/DateCalculator.css';
import '../tools/life/age-calculator/AgeCalculator.css';
import '../tools/life/unit-converter/UnitConverter.css';
import '../tools/life/password-generator/PasswordGenerator.css';
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
      case 'text-replace':
        return <TextReplace />;
      case 'text-reverse':
        return <TextReverse />;
      case 'text-split':
        return <TextSplit />;
      case 'text-merge':
        return <TextMerge />;
      case 'text-remove-empty-lines':
        return <RemoveEmptyLines />;
      case 'text-trim':
        return <TextTrim />;
      case 'text-add-prefix-suffix':
        return <TextAddPrefixSuffix />;
      case 'text-align':
        return <TextAlign />;
      case 'text-character-count':
        return <TextCharacterCount />;
      case 'text-keyword-extraction':
        return <KeywordExtraction />;
      case 'text-similarity':
        return <TextSimilarity />;
      case 'text-simplified-traditional':
        return <SimplifiedTraditional />;
      case 'text-pinyin':
        return <TextPinyin />;
      case 'text-remove-html':
        return <RemoveHtml />;
      case 'text-markdown-to-html':
        return <MarkdownToHtml />;
      case 'text-html-to-markdown':
        return <HtmlToMarkdown />;
      case 'text-encrypt':
        return <TextEncrypt />;
      case 'text-summary':
        return <TextSummary />;
      case 'text-sensitive-filter':
        return <SensitiveFilter />;
      case 'text-to-speech':
        return <TextToSpeech />;
      case 'text-to-qr':
        return <TextToQr />;
      case 'text-random':
        return <TextRandom />;
      case 'text-to-number':
        return <TextToNumber />;
      case 'text-number-to-text':
        return <NumberToText />;
      case 'text-to-unicode':
        return <TextToUnicode />;
      case 'text-unicode-to-text':
        return <UnicodeToText />;
      case 'text-to-entities':
        return <TextToEntities />;
      case 'text-entities-to-text':
        return <EntitiesToText />;
      case 'text-to-url-slug':
        return <TextToUrlSlug />;
      case 'text-url-slug-to-text':
        return <UrlSlugToText />;
      case 'text-fingerprint':
        return <TextFingerprint />;
      case 'text-tokenize':
        return <TextTokenize />;
      case 'text-word-frequency':
        return <TextWordFrequency />;
      case 'text-clustering':
        return <TextClustering />;
      case 'text-classification':
        return <TextClassification />;
      case 'text-sentiment':
        return <TextSentiment />;
      case 'text-spell-check':
        return <TextSpellCheck />;
      case 'text-read-aloud':
        return <TextReadAloud />;
      case 'text-translate':
        return <TextTranslate />;
      case 'text-grammar-check':
        return <TextGrammarCheck />;
      case 'text-typesetting':
        return <TextTypesetting />;
      case 'text-aes':
        return <TextAes />;
      case 'text-signature':
        return <TextSignature />;
      case 'text-validation':
        return <TextValidation />;
      case 'text-compress':
        return <TextCompress />;
      case 'text-to-pdf':
        return <TextToPdf />;
      case 'text-pdf-to-text':
        return <PdfToText />;
      case 'text-to-image':
        return <TextToImage />;
      case 'text-image-to-text':
        return <ImageToText />;
      case 'text-side-by-side-compare':
        return <TextSideBySideCompare />;
      case 'text-merge-with-separator':
        return <TextMergeWithSeparator />;
      case 'dev-json-formatter':
        return <JsonFormatter />;
      case 'dev-json-validator':
        return <JsonValidator />;
      case 'dev-base64':
        return <Base64 />;
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
      case 'life-age-calculator':
        return <AgeCalculator />;
      case 'life-unit-converter':
        return <UnitConverter />;
      case 'life-password-generator':
        return <PasswordGenerator />;
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
