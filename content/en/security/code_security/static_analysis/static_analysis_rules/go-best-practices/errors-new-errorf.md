---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/errors-new-errorf
- /static_analysis/rules/go-best-practices/errors-new-errorf
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/errors-new-errorf
  language: Go
  severity: Info
  severity_rank: 4
title: Use fmt.Errorf instead of new errors with Sprintf
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/errors-new-errorf`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
However, it is preferable to use `fmt.Errorf("something %s", foo)` instead of `errors.New(fmt.Sprintf("something %s", foo))`. 
	
Here are a few reasons why:

1.  Simplicity: The `fmt.Errorf` function simplifies the error message creation by combining the formatting and error wrapping in one function call. It automatically prefixes the error message with the location information, including the file name and line number, which aids in debugging. In contrast, using `errors.New(fmt.Sprintf("something %s", foo))` requires an extra step of formatting the string separately before creating the error.
2.  Consistency: By consistently using `fmt.Errorf`, developers maintain a uniform approach to error handling and can easily recognize and handle errors throughout the codebase. Using a single idiomatic method rather than mixing different styles ensures consistency and improves code readability and maintainability.
3.  Improved error messages: `fmt.Errorf` provides additional context information for debugging purposes by including the file name and line number where the error was generated. This context can be invaluable in identifying the source of an error quickly and accurately. The `errors.New` approach lacks this valuable context information.
4.  Error wrapping: Go 1.13 introduced error wrapping functionality with the `errors` package, allowing for richer error handling. By using `fmt.Errorf`, you can take advantage of this feature, which allows you to wrap errors with additional contextual information. This information provides a hierarchical error structure, which is useful for understanding error causes and propagation.

To summarize, utilizing `fmt.Errorf` over `errors.New(fmt.Sprintf("something %s", foo))` is preferred due to its simplicity, consistency, improved error messages, and the ability to leverage error wrapping capabilities introduced in Go 1.13. By conforming to best practices, developers can write cleaner and more maintainable error handling code.


## Non-Compliant Code Examples
```go
func myFunc() error {
	foo := "foo"
	return errors.New(fmt.Sprintf("error: %s", foo))
}
```

## Compliant Code Examples
```go
func myFunc() error {
	foo := "foo"
	return fmt.Errorf("error: %s", foo)
}

```
