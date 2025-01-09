---
aliases:
- /continuous_integration/static_analysis/rules/go-security/tls-skip-verify
- /static_analysis/rules/go-security/tls-skip-verify
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/tls-skip-verify
  language: Go
  severity: Info
  severity_rank: 4
title: Ensure TLS verification
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/tls-skip-verify`

**Language:** Go

**Severity:** Info

**Category:** Security

**CWE**: [295](https://cwe.mitre.org/data/definitions/295.html)

## Description
The Transport Layer Security (TLS) protocol serves to secure communications between a client and server in a network, so it's integral to maintaining the integrity and confidentiality of data transmission.

In the Go programming language, a common pitfall is that developers sometimes set the parameter `InsecureSkipVerify` of `tls.Config` to `true` to simplify coding or avoid certificate validation errors during testing. However, this parameter must never be set to `true` in a production environment.

When `InsecureSkipVerify` is set to `true`, the TLS verification process is bypassed entirely. Essentially, this action is skipping the very phase that confirms the server identity, leading to possibilities of "Man-in-the-Middle" (MitM) attacks. MitM attacks occur when a malicious actor intercepts and potentially alters the communication between two parties without their knowledge.

By validating the server's certificate, the client verifies the server's identity and ensures that it's safe to transmit data. If `InsecureSkipVerify` is set to `true`, even a server with an invalid or compromised certificate may appear trustworthy, posing significant security risks.

Therefore, always ensure that the `InsecureSkipVerify` parameter is set to 'false' to avoid these possible security breaches. Instead of turning this parameter to 'true' to fix certificate issues, find and resolve the reason the certificate is considered invalid. This could involve renewing expired certificates, trusting a self-signed certificate, or fixing hostname mismatches. This way, you can uphold the authenticity and privacy of your application's client-server interactions.



#### Learn More

 - [CWE-295: Improper Certificate Validation](https://cwe.mitre.org/data/definitions/295.html)

## Non-Compliant Code Examples
```go
package main

import (
	"crypto/tls"
	"fmt"
	"net/http"
)

func main() {
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
}
```

## Compliant Code Examples
```go
package main

import (
	"crypto/tls"
	"fmt"
	"net/http"
)

func main() {
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: false},
	}

}
```
