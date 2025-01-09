---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/valid-regular-expression
- /static_analysis/rules/go-best-practices/valid-regular-expression
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/valid-regular-expression
  language: Go
  severity: Info
  severity_rank: 4
title: Avoid invalid regular expression
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/valid-regular-expression`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
Regular expression in Go must be valid regular expressions. You can check the validity of regular expressions on [regex101.com](https://regex101.com/).

## Non-Compliant Code Examples
```go
func main() {
    var c1 = "["
    c2 := "["

    regexp.MustCompile(c1)

    if something {
        regexp.MustCompile(c2)
    } else {
        regexp.MustCompile(c2)
    }
    
}
```

```go
func main() {
    regexp.MustCompile("[")
    regexp.Compile("(")
    regexp.Match("(")
    regexp.MatchReader("(")
    regexp.MatchString("(")
}
```

## Compliant Code Examples
```go
func main() {
    regexp.MustCompile("[a-z]+")
    regexp.Compile("[a-z]+")
    regexp.Match("[a-z]+")
    regexp.MatchReader("[a-z]+")
    regexp.MatchString("[a-z]+")
    regexp.MustCompile("^error-tracking-(.+)$")
    regexp.MustCompile("(?i)windows")    
}
```
