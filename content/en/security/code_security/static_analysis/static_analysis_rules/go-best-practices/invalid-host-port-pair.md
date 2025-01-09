---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/invalid-host-port-pair
- /static_analysis/rules/go-best-practices/invalid-host-port-pair
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/invalid-host-port-pair
  language: Go
  severity: Warning
  severity_rank: 2
title: Common invalid host-port pairs
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/invalid-host-port-pair`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
The `host:port` pair is invalid. The HTTP server needs to use a valid pair of address and port.

## Non-Compliant Code Examples
```go
package main

import ("net")

func main(){
    // Good
    http.ListenAndServe("localhost:8080", nil)
    http.ListenAndServe(":8080", nil)
    http.ListenAndServe(":http", nil)
    http.ListenAndServe("localhost:http", nil)
    http.ListenAndServe("my_server:8080", nil)
    http.ListenAndServe("", nil) // Defaults to ":http"

    // Bad
    http.ListenAndServe("localhost:8080/", nil) 
    http.ListenAndServe("localhost", nil)       

    // Good
    http.ListenAndServeTLS("localhost:8443", "cert.pem", "key.pem", nil)
    http.ListenAndServeTLS(":8443", "cert.pem", "key.pem", nil)
    http.ListenAndServeTLS("localhost:https", "cert.pem", "key.pem", nil)
    http.ListenAndServeTLS("my_server:8443", "cert.pem", "key.pem", nil)
    http.ListenAndServeTLS("", "cert.pem", "key.pem", nil) // Defaults to ":https"

    // Bad
    http.ListenAndServeTLS("localhost:8443/", "cert.pem", "key.pem", nil)
    http.ListenAndServeTLS("localhost", "cert.pem", "key.pem", nil)
}
```
