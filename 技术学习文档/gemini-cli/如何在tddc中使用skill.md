# 如何在 TDDC 中使用 Skill

## 安装步骤

### 1. 安装 OpenSkills CLI

```bash
npm i -g openskills
```

### 2. 安装 Anthropic Skills

```bash
openskills install anthropics/skills --universal
```

## 配置 SFCODE.md

> [!important] 配置位置
> 将以下内容复制到 `SFCODE.md` 文件中。
> **重要：** 配置应该放在第一行标题下面，不要放在文件的最上面或最下面。

### Available Skills 配置

```markdown
## Available Skills

<!-- SKILLS_TABLE_START -->
<usage>
When users ask you to perform tasks, check if any of the available skills below can help complete the task more effectively. Skills provide specialized capabilities and domain knowledge.

How to use skills:
- Invoke: Bash("openskills read <skill-name>")
- The skill content will load with detailed instructions on how to complete the task
- Base directory provided in output for resolving bundled resources (references/, scripts/, assets/)

Usage notes:
- Only use skills listed in <available_skills> below
- Do not invoke a skill that is already loaded in your context
- Each skill invocation is stateless
</usage>

<available_skills>
```

## 快速参考

| 命令 | 描述 |
|------|------|
| `npm i -g openskills` | 全局安装 OpenSkills CLI |
| `openskills install anthropics/skills --universal` | 安装 Anthropic Skills |
| `openskills read <skill-name>` | 读取特定 skill 的文档 |