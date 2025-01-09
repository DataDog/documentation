---
aliases:
- /continuous_integration/static_analysis/rules/go-inclusive/comments
- /static_analysis/rules/go-inclusive/comments
dependencies: []
disable_edit: true
group_id: go-inclusive
meta:
  category: Best Practices
  id: go-inclusive/comments
  language: Go
  severity: Notice
  severity_rank: 3
title: Use inclusive language in comments
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-inclusive/comments`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
Use inclusive language in comments.

## Non-Compliant Code Examples
```go
/**
 *  whitelist and blacklist names to prevent unauthorized usage
 */

// This app follows the master/slave model

// she SHE should check her code

// he should check his
```
