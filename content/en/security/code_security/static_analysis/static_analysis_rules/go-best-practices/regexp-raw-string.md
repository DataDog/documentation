---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/regexp-raw-string
- /static_analysis/rules/go-best-practices/regexp-raw-string
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/regexp-raw-string
  language: Go
  severity: Info
  severity_rank: 4
title: Prevent using escapes in regular expression
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/regexp-raw-string`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
In Go, it is better to avoid using double backslashes (`\\`) in regular expressions and instead use raw string literals (enclosed by backticks) to define regular expressions.

When using double backslashes, each backslash has a special meaning and needs to be escaped. This can lead to confusion and make regular expressions harder to read and understand.

Using raw string literals with backticks, on the other hand, treats backslashes as regular characters and avoids the need for escaping. This simplifies the expression and makes it more readable.

## Non-Compliant Code Examples
```go
func main () {
   regexp.Compile("\\A(\\w+) total: items \\d+\\n\\z")
}
```

## Compliant Code Examples
```go
func main () {
   regexp.Compile(`\A(\w+) total: items \d+\n\z`)
}
```
