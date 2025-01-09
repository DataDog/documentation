---
aliases:
- /continuous_integration/static_analysis/rules/go-security/ssh-ignore-keys
- /static_analysis/rules/go-security/ssh-ignore-keys
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/ssh-ignore-keys
  language: Go
  severity: Warning
  severity_rank: 2
title: Do not ignore SSH host validation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/ssh-ignore-keys`

**Language:** Go

**Severity:** Warning

**Category:** Security

**CWE**: [295](https://cwe.mitre.org/data/definitions/295.html)

## Description
SSH host validation should never be ignored and always be enforced to avoid man-in-the-middle attacks.

#### Learn More

 - [CWE-295: Improper Certificate Validation](https://cwe.mitre.org/data/definitions/295.html)

## Non-Compliant Code Examples
```go
package main

import (
	"golang.org/x/crypto/ssh"
)

func main() {
	_ =  ssh.InsecureIgnoreHostKey()
}
```

## Compliant Code Examples
```go
package main

import (
	"golang.org/x/crypto/ssh"
)

func main() {
	// not valid in tests
	_ =  ssh.InsecureIgnoreHostKey()
}
```
