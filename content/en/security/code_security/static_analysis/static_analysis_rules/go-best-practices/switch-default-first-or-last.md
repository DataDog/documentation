---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/switch-default-first-or-last
- /static_analysis/rules/go-best-practices/switch-default-first-or-last
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/switch-default-first-or-last
  language: Go
  severity: Notice
  severity_rank: 3
title: The default case of a switch should be first or last
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/switch-default-first-or-last`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
In Go, it is considered good practice to place the default case of a switch statement as the last case. The default case represents the code to be executed when none of the preceding cases match the switch expression. Here's why it is recommended to put the default case last in a switch statement:

1.  Readability: Placing the default case last improves code readability by following a logical flow. When reviewing the code, developers expect to see any explicit cases before the default case. It makes the switch statement easier to understand and follow the intended logic.
2.  Clarity of intention: By positioning the default case at the end, it clearly communicates to other developers that it is the fallback option when none of the specific cases match. It prevents confusion and ensures that developers understand how the switch statement behaves.
3.  Avoiding unintended fallthrough: In Go, switch statements do not fall through to the next case by default. When the default case is placed before other cases, there is a risk of unintentionally executing the default case when a match occurs earlier due to omitted or misplaced `fallthrough` statements. Placing the default case last eliminates this ambiguity and helps prevent unintended behavior.
4.  Refactoring and maintenance: Placing the default case at the end simplifies future code changes and refactoring. When inserting or rearranging cases, it is easier to maintain the intended logic and ensure that specific cases take precedence over the default case.

Here's an example illustrating the recommended order:

```go
switch value {
case 1:
	// Handle case 1
case 2:
	// Handle case 2
default:
	// Handle default case
}
```

In this way, the default case is positioned as the last option in the switch statement, clearly indicating it as the fallback when no other cases match.

By following the convention of placing the default case last in a switch statement, you enhance code readability, clarity, and maintainability. It ensures that the switch statement's behavior is evident and reduces the likelihood of unintended fallthrough or confusion when modifying the code in the future.

## Non-Compliant Code Examples
```go
package main

import (
	"fmt"
	"runtime"
)

func main() {
	fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
		case "darwin":
			fmt.Println("OS X.")
		default:
			// freebsd, openbsd,
			// plan9 ...
			fmt.Printf("%s.\n", os)
		case "linux":
			fmt.Println("Linux.")
		case "windows":
			fmt.Printf("Windows.")
	}
}

```

## Compliant Code Examples
```go
package main

import (
	"fmt"
	"runtime"
)

func main() {
	fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
		case "darwin":
			fmt.Println("OS X.")
		case "linux":
			fmt.Println("Linux.")
		default:
			// freebsd, openbsd,
			// plan9, windows...
			fmt.Printf("%s.\n", os)
	}
}
```

```go
package main

import (
	"fmt"
	"runtime"
)

func main() {
	fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
		default:
			// freebsd, openbsd,
			// plan9, windows...
			fmt.Printf("%s.\n", os)
		case "darwin":
			fmt.Println("OS X.")
		case "linux":
			fmt.Println("Linux.")
	}
}
```
