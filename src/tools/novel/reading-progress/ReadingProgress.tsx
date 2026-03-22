import React, { useState, useEffect } from 'react';

interface ReadingProgress {
  id: string;
  bookName: string;
  lastRead: string;
  progress: number;
  position: number;
}

const ReadingProgress: React.FC = () => {
  const [progressList, setProgressList] = useState<ReadingProgress[]>([]);
  const [newProgress, setNewProgress] = useState({
    bookName: '',
    progress: 0,
    position: 0
  });

  // 从本地存储加载进度
  useEffect(() => {
    const savedProgress = localStorage.getItem('readingProgress');
    if (savedProgress) {
      setProgressList(JSON.parse(savedProgress));
    }
  }, []);

  // 保存进度到本地存储
  useEffect(() => {
    localStorage.setItem('readingProgress', JSON.stringify(progressList));
  }, [progressList]);

  const handleAddProgress = () => {
    if (newProgress.bookName) {
      const progress: ReadingProgress = {
        id: Date.now().toString(),
        bookName: newProgress.bookName,
        lastRead: new Date().toISOString(),
        progress: newProgress.progress,
        position: newProgress.position
      };
      setProgressList([...progressList, progress]);
      setNewProgress({ bookName: '', progress: 0, position: 0 });
    }
  };

  const handleDeleteProgress = (id: string) => {
    setProgressList(progressList.filter(item => item.id !== id));
  };

  const handleUpdateProgress = (id: string, field: keyof Omit<ReadingProgress, 'id' | 'lastRead'>, value: string | number) => {
    setProgressList(progressList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [field]: value,
          lastRead: new Date().toISOString()
        };
      }
      return item;
    }));
  };

  return (
    <div className="reading-progress">
      <div className="add-progress-section">
        <h3>添加阅读进度</h3>
        <div className="form-group">
          <label>书名：</label>
          <input
            type="text"
            value={newProgress.bookName}
            onChange={(e) => setNewProgress({ ...newProgress, bookName: e.target.value })}
            placeholder="输入书名"
          />
        </div>
        <div className="form-group">
          <label>阅读进度（%）：</label>
          <input
            type="number"
            min="0"
            max="100"
            value={newProgress.progress}
            onChange={(e) => setNewProgress({ ...newProgress, progress: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div className="form-group">
          <label>阅读位置：</label>
          <input
            type="number"
            min="0"
            value={newProgress.position}
            onChange={(e) => setNewProgress({ ...newProgress, position: parseInt(e.target.value) || 0 })}
            placeholder="输入阅读到的位置"
          />
        </div>
        <button 
          className="add-button"
          onClick={handleAddProgress}
          disabled={!newProgress.bookName}
        >
          添加进度
        </button>
      </div>

      <div className="progress-list-section">
        <h3>阅读进度列表</h3>
        {progressList.length === 0 ? (
          <p className="empty-message">暂无阅读进度记录</p>
        ) : (
          <div className="progress-list">
            {progressList.map((item) => (
              <div key={item.id} className="progress-item">
                <div className="progress-info">
                  <h4>{item.bookName}</h4>
                  <p className="last-read">最后阅读：{new Date(item.lastRead).toLocaleString()}</p>
                </div>
                <div className="progress-details">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <p className="progress-text">{item.progress}%</p>
                  <p className="position-text">位置：{item.position}</p>
                </div>
                <div className="progress-actions">
                  <button 
                    className="edit-button"
                    onClick={() => {
                      const newProgress = prompt('输入新的阅读进度（%）：');
                      if (newProgress) {
                        handleUpdateProgress(item.id, 'progress', parseInt(newProgress) || 0);
                      }
                    }}
                  >
                    编辑进度
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteProgress(item.id)}
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingProgress;