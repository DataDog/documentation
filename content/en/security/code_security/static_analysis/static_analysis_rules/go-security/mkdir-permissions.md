---
aliases:
- /continuous_integration/static_analysis/rules/go-security/mkdir-permissions
- /static_analysis/rules/go-security/mkdir-permissions
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/mkdir-permissions
  language: Go
  severity: Warning
  severity_rank: 2
title: Do not create a directory with write permissions for all
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/mkdir-permissions`

**Language:** Go

**Severity:** Warning

**Category:** Security

**CWE**: [284](https://cwe.mitre.org/data/definitions/284.html)

## Description
In Unix-based systems like Linux or macOS, and therefore within the Go programming language's OS package, permissions are set using a three-digit code, with each digit ranging from 0-7. Each digit represents the permissions for the owner, group, and others respectively.

The call `err := os.Mkdir("/tmp/mydir", 0777)` would hence set the directory permissions to "777", giving read, write, and execute permissions to everyone: the file owner, the group, and all others.

Using "777" permissions is generally considered bad practice for maintaining secure systems. The problem is that it gives full permission—including read, write, and execute powers—to every user on the system. This can create potential security risks. For instance, any user, even those without proper authority, could make unauthorized changes to the files or directories. Moreover, allowing executable permissions can be dangerous as malicious scripts may be executed.

As an alternative, it's recommended to grant the minimum needed permissions. For instance, use "755" to give the owner full permissions and read and execute permissions for the group and other users. If group write access is necessary, then "775" could be considered. In some cases, it might also be beneficial to use Access Control Lists (ACLs) for more granular control over permissions.

Therefore, it is advised to set permissions carefully, considering the principle of least privilege. Always think carefully about who needs what kind of access to ensure both the functionality and security of your applications.

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
	err := os.Mkdir("/path/to/new/directory", 0777)
	if err != nil {
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
	err := os.Mkdir("/path/to/new/directory", 0770)
	if err != nil {
		return
	}
}
```
