---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/self-assignment
- /static_analysis/rules/go-best-practices/self-assignment
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/self-assignment
  language: Go
  severity: Notice
  severity_rank: 3
title: Prevent self-assignment of variables
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/self-assignment`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
Self-assignments are not useful and should generally be avoided. 
	
Here are a few reasons why:

```go
x := 10
x = x
```

Self-assignments are not useful and should generally be avoided. Here are a few reasons why:

1.  **Useless operation**: Self-assignments don't change the value of the variable. It's essentially a no-op operation that doesn't have any impact on the program's execution or the variable's state. It adds unnecessary code clutter and can confuse other developers who may assume that the self-assignment serves some purpose.
2.  **Reduced readability**: Self-assignments can make the code less readable and harder to understand. When encountering such code, developers might spend unnecessary time trying to understand the intention or purpose behind the self-assignment.
3.  **Potential for bugs**: Self-assignments can sometimes be a result of unintended code duplication or errors during refactoring. Although they don't cause any functional issues, they can introduce confusion and make it harder to spot actual bugs or unintended behaviors in the code.
4.  **Compiler optimization**: The Go compiler is built to perform various optimizations to generate efficient code. It is capable of detecting and eliminating self-assignments during the compilation process. By removing self-assignments from the code, we allow the compiler to focus on more meaningful optimizations that can improve the performance of the program.

In summary, self-assignments in Go are not useful and should be removed from the code. They don't serve any purpose, reduce code readability, and can potentially introduce confusion or mask actual bugs. Removing self-assignments leads to cleaner and more maintainable code.


## Non-Compliant Code Examples
```go
func main() {
    var foo int
    var bar int
    var baz int
    foo = foo
    foo, bar = foo, baz
}
```

## Compliant Code Examples
```go
func main() {
    var foo int
    var bar int
    var baz int
    foo = bar
    foo, bar = bar, baz
}
```
