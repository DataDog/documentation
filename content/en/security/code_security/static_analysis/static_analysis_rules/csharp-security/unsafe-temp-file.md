---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/unsafe-temp-file
- /static_analysis/rules/csharp-security/unsafe-temp-file
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/unsafe-temp-file
  language: C#
  language_alias: CSharp
  severity: Notice
  severity_rank: 3
title: Avoid unsafe temporary file creation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/unsafe-temp-file`

**Language:** C#

**Severity:** Notice

**Category:** Security

**CWE**: [377](https://cwe.mitre.org/data/definitions/377.html)

## Description
The function `GetTempFileName` is known to have security issues and may lead to attacks. Temporary files should not be predictable and safe to use. Avoid the function `GetTempFileName`.

#### Learn More

 - [Stackoverflow thread on creating temporary directory atomically](https://stackoverflow.com/questions/33446371/anybody-got-a-good-way-to-atomically-create-a-temporary-directory-in-net-manage)

## Non-Compliant Code Examples
```csharp
class MyClass {
    public static void payloadDecode()
    {
        var temporaryPath = Path.GetTempFileName();
    }
}

```

## Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    public static void payloadDecode()
    {
        var temporaryPath = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
    }
}

```
