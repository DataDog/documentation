---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/avoid-unencrypted-protocols
- /static_analysis/rules/csharp-security/avoid-unencrypted-protocols
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/avoid-unencrypted-protocols
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Avoid using protocols without SSL
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/avoid-unencrypted-protocols`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [319](https://cwe.mitre.org/data/definitions/319.html)

## Description
Using `http://` or `ftp://` instead of `https://` or `ftps://` leads to potential cleartext data transmission. Always use safe and secure connections.

#### Learn More

 - [CWE-319: Cleartext Transmission of Sensitive Information](https://cwe.mitre.org/data/definitions/319.html)

## Non-Compliant Code Examples
```csharp
using System.IO;
using System.Security.Cryptography;

class MyClass {
    public void Encrypt(byte[] key, byte[] dataToEncrypt, MemoryStream target)
    {
        foobar(key, something, "http://domain.tld", plop);
    }
}

```

```csharp
using System.IO;
using System.Security.Cryptography;

class MyClass {
    public void Encrypt(byte[] key, byte[] dataToEncrypt, MemoryStream target)
    {
        foo.bar(key, something, "http://domain.tld", plop);
    }
}

```

```csharp
using System.IO;
using System.Security.Cryptography;

class MyClass {
    public void Encrypt(byte[] key, byte[] dataToEncrypt, MemoryStream target)
    {
        var httpUrl = "http://domain.tld";
        var ftpUrl = "ftp://";
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
        var httpUrl = "https://domain.tld";
        var ftpUrl = "ftps://";
    }
}

```
