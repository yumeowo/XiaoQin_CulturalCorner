# 微信公众号文章同步指南

本指南说明如何将微信公众号"小秦文化角"的文章同步到网站。

## 同步流程

### 1. 准备文章内容

从微信公众号复制文章内容，包括：
- 标题
- 正文（Markdown格式）
- 发布日期
- 封面图片（可选）
- 分类和标签

### 2. 创建Markdown文件

在 `content/articles/` 目录下创建新的Markdown文件，文件名建议使用英文和连字符，例如：
```
shanhaiguan-first-pass.md
beidaihe-beach-guide.md
qinhuangdao-food-culture.md
```

### 3. 文件结构

每个文章文件应包含以下结构：

```markdown
---
title: "文章标题"
date: "YYYY-MM-DD"
author: "小秦文化角"
category: "景点|文化|美食|活动"
tags: ["标签1", "标签2", "标签3"]
coverImage: "/images/articles/image-name.jpg"
excerpt: "文章摘要，100-200字简介"
published: true
---

# 文章标题

文章正文内容...

## 二级标题

段落内容...

### 三级标题

- 列表项1
- 列表项2

---

*本文同步自微信公众号"小秦文化角"*
```

### 4. Front Matter字段说明

| 字段         | 必填 | 说明                 |
|------------|----|--------------------|
| title      | ✅  | 文章标题               |
| slug       | ✅  | URL路径，使用英文和连字符     |
| date       | ✅  | 发布日期，格式：YYYY-MM-DD |
| author     | ✅  | 作者名称，通常为"小秦文化角"    |
| category   | ✅  | 分类：景点/文化/美食/活动     |
| tags       | ✅  | 标签数组，建议3-5个        |
| coverImage | ❌  | 封面图片路径             |
| excerpt    | ✅  | 文章摘要               |
| published  | ✅  | 是否发布，true/false    |

### 5. 图片处理

1. 将图片保存到 `public/images/articles/` 目录
2. 在Markdown中引用：
   ```markdown
   ![图片描述](/images/articles/your-image.jpg)
   ```
   **注意**：图片路径必须以 `/` 开头，从 public 目录开始的绝对路径。

### 6. 提交到Git

创建文件后，使用以下命令将其添加到Git：

```bash
# 添加新文章
git add content/articles/your-article.md

# 如果有图片，也要添加
git add public/images/articles/your-image.jpg

# 提交
git commit -m "新增文章：文章标题"

# 推送到远程
git push
```

## 示例文章

参考 `content/articles/example-shanhaiguan.md` 查看完整示例。

## Markdown语法支持

网站支持以下Markdown语法：

### 基础语法
- **粗体** `**粗体**`
- *斜体* `*斜体*`
- [链接]() `[链接](url)`
- `代码` `` `代码` ``

### 标题
```markdown
# 一级标题
## 二级标题
### 三级标题
```

### 列表
```markdown
- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2
```

### 引用
```markdown
> 这是引用内容
```

### 代码块
````markdown
```javascript
const hello = "world";
```
````

### 表格
| A | B | C |
|---|---|---|
|   |   |   |
|   |   |   |

### 分隔线
```markdown
---
```

## 常用分类和标签

### 分类（category）
- 景点
- 文化
- 美食
- 活动

### 常用标签（tags）
- 山海关
- 北戴河
- 长城
- 历史
- 海滩
- 特色美食
- 旅游攻略
- 文化遗产
- 节庆活动

## 注意事项

1. **文件名规范**：使用小写字母和连字符，避免使用中文和空格
2. **日期格式**：统一使用 YYYY-MM-DD 格式
3. **图片优化**：上传前压缩图片，建议宽度不超过1200px
4. **链接检查**：确保所有链接有效
5. **预览测试**：提交前在本地运行 `pnpm run dev` 预览效果
6. **SEO优化**：
   - 标题简洁明了，包含关键词
   - 摘要准确概括文章内容
   - 标签选择与内容相关
7. **版权声明**：文章末尾注明来源"本文同步自微信公众号'小秦文化角'"

## 文章管理

### 查看所有文章
访问 `/articles` 页面查看所有已发布的文章。

### 修改文章
直接编辑对应的Markdown文件，然后提交更改。

### 删除文章
将 `published` 字段设为 `false`，或直接删除文件。

### 草稿功能
将 `published` 设为 `false`，文章将不会显示在网站上。

## 故障排除

### 文章不显示
1. 检查 `published` 字段是否为 `true`
2. 检查Front Matter格式是否正确（YAML语法）
3. 检查文件是否保存为 `.md` 格式
4. 运行 `pnpm run dev` 查看控制台错误

### 图片不显示
1. 检查图片路径是否正确
2. 确认图片已放入 `public/images/articles/` 目录
3. 检查图片文件名是否包含特殊字符

### 格式显示异常
1. 检查Markdown语法是否正确
2. 确认没有使用不支持的HTML标签
3. 查看浏览器开发者工具的错误信息

## 需要帮助？

如有问题，请联系项目维护者：
- 邮箱：2839681263@qq.com
- 维护者：悠梦