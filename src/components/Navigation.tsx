import React from 'react';
import { toolCategories } from '../utils/toolCategories';
import { tools } from '../utils/tools';

interface NavigationProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <nav className="navigation">
      <h2>工具分类</h2>
      <ul>
        {toolCategories.map((category) => (
          <li 
            key={category.key}
            className={selectedCategory === category.key ? 'active' : ''}
            onClick={() => onCategoryChange(category.key)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
            <span className="category-count">({tools.filter(tool => tool.category === category.key).length})</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
