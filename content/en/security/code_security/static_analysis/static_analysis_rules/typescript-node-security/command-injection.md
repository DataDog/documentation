---
aliases:
- /continuous_integration/static_analysis/rules/typescript-node-security/command-injection
- /static_analysis/rules/typescript-node-security/command-injection
dependencies: []
disable_edit: true
group_id: typescript-node-security
meta:
  category: Security
  id: typescript-node-security/command-injection
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid command injection
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-node-security/command-injection`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [78](https://cwe.mitre.org/data/definitions/78.html)

## Description
When executing a command, never use unchecked variables. Make sure that each variable of the command has been checked.

## Non-Compliant Code Examples
```typescript
childprocess.exec(`mv ${src} ${dst}`, (error, stdout, stderr) => {});
childprocess.exec('mv ' + src + " " + dst, (error, stdout, stderr) => {});
```

## Compliant Code Examples
```typescript
childprocess.exec('mv /tmp/src /tmp/dst', (error, stdout, stderr) => {});
```
