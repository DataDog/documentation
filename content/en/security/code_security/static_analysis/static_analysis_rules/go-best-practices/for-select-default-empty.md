---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/for-select-default-empty
- /static_analysis/rules/go-best-practices/for-select-default-empty
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/for-select-default-empty
  language: Go
  severity: Notice
  severity_rank: 3
title: Prevent empty default case for select without condition
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/for-select-default-empty`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
In Go, the default case of a switch statement is executed when none of the preceding cases match the specified condition.

While it is technically allowed to have an empty default case, it is generally considered a bad practice because it can lead to confusion and make the code harder to read and maintain.

Here are a few reasons why the default case should not be empty in Go:

1.  **Clarity and readability**: The primary goal of writing code is to make it understandable to other developers. Using an empty default case leaves the reader wondering why it is there and what its purpose might be. It is better to explicitly handle all possible cases, even if it means adding a placeholder or a comment.
2.  **Future-proofing**: An empty default case can be a sign of incomplete or unfinished code. If new cases are added in the future and the default case remains empty, it may lead to unintended consequences or logic errors.
3.  **Linting and static analysis tools**: Some linting tools and static analysis tools may flag empty default cases as potential mistakes or omissions. These tools can help identify and prevent potential bugs or issues in the code.

To address these concerns, it is recommended to either provide a meaningful action or simply include a comment in the default case explaining the reason for its presence. This helps improve code clarity, maintainability, and ensures proper handling of all possible cases in the switch statement.


## Non-Compliant Code Examples
```go
func main () {
    for {
		select {
		    case <-myChannel:
		    default:
		}
	}
}
```

## Compliant Code Examples
```go
func main () {
    for {
		select {
		    case <-myChannel:
				println("foo")
		    default:
				println("bar")
				
		}
	}

	for {
		select {
		    case <-myChannel2:
				println("foo")
		    default:
				// println("bar")
		}
	}

	for something {
		select {
		    case <-myChannel2:
				println("foo")
		    default:
		}
	}

	select {
		case <-myChannel:
		default:
	}

    for {
		select {
		    case <-myChannel:
		    default:
		}
		println("foo") // another statement after for, no warning
	}
}
```
