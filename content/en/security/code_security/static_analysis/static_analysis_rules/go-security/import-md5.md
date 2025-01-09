---
aliases:
- /continuous_integration/static_analysis/rules/go-security/import-md5
- /static_analysis/rules/go-security/import-md5
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/import-md5
  language: Go
  severity: Warning
  severity_rank: 2
title: The md5 hashing algorithm is insecure
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/import-md5`

**Language:** Go

**Severity:** Warning

**Category:** Security

**CWE**: [327](https://cwe.mitre.org/data/definitions/327.html)

## Description
In Go, it is strongly advised to avoid using the `crypto/md5` package for hashing operations involving the Message Digest Algorithm 5 (MD5). Avoid the `crypto/md5` package for the following reasons:

1.  Vulnerabilities: The MD5 algorithm has long been considered insecure for cryptographic purposes due to significant vulnerabilities. Researchers have demonstrated practical collision attacks against MD5, which allows for the creation of different inputs that produce the same hash value. This makes it unsuitable for applications that require data integrity or security.
2.  Weak security: MD5 produces a fixed-sized 128-bit hash value, which is significantly shorter than modern secure hash functions like SHA-256 or SHA-3. A shorter hash length reduces the resistance against brute-force and collision attacks, increasing the risk of an attacker successfully compromising the data.
3. Lack of collision resistance: The cryptographic strength of a hash function depends on its collision resistance, that is, the difficulty of finding two inputs that produce the same hash output. Due to MD5's vulnerabilities, it is no longer considered collision-resistant. This means that an attacker can intentionally create different inputs with the same MD5 hash, undermining the integrity and trustworthiness of the data.

#### Recommended alternatives

Go provides a `crypto/sha256` package that implements the SHA-256 algorithm, which is a much stronger and more secure hash function compared to MD5. SHA-256 offers a larger hash size (256 bits) and stronger resistance against collision attacks. It is widely adopted and considered secure for various cryptographic applications. |

To ensure secure and reliable hashing operations, it is best to avoid using the `crypto/md5` package and opt for stronger hash functions like SHA-256 offered by the `crypto/sha256` package. By adopting secure hash algorithms, you can protect data integrity, identity verification, and other security-sensitive operations within your Go applications.

Remember to always stay up-to-date with the latest best practices and security recommendations to safeguard your applications and mitigate potential vulnerabilities.


## Non-Compliant Code Examples
```go
package main

import (
	"crypto/md5"
	"fmt"
)

func main() {
	h := md5.New()
	fmt.Printf("%x", h.Sum(nil))
}
```
