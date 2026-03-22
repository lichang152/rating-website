import type { Tool } from '../types/tool';

export const tools: Tool[] = [
  // 文本处理类
  {
    id: 'text-word-count',
    name: '字数统计',
    description: '统计文本的字数、字符数、行数等信息',
    category: 'text',
    icon: '📊'
  },
  {
    id: 'text-remove-duplicates',
    name: '文本去重',
    description: '去除文本中的重复内容',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-case-converter',
    name: '大小写转换',
    description: '将文本在大写、小写、首字母大写之间转换',
    category: 'text',
    icon: '🔤'
  },
  {
    id: 'text-compare',
    name: '文本对比',
    description: '对比两个文本的差异并高亮显示',
    category: 'text',
    icon: '🔍'
  },
  {
    id: 'text-regex-tester',
    name: '正则表达式测试',
    description: '测试正则表达式的匹配效果',
    category: 'text',
    icon: '⚙️'
  },
  {
    id: 'text-sort',
    name: '文本排序',
    description: '对文本行进行排序',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-filter',
    name: '文本过滤',
    description: '根据条件过滤文本',
    category: 'text',
    icon: '🔍'
  },
  {
    id: 'text-replace',
    name: '文本替换',
    description: '替换文本中的指定内容',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-reverse',
    name: '文本倒序',
    description: '将文本内容倒序排列',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-split',
    name: '文本分割',
    description: '根据分隔符分割文本',
    category: 'text',
    icon: '✂️'
  },
  {
    id: 'text-merge',
    name: '文本合并',
    description: '合并多个文本',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-remove-empty-lines',
    name: '去除空白行',
    description: '去除文本中的空白行',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-trim',
    name: '去除首尾空格',
    description: '去除文本首尾的空格',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-add-prefix-suffix',
    name: '添加前缀/后缀',
    description: '为文本添加前缀或后缀',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-align',
    name: '文本对齐',
    description: '对齐文本内容',
    category: 'text',
    icon: '📏'
  },
  {
    id: 'text-character-count',
    name: '字符统计',
    description: '统计文本中的字符数量',
    category: 'text',
    icon: '📊'
  },
  {
    id: 'text-keyword-extraction',
    name: '关键词提取',
    description: '从文本中提取关键词',
    category: 'text',
    icon: '🔍'
  },
  {
    id: 'text-similarity',
    name: '文本相似度比较',
    description: '比较两个文本的相似度',
    category: 'text',
    icon: '🔍'
  },
  {
    id: 'text-simplified-traditional',
    name: '简繁转换',
    description: '在简体和繁体中文之间转换',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-pinyin',
    name: '拼音转换',
    description: '将中文转换为拼音',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-remove-html',
    name: '去除HTML标签',
    description: '去除文本中的HTML标签',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-markdown-to-html',
    name: 'Markdown转HTML',
    description: '将Markdown转换为HTML',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-html-to-markdown',
    name: 'HTML转Markdown',
    description: '将HTML转换为Markdown',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-encrypt',
    name: '文本加密',
    description: '对文本进行加密',
    category: 'text',
    icon: '🔒'
  },
  {
    id: 'text-summary',
    name: '文本摘要生成',
    description: '生成文本摘要',
    category: 'text',
    icon: '📝'
  },
  {
    id: 'text-sensitive-filter',
    name: '敏感词过滤',
    description: '过滤文本中的敏感词',
    category: 'text',
    icon: '🔍'
  },
  {
    id: 'text-to-speech',
    name: '文本转语音',
    description: '将文本转换为语音',
    category: 'text',
    icon: '🔊'
  },
  {
    id: 'text-to-qr',
    name: '文本转二维码',
    description: '将文本转换为二维码',
    category: 'text',
    icon: '📱'
  },
  {
    id: 'text-random',
    name: '随机文本生成',
    description: '生成随机文本',
    category: 'text',
    icon: '🎲'
  },
  {
    id: 'text-to-number',
    name: '文本转数字',
    description: '将文本转换为数字',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-number-to-text',
    name: '数字转文本',
    description: '将数字转换为文本',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-to-unicode',
    name: '文本转Unicode',
    description: '将文本转换为Unicode编码',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-unicode-to-text',
    name: 'Unicode转文本',
    description: '将Unicode编码转换为文本',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-to-entities',
    name: '文本转实体',
    description: '将文本转换为HTML实体',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-entities-to-text',
    name: '实体转文本',
    description: '将HTML实体转换为文本',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-to-url-slug',
    name: '文本转URL Slug',
    description: '将文本转换为URL友好的格式',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-url-slug-to-text',
    name: 'URL Slug转文本',
    description: '将URL Slug转换为文本',
    category: 'text',
    icon: '🔄'
  },
  {
    id: 'text-fingerprint',
    name: '文本指纹',
    description: '生成文本的指纹',
    category: 'text',
    icon: '🔍'
  },
  {
    id: 'text-tokenize',
    name: '文本分词',
    description: '对文本进行分词',
    category: 'text',
    icon: '✂️'
  },
  {
    id: 'text-word-frequency',
    name: '词频统计',
    description: '统计文本中词语的出现频率',
    category: 'text',
    icon: '📊'
  },
  {
    id: 'text-clustering',
    name: '文本聚类',
    description: '对文本进行聚类分析',
    category: 'text',
    icon: '📊'
  },
  {
    id: 'text-classification',
    name: '文本分类',
    description: '对文本进行分类',
    category: 'text',
    icon: '📊'
  },
  {
    id: 'text-sentiment',
    name: '情感分析',
    description: '分析文本的情感倾向',
    category: 'text',
    icon: '📊'
  },
  {
    id: 'text-spell-check',
    name: '错别字检测',
    description: '检测文本中的错别字',
    category: 'text',
    icon: '🔍'
  },
  {
    id: 'text-read-aloud',
    name: '文本朗读',
    description: '朗读文本内容',
    category: 'text',
    icon: '🔊'
  },
  {
    id: 'text-translate',
    name: '文本翻译',
    description: '翻译文本内容',
    category: 'text',
    icon: '🌐'
  },
  {
    id: 'text-grammar-check',
    name: '文本语法检查',
    description: '检查文本的语法',
    category: 'text',
    icon: '🔍'
  },
  {
    id: 'text-typesetting',
    name: '文本排版',
    description: '对文本进行排版',
    category: 'text',
    icon: '📝'
  },
  {
    id: 'text-aes',
    name: 'AES加密解密',
    description: '对文本进行AES加密和解密',
    category: 'text',
    icon: '🔒'
  },
  {
    id: 'text-signature',
    name: '文本签名',
    description: '对文本进行签名',
    category: 'text',
    icon: '✍️'
  },
  {
    id: 'text-validation',
    name: '文本校验',
    description: '校验文本内容',
    category: 'text',
    icon: '✓'
  },
  {
    id: 'text-compress',
    name: '文本压缩解压',
    description: '压缩和解压文本',
    category: 'text',
    icon: '📦'
  },
  {
    id: 'text-to-pdf',
    name: '文本转PDF',
    description: '将文本转换为PDF',
    category: 'text',
    icon: '📄'
  },
  {
    id: 'text-pdf-to-text',
    name: 'PDF转文本',
    description: '将PDF转换为文本',
    category: 'text',
    icon: '📄'
  },
  {
    id: 'text-to-image',
    name: '文本转图片',
    description: '将文本转换为图片',
    category: 'text',
    icon: '🖼️'
  },
  {
    id: 'text-image-to-text',
    name: '图片转文本',
    description: '将图片中的文本提取出来',
    category: 'text',
    icon: '🖼️'
  },
  {
    id: 'text-side-by-side-compare',
    name: '并排高亮对比',
    description: '并排对比两个文本并高亮差异',
    category: 'text',
    icon: '🔍'
  },
  {
    id: 'text-merge-with-separator',
    name: '带分隔符合并',
    description: '使用分隔符合并多个文本',
    category: 'text',
    icon: '🔄'
  },

  // 开发辅助类
  {
    id: 'dev-json-formatter',
    name: 'JSON格式化压缩',
    description: '格式化和压缩JSON数据',
    category: 'dev',
    icon: '⚙️'
  },
  {
    id: 'dev-json-validator',
    name: 'JSON校验',
    description: '校验JSON数据的格式',
    category: 'dev',
    icon: '✓'
  },
  {
    id: 'dev-base64',
    name: 'Base64编解码',
    description: '对数据进行Base64编码和解码',
    category: 'dev',
    icon: '🔄'
  },
  {
    id: 'dev-url-encode-decode',
    name: 'URL编解码',
    description: '对URL进行编码和解码',
    category: 'dev',
    icon: '🔄'
  },
  {
    id: 'dev-timestamp',
    name: '时间戳转换',
    description: '在时间戳和日期之间转换',
    category: 'dev',
    icon: '⏰'
  },
  {
    id: 'dev-json-to-xml',
    name: 'JSON转XML',
    description: '将JSON转换为XML格式',
    category: 'dev',
    icon: '🔄'
  },
  {
    id: 'dev-xml-to-json',
    name: 'XML转JSON',
    description: '将XML转换为JSON格式',
    category: 'dev',
    icon: '🔄'
  },
  {
    id: 'dev-json-to-yaml',
    name: 'JSON转YAML',
    description: '将JSON转换为YAML格式',
    category: 'dev',
    icon: '🔄'
  },
  {
    id: 'dev-yaml-to-json',
    name: 'YAML转JSON',
    description: '将YAML转换为JSON格式',
    category: 'dev',
    icon: '🔄'
  },
  {
    id: 'dev-json-to-csv',
    name: 'JSON转CSV',
    description: '将JSON转换为CSV格式',
    category: 'dev',
    icon: '🔄'
  },
  {
    id: 'dev-csv-to-json',
    name: 'CSV转JSON',
    description: '将CSV转换为JSON格式',
    category: 'dev',
    icon: '🔄'
  },
  {
    id: 'dev-json-to-typescript',
    name: 'JSON转TypeScript接口',
    description: '将JSON转换为TypeScript接口',
    category: 'dev',
    icon: '🔄'
  },
  {
    id: 'dev-json-to-go',
    name: 'JSON转Go结构体',
    description: '将JSON转换为Go结构体',
    category: 'dev',
    icon: '🔄'
  },
  {
    id: 'dev-json-to-java',
    name: 'JSON转Java类',
    description: '将JSON转换为Java类',
    category: 'dev',
    icon: '🔄'
  },
  {
    id: 'dev-code-highlight',
    name: '代码高亮',
    description: '对代码进行语法高亮',
    category: 'dev',
    icon: '💡'
  },
  {
    id: 'dev-code-beautify',
    name: '代码美化格式化',
    description: '美化和格式化代码',
    category: 'dev',
    icon: '🔧'
  },
  {
    id: 'dev-code-compress',
    name: '代码压缩',
    description: '压缩代码以减少体积',
    category: 'dev',
    icon: '📦'
  },
  {
    id: 'dev-code-obfuscate',
    name: '代码混淆',
    description: '混淆代码以增加安全性',
    category: 'dev',
    icon: '🔒'
  },
  {
    id: 'dev-unicode-converter',
    name: 'Unicode与中文互转',
    description: '在Unicode和中文之间转换',
    category: 'dev',
    icon: '🔄'
  },
  {
    id: 'dev-date-formatter',
    name: '日期格式化',
    description: '格式化日期',
    category: 'dev',
    icon: '📅'
  },
  {
    id: 'dev-regex-generator',
    name: '正则表达式生成器',
    description: '生成正则表达式',
    category: 'dev',
    icon: '⚙️'
  },
  {
    id: 'dev-regex-debugger',
    name: '正则表达式调试器',
    description: '调试正则表达式',
    category: 'dev',
    icon: '⚙️'
  },
  {
    id: 'dev-sql-formatter',
    name: 'SQL格式化',
    description: '格式化SQL语句',
    category: 'dev',
    icon: '🔧'
  },
  {
    id: 'dev-sql-to-orm',
    name: 'SQL转ORM代码',
    description: '将SQL转换为ORM代码',
    category: 'dev',
    icon: '🔄'
  },
  {
    id: 'dev-color-converter',
    name: '颜色值转换',
    description: '在不同颜色格式之间转换',
    category: 'dev',
    icon: '🎨'
  },
  {
    id: 'dev-image-to-base64',
    name: '图片转Base64',
    description: '将图片转换为Base64编码',
    category: 'dev',
    icon: '🖼️'
  },
  {
    id: 'dev-image-to-dataurl',
    name: '图片转DataURL',
    description: '将图片转换为DataURL',
    category: 'dev',
    icon: '🖼️'
  },
  {
    id: 'dev-css-unit-converter',
    name: 'CSS单位转换',
    description: '在不同CSS单位之间转换',
    category: 'dev',
    icon: '📏'
  },
  {
    id: 'dev-css-selector-tester',
    name: 'CSS选择器测试',
    description: '测试CSS选择器',
    category: 'dev',
    icon: '🔍'
  },
  {
    id: 'dev-user-agent-parser',
    name: '浏览器UserAgent解析',
    description: '解析浏览器UserAgent',
    category: 'dev',
    icon: '🌐'
  },
  {
    id: 'dev-port-checker',
    name: '端口检测',
    description: '检测端口是否可用',
    category: 'dev',
    icon: '🔍'
  },
  {
    id: 'dev-command-escape',
    name: '命令行转义工具',
    description: '转义命令行参数',
    category: 'dev',
    icon: '💻'
  },
  {
    id: 'dev-regex-library',
    name: '正则表达式常用库',
    description: '常用正则表达式库',
    category: 'dev',
    icon: '⚙️'
  },
  {
    id: 'dev-quick-reference',
    name: '开发常用速查表',
    description: '开发常用速查表',
    category: 'dev',
    icon: '📋'
  },
  {
    id: 'dev-code-line-counter',
    name: '代码行数统计',
    description: '统计代码行数',
    category: 'dev',
    icon: '📊'
  },
  {
    id: 'dev-git-commit-generator',
    name: 'Git提交信息生成器',
    description: '生成Git提交信息',
    category: 'dev',
    icon: 'git'
  },
  {
    id: 'dev-api-tester',
    name: 'API测试工具',
    description: '测试API',
    category: 'dev',
    icon: '🌐'
  },
  {
    id: 'dev-fake-data-generator',
    name: '假数据生成器',
    description: '生成假数据',
    category: 'dev',
    icon: '🎲'
  },
  {
    id: 'dev-mock-api',
    name: 'Mock API服务',
    description: '创建Mock API服务',
    category: 'dev',
    icon: '🌐'
  },
  {
    id: 'dev-graphql-builder',
    name: 'GraphQL查询构建器',
    description: '构建GraphQL查询',
    category: 'dev',
    icon: '⚙️'
  },
  {
    id: 'dev-graphql-mock',
    name: 'GraphQL响应模拟',
    description: '模拟GraphQL响应',
    category: 'dev',
    icon: '⚙️'
  },
  {
    id: 'dev-regex-visualizer',
    name: '正则表达式可视化',
    description: '可视化正则表达式',
    category: 'dev',
    icon: '📊'
  },
  {
    id: 'dev-code-snippet-manager',
    name: '代码片段管理',
    description: '管理代码片段',
    category: 'dev',
    icon: '📝'
  },
  {
    id: 'dev-code-runner',
    name: '代码运行器',
    description: '运行代码',
    category: 'dev',
    icon: '▶️'
  },
  {
    id: 'dev-online-compiler',
    name: '在线编译器',
    description: '在线编译代码',
    category: 'dev',
    icon: '💻'
  },
  {
    id: 'dev-docker-generator',
    name: 'Docker命令生成器',
    description: '生成Docker命令',
    category: 'dev',
    icon: '🐳'
  },
  {
    id: 'dev-kubernetes-generator',
    name: 'Kubernetes YAML生成器',
    description: '生成Kubernetes YAML',
    category: 'dev',
    icon: '☸️'
  },
  {
    id: 'dev-env-parser',
    name: '环境变量解析',
    description: '解析环境变量',
    category: 'dev',
    icon: '⚙️'
  },
  {
    id: 'dev-config-converter',
    name: '配置文件转换',
    description: '转换配置文件格式',
    category: 'dev',
    icon: '🔄'
  },
  {
    id: 'dev-code-review-checklist',
    name: '代码审查清单',
    description: '代码审查清单',
    category: 'dev',
    icon: '📋'
  },
  {
    id: 'dev-api-docs-generator',
    name: 'API文档生成',
    description: '生成API文档',
    category: 'dev',
    icon: '📄'
  },
  {
    id: 'dev-db-design-tool',
    name: '数据库设计工具',
    description: '设计数据库',
    category: 'dev',
    icon: '🗄️'
  },
  {
    id: 'dev-uml-generator',
    name: 'UML类图生成',
    description: '生成UML类图',
    category: 'dev',
    icon: '📊'
  },
  {
    id: 'dev-flowchart-generator',
    name: '流程图生成',
    description: '生成流程图',
    category: 'dev',
    icon: '📊'
  },
  {
    id: 'dev-mindmap-generator',
    name: '思维导图生成',
    description: '生成思维导图',
    category: 'dev',
    icon: '🧠'
  },
  {
    id: 'dev-dependency-analyzer',
    name: '代码依赖分析',
    description: '分析代码依赖',
    category: 'dev',
    icon: '📊'
  },
  {
    id: 'dev-complexity-analyzer',
    name: '代码复杂度分析',
    description: '分析代码复杂度',
    category: 'dev',
    icon: '📊'
  },
  {
    id: 'dev-duplicate-detector',
    name: '代码重复检测',
    description: '检测代码重复',
    category: 'dev',
    icon: '🔍'
  },
  {
    id: 'dev-code-to-image',
    name: '代码转图片',
    description: '将代码转换为图片',
    category: 'dev',
    icon: '🖼️'
  },
  {
    id: 'dev-code-to-pdf',
    name: '代码转PDF',
    description: '将代码转换为PDF',
    category: 'dev',
    icon: '📄'
  },

  // 图片/媒体类
  {
    id: 'media-qr-generator',
    name: '二维码生成解析',
    description: '生成和解析二维码',
    category: 'media',
    icon: '📱'
  },
  {
    id: 'media-image-compress',
    name: '图片压缩',
    description: '压缩图片以减少体积',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-image-crop',
    name: '图片裁剪',
    description: '裁剪图片',
    category: 'media',
    icon: '✂️'
  },
  {
    id: 'media-image-rotate',
    name: '图片旋转翻转',
    description: '旋转和翻转图片',
    category: 'media',
    icon: '🔄'
  },
  {
    id: 'media-color-picker',
    name: '颜色选择器',
    description: '选择颜色',
    category: 'media',
    icon: '🎨'
  },
  {
    id: 'media-image-format-converter',
    name: '图片格式转换',
    description: '在不同图片格式之间转换',
    category: 'media',
    icon: '🔄'
  },
  {
    id: 'media-image-watermark',
    name: '图片加水印',
    description: '为图片添加水印',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-palette-generator',
    name: '调色板生成',
    description: '生成调色板',
    category: 'media',
    icon: '🎨'
  },
  {
    id: 'media-image-color-extractor',
    name: '图片主色提取',
    description: '提取图片的主色调',
    category: 'media',
    icon: '🎨'
  },
  {
    id: 'media-image-resize',
    name: '图片尺寸调整',
    description: '调整图片尺寸',
    category: 'media',
    icon: '📏'
  },
  {
    id: 'media-image-stitch',
    name: '图片拼接',
    description: '拼接多张图片',
    category: 'media',
    icon: '🔄'
  },
  {
    id: 'media-gif-splitter',
    name: 'GIF拆帧',
    description: '将GIF拆分为帧',
    category: 'media',
    icon: '🎬'
  },
  {
    id: 'media-gif-maker',
    name: '多图合成GIF',
    description: '将多张图片合成为GIF',
    category: 'media',
    icon: '🎬'
  },
  {
    id: 'media-video-to-gif',
    name: '视频转GIF',
    description: '将视频转换为GIF',
    category: 'media',
    icon: '🎬'
  },
  {
    id: 'media-audio-waveform',
    name: '音频波形生成',
    description: '生成音频波形',
    category: 'media',
    icon: '🎵'
  },
  {
    id: 'media-recorder',
    name: '录音工具',
    description: '录制音频',
    category: 'media',
    icon: '🎙️'
  },
  {
    id: 'media-image-to-ascii',
    name: '图片转ASCII艺术',
    description: '将图片转换为ASCII艺术',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-image-filters',
    name: '图片转素描油画滤镜',
    description: '为图片应用素描或油画滤镜',
    category: 'media',
    icon: '🎨'
  },
  {
    id: 'media-screen-color-picker',
    name: '屏幕取色器',
    description: '从屏幕上取色',
    category: 'media',
    icon: '🎨'
  },
  {
    id: 'media-image-exif',
    name: '图片Exif信息查看',
    description: '查看图片的Exif信息',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-icon-generator',
    name: '图标生成器',
    description: '生成图标',
    category: 'media',
    icon: '📱'
  },
  {
    id: 'media-solid-background',
    name: '纯色背景生成',
    description: '生成纯色背景',
    category: 'media',
    icon: '🎨'
  },
  {
    id: 'media-gradient-background',
    name: '渐变背景生成',
    description: '生成渐变背景',
    category: 'media',
    icon: '🎨'
  },
  {
    id: 'media-image-blur-sharpen',
    name: '图片模糊锐化',
    description: '模糊或锐化图片',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-image-brightness-contrast',
    name: '亮度对比度调节',
    description: '调节图片的亮度和对比度',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-image-bw-invert',
    name: '图片黑白化反色',
    description: '将图片转换为黑白或反色',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-image-rounded-corners',
    name: '图片圆角边框',
    description: '为图片添加圆角边框',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-image-mosaic',
    name: '图片马赛克像素化',
    description: '将图片马赛克化或像素化',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-image-aspect-ratio',
    name: '图片尺寸比例计算',
    description: '计算图片的尺寸比例',
    category: 'media',
    icon: '📏'
  },
  {
    id: 'media-image-histogram',
    name: '图片直方图显示',
    description: '显示图片的直方图',
    category: 'media',
    icon: '📊'
  },
  {
    id: 'media-image-face-detection',
    name: '图片人脸检测',
    description: '检测图片中的人脸',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-image-object-detection',
    name: '图片物体识别',
    description: '识别图片中的物体',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-image-background-remove',
    name: '图片去除背景',
    description: '去除图片的背景',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-image-background-change',
    name: '图片换背景',
    description: '更换图片的背景',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-image-style-transfer',
    name: '图片风格迁移',
    description: '将一种图片的风格迁移到另一种图片',
    category: 'media',
    icon: '🎨'
  },
  {
    id: 'media-image-super-resolution',
    name: '图片超分辨率',
    description: '提高图片的分辨率',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-image-shape-crop',
    name: '图片裁剪圆形多边形',
    description: '将图片裁剪为圆形或多边形',
    category: 'media',
    icon: '✂️'
  },
  {
    id: 'media-image-collage',
    name: '图片拼图',
    description: '制作图片拼图',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-image-slideshow',
    name: '图片幻灯片生成器',
    description: '生成图片幻灯片',
    category: 'media',
    icon: '🎬'
  },
  {
    id: 'media-image-watermark-remove',
    name: '图片水印去除',
    description: '去除图片中的水印',
    category: 'media',
    icon: '🖼️'
  },
  {
    id: 'media-heic-to-jpeg',
    name: 'HEIC转JPEG',
    description: '将HEIC格式转换为JPEG',
    category: 'media',
    icon: '🔄'
  },
  {
    id: 'media-svg-to-png',
    name: 'SVG转PNG',
    description: '将SVG转换为PNG',
    category: 'media',
    icon: '🔄'
  },
  {
    id: 'media-png-to-svg',
    name: 'PNG转SVG',
    description: '将PNG转换为SVG',
    category: 'media',
    icon: '🔄'
  },
  {
    id: 'media-video-cover',
    name: '视频封面提取',
    description: '提取视频的封面',
    category: 'media',
    icon: '🎬'
  },
  {
    id: 'media-video-info',
    name: '视频信息查看',
    description: '查看视频的信息',
    category: 'media',
    icon: '🎬'
  },
  {
    id: 'media-audio-info',
    name: '音频信息查看',
    description: '查看音频的信息',
    category: 'media',
    icon: '🎵'
  },
  {
    id: 'media-audio-cut',
    name: '音频裁剪',
    description: '裁剪音频',
    category: 'media',
    icon: '✂️'
  },
  {
    id: 'media-audio-merge',
    name: '音频合并',
    description: '合并多个音频',
    category: 'media',
    icon: '🔄'
  },
  {
    id: 'media-audio-to-text',
    name: '音频转文字',
    description: '将音频转换为文字',
    category: 'media',
    icon: '🎵'
  },

  // 生活实用类
  {
    id: 'life-date-calculator',
    name: '日期计算器',
    description: '计算日期之间的差值',
    category: 'life',
    icon: '📅'
  },
  {
    id: 'life-age-calculator',
    name: '年龄计算器',
    description: '计算年龄',
    category: 'life',
    icon: '🎂'
  },
  {
    id: 'life-unit-converter',
    name: '单位换算',
    description: '在不同单位之间转换',
    category: 'life',
    icon: '📏'
  },
  {
    id: 'life-password-generator',
    name: '密码生成器',
    description: '生成安全的密码',
    category: 'life',
    icon: '🔐'
  },
  {
    id: 'life-bmi-calculator',
    name: 'BMI计算器',
    description: '计算BMI指数',
    category: 'life',
    icon: '🏥'
  },

  // 小说阅读类
  {
    id: 'novel-txt-reader',
    name: 'TXT在线阅读器',
    description: '在线阅读TXT文件',
    category: 'novel',
    icon: '📚'
  },
  {
    id: 'novel-chapter-split',
    name: '章节智能分割',
    description: '智能分割小说章节',
    category: 'novel',
    icon: '✂️'
  },
  {
    id: 'novel-reading-progress',
    name: '阅读进度记忆',
    description: '记忆阅读进度',
    category: 'novel',
    icon: '📖'
  },

  // 数据/计算类
  {
    id: 'data-scientific-calculator',
    name: '科学计算器',
    description: '科学计算工具',
    category: 'data',
    icon: '🧮'
  },
  {
    id: 'data-matrix-calculator',
    name: '矩阵计算',
    description: '进行矩阵计算',
    category: 'data',
    icon: '📊'
  },

  // 编码/加密类
  {
    id: 'crypto-md5',
    name: 'MD5哈希',
    description: '计算文本的MD5哈希值',
    category: 'crypto',
    icon: '🔒'
  },
  {
    id: 'crypto-sha',
    name: 'SHA系列哈希',
    description: '计算文本的SHA哈希值',
    category: 'crypto',
    icon: '🔒'
  },
  {
    id: 'crypto-aes',
    name: 'AES加密解密',
    description: '对文本进行AES加密和解密',
    category: 'crypto',
    icon: '🔒'
  },

  // 网络/域名类
  {
    id: 'network-ip-query',
    name: 'IP地址查询',
    description: '查询IP地址的信息',
    category: 'network',
    icon: '🌐'
  },
  {
    id: 'network-dns-lookup',
    name: 'DNS解析查询',
    description: '查询DNS解析信息',
    category: 'network',
    icon: '🌐'
  },

  // 教育学习类
  {
    id: 'education-math-formula',
    name: '数学公式编辑器',
    description: '编辑数学公式',
    category: 'education',
    icon: '📐'
  },
  {
    id: 'education-function-plotter',
    name: '函数绘图工具',
    description: '绘制函数图像',
    category: 'education',
    icon: '📈'
  },

  // 健康健身类
  {
    id: 'health-bmi-calculator',
    name: 'BMI计算器',
    description: '计算BMI指数',
    category: 'health',
    icon: '🏥'
  },
  {
    id: 'health-body-fat-calculator',
    name: '体脂率计算器',
    description: '计算体脂率',
    category: 'health',
    icon: '🏥'
  },

  // 金融理财类
  {
    id: 'finance-compound-calculator',
    name: '复利计算器',
    description: '计算复利',
    category: 'finance',
    icon: '💰'
  },
  {
    id: 'finance-investment-return',
    name: '投资回报率计算',
    description: '计算投资回报率',
    category: 'finance',
    icon: '📈'
  },

  // 文件处理类
  {
    id: 'file-hash',
    name: '文件哈希',
    description: '计算文件的哈希值',
    category: 'file',
    icon: '🔍'
  },
  {
    id: 'file-batch-rename',
    name: '文件批量重命名',
    description: '批量重命名文件',
    category: 'file',
    icon: '📁'
  },

  // AI智能类
  {
    id: 'ai-chat',
    name: '智能问答',
    description: '智能问答系统',
    category: 'ai',
    icon: '🤖'
  },
  {
    id: 'ai-text-summary',
    name: '文本摘要',
    description: '生成文本摘要',
    category: 'ai',
    icon: '📝'
  },

  // 游戏娱乐类
  {
    id: 'game-guess-number',
    name: '猜数字',
    description: '猜数字游戏',
    category: 'game',
    icon: '🎮'
  },
  {
    id: 'game-2048',
    name: '2048',
    description: '2048游戏',
    category: 'game',
    icon: '🎮'
  }
];
