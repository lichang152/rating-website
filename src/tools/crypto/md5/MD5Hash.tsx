import React, { useState } from 'react';

const MD5Hash: React.FC = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  const calculateMD5 = (text: string): string => {
    const md5 = (string: string): string => {
      function rotateLeft(n: number, s: number): number {
        return (n << s) | (n >>> (32 - s));
      }

      function addUnsigned(x: number, y: number): number {
        const lsw = (x & 0xffff) + (y & 0xffff);
        const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xffff);
      }

      function F(x: number, y: number, z: number): number {
        return (x & y) | ((~x) & z);
      }

      function G(x: number, y: number, z: number): number {
        return (x & z) | (y & (~z));
      }

      function H(x: number, y: number, z: number): number {
        return x ^ y ^ z;
      }

      function I(x: number, y: number, z: number): number {
        return y ^ (x | (~z));
      }

      function FF(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
      }

      function GG(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
      }

      function HH(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
      }

      function II(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
      }

      function convertToWordArray(string: string): number[] {
        const l = string.length * 8;
        const result: number[] = [];
        for (let i = 0; i < l; i += 8) {
          result[i >> 5] |= (string.charCodeAt(i / 8) & 0xff) << (24 - i % 32);
        }
        result[l >> 5] |= 0x80 << (24 - l % 32);
        result[((l + 64) >>> 9 << 4) + 15] = l;
        return result;
      }

      function wordToHex(word: number): string {
        const hexTab = '0123456789abcdef';
        let str = '';
        for (let j = 0; j <= 3; j++) {
          str += hexTab.charAt((word >> (j * 8 + 4)) & 0x0f) + hexTab.charAt((word >> (j * 8)) & 0x0f);
        }
        return str;
      }

      const x = convertToWordArray(string);
      const a0 = 0x67452301;
      const b0 = 0xefcdab89;
      const c0 = 0x98badcfe;
      const d0 = 0x10325476;

      let a = a0;
      let b = b0;
      let c = c0;
      let d = d0;

      for (let i = 0; i < x.length; i += 16) {
        const aa = a;
        const bb = b;
        const cc = c;
        const dd = d;

        a = FF(a, b, c, d, x[i], 7, 0xd76aa478);
        d = FF(d, a, b, c, x[i + 1], 12, 0xe8c7b756);
        c = FF(c, d, a, b, x[i + 2], 17, 0x242070db);
        b = FF(b, c, d, a, x[i + 3], 22, 0xc1bdceee);
        a = FF(a, b, c, d, x[i + 4], 7, 0xf57c0faf);
        d = FF(d, a, b, c, x[i + 5], 12, 0x4787c62a);
        c = FF(c, d, a, b, x[i + 6], 17, 0xa8304613);
        b = FF(b, c, d, a, x[i + 7], 22, 0xfd469501);
        a = FF(a, b, c, d, x[i + 8], 7, 0x698098d8);
        d = FF(d, a, b, c, x[i + 9], 12, 0x8b44f7af);
        c = FF(c, d, a, b, x[i + 10], 17, 0xffff5bb1);
        b = FF(b, c, d, a, x[i + 11], 22, 0x895cd7be);
        a = FF(a, b, c, d, x[i + 12], 7, 0x6b901122);
        d = FF(d, a, b, c, x[i + 13], 12, 0xfd987193);
        c = FF(c, d, a, b, x[i + 14], 17, 0xa679438e);
        b = FF(b, c, d, a, x[i + 15], 22, 0x49b40821);

        a = GG(a, b, c, d, x[i + 1], 5, 0xf61e2562);
        d = GG(d, a, b, c, x[i + 6], 9, 0xc040b340);
        c = GG(c, d, a, b, x[i + 11], 14, 0x265e5a51);
        b = GG(b, c, d, a, x[i], 20, 0xe9b6c7aa);
        a = GG(a, b, c, d, x[i + 5], 5, 0xd62f105d);
        d = GG(d, a, b, c, x[i + 10], 9, 0x02441453);
        c = GG(c, d, a, b, x[i + 15], 14, 0xd8a1e681);
        b = GG(b, c, d, a, x[i + 4], 20, 0xe7d3fbc8);
        a = GG(a, b, c, d, x[i + 9], 5, 0x21e1cde6);
        d = GG(d, a, b, c, x[i + 14], 9, 0xc33707d6);
        c = GG(c, d, a, b, x[i + 3], 14, 0xf4d50d87);
        b = GG(b, c, d, a, x[i + 8], 20, 0x455a14ed);
        a = GG(a, b, c, d, x[i + 13], 5, 0xa9e3e905);
        d = GG(d, a, b, c, x[i + 2], 9, 0xfcefa3f8);
        c = GG(c, d, a, b, x[i + 7], 14, 0x676f02d9);
        b = GG(b, c, d, a, x[i + 12], 20, 0x8d2a4c8a);

        a = HH(a, b, c, d, x[i + 5], 4, 0xfffa3942);
        d = HH(d, a, b, c, x[i + 8], 11, 0x8771f681);
        c = HH(c, d, a, b, x[i + 11], 16, 0x6d9d6122);
        b = HH(b, c, d, a, x[i + 14], 23, 0xfde5380c);
        a = HH(a, b, c, d, x[i + 1], 4, 0xa4beea44);
        d = HH(d, a, b, c, x[i + 4], 11, 0x4bdecfa9);
        c = HH(c, d, a, b, x[i + 7], 16, 0xf6bb4b60);
        b = HH(b, c, d, a, x[i + 10], 23, 0xbebfbc70);
        a = HH(a, b, c, d, x[i + 13], 4, 0x289b7ec6);
        d = HH(d, a, b, c, x[i], 11, 0xeaa127fa);
        c = HH(c, d, a, b, x[i + 3], 16, 0xd4ef3085);
        b = HH(b, c, d, a, x[i + 6], 23, 0x04881d05);
        a = HH(a, b, c, d, x[i + 9], 4, 0xd9d4d039);
        d = HH(d, a, b, c, x[i + 12], 11, 0xe6db99e5);
        c = HH(c, d, a, b, x[i + 15], 16, 0x1fa27cf8);
        b = HH(b, c, d, a, x[i + 2], 23, 0xc4ac5665);

        a = II(a, b, c, d, x[i], 6, 0xf4292244);
        d = II(d, a, b, c, x[i + 7], 10, 0x432aff97);
        c = II(c, d, a, b, x[i + 14], 15, 0xab9423a7);
        b = II(b, c, d, a, x[i + 5], 21, 0xfc93a039);
        a = II(a, b, c, d, x[i + 12], 6, 0x655b59c3);
        d = II(d, a, b, c, x[i + 3], 10, 0x8f0ccc92);
        c = II(c, d, a, b, x[i + 10], 15, 0xffeff47d);
        b = II(b, c, d, a, x[i + 1], 21, 0x85845dd1);
        a = II(a, b, c, d, x[i + 8], 6, 0x6fa87e4f);
        d = II(d, a, b, c, x[i + 15], 10, 0xfe2ce6e0);
        c = II(c, d, a, b, x[i + 6], 15, 0xa3014314);
        b = II(b, c, d, a, x[i + 13], 21, 0x4e0811a1);
        a = II(a, b, c, d, x[i + 4], 6, 0xf7537e82);
        d = II(d, a, b, c, x[i + 11], 10, 0xbd3af235);
        c = II(c, d, a, b, x[i + 2], 15, 0x2ad7d2bb);
        b = II(b, c, d, a, x[i + 9], 21, 0xeb86d391);

        a = addUnsigned(a, aa);
        b = addUnsigned(b, bb);
        c = addUnsigned(c, cc);
        d = addUnsigned(d, dd);
      }

      return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
    };

    return md5(text);
  };

  const handleCalculate = () => {
    if (input) {
      const md5Hash = calculateMD5(input);
      setHash(md5Hash);
    } else {
      setHash('');
    }
  };

  const handleCopy = () => {
    if (hash) {
      navigator.clipboard.writeText(hash);
      alert('MD5哈希已复制到剪贴板');
    }
  };

  return (
    <div className="md5-hash">
      <div className="input-section">
        <h3>输入文本</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入要计算MD5哈希的文本..."
          rows={5}
        />
      </div>

      <button 
        className="calculate-button"
        onClick={handleCalculate}
        disabled={!input}
      >
        计算MD5哈希
      </button>

      {hash && (
        <div className="result-section">
          <h3>MD5哈希结果</h3>
          <div className="hash-result">
            <code>{hash}</code>
            <button 
              className="copy-button"
              onClick={handleCopy}
            >
              复制
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MD5Hash;