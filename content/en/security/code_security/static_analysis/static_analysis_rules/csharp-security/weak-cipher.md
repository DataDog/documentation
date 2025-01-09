---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/weak-cipher
- /static_analysis/rules/csharp-security/weak-cipher
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/weak-cipher
  language: C#
  language_alias: CSharp
  severity: Error
  severity_rank: 1
title: Do not use weak ciphers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/weak-cipher`

**Language:** C#

**Severity:** Error

**Category:** Security

**CWE**: [327](https://cwe.mitre.org/data/definitions/327.html)

## Description
The `DESCryptoServiceProvider` should only be used with legacy code for compatibility reasons. For new code, consider using the [`Aes` class](https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.aes?view=net-7.0).

#### Learn More

 - [DESCryptoServiceProvider Class documentation](https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.descryptoserviceprovider?view=net-7.0)

## Non-Compliant Code Examples
```csharp
class MyClass {
    public static void weakEncryption()
    {
        DES des = new DESCryptoServiceProvider();
        CryptoStream encStream = new CryptoStream(fout, des.CreateEncryptor(desKey, desIV), CryptoStreamMode.Write);

    }
}

```

```csharp
class MyClass {
    public static void weakEncryption()
    {
        DES des = new DESCryptoServiceProvider();
        CryptoStream encStream = new CryptoStream(fout, des.CreateEncryptor(desKey, desIV), CryptoStreamMode.Write);

    }
}

```
