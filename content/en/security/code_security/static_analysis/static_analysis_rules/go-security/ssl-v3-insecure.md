---
aliases:
- /continuous_integration/static_analysis/rules/go-security/ssl-v3-insecure
- /static_analysis/rules/go-security/ssl-v3-insecure
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/ssl-v3-insecure
  language: Go
  severity: Warning
  severity_rank: 2
title: SSLv3 is not secure and should be avoided
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/ssl-v3-insecure`

**Language:** Go

**Severity:** Warning

**Category:** Security

**CWE**: [327](https://cwe.mitre.org/data/definitions/327.html)

## Description
Do not use SSLv3 as it is now broken. See [this issue](https://golang.org/issue/32716) for more information.

## Non-Compliant Code Examples
```go
func test() {
    	client := &http.Client{
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{
				MinVersion:         tls.VersionSSL30,
			},
		},
	}
}
```
