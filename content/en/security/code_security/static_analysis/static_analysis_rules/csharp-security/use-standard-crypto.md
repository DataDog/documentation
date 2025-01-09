---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/use-standard-crypto
- /static_analysis/rules/csharp-security/use-standard-crypto
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/use-standard-crypto
  language: C#
  language_alias: CSharp
  severity: Error
  severity_rank: 1
title: Use standard crypto algorithms
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/use-standard-crypto`

**Language:** C#

**Severity:** Error

**Category:** Security

**CWE**: [327](https://cwe.mitre.org/data/definitions/327.html)

## Description
Implementing your hash/cryptographic algorithm may lead to errors and potential vulnerabilities. Always use proven algorithms that are available in the C# library ecosystem.

## Non-Compliant Code Examples
```csharp
public class CustomHash : HashAlgorithm {
}
```
