---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/no-predictable-salt
- /static_analysis/rules/csharp-security/no-predictable-salt
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/no-predictable-salt
  language: C#
  language_alias: CSharp
  severity: Error
  severity_rank: 1
title: Do not use a predictable salt
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/no-predictable-salt`

**Language:** C#

**Severity:** Error

**Category:** Security

**CWE**: [760](https://cwe.mitre.org/data/definitions/760.html)

## Description
A salt to hash a password should always be different for each user. Otherwise, it becomes an attack vector. As mentioned on Wikipedia _"The way salting is typically done is that a new salt is randomly generated for each password"_.

#### Learn More

 - [CWE-760: Use of a One-Way Hash with a Predictable Salt](https://cwe.mitre.org/data/definitions/760)
 - [Wikipedia - Salt (Cryptography)](https://en.wikipedia.org/wiki/Salt_(cryptography))

## Non-Compliant Code Examples
```csharp
using System.Security.Cryptography;

class MyClass {
    public static void createHashedPassword1(password)
    {
        var salt = Encoding.UTF8.GetBytes("myuniquesalt");
        return new Rfc2898DeriveBytes(password, salt);
    }

    public static void createHashedPassword2(password)
    {
        return new Rfc2898DeriveBytes(password, Encoding.UTF8.GetBytes("myuniquesalt"));
    }

    public static void createHashedPassword3(password)
    {
        return new Rfc2898DeriveBytes(password, GetBytes("myuniquesalt"));
    }
}

```

## Compliant Code Examples
```csharp
using System.Security.Cryptography;

class MyClass {
    public static void createHashedPassword(password)
    {
        return new Rfc2898DeriveBytes(password, 32);
    }
}

```
