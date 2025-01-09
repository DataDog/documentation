---
aliases:
- /continuous_integration/static_analysis/rules/go-security/chmod-permissions
- /static_analysis/rules/go-security/chmod-permissions
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/chmod-permissions
  language: Go
  severity: Warning
  severity_rank: 2
title: File permissions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/chmod-permissions`

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
	err := os.Chmod("/tmp/somefile", 0777)
	if err != nil {
		fmt.Println("Error when changing file permissions!")
		return
	}
}
```

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	_, err := os.OpenFile("/tmp/thing", os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		fmt.Println("Cannot create file")
		return
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
	err := os.Chmod("/tmp/somefile", 0770)
	if err != nil {
		fmt.Println("Error when changing file permissions!")
		return
	}
}
```

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	_, err := os.OpenFile("/tmp/thing", os.O_CREATE|os.O_WRONLY, 0660)
	if err != nil {
		fmt.Println("Cannot create file")
		return
	}
}
```
