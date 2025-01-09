---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/simplify-pointer-operation
- /static_analysis/rules/go-best-practices/simplify-pointer-operation
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/simplify-pointer-operation
  language: Go
  severity: Info
  severity_rank: 4
title: Simplify pointer operation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/simplify-pointer-operation`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
Incorrect pointer manipulation can potentially lead to undefined behavior or introduce unnecessary complexity in the code. By understanding the correct usage of pointers and references, we can write cleaner and more maintainable code.

With the call `functionTakesPointer(&*pt1)`, the code attempts to take the address of the value pointed to by `pt1` and then dereference it. This operation doesn't serve any useful purpose and is redundant. It is considered best practice to simply pass the pointer itself without extra operators, as shown in the correct alternative, `functionTakesPointer(pt1)`.

Similarly, with `functionTakesValue(*&pt1)`, the code attempts to take the reference of `pt1` and then dereference it. Again, this operation is unnecessary and can lead to confusion for other developers reading the code. The correct alternative is to pass the value directly, without additional operators: `functionTakesValue(pt1)`.

To avoid these errors, remember the following good coding practices:

1.  When passing pointers to functions, pass the pointer directly without unnecessary address-of or dereference operators.
2.  When passing values to functions, pass values directly without unnecessary reference or dereference operators.
3.  Focus on writing clear and concise code that accurately conveys your intentions to fellow developers.
4.  Take advantage of code review and static analysis tools to identify and correct such mistakes early in the development process.

By following these practices, you can enhance the clarity and maintainability of your code, reducing the risk of introducing bugs and making it easier for others to read and understand your code.


## Non-Compliant Code Examples
```go
func main () {
    functionTakesPointer(&*pt1)
	functionTakesValue(*&pt1)
}
```

## Compliant Code Examples
```go
func main () {
    functionTakesPointer(pt1)
	functionTakesValue(pt1)
}
```
