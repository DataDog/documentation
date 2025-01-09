---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/redundant-negation
- /static_analysis/rules/go-best-practices/redundant-negation
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/redundant-negation
  language: Go
  severity: Warning
  severity_rank: 2
title: Do not use redundant negation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/redundant-negation`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
You do not need to convert the string into a slice of bytes to use `Write`, you can just use the string directly.

## Non-Compliant Code Examples
```go
package main

func main() {
	n := 5
	if !!(n == 5) {
		fmt.Println("hello")
	} else if !(!(n == 5)) {
		fmt.Println("hi")
	} 
	
	if !!true{
		fmt.Println("howdy")
	} else if !(!true){
		fmt.Println("partner")
	}

	fmt.Println("goodbye")
}

```

## Compliant Code Examples
```go
package main

func main() {
	n := 5
	if !(n == 5) {
		fmt.Println("hello")
	}

	fmt.Println("goodbye")
}

```
