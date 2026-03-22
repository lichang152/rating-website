import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ToolList from './components/ToolList';
import ToolDetail from './components/ToolDetail';
import { tools } from './utils/tools';
import type { Tool } from './types/tool';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>(tools[0]?.category || 'text');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const filteredTools = searchQuery
    ? tools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tools.filter(tool => tool.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedTool(null);
    setSearchQuery('');
  };

  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const handleBack = () => {
    setSelectedTool(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>在线工具集合</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="搜索工具..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </header>
      <main className="app-main">
        <Navigation 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        <div className="content">
          {selectedTool ? (
            <ToolDetail tool={selectedTool} onBack={handleBack} />
          ) : (
            <>
              <ToolList tools={filteredTools} onToolSelect={handleToolSelect} />
            </>
          )}
        </div>
      </main>
      <footer className="app-footer">
        <p>© 2026 在线工具集合 | 免费、实用的在线工具</p>
      </footer>
      {showBackToTop && (
        <button 
          className="back-to-top" 
          onClick={scrollToTop}
          aria-label="返回顶部"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;
