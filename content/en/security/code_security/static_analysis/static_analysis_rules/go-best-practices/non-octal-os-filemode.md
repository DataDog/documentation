---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/non-octal-os-filemode
- /static_analysis/rules/go-best-practices/non-octal-os-filemode
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/non-octal-os-filemode
  language: Go
  severity: Warning
  severity_rank: 2
title: os.FileMode value appears it should be in octal
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/non-octal-os-filemode`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
You do not need to convert the string into a slice of bytes to use `Write`, you can just use the string directly.

## Non-Compliant Code Examples
```go
package main

import (
	"log"
	"os"
)

func main() {
	f, err := os.OpenFile("notes.txt", os.O_RDWR|os.O_CREATE, 644)
	if err != nil {
		log.Fatal(err)
	}
	if err := f.Close(); err != nil {
		log.Fatal(err)
	}
}
```

## Compliant Code Examples
```go
package main

import (
	"log"
	"os"
)

func main() {
	f, err := os.OpenFile("notes.txt", os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		log.Fatal(err)
	}
	if err := f.Close(); err != nil {
		log.Fatal(err)
	}
}
```
