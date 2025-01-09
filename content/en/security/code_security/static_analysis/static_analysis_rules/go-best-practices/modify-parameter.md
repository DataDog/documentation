---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/modify-parameter
- /static_analysis/rules/go-best-practices/modify-parameter
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/modify-parameter
  language: Go
  severity: Info
  severity_rank: 4
title: Do not modify function parameter
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/modify-parameter`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
Assigning new values to function parameters exhibits several bad coding practices and should be avoided for several reasons:

1.  Redefining parameters: The code redefines a parameter within the function body by assigning a new value. This is considered a bad practice because it can lead to confusion and make the code harder to understand. Modifying a function parameter in this manner breaks the expected behavior and can cause unexpected side effects. It is generally best to treat function parameters as read-only values and avoid reassigning them.
2.  Shadowing variables: The code further exacerbates the issue by using the short variable declaration `:=` to define a new variable within the function body. This shadows the original parameter, making it inaccessible within the function. Shadowing variables can cause confusion and make the code harder to reason about. It is better to use distinct variable names to maintain clarity and avoid any unintended side effects.

To write more maintainable and understandable code, it is advisable to adhere to the following practices:

-   Avoid redefining function parameters.
-   Use descriptive and unambiguous variable names.
-   Avoid shadowing variables.
-   Maintain consistency in variable references.

By following these best practices, the code becomes more readable and easier to manage and avoids introducing unnecessary complexity and confusion.


## Non-Compliant Code Examples
```go
func myfunction1(param int) {
	param, b := 1, 2
    param = 41
    param := 51
	param++
    param--
}

func myfunction42(param int) {
	param, b = 1, 2
}

func (r *Type) myfunction2(param int) {
	param, b := 1, 2
    param = 41
    param := 51
	param++
    param--
}
```

## Compliant Code Examples
```go
func foobar(_ int) {
	_ := plop()
}
```

```go
func (r *Type) myfunction1(ctx context.Context) {
	span, ctx := tracer.StartSpanFromContext(ctx, "myfunction")
}

func myfunction2(ctx context.Context) {
	span, ctx := tracer.StartSpanFromContext(ctx, "myfunction")
}
```
