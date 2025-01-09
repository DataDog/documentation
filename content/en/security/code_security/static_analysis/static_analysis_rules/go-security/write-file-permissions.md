---
aliases:
- /continuous_integration/static_analysis/rules/go-security/write-file-permissions
- /static_analysis/rules/go-security/write-file-permissions
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/write-file-permissions
  language: Go
  severity: Warning
  severity_rank: 2
title: Do not create a file with too much permissions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/write-file-permissions`

**Language:** Go

**Severity:** Warning

**Category:** Security

**CWE**: [284](https://cwe.mitre.org/data/definitions/284.html)

## Description
Granting write access to a file is a security since other users can modify the content of the file. The issue is amplified for executable files that can be easily compromised (like scripts). Avoid giving write permissions to others to files.

#### Learn More

 - [CWE-284: Improper Access Control](https://cwe.mitre.org/data/definitions/284.html)

## Non-Compliant Code Examples
```go
package main

import (
	"fmt"
	"os"
)

func main() {
	d1 := []byte("something somethingn")
	err := ioutil.WriteFile("myfile", d1, 0777)
	check(err)
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
	d1 := []byte("something somethingn")
	err := ioutil.WriteFile("myfile", d1, 0770)
	check(err)
}
```
