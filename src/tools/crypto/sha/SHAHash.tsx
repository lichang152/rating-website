import React, { useState } from 'react';

const SHAHash: React.FC = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA-256');

  const calculateSHA = (text: string, algo: string): string => {
    const sha = (string: string, algorithm: string): string => {
      function utf8Encode(string: string): string {
        string = string.replace(/\r\n/g, '\n');
        let utftext = '';
        for (let n = 0; n < string.length; n++) {
          const c = string.charCodeAt(n);
          if (c < 128) {
            utftext += String.fromCharCode(c);
          } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
          } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
          }
        }
        return utftext;
      }

      function rotateRight(n: number, s: number): number {
        return (n >>> s) | (n << (32 - s));
      }

      function choice(x: number, y: number, z: number): number {
        return (x & y) ^ ((~x) & z);
      }

      function majority(x: number, y: number, z: number): number {
        return (x & y) ^ (x & z) ^ (y & z);
      }

      function sha1ChunkProcessing(a: number, b: number, c: number, d: number, e: number, w: number[], K: number[], R: number[]): [number, number, number, number, number] {
        for (let i = 0; i < 80; i++) {
          let f: number;
          let k: number;
          if (i < 20) {
            f = choice(b, c, d);
            k = K[0];
          } else if (i < 40) {
            f = b ^ c ^ d;
            k = K[1];
          } else if (i < 60) {
            f = majority(b, c, d);
            k = K[2];
          } else {
            f = b ^ c ^ d;
            k = K[3];
          }
          const temp = (rotateRight(a, 5) + f + e + k + w[i]) & 0xffffffff;
          e = d;
          d = c;
          c = rotateRight(b, 30);
          b = a;
          a = temp;
        }
        return [(a + R[0]) & 0xffffffff, (b + R[1]) & 0xffffffff, (c + R[2]) & 0xffffffff, (d + R[3]) & 0xffffffff, (e + R[4]) & 0xffffffff];
      }

      function sha256ChunkProcessing(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, w: number[], K: number[]): [number, number, number, number, number, number, number, number] {
        for (let i = 0; i < 64; i++) {
          const s1 = rotateRight(e, 6) ^ rotateRight(e, 11) ^ rotateRight(e, 25);
          const ch = (e & f) ^ ((~e) & g);
          const temp1 = (h + s1 + ch + K[i] + w[i]) & 0xffffffff;
          const s0 = rotateRight(a, 2) ^ rotateRight(a, 13) ^ rotateRight(a, 22);
          const maj = (a & b) ^ (a & c) ^ (b & c);
          const temp2 = (s0 + maj) & 0xffffffff;

          h = g;
          g = f;
          f = e;
          e = (d + temp1) & 0xffffffff;
          d = c;
          c = b;
          b = a;
          a = (temp1 + temp2) & 0xffffffff;
        }
        return [(a + h) & 0xffffffff, (b + h) & 0xffffffff, (c + h) & 0xffffffff, (d + h) & 0xffffffff, (e + h) & 0xffffffff, (f + h) & 0xffffffff, (g + h) & 0xffffffff, (h + h) & 0xffffffff];
      }

      function wordToHex(word: number): string {
        const hexTab = '0123456789abcdef';
        let str = '';
        for (let j = 0; j <= 3; j++) {
          str += hexTab.charAt((word >> (j * 8 + 4)) & 0x0f) + hexTab.charAt((word >> (j * 8)) & 0x0f);
        }
        return str;
      }

      function sha1(string: string): string {
        const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
        let R = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

        string = utf8Encode(string);
        const l = string.length * 8;
        let padding = '';
        padding += String.fromCharCode(0x80);
        while (((string.length + padding.length) * 8) % 512 !== 448) {
          padding += String.fromCharCode(0x00);
        }
        for (let i = 0; i < 8; i++) {
          padding += String.fromCharCode((l >>> (i * 8)) & 0xff);
        }

        const chunks = (string + padding).match(/.{1,64}/g) || [];
        for (const chunk of chunks) {
          const w: number[] = [];
          for (let i = 0; i < 16; i++) {
            w.push((chunk.charCodeAt(i * 4) << 24) | (chunk.charCodeAt(i * 4 + 1) << 16) | (chunk.charCodeAt(i * 4 + 2) << 8) | chunk.charCodeAt(i * 4 + 3));
          }
          for (let i = 16; i < 80; i++) {
            w[i] = rotateRight(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
          }
          [R[0], R[1], R[2], R[3], R[4]] = sha1ChunkProcessing(R[0], R[1], R[2], R[3], R[4], w, K, R);
        }

        return wordToHex(R[0]) + wordToHex(R[1]) + wordToHex(R[2]) + wordToHex(R[3]) + wordToHex(R[4]);
      }

      function sha256(string: string): string {
        const K = [
          0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
          0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
          0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
          0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
          0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
          0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
          0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
          0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ];
        let R = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];

        string = utf8Encode(string);
        const l = string.length * 8;
        let padding = '';
        padding += String.fromCharCode(0x80);
        while (((string.length + padding.length) * 8) % 512 !== 448) {
          padding += String.fromCharCode(0x00);
        }
        for (let i = 0; i < 8; i++) {
          padding += String.fromCharCode((l >>> (i * 8)) & 0xff);
        }

        const chunks = (string + padding).match(/.{1,64}/g) || [];
        for (const chunk of chunks) {
          const w: number[] = [];
          for (let i = 0; i < 16; i++) {
            w.push((chunk.charCodeAt(i * 4) << 24) | (chunk.charCodeAt(i * 4 + 1) << 16) | (chunk.charCodeAt(i * 4 + 2) << 8) | chunk.charCodeAt(i * 4 + 3));
          }
          for (let i = 16; i < 64; i++) {
            const s0: number = rotateRight(w[i - 15], 7) ^ rotateRight(w[i - 15], 18) ^ (w[i - 15] >>> 3);
            const s1: number = rotateRight(w[i - 2], 17) ^ rotateRight(w[i - 2], 19) ^ (w[i - 2] >>> 10);
            w[i] = (w[i - 16] + s0 + w[i - 7] + s1) & 0xffffffff;
          }
          [R[0], R[1], R[2], R[3], R[4], R[5], R[6], R[7]] = sha256ChunkProcessing(R[0], R[1], R[2], R[3], R[4], R[5], R[6], R[7], w, K);
        }

        return wordToHex(R[0]) + wordToHex(R[1]) + wordToHex(R[2]) + wordToHex(R[3]) + wordToHex(R[4]) + wordToHex(R[5]) + wordToHex(R[6]) + wordToHex(R[7]);
      }

      switch (algorithm) {
        case 'SHA-1':
          return sha1(string);
        case 'SHA-256':
          return sha256(string);
        default:
          return sha256(string);
      }
    };

    return sha(text, algo);
  };

  const handleCalculate = () => {
    if (input) {
      const shaHash = calculateSHA(input, algorithm);
      setHash(shaHash);
    } else {
      setHash('');
    }
  };

  const handleCopy = () => {
    if (hash) {
      navigator.clipboard.writeText(hash);
      alert('SHA哈希已复制到剪贴板');
    }
  };

  return (
    <div className="sha-hash">
      <div className="input-section">
        <h3>输入文本</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入要计算SHA哈希的文本..."
          rows={5}
        />
      </div>

      <div className="algorithm-selector">
        <label>选择算法：</label>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-256">SHA-256</option>
        </select>
      </div>

      <button 
        className="calculate-button"
        onClick={handleCalculate}
        disabled={!input}
      >
        计算{algorithm}哈希
      </button>

      {hash && (
        <div className="result-section">
          <h3>{algorithm}哈希结果</h3>
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

export default SHAHash;