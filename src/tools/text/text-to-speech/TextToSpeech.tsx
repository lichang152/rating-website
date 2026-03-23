import React, { useState } from 'react';
import './TextToSpeech.css';

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState<string>('');
  const [volume, setVolume] = useState<number>(1);
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // 初始化语音列表
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  React.useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = () => {
    if (!text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) {
      utterance.voice = voices.find(v => v.name === voice) || voices[0];
    }
    utterance.volume = volume;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="text-to-speech">
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要转换为语音的文本..."
          rows={6}
        />
        <div className="settings">
          <div className="setting-item">
            <label>语音：</label>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
            >
              <option value="">默认语音</option>
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
          <div className="setting-item">
            <label>音量：{Math.round(volume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </div>
          <div className="setting-item">
            <label>语速：{rate}x</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>
          <div className="setting-item">
            <label>音调：{pitch}x</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="controls">
          <button 
            className="speak-button" 
            onClick={speak}
            disabled={isSpeaking}
          >
            {isSpeaking ? '正在播放' : '播放'}
          </button>
          <button 
            className="stop-button" 
            onClick={stop}
            disabled={!isSpeaking}
          >
            停止
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;