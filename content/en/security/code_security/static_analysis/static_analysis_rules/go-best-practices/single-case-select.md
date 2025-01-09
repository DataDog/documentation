---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/single-case-select
- /static_analysis/rules/go-best-practices/single-case-select
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/single-case-select
  language: Go
  severity: Info
  severity_rank: 4
title: Avoid select statement with one case
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/single-case-select`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
In Go, using a `select` statement with a single case is generally considered a code smell and not a recommended practice. 
	
Here are a few reasons why:

1.  **Clarity and intent**: The purpose of a `select` statement is to select and execute the first `case` that is ready to proceed. When there is only a single `case` in the `select` statement, it becomes redundant and obscures the clarity of the code. It is better to use a straightforward control flow statement like `if` or `switch` instead, as it conveys the intent more directly.
2.  **Readability and maintainability**: A `select` statement with a single case can make the code harder to read and understand. It adds unnecessary complexity and can confuse other developers who are reviewing or maintaining the codebase. It's important to write code that is easy to comprehend and follow.
3.  **Flexibility for future additions**: Having a single case in a `select` statement limits the extensibility of the code. If additional cases need to be added in the future, it becomes clumsy to modify the code by converting the single case into a `default` case or by adding more cases. It's better to start with a more flexible structure, such as an `if` statement, that can accommodate future additions more easily.
4.  **Linting and static analysis tools**: Many linting tools and static code analyzers can detect and flag a single `case` in a `select` statement as a potential code issue or a pattern that can be simplified. This can result in unnecessary noise and make it harder to identify genuine issues when reviewing the codebase with these tools.

To improve code readability and maintainability, it is recommended to use `select` statements when there are multiple cases with different synchronization or communication requirements. For a single case, it is clearer and more straightforward to use an `if` statement or a simple control flow construct.


## Non-Compliant Code Examples
```go
func main () {
    select {
        case <-ch: {

        }
    }
}
```

## Compliant Code Examples
```go
func main () {
    select {
        case <-ch1: {

        }
        case <-ch2: {

        }
    }
}
```
