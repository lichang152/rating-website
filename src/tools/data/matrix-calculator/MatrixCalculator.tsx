import React, { useState } from 'react';

interface Matrix {
  rows: number;
  cols: number;
  data: number[][];
}

const MatrixCalculator: React.FC = () => {
  const [matrix1, setMatrix1] = useState<Matrix>({ rows: 2, cols: 2, data: [[1, 2], [3, 4]] });
  const [matrix2, setMatrix2] = useState<Matrix>({ rows: 2, cols: 2, data: [[5, 6], [7, 8]] });
  const [result, setResult] = useState<Matrix | null>(null);
  const [operation, setOperation] = useState('add');

  const initializeMatrix = (rows: number, cols: number): number[][] => {
    const data: number[][] = [];
    for (let i = 0; i < rows; i++) {
      data.push(Array(cols).fill(0));
    }
    return data;
  };

  const handleMatrixSizeChange = (matrixNumber: 1 | 2, rows: number, cols: number) => {
    if (matrixNumber === 1) {
      setMatrix1({ rows, cols, data: initializeMatrix(rows, cols) });
    } else {
      setMatrix2({ rows, cols, data: initializeMatrix(rows, cols) });
    }
    setResult(null);
  };

  const handleMatrixValueChange = (matrixNumber: 1 | 2, row: number, col: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    if (matrixNumber === 1) {
      const newData = [...matrix1.data];
      newData[row][col] = numValue;
      setMatrix1({ ...matrix1, data: newData });
    } else {
      const newData = [...matrix2.data];
      newData[row][col] = numValue;
      setMatrix2({ ...matrix2, data: newData });
    }
    setResult(null);
  };

  const addMatrices = (m1: Matrix, m2: Matrix): Matrix => {
    const result: number[][] = [];
    for (let i = 0; i < m1.rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < m1.cols; j++) {
        row.push(m1.data[i][j] + m2.data[i][j]);
      }
      result.push(row);
    }
    return { rows: m1.rows, cols: m1.cols, data: result };
  };

  const subtractMatrices = (m1: Matrix, m2: Matrix): Matrix => {
    const result: number[][] = [];
    for (let i = 0; i < m1.rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < m1.cols; j++) {
        row.push(m1.data[i][j] - m2.data[i][j]);
      }
      result.push(row);
    }
    return { rows: m1.rows, cols: m1.cols, data: result };
  };

  const multiplyMatrices = (m1: Matrix, m2: Matrix): Matrix => {
    const result: number[][] = [];
    for (let i = 0; i < m1.rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < m2.cols; j++) {
        let sum = 0;
        for (let k = 0; k < m1.cols; k++) {
          sum += m1.data[i][k] * m2.data[k][j];
        }
        row.push(sum);
      }
      result.push(row);
    }
    return { rows: m1.rows, cols: m2.cols, data: result };
  };

  const calculate = () => {
    try {
      switch (operation) {
        case 'add':
          if (matrix1.rows === matrix2.rows && matrix1.cols === matrix2.cols) {
            setResult(addMatrices(matrix1, matrix2));
          } else {
            alert('矩阵加法要求两个矩阵尺寸相同');
          }
          break;
        case 'subtract':
          if (matrix1.rows === matrix2.rows && matrix1.cols === matrix2.cols) {
            setResult(subtractMatrices(matrix1, matrix2));
          } else {
            alert('矩阵减法要求两个矩阵尺寸相同');
          }
          break;
        case 'multiply':
          if (matrix1.cols === matrix2.rows) {
            setResult(multiplyMatrices(matrix1, matrix2));
          } else {
            alert('矩阵乘法要求第一个矩阵的列数等于第二个矩阵的行数');
          }
          break;
        default:
          break;
      }
    } catch (error) {
      alert('计算错误，请检查矩阵数据');
    }
  };

  const renderMatrix = (matrix: Matrix, matrixNumber: 1 | 2) => {
    return (
      <div className="matrix-container">
        <div className="matrix-header">
          <h4>矩阵 {matrixNumber}</h4>
          <div className="matrix-size">
            <input
              type="number"
              min="1"
              max="5"
              value={matrix.rows}
              onChange={(e) => handleMatrixSizeChange(matrixNumber, parseInt(e.target.value), matrix.cols)}
            />
            <span>×</span>
            <input
              type="number"
              min="1"
              max="5"
              value={matrix.cols}
              onChange={(e) => handleMatrixSizeChange(matrixNumber, matrix.rows, parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="matrix">
          {matrix.data.map((row, rowIndex) => (
            <div key={rowIndex} className="matrix-row">
              {row.map((value, colIndex) => (
                <input
                  key={colIndex}
                  type="number"
                  value={value}
                  onChange={(e) => handleMatrixValueChange(matrixNumber, rowIndex, colIndex, e.target.value)}
                  className="matrix-input"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="matrix-calculator">
      <div className="operation-selector">
        <label>选择操作：</label>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="add">矩阵加法</option>
          <option value="subtract">矩阵减法</option>
          <option value="multiply">矩阵乘法</option>
        </select>
        <button className="calculate-button" onClick={calculate}>
          计算
        </button>
      </div>

      <div className="matrices-container">
        {renderMatrix(matrix1, 1)}
        <div className="operation-symbol">
          {operation === 'add' && '+'}
          {operation === 'subtract' && '−'}
          {operation === 'multiply' && '×'}
        </div>
        {renderMatrix(matrix2, 2)}
        <div className="equals-symbol">=</div>
        {result && (
          <div className="result-container">
            <h4>结果</h4>
            <div className="matrix">
              {result.data.map((row, rowIndex) => (
                <div key={rowIndex} className="matrix-row">
                  {row.map((value, colIndex) => (
                    <div key={colIndex} className="matrix-result-cell">
                      {value}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatrixCalculator;