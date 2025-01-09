---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/regexp-zero-results
- /static_analysis/rules/go-best-practices/regexp-zero-results
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/regexp-zero-results
  language: Go
  severity: Info
  severity_rank: 4
title: Regexp FindAll with n=0 returns nothing
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/regexp-zero-results`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
Go, invoking the function `re.FindAll()` with the second argument set to 0 will not return any results.

## Non-Compliant Code Examples
```go
import "regexp"

func main () {
    re := regexp.MustCompile("foo(")
    re.FindAll([]byte(`seafood fool`), 0)
}
```

```go
import "regexp"

func main () {

    var re *regexp.Regexp

    res := re.FindAll(something, 0)
}
```

```go
import "regexp"

func main () {

    re := regexp.MustCompile(`foo.?`)

    res := re.FindAll(something, 0)
}
```

```go
import "regexp"

func main () {
    var r *regexp.Regexp
    res := r.FindAll(something, 0)
    
    var r2 regexp.Regexp
    res := r2.FindAll(something, 0)

    regexp.MustCompile("foo(").FindAll(nil, 0)
    regexp.MustCompile(`foo.?`).FindAll([]byte(`seafood fool`), -1)

    res = r.FindAll(something, 0)

    if something {
        re.FindAll([]byte(`seafood fool`), -1)
    }
}
```
