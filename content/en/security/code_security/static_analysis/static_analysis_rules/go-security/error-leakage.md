---
aliases:
- /continuous_integration/static_analysis/rules/go-security/error-leakage
- /static_analysis/rules/go-security/error-leakage
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/error-leakage
  language: Go
  severity: Info
  severity_rank: 4
title: Avoid leaking data to a logger
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/error-leakage`

**Language:** Go

**Severity:** Info

**Category:** Security

**CWE**: [532](https://cwe.mitre.org/data/definitions/532.html)

## Description
Passing errors directly to `log.Println` or `log.Printf` functions can lead to data leakage because these functions typically write the output to a log file, console, or another output without considering the sensitivity of the error message. Error messages often contain sensitive information, such as system paths, user data, or internal application details, which should not be exposed in logs that are accessible to users or unauthorized individuals.

To avoid data leakage when logging errors, it is essential to properly handle error messages by redacting or obfuscating sensitive information before logging them. Instead of passing errors directly to `log.Println` or `log.Printf`, it is recommended to extract only the necessary information from the error and log a more generic and secure error message that does not expose sensitive details.

Additionally, consider implementing secure logging practices, such as logging error codes or identifiers rather than full error messages, implementing access controls to restrict access to logs containing sensitive information, and regularly reviewing and auditing the contents of logs to ensure they do not leak sensitive data. By following these best practices, you can improve the security and privacy of your application's logging mechanisms and prevent potential data leakage incidents.

## Non-Compliant Code Examples
```go
func main() {
    log.Println(err.Error())
    log.Println(fmt.Sprintf("%s", err.Error()))
    log.Printf(fmt.Sprintf("%s", err.Error()))
    log.Printf(fmt.Sprintf("%s", r.Header.Get("User-Agent")))
    log.Printf("Request From %s", r.Header.Get("User-Agent"))
}
```

## Compliant Code Examples
```go
func main() {
    log.Println("error detected")

}
```
