<skills_system priority="1">

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

<skill>
<name>skill-creator</name>
<description>Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations.</description>
<location>global</location>
</skill>

<skill>
<name>code-review</name>
<description>前端代码审查技能。提供全面的代码质量检查，包括代码规范、配置检查、语法报错、核心功能降级、脏数据mock残留、潜在业务报错、数据取值降级、脚本检查、性能检查、代码注释、浏览器兼容性、代码重复性等12项检查维度。当用户提交代码需要review、代码质量检查、合并请求审查、或需要检查代码潜在问题时使用此技能。</description>
<location>/elog-nwms-core-all-web/.sfcode/skills/code-review/SKILL.md</location>
</skill>

<skill>
<name>code-generation-tasks</name>
<description>N-WMS 项目代码生成关键任务技能。包含路由与权限配置（含SQL生成）、国际化翻译、代码规范等核心开发规范。当用户需要添加新路由/菜单、配置权限SQL、添加国际化翻译、新建页面/组件时使用此技能。</description>
<location>/elog-nwms-core-all-web/.sfcode/skills/code-generation-tasks/SKILL.md</location>
</skill>
</available_skills>
<!-- SKILLS_TABLE_END -->

</skills_system>
