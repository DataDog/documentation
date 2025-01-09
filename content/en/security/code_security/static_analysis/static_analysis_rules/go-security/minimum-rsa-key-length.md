---
aliases:
- /continuous_integration/static_analysis/rules/go-security/minimum-rsa-key-length
- /static_analysis/rules/go-security/minimum-rsa-key-length
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/minimum-rsa-key-length
  language: Go
  severity: Warning
  severity_rank: 2
title: RSA keys should have a minimum of 2,048 bits
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/minimum-rsa-key-length`

**Language:** Go

**Severity:** Warning

**Category:** Security

**CWE**: [326](https://cwe.mitre.org/data/definitions/326.html)

## Description
RSA keys should have a minimum length to ensure the security and strength of cryptographic operations. A key length is measured in bits and determines the complexity of the key, making it harder for attackers to break or decrypt the encryption. 

## Arguments

 * `min-length`: Minimum length of the RSA key. Default: 2048.

## Non-Compliant Code Examples
```go
package main

import (
	"crypto/rand"
	"crypto/rsa"
	"fmt"
)

func main() {
	privateKey, err := rsa.GenerateKey(rand.Reader, 1024)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(privateKey)
}
```

## Compliant Code Examples
```go
package main

import (
	"crypto/rand"
	"crypto/rsa"
	"fmt"
)

func main() {
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(privateKey)
}
```
