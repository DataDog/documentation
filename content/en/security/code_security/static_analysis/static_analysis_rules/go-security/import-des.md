---
aliases:
- /continuous_integration/static_analysis/rules/go-security/import-des
- /static_analysis/rules/go-security/import-des
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/import-des
  language: Go
  severity: Warning
  severity_rank: 2
title: DES and Triple DES are now insecure
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/import-des`

**Language:** Go

**Severity:** Warning

**Category:** Security

## Description
In Go, it is strongly recommended to avoid using the `crypto/des` package for cryptographic operations involving the Data Encryption Standard (DES) algorithm. Avoid the `crypto/des` package for the following reasons:

1.  Weak security: The DES algorithm, which `crypto/des` implements, is considered weak and outdated. It uses a 56-bit key size, which is now vulnerable to brute-force attacks. In modern cryptography, it is recommended to use stronger algorithms like AES (Advanced Encryption Standard) with longer key sizes to ensure robust security.
2.  Lack of compatibility: The `crypto/des` package does not provide compatibility with more advanced modes of operation like cipher block chaining (CBC) or counter mode (CTR). These modes offer additional protection against known vulnerabilities in basic DES, such as deterministic patterns and susceptibility to certain types of attacks.
3.  Limited functionality: The `crypto/des` package only supports the basic DES algorithm without any additional functionality. It lacks support for more advanced encryption modes, padding schemes, or authenticated encryption, which are essential in modern cryptographic systems.

#### Recommended alternatives

The Go standard library provides a more secure and versatile cryptographic package called `crypto/aes` that implements the AES algorithm. AES is a widely adopted and industry-standard symmetric encryption algorithm known for its robustness and efficiency. It supports various key sizes and modes of operation, making it a suitable replacement for DES in most applications.

To ensure secure and reliable cryptographic operations, it is best to migrate away from the `crypto/des` package and adopt stronger algorithms like AES. The `crypto/aes` package provides the necessary functionality and security for symmetric encryption operations in Go, offering a safer alternative to DES.

It's important to regularly review and update cryptographic choices, considering the latest best practices and standards to maintain the security of your applications and protect sensitive data.


## Non-Compliant Code Examples
```go
package main

import (
	"crypto/des"
)

func main() {
	key := []byte("mySample")

	_, err := des.NewCipher(key)
	if err != nil {
		panic(err)
	}
}
```
