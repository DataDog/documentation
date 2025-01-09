---
aliases:
- /continuous_integration/static_analysis/rules/go-security/responsewriter-no-fprintf
- /static_analysis/rules/go-security/responsewriter-no-fprintf
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/responsewriter-no-fprintf
  language: Go
  severity: Warning
  severity_rank: 2
title: Do not bypass HTML escaping with ResponseWriter
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/responsewriter-no-fprintf`

**Language:** Go

**Severity:** Warning

**Category:** Security

**CWE**: [79](https://cwe.mitre.org/data/definitions/79.html)

## Description
Using `fmt.Fprintf` on a `http.ResponseWriter` can potentially introduce security issues and cross-site scripting (XSS) vulnerabilities if not handled carefully. When using `fmt.Fprintf`, there is a risk of inadvertently including untrusted data in the response body without properly escaping or sanitizing it. This can allow an attacker to inject malicious code into the response, which can then be executed in the context of other users accessing the page, leading to XSS attacks.

To prevent security issues and XSS vulnerabilities when writing to a `http.ResponseWriter`, developers should:

1.  Properly escape and sanitize any user-generated or untrusted data before writing it to the response body. HTML-encode all user input to prevent script injection.
2.  Use the `html/template` package in Go to safely interpolate dynamic content into HTML templates.
3.  Avoid using `fmt.Fprintf` directly to write data to the response body when dealing with untrusted input. Instead, prefer using methods like `WriteHeader` and `Write` from `http.ResponseWriter` to prevent unintended data insertion.
4.  Implement Content Security Policy (CSP) headers to restrict the execution of scripts and mitigate the impact of potential XSS attacks.

By following these best practices and being cautious about how data is written to a `http.ResponseWriter`, developers can reduce the risk of security vulnerabilities and better protect their web applications from potential XSS attacks.


## Non-Compliant Code Examples
```go
func my_controller(anotherArgument myType1, responseWriter http.ResponseWriter, anotherArgument myType2) {
    fmt.Fprintf(responseWriter, "foo %s", something);
}
```
