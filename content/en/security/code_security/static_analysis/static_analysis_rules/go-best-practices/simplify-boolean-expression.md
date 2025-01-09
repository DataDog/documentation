---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/simplify-boolean-expression
- /static_analysis/rules/go-best-practices/simplify-boolean-expression
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/simplify-boolean-expression
  language: Go
  severity: Info
  severity_rank: 4
title: Simplify boolean expression
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/simplify-boolean-expression`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
In Go, it is considered unnecessary and less readable to write a conditional statement that returns `true` or `false` explicitly based on a condition. Instead, it is recommended to directly return the condition itself. Here's why:

1.  **Code simplicity and readability**: Writing `return condition` directly conveys the intent of the code more clearly and reduces unnecessary verbosity. It is easier for other developers to understand your code at a glance without having to analyze additional conditional statements.
2.  **Avoidance of redundancy**: Explicitly returning `true` or `false` based on a condition introduces redundancy in the code. Since the condition itself already evaluates to a boolean value (`true` or `false`), there is no need to include additional `return true` or `return false` statements.
3.  **Maintainability and refactoring**: The direct `return condition` approach is more maintainable and flexible for future code changes. If the condition or the desired return value changes, it is easier to modify a single line rather than multiple lines of code. This minimizes the chances of introducing errors or inconsistencies during refactoring.

Therefore, it is recommended to simply use `return condition` instead of `if condition { return true } return false`. By doing so, you improve code readability, reduce redundancy, and ensure better maintainability of your Go code.


## Non-Compliant Code Examples
```go
func main() {
    if foo == 1 {
        return true
    }
    return false
}
```

```go
func main() {
    if foo == 1 {
        return true
    } else {
        return false
    }
}
```

## Compliant Code Examples
```go
func main() {
exists, err := h.deduper.KeyExists(ctx, dedupeKey)
    if err != nil {
        return false, commonhandler.RetryErrHandleResp(err)
    } else if exists {
        return true, commonhandler.SuccessHandleResp
    }

    return false, commonhandler.SuccessHandleResp

}
```

```go
func main() {
    if foo == 1 {
        println("foo")
        return true
    } else {
        return false
    }

    if strings.TrimSpace(rawMessage.Custom.Git.RepositoryURL) == "" {
        return false, ""
    }
    return true, ""
}
```
