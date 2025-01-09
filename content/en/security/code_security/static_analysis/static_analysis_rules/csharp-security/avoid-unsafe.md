---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/avoid-unsafe
- /static_analysis/rules/csharp-security/avoid-unsafe
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/avoid-unsafe
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Avoid unsafe blocks
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/avoid-unsafe`

**Language:** C#

**Severity:** Notice

**Category:** Security

**CWE**: [823](https://cwe.mitre.org/data/definitions/823.html)

## Description
Avoid `unsafe` code blocks as much as possible. While `unsafe` blocks provide access to some important features of the C# language, you need to avoid using them as much as possible. For example, `unsafe` code allows developers to use pointers, but pointers and pointers arithmetic can lead to critical security issues. Unsafe code should be avoided or at least clearly identified in a small scope.

#### Learn More

 - [C# reference: unsafe code](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/unsafe-code)

## Non-Compliant Code Examples
```csharp
using System.IO;
using System.Security.Cryptography;

class MyClass {
    public void myMethod
    {
        unsafe{
            // statements
        }
       
    }
}

```

```csharp
using System.IO;
using System.Security.Cryptography;

class MyClass {
    public unsafe void myMethod
    {
       // statements
    }
}

```

## Compliant Code Examples
```csharp
using System.IO;
using System.Security.Cryptography;

class MyClass {
    public void myMethod
    {
       // statements
    }
}

```
