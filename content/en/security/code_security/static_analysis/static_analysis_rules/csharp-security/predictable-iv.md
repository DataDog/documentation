---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/predictable-iv
- /static_analysis/rules/csharp-security/predictable-iv
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/predictable-iv
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Avoid predictable IV
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/predictable-iv`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [329](https://cwe.mitre.org/data/definitions/329.html)

## Description
In security, initialization vectors must change and not be static. Avoid fixed initialization vectors and always use dynamic values.

#### Learn More

 - [Wikipedia - Initialization Vector](https://en.wikipedia.org/wiki/Initialization_vector)
 - [CWE-329: Generation of Predictable IV with CBC Mode](https://cwe.mitre.org/data/definitions/329)

## Non-Compliant Code Examples
```csharp
using System.IO;
using System.Security.Cryptography;

class MyClass {
    public void Encrypt(byte[] key, byte[] dataToEncrypt, MemoryStream target)
    {
        var acsp = new AesCryptoServiceProvider();

        byte[] iv     = new byte[] {};
        var encryptor = acsp.CreateEncryptor(key, iv);
    }
}

```

## Compliant Code Examples
```csharp
using System.IO;
using System.Security.Cryptography;

class MyClass {
    public void Encrypt(byte[] key, byte[] dataToEncrypt, MemoryStream target)
    {
        var acsp = new AesCryptoServiceProvider();
        var encryptor = acsp.CreateEncryptor(key, acsp.IV);
    }
}

```
