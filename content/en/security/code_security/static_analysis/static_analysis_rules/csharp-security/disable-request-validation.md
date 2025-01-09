---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/disable-request-validation
- /static_analysis/rules/csharp-security/disable-request-validation
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/disable-request-validation
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Request validation should not be disabled
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/disable-request-validation`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [1019](https://cwe.mitre.org/data/definitions/1019.html)

## Description
Input should always be validated to prevent attack vectors (such as injections or XSS). Disabling validation may expose your application to these attacks. For these reasons, validation should not be disabled.

#### Learn More

 - [HttpRequest.ValidateInput](https://learn.microsoft.com/en-us/dotnet/api/system.web.httprequest.validateinput?view=netframework-4.8.1)

## Non-Compliant Code Examples
```csharp
public class MyController : Controller
{
    [ValidateInput(false)]
    public IActionResult MyRequest()
    {
        Console.WriteLine("inside controller");
    }
}
```

## Compliant Code Examples
```csharp
public class MyController : Controller
{
    [ValidateInput(true)]
    public IActionResult MyRequest()
    {
        Console.WriteLine("inside controller");
    }
}
```
