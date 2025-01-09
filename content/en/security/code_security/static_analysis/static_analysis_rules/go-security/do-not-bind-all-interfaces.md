---
aliases:
- /continuous_integration/static_analysis/rules/go-security/do-not-bind-all-interfaces
- /static_analysis/rules/go-security/do-not-bind-all-interfaces
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/do-not-bind-all-interfaces
  language: Go
  severity: Warning
  severity_rank: 2
title: Binding to 0.0.0.0 opens up the application to all traffic
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/do-not-bind-all-interfaces`

**Language:** Go

**Severity:** Warning

**Category:** Security

**CWE**: [1327](https://cwe.mitre.org/data/definitions/1327.html)

## Description
Binding a server to all interfaces or IP addresses can pose a security risk as it potentially exposes the server to unauthorized access from external sources. When a server is bound to all interfaces, it means that it is listening for incoming connections on all network interfaces available on the machine, including public interfaces.

This can lead to unintended exposure of the server to the internet or other insecure networks, making it vulnerable to attacks such as unauthorized access, DDOS attacks, and data breaches.

To avoid this security risk, it is recommended to bind servers only to the specific interfaces or IP addresses that are necessary for the server to function properly. This can be achieved by explicitly specifying the network interface or IP address in the server configuration settings.

Developers should follow the principle of least privilege when configuring server settings, ensuring that only necessary services are exposed to the network and unnecessary interfaces are disabled or not bound to the server. Regular security assessments and audits should also be conducted to identify and address any potential vulnerabilities in the server configuration.


## Non-Compliant Code Examples
```go
package main

import ("net")

func main(){
    // Bad
    http.ListenAndServe("0.0.0.0", nil) 

    // Bad
    http.ListenAndServeTLS("0.0.0.0", "cert.pem", "key.pem", nil)
}
```
