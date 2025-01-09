---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/avoid-yoda-conditions
- /static_analysis/rules/go-best-practices/avoid-yoda-conditions
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/avoid-yoda-conditions
  language: Go
  severity: Info
  severity_rank: 4
title: Put constants and values on the right
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/avoid-yoda-conditions`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
A "Yoda condition" is a notation style that places the constant or value on the left side of an equality check.

Standard notation:
```go
if something == 42 { }
```

Yoda notation:
```go
if 42 == something { }
```

This is sometimes used in interpreted programming languages to avoid the problem of accidental assignment. For example, in JavaScript, `if (something = 42)` assigns `something` to `42` instead of checking equality, and so using Yoda notation would throw a runtime error instead of introducing a logic error.

The Go compiler prevents this kind of mistake, so the more idiomatic standard notation should be preferred.


## Non-Compliant Code Examples
```go
func main() {
    if 51 == something {

    }

    if "myValue" == something {

    }

    if 0.0 == myValue && 0 == plop {

    }


    if 0.0 < myValue {
        
    }
}
```

## Compliant Code Examples
```go
func main() {
    if something == 51 {

    }

    if something == "myValue" {

    }

    if myValue == 0.0 && plop == 0 {

    }


    if 0.0 < myValue {
        
    }
}
```
