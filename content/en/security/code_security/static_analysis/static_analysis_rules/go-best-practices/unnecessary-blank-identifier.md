---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/unnecessary-blank-identifier
- /static_analysis/rules/go-best-practices/unnecessary-blank-identifier
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/unnecessary-blank-identifier
  language: Go
  severity: Info
  severity_rank: 4
title: Remove unnecessary blank identifiers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/unnecessary-blank-identifier`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
In Go, when using range iterations or receiving values from channels, it is recommended to avoid assigning the iteration or received value to the blank identifier `_`. Instead, it is preferred to omit the assignment entirely.

Here's why it is best to use `for range s {}`, `x = someMap[key]`, and `<-ch` instead of using the blank identifier `_`:

1.  Clarity and Readability: By omitting the assignment entirely, it makes the code more readable and self-explanatory. Using `_` can introduce confusion and make it less clear what the purpose of the assignment is or if the value is discarded intentionally or accidentally.
2.  Avoiding Variable Pollution: Using `_` as an assignment can unnecessarily pollute the variable space. Although Go allows the use of the blank identifier `_` to disregard a value, it is a good practice to avoid introducing unnecessary variables, especially if they are never used.
3.  Linting and static analysis: Some linting tools and static analyzers may flag the use of `varName = _` as an indication of accidental assignment or failure to handle errors or returned values properly. Removing these assignments eliminates such warnings or false-positive detections.

For example, consider the following code snippets:

```go
for _ = range aSlice {}
x, _ = something()
_ = <- aChannel
```

```go
for range aSlice {}
x = something()
<-aChannel
```

Both snippets achieve the same result, but the second one that omits the assignments using `_` is preferred for its simplicity, readability, and adherence to Go's best practices.

By using `for range s {}`, `x = someMap[key]`, and `<-ch` instead of assigning to `_`, you can write cleaner and more readable Go code while avoiding unnecessary variable assignments and potential confusion.


## Non-Compliant Code Examples
```go
func main() {
    for _ = range aSlice {
        
    }
    x, _ = myMap[key]
    _ = <- aChannel

    x, _ = myFunction()

    for key, _ = range myMap {
        
    }

    for _, _ = range myMap {
        
    }
}
```

## Compliant Code Examples
```go
func main() {
    for aSlice {
        
    }
    x = myMap[key]
    <- aChannel

    for _, val = range mySlice {
        
    }
}
```
