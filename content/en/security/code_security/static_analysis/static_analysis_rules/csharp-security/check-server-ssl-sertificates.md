---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/check-server-ssl-sertificates
- /static_analysis/rules/csharp-security/check-server-ssl-sertificates
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/check-server-ssl-sertificates
  language: C#
  language_alias: CSharp
  severity: Error
  severity_rank: 1
title: Do not bypass certificates validation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/check-server-ssl-sertificates`

**Language:** C#

**Severity:** Error

**Category:** Security

**CWE**: [295](https://cwe.mitre.org/data/definitions/295.html)

## Description
Never bypass certificate validation. Certificates should be correctly checked to avoid attacks from untrusted sources.

#### Learn More

 - [CWE-295: Improper Certificate Validation](https://cwe.mitre.org/data/definitions/295)

## Non-Compliant Code Examples
```csharp
using System.Net;
using System.Net.Http;

class MyClass {
public static void connect()
    {
        ServicePointManager.ServerCertificateValidationCallback +=
            (sender, certificate, chain, errors) => {
                return true;
            };

    }
}

```
