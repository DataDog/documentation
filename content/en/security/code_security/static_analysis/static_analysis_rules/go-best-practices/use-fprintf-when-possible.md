---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/use-fprintf-when-possible
- /static_analysis/rules/go-best-practices/use-fprintf-when-possible
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/use-fprintf-when-possible
  language: Go
  severity: Warning
  severity_rank: 2
title: 'Replace w.Write([]byte(fmt.Sprintf())) with fmt.Fprintf() '
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/use-fprintf-when-possible`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
You do not need to convert the string into a slice of bytes to use `Write`, you can just use the string directly.

## Non-Compliant Code Examples
```go
package main

import (
	"fmt"
	"os"
)

func main(w, a x) {
	r, w := io.Pipe()

	go func() {
		idx, name := "4th", "Mars"

		w.Write([]byte(fmt.Sprintf("The %s planet is %s.\n", idx, name)))
		w.Write([]byte(fmt.Sprint("The ", idx, " planet is ", name, ".\n")))
		w.Write([]byte(fmt.Sprintln("The", idx, "planet is", name, ".")))
		w.Close()
	}()

	if _, err := io.Copy(os.Stdout, r); err != nil {
		log.Fatal(err)
	}
}
```

## Compliant Code Examples
```go
package main

import (
	"fmt"
	"os"
)

func main() {
	const idx, name = "4th", "Mars"
	n, err := fmt.Fprint(os.Stdout, "The ", idx, " planet is ", name,".\n")
    
	if err != nil {
		fmt.Fprintf(os.Stderr, "Fprint: %v\n", err)
	}
}
```
