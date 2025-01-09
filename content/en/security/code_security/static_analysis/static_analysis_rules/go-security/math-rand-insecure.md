---
aliases:
- /continuous_integration/static_analysis/rules/go-security/math-rand-insecure
- /static_analysis/rules/go-security/math-rand-insecure
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/math-rand-insecure
  language: Go
  severity: Notice
  severity_rank: 3
title: Math/rand random number generation is insecure
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/math-rand-insecure`

**Language:** Go

**Severity:** Notice

**Category:** Security

## Description
Using the `math/rand` package in Go for generating random numbers may lead to vulnerabilities in certain security-critical contexts. Here's why it is recommended to exercise caution when using this package:

1.  Pseudorandomness: The `math/rand` package generates pseudorandom numbers, which are generated from a deterministic algorithm and a seed value. These numbers are not truly random and may exhibit patterns or predictable sequences. In security-critical applications, such as cryptography or secure password generation, true randomness is essential to prevent guessing or predicting the random values.
2.  Predictable seed value: By default, the `math/rand` package uses a predictable seed value based on the current time. This means that if multiple processes or instances of the software start at the same time or use the same seed, they will generate the exact same sequence of random numbers. This predictability can be exploited by an attacker to reproduce the random values and potentially compromise the security of the system.
3.  Insufficient entropy: In security-sensitive contexts, it is crucial to have a good source of entropy, which is a measure of unpredictability. The `math/rand` package does not provide a direct way to access system-level entropy sources. It relies on a fixed seed or a manually set seed value, which may not have sufficient entropy to generate adequately random numbers for cryptographic operations or other security-critical tasks.
4.  SecureRandom: In contrast to `math/rand`, the `crypto/rand` package in Go provides a secure random number generator that uses a system-level entropy source. It generates cryptographically secure random numbers suitable for security-sensitive applications. It is recommended to use `crypto/rand` for generating random numbers in scenarios that require strong randomness and security.

To mitigate vulnerabilities and ensure the secure generation of random values, it is recommended to use the `crypto/rand` package instead of `math/rand` for security-critical applications. The `crypto/rand` package provides a more reliable source of random numbers, leveraging the underlying operating system's entropy source for improved security.

Always consider the specific requirements of your application and the context in which random numbers are used. Following best practices and using appropriate cryptographic libraries can help mitigate vulnerabilities and ensure the security of your Go applications.


## Non-Compliant Code Examples
```go
// Filename: `router.go`.

package main

import "math/rand"

func main() {
	myRandomNumber := rand.Int()
	fmt.Println(myRandomNumber)
}
```

## Compliant Code Examples
```go
// Filename: `router_test.go`.
//
// Note that files that end in `_test.go` will not be flagged as violations.

package main

import "math/rand"

func main() {
	myRandomNumber := rand.Int()
	fmt.Println(myRandomNumber)
}
```

```go
// Filename: `router.go`.

package main

import "crypto/rand"

func main() {
	b := make([]byte, 10)
	_, err := rand.Read(b)
	if err != nil {
		fmt.Println("error:", err)
		return
	}
}
```
