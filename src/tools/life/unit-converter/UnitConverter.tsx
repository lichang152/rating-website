import React, { useState } from 'react';
import './UnitConverter.css';

const UnitConverter: React.FC = () => {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('meter');
  const [toUnit, setToUnit] = useState<string>('kilometer');
  const [result, setResult] = useState<number>(0);

  const conversionFactors: Record<string, Record<string, number | ((value: number) => number)>> = {
    // 长度单位转换
    meter: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      inch: 39.3701,
      foot: 3.28084,
      yard: 1.09361,
      mile: 0.000621371
    },
    // 质量单位转换
    kilogram: {
      kilogram: 1,
      gram: 1000,
      milligram: 1000000,
      pound: 2.20462,
      ounce: 35.274
    },
    // 温度单位转换
    celsius: {
      celsius: 1,
      fahrenheit: (c) => (c * 9/5) + 32,
      kelvin: (c) => c + 273.15
    },
    // 时间单位转换
    second: {
      second: 1,
      minute: 1/60,
      hour: 1/3600,
      day: 1/86400,
      week: 1/604800
    },
    // 面积单位转换
    squareMeter: {
      squareMeter: 1,
      squareKilometer: 0.000001,
      squareCentimeter: 10000,
      squareMillimeter: 1000000,
      squareInch: 1550,
      squareFoot: 10.7639,
      squareYard: 1.19599,
      acre: 0.000247105,
      hectare: 0.0001
    },
    // 体积单位转换
    cubicMeter: {
      cubicMeter: 1,
      liter: 1000,
      milliliter: 1000000,
      cubicCentimeter: 1000000,
      cubicInch: 61023.7,
      cubicFoot: 35.3147,
      cubicYard: 1.30795,
      gallon: 264.172
    }
  };

  const unitCategories = [
    { key: 'length', name: '长度', units: [
      { key: 'meter', name: '米 (m)' },
      { key: 'kilometer', name: '千米 (km)' },
      { key: 'centimeter', name: '厘米 (cm)' },
      { key: 'millimeter', name: '毫米 (mm)' },
      { key: 'inch', name: '英寸 (in)' },
      { key: 'foot', name: '英尺 (ft)' },
      { key: 'yard', name: '码 (yd)' },
      { key: 'mile', name: '英里 (mi)' }
    ]},
    { key: 'mass', name: '质量', units: [
      { key: 'kilogram', name: '千克 (kg)' },
      { key: 'gram', name: '克 (g)' },
      { key: 'milligram', name: '毫克 (mg)' },
      { key: 'pound', name: '磅 (lb)' },
      { key: 'ounce', name: '盎司 (oz)' }
    ]},
    { key: 'temperature', name: '温度', units: [
      { key: 'celsius', name: '摄氏度 (°C)' },
      { key: 'fahrenheit', name: '华氏度 (°F)' },
      { key: 'kelvin', name: '开尔文 (K)' }
    ]},
    { key: 'time', name: '时间', units: [
      { key: 'second', name: '秒 (s)' },
      { key: 'minute', name: '分钟 (min)' },
      { key: 'hour', name: '小时 (h)' },
      { key: 'day', name: '天 (d)' },
      { key: 'week', name: '周 (wk)' }
    ]},
    { key: 'area', name: '面积', units: [
      { key: 'squareMeter', name: '平方米 (m²)' },
      { key: 'squareKilometer', name: '平方千米 (km²)' },
      { key: 'squareCentimeter', name: '平方厘米 (cm²)' },
      { key: 'squareMillimeter', name: '平方毫米 (mm²)' },
      { key: 'squareInch', name: '平方英寸 (in²)' },
      { key: 'squareFoot', name: '平方英尺 (ft²)' },
      { key: 'squareYard', name: '平方码 (yd²)' },
      { key: 'acre', name: '英亩 (ac)' },
      { key: 'hectare', name: '公顷 (ha)' }
    ]},
    { key: 'volume', name: '体积', units: [
      { key: 'cubicMeter', name: '立方米 (m³)' },
      { key: 'liter', name: '升 (L)' },
      { key: 'milliliter', name: '毫升 (mL)' },
      { key: 'cubicCentimeter', name: '立方厘米 (cm³)' },
      { key: 'cubicInch', name: '立方英寸 (in³)' },
      { key: 'cubicFoot', name: '立方英尺 (ft³)' },
      { key: 'cubicYard', name: '立方码 (yd³)' },
      { key: 'gallon', name: '加仑 (gal)' }
    ]}
  ];

  const [currentCategory, setCurrentCategory] = useState<string>('length');

  const handleConvert = () => {
    const factors = conversionFactors[fromUnit];
    if (factors && factors[toUnit]) {
      if (typeof factors[toUnit] === 'function') {
        setResult(factors[toUnit](value));
      } else {
        setResult(value * factors[toUnit]);
      }
    }
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    const categoryData = unitCategories.find(c => c.key === category);
    if (categoryData && categoryData.units.length > 0) {
      setFromUnit(categoryData.units[0].key);
      setToUnit(categoryData.units[1]?.key || categoryData.units[0].key);
    }
  };

  const handleClear = () => {
    setValue(1);
    setResult(0);
  };

  const getUnitsForCategory = () => {
    const category = unitCategories.find(c => c.key === currentCategory);
    return category ? category.units : [];
  };

  return (
    <div className="unit-converter">
      <div className="tool-section">
        <h3>选择单位类别</h3>
        <div className="category-selector">
          {unitCategories.map(category => (
            <button
              key={category.key}
              className={`category-button ${currentCategory === category.key ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.key)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="tool-section">
        <h3>输入值</h3>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
          min="0"
          step="any"
        />
      </div>

      <div className="tool-section">
        <h3>单位转换</h3>
        <div className="unit-selectors">
          <div className="unit-selector">
            <label>从：</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
            >
              {getUnitsForCategory().map(unit => (
                <option key={unit.key} value={unit.key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
          <div className="unit-selector">
            <label>到：</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
            >
              {getUnitsForCategory().map(unit => (
                <option key={unit.key} value={unit.key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="tool-controls">
        <button onClick={handleConvert} className="btn-primary">
          转换
        </button>
        <button onClick={handleClear} className="btn-secondary">
          清空
        </button>
      </div>

      <div className="result-section">
        <h3>转换结果</h3>
        <p className="result">
          {value} {getUnitsForCategory().find(u => u.key === fromUnit)?.name} = {result.toFixed(6)} {getUnitsForCategory().find(u => u.key === toUnit)?.name}
        </p>
      </div>
    </div>
  );
};

export default UnitConverter;