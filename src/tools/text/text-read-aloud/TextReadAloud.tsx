import React, { useState, useRef } from 'react';
import './TextReadAloud.css';

const TextReadAloud: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [voice, setVoice] = useState<string>('');
  const [volume, setVolume] = useState<number>(1);
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 获取可用的语音列表
  React.useEffect(() => {
    const handleVoicesChanged = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    handleVoicesChanged();
    
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, []);

  const speak = () => {
    if (!text) return;
    
    if (speechRef.current) {
      window.speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voice) {
      const selectedVoice = voices.find(v => v.name === voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
    
    utterance.volume = volume;
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    utterance.onend = () => {
      setIsPlaying(false);
    };
    
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="text-read-aloud">
      <div className="input-section">
        <h3>文本朗读</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入要朗读的文本..."
          rows={6}
        />
        
        <div className="controls">
          <div className="control-group">
            <label>语音选择：</label>
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
          
          <div className="control-group">
            <label>音量：{Math.round(volume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label>语速：{rate}x</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label>音调：{pitch}x</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
            />
          </div>
        </div>
        
        <div className="buttons">
          <button 
            className="speak-button" 
            onClick={speak}
            disabled={isPlaying || !text}
          >
            开始朗读
          </button>
          <button 
            className="stop-button" 
            onClick={stop}
            disabled={!isPlaying}
          >
            停止朗读
          </button>
        </div>
      </div>
      
      <div className="info-section">
        <h4>使用说明</h4>
        <ul>
          <li>在文本框中输入要朗读的内容</li>
          <li>选择合适的语音（如果有多个可用）</li>
          <li>调整音量、语速和音调</li>
          <li>点击"开始朗读"按钮开始朗读</li>
          <li>点击"停止朗读"按钮停止朗读</li>
        </ul>
      </div>
    </div>
  );
};

export default TextReadAloud;