---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/manual-string-trimming
- /static_analysis/rules/go-best-practices/manual-string-trimming
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/manual-string-trimming
  language: Go
  severity: Warning
  severity_rank: 2
title: Avoid manual string trimming
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/manual-string-trimming`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
In Go, the `strings.TrimPrefix()` function provides a more idiomatic and efficient way to remove a prefix from a string compared to using `strings.HasPrefix()` and slicing the string manually.

Here's why you should use `strings.TrimPrefix()` instead of the manual slicing approach:

1.  Readability: `strings.TrimPrefix(str, prefix)` conveys the intention of removing the specified prefix from `str` more clearly than using `strings.HasPrefix()` and slicing `str`. It's a self-explanatory function that makes the code more readable and easier to understand.
2.  Simplicity: By using `strings.TrimPrefix()`, you eliminate the need for manual slicing and calculating the length of the prefix. It simplifies your code and reduces the chances of introducing errors.
3.  Performance: `strings.TrimPrefix()` is implemented with optimal string manipulation techniques, making it more performant than manually slicing the string. It avoids creating unnecessary substrings, resulting in better efficiency when dealing with large strings.

For example, consider the following code snippets:

```go
1
2
3
if strings.HasPrefix(str, prefix) {
    str = str[len(prefix):]
}
```

```go
str = strings.TrimPrefix(str, prefix)
```

Both snippets remove the prefix from the string if it exists. However, the second snippet using `strings.TrimPrefix()` is preferred for its simplicity, readability, and potential performance benefits.

By using `strings.TrimPrefix()` instead of the manual slicing approach, you can write cleaner and more efficient code that adheres to Go's idiomatic principles.

## Non-Compliant Code Examples
```go
func main() {
    if strings.HasPrefix(str, prefix) {
        str = str[len(prefix):]
        str2 := str[len(prefix):]
    }
}
```

## Compliant Code Examples
```go
func main() {
    strings.TrimPrefix(str, prefix)
}
```
