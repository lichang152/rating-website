export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon?: string;
}

export type ToolCategory = 
  | 'text'      // 文本处理类
  | 'dev'       // 开发辅助类
  | 'media'     // 图片/媒体类
  | 'life'      // 生活实用类
  | 'novel'     // 小说阅读类
  | 'data'      // 数据/计算类
  | 'crypto'    // 编码/加密类
  | 'network'   // 网络/域名类
  | 'education' // 教育学习类
  | 'health'    // 健康健身类
  | 'finance'   // 金融理财类
  | 'file'      // 文件处理类
  | 'ai'        // AI智能类
  | 'game'      // 游戏娱乐类;

export interface ToolCategoryInfo {
  key: ToolCategory;
  name: string;
  description: string;
  icon?: string;
}
