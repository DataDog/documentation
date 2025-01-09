---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/time-parse-format
- /static_analysis/rules/go-best-practices/time-parse-format
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/time-parse-format
  language: Go
  severity: Info
  severity_rank: 4
title: Avoid custom time format
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/time-parse-format`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
Make sure your code use a valid time format. See the [official Go documentation](https://pkg.go.dev/time#pkg-constant) for the valid time format.

## Non-Compliant Code Examples
```go
func main() {
    time.Parse("foobar", something)
    time.Parse("00", something_else);
}
```

## Compliant Code Examples
```go
func main() {
    time.Parse(time.ANSIC, something)
    time.Parse("2006-01-02", something_else)

    mytime := time.ANSIC
    time.Parse(mytime, another_thing)
}
```
