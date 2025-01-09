---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/request-length
- /static_analysis/rules/csharp-security/request-length
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/request-length
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Filter large requests
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/request-length`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [400](https://cwe.mitre.org/data/definitions/400.html)

## Description
Do not allow large requests in your controller. This may lead to many resource allocations and may be a vector of attack for Denial of Services attacks. Always keep the request size to a reasonable estimate.

#### Learn More

 - [CWE-400: Uncontrolled Resource Consumption](https://cwe.mitre.org/data/definitions/400)

## Arguments

 * `max-size`: Maximum size for requests. Default: 10000000.

## Non-Compliant Code Examples
```csharp
public class MyController : Controller
{
    [DisableRequestSizeLimit]
    public IActionResult MyRequest()
    {
        Console.WriteLine("inside controller");
    }
}
```

```csharp
public class MyController : Controller
{
    [RequestSizeLimit(12000000)]
    public IActionResult PostRequest()
    {
        Console.WriteLine("inside controller");
    }
}
```

## Compliant Code Examples
```csharp
public class MyController : Controller
{
    [RequestSizeLimit(500000)] // request is lower than the max (10000000 bytes)
    public IActionResult MyRequest()
    {
        Console.WriteLine("inside controller");
    }
}
```
