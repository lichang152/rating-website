import React, { useState } from 'react';

const DateCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState({
    days: 0,
    months: 0,
    years: 0
  });

  const calculateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // 计算天数差
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // 计算月数差
    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months -= start.getMonth();
    months += end.getMonth();
    
    // 计算年数差
    const years = Math.floor(days / 365.25);

    setResult({
      days,
      months,
      years
    });
  };

  return (
    <div className="date-calculator">
      <div className="input-section">
        <div className="date-input">
          <label>开始日期:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="date-input">
          <label>结束日期:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <button onClick={calculateDifference}>计算差值</button>

      <div className="result-section">
        <h3>计算结果</h3>
        <div className="result-grid">
          <div className="result-item">
            <span className="result-label">天数:</span>
            <span className="result-value">{result.days} 天</span>
          </div>
          <div className="result-item">
            <span className="result-label">月数:</span>
            <span className="result-value">{result.months} 个月</span>
          </div>
          <div className="result-item">
            <span className="result-label">年数:</span>
            <span className="result-value">{result.years} 年</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateCalculator;
