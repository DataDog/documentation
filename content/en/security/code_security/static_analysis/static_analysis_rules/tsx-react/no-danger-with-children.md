---
aliases:
- /continuous_integration/static_analysis/rules/tsx-react/no-danger-with-children
- /static_analysis/rules/tsx-react/no-danger-with-children
dependencies: []
disable_edit: true
group_id: tsx-react
meta:
  category: Error Prone
  id: tsx-react/no-danger-with-children
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid using children with dangerouslySetInnerHTML
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `tsx-react/no-danger-with-children`

**Language:** TypeScript

**Severity:** Warning

**Category:** Error Prone

## Description
If both `children` and `dangerouslySetInnerHTML` are set, it's unclear which one should take precedence, and React will throw a warning. To prevent this mistake, this rule enforces that either children or dangerouslySetInnerHTML are used, but not both.

## Non-Compliant Code Examples
```typescript
<div dangerouslySetInnerHTML={{ __html: "HTML" }}>{Children}</div>;
<Hello dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</Hello>;
<Hello dangerouslySetInnerHTML={{ __html: "HTML" }}><Another /></Hello>;
React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" } }, "Children");
React.createElement("Hello", { dangerouslySetInnerHTML: { __html: "HTML" } }, "Children");
```

## Compliant Code Examples
```typescript
<div dangerouslySetInnerHTML={{ __html: "HTML" }} />;
<Hello dangerouslySetInnerHTML={{ __html: "HTML" }} />;
<div>Children</div>;
<Hello>Children</Hello>;
React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" } });
React.createElement("Hello", { dangerouslySetInnerHTML: { __html: "HTML" } });
React.createElement("div", {}, "Children");
React.createElement("Hello", {}, "Children");
```
