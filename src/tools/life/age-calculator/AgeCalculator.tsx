import React, { useState } from 'react';
import './AgeCalculator.css';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const calculateAge = () => {
    if (!birthDate) {
      setAge('请输入出生日期');
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();
    
    let ageYears = today.getFullYear() - birth.getFullYear();
    let ageMonths = today.getMonth() - birth.getMonth();
    let ageDays = today.getDate() - birth.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    setAge(`您的年龄是：${ageYears}岁 ${ageMonths}个月 ${ageDays}天`);
  };

  const handleClear = () => {
    setBirthDate('');
    setAge('');
  };

  return (
    <div className="age-calculator">
      <div className="tool-section">
        <h3>输入出生日期</h3>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>

      <div className="tool-controls">
        <button onClick={calculateAge} className="btn-primary">
          计算年龄
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      {age && (
        <div className="result-section">
          <h3>计算结果</h3>
          <p className="age-result">{age}</p>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;