---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/weak-hash-algorithms
- /static_analysis/rules/csharp-security/weak-hash-algorithms
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/weak-hash-algorithms
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Avoid weak hash algorithms
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/weak-hash-algorithms`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

## Description
Avoid unsecured hash algorithms, as they may lead to data leaks. Use safe and proven hash algorithms.

#### Learn More

 - [CWE-328: Use of Weak Hash](https://cwe.mitre.org/data/definitions/328.html)
 - [Wikipedia - Secure Hash Algorithms](https://en.wikipedia.org/wiki/Secure_Hash_Algorithms)

## Non-Compliant Code Examples
```csharp
using System.IO;
using System.Security.Cryptography;

class MyClass {
    public void myMethod()
    {
        var hashAlgorithm = HashAlgorithm.Create("SHA1");
    }
}

```

```csharp
using System.IO;
using System.Security.Cryptography;

class MyClass {
    public void myMethod()
    {
        var hashAlgorithm = new SHA1Managed();
    }
}

```

```csharp
using System.IO;
using System.Security.Cryptography;

class MyClass {
    public void myMethod()
    {
        var hashAlgorithm = (HashAlgorithm)CryptoConfig.CreateFromName("MD5");
    }
}

```

```csharp
using System.IO;
using System.Security.Cryptography;

class MyClass {
    public void myMethod()
    {
        var hashAlgorithm = new MD5CryptoServiceProvider();
    }
}

```

## Compliant Code Examples
```csharp
using System.IO;
using System.Security.Cryptography;

class MyClass {
    public void myMethod()
    {
        var hashAlgorithm1 = new SHA512Managed();
        var hashAlgorithm2 = (HashAlgorithm)CryptoConfig.CreateFromName("SHA512");
        var hashAlgorithm3 = HashAlgorithm.Create("SHA512");
    }
}

```
