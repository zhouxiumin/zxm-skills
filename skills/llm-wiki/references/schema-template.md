# CLAUDE.md Schema 模板

初始化 Wiki 时，在项目根目录创建 `CLAUDE.md` 文件，定义 Wiki 的结构约定和工作流规则。

## 模板

```markdown
# Wiki Schema

## 目录结构
- raw/ — 原始资料（不可变）
- raw/assets/ — 图片等附件
- wiki/ — LLM 维护的 Wiki 页面
- wiki/index.md — 内容索引
- wiki/log.md — 操作日志

## 页面类型
- source-{关键词}.md — 料摘要页
- {实体名}.md — 实体页（工具/产品/人物）
- {概念名}.md — 概念页（方法论/模式）
- {场景}-workflow.md — 工作流页

## Frontmatter 约定
每个页面必须包含 tags 和 type 字段。资料摘要页额外包含 source、author、date、url。

## 交叉引用
- 页面间使用 [[wikilink]] 语法
- 每页底部附来源链接
- 摘要页末尾列相关概念

## 操作日志格式
log.md 每条记录格式：## [YYYY-MM-DD] 操作类型 | 主题

## 维护规则
- 禁止修改 raw/ 目录中的文件
- 矛盾观点标注而非覆盖
- 竞品档案等时效性内容带日期命名
```

## 说明

- 根据实际知识库领域调整 tags 类别和页面命名规则
- `CLAUDE.md` 应与 LLM 共同迭代演进
- 初始化后可根据导入经验逐步补充维护规则
