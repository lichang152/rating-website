import React, { useState } from 'react';
import './TextClustering.css';

interface Cluster {
  id: number;
  texts: string[];
}

const TextClustering: React.FC = () => {
  const [texts, setTexts] = useState('');
  const [clusters, setClusters] = useState<Cluster[]>([]);

  const clusterTexts = () => {
    if (!texts) {
      setClusters([]);
      return;
    }

    // 按行分割文本
    const textArray = texts.split('\n').filter(text => text.trim().length > 0);
    
    if (textArray.length === 0) {
      setClusters([]);
      return;
    }

    // 简单的聚类算法：基于文本相似度
    const newClusters: Cluster[] = [];
    
    textArray.forEach(text => {
      let assigned = false;
      
      // 尝试将文本分配到现有聚类
      for (const cluster of newClusters) {
        if (cluster.texts.some(existingText => calculateSimilarity(text, existingText) > 0.3)) {
          cluster.texts.push(text);
          assigned = true;
          break;
        }
      }
      
      // 如果没有分配到现有聚类，创建新聚类
      if (!assigned) {
        newClusters.push({
          id: newClusters.length + 1,
          texts: [text]
        });
      }
    });

    setClusters(newClusters);
  };

  // 简单的文本相似度计算
  const calculateSimilarity = (text1: string, text2: string): number => {
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(word => words2.has(word)));
    const union = new Set([...words1, ...words2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  };

  return (
    <div className="text-clustering">
      <div className="input-section">
        <textarea
          value={texts}
          onChange={(e) => setTexts(e.target.value)}
          placeholder="请输入要聚类的文本，每行一条..."
          rows={10}
        />
        <button className="cluster-button" onClick={clusterTexts}>
          聚类分析
        </button>
      </div>
      <div className="output-section">
        <h3>聚类结果</h3>
        {clusters.length > 0 ? (
          clusters.map((cluster) => (
            <div key={cluster.id} className="cluster">
              <h4>聚类 {cluster.id} ({cluster.texts.length} 条)</h4>
              <ul>
                {cluster.texts.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>请输入文本进行聚类分析</p>
        )}
      </div>
    </div>
  );
};

export default TextClustering;