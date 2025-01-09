---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/do-not-compare-nan
- /static_analysis/rules/go-best-practices/do-not-compare-nan
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/do-not-compare-nan
  language: Go
  severity: Notice
  severity_rank: 3
title: No value is equal to NaN
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/do-not-compare-nan`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
You do not need to convert the string into a slice of bytes to use `Write`, you can just use the string directly.

## Non-Compliant Code Examples
```go
package main

import (
	"fmt"
	"math"
)

func main() {
	n := 5.0
	aNaN := math.NaN()
	// This case cannot be caught with current capabilities
	if n == aNaN {
		fmt.Println("hello")
	} else if n > math.NaN() {
		fmt.Println("hi")
	}

	fmt.Println("goodbye")
}

```
