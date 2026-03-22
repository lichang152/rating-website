import type { ToolCategoryInfo } from '../types/tool';

export const toolCategories: ToolCategoryInfo[] = [
  {
    key: 'text',
    name: '文本处理',
    description: '文本相关的各种处理工具，如字数统计、文本去重、大小写转换等',
    icon: '📝'
  },
  {
    key: 'dev',
    name: '开发辅助',
    description: '开发过程中需要的辅助工具，如JSON格式化、代码高亮、Base64编解码等',
    icon: '💻'
  },
  {
    key: 'media',
    name: '图片/媒体',
    description: '图片和媒体处理工具，如二维码生成、图片压缩、视频转GIF等',
    icon: '🖼️'
  },
  {
    key: 'life',
    name: '生活实用',
    description: '日常生活中实用的工具，如日期计算器、单位换算、密码生成器等',
    icon: '🏠'
  },
  {
    key: 'novel',
    name: '小说阅读',
    description: '小说阅读相关工具，如TXT阅读器、章节分割、阅读统计等',
    icon: '📚'
  },
  {
    key: 'data',
    name: '数据/计算',
    description: '数据处理和科学计算工具，如科学计算器、矩阵计算、数据统计分析等',
    icon: '📊'
  },
  {
    key: 'crypto',
    name: '编码/加密',
    description: '编码和加密相关工具，如MD5哈希、AES加密、Base64编解码等',
    icon: '🔒'
  },
  {
    key: 'network',
    name: '网络/域名',
    description: '网络和域名相关工具，如IP查询、DNS解析、网站响应时间测试等',
    icon: '🌐'
  },
  {
    key: 'education',
    name: '教育学习',
    description: '教育和学习相关工具，如数学公式编辑器、函数绘图、语言学习等',
    icon: '🎓'
  },
  {
    key: 'health',
    name: '健康健身',
    description: '健康和健身相关工具，如BMI计算器、体脂率计算、运动卡路里消耗等',
    icon: '🏃'
  },
  {
    key: 'finance',
    name: '金融理财',
    description: '金融和理财相关工具，如复利计算器、投资回报率计算、贷款比较等',
    icon: '💰'
  },
  {
    key: 'file',
    name: '文件处理',
    description: '文件处理相关工具，如文件哈希、文件批量重命名、PDF处理等',
    icon: '📁'
  },
  {
    key: 'ai',
    name: 'AI智能',
    description: 'AI智能相关工具，如智能问答、文本摘要、图像生成等',
    icon: '🤖'
  },
  {
    key: 'game',
    name: '游戏娱乐',
    description: '游戏和娱乐相关工具，如猜数字、2048、贪吃蛇等',
    icon: '🎮'
  }
];
