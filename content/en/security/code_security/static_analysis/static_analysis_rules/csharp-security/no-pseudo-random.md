---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/no-pseudo-random
- /static_analysis/rules/csharp-security/no-pseudo-random
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/no-pseudo-random
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Avoid pseudo-random numbers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/no-pseudo-random`

**Language:** C#

**Severity:** Notice

**Category:** Security

**CWE**: [338](https://cwe.mitre.org/data/definitions/338.html)

## Description
Avoid pseudo-random generator as they generate numbers that are easy to guess. Prefer more secure, cryptographic-friendly random generators.

#### Learn More

 - [CWE-338: Use of Cryptographically Weak Pseudo-Random Number Generator (PRNG)](https://cwe.mitre.org/data/definitions/338)
 - [Wikipedia - Pseudorandom number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator)

## Non-Compliant Code Examples
```csharp
class MyClass {
    public static void routine()
    {
        var random = new Random();
        var bytes = new byte[16];
        var randomizeTwice = true;
        var randomizeThrice = false;
        random.NextBytes(bytes);
        if (randomizeTwice) {
            random.NextBytes(bytes);
        }
        if (randomizeThrice) {
            new Random().NextBytes(bytes);
        }
    }
}
```

## Compliant Code Examples
```csharp
using System.Security.Cryptography;

class MyClass {
    public static void routine()
    {
        var random = RandomNumberGenerator.Create();
        byte[] randomData = new byte[4];
        randomGenerator.GetBytes(randomData);
    }
}
```
