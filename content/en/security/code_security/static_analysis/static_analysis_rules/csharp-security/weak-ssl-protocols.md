---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/weak-ssl-protocols
- /static_analysis/rules/csharp-security/weak-ssl-protocols
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/weak-ssl-protocols
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Do not use weak SSL protocols
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/weak-ssl-protocols`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [327](https://cwe.mitre.org/data/definitions/327.html)

## Description
Weak encryption protocols should not be used. TLS versions 1.0 and 1.1 have been deprecated. TLS 1.2 (or, even better, TLS 1.3) should be used instead.

#### Learn More

 - [Wikipedia: Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security)
 - [CWE-327: Use of a Broken or Risky Cryptographic Algorithm](https://cwe.mitre.org/data/definitions/327)

## Non-Compliant Code Examples
```csharp
using System.Net;

class MyClass {
    public static void routine()
    {
        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls;
        System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls;
    }
}

```

## Compliant Code Examples
```csharp
using System.Net;

class MyClass {
    public static void routine()
    {
        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls13
        
        SslProtocols = SslProtocols.Tls12
    }
}

```
