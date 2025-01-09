---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/jwt-verify
- /static_analysis/rules/csharp-security/jwt-verify
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/jwt-verify
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: JWT must always be verified
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/jwt-verify`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [347](https://cwe.mitre.org/data/definitions/347.html)

## Description
Preventing JWT validation may lead to unauthorized access. Make sure that tokens are always verified.

#### Learn More

 - [CWE-347: Improper Verification of Cryptographic Signature
](https://cwe.mitre.org/data/definitions/347)

## Non-Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    public static void decodePayload()
    {
        JwtDecoder decoder = null;
        decoder.Decode(token, secret, false);
        decoder.Decode(token, secret, verify: false);
    }
}

```

## Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    public static void decodePayload()
    {
        JwtDecoder decoder = null;
        decoder.Decode(token, secret, true);
        decoder.Decode(token, secret, verify: true);
    }
}

```
