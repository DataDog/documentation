---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/unsafe-cors
- /static_analysis/rules/csharp-security/unsafe-cors
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/unsafe-cors
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Avoid unsafe CORS headers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/unsafe-cors`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [346](https://cwe.mitre.org/data/definitions/346.html)

## Description
Your CORS policy should never allow all other resources. Instead, you must have a restrictive CORS policy to ensure your application only connects and exchanges data with trusted sources.

#### Learn More

 - [MSDN: Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
 - [Wikipedia - Cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

## Non-Compliant Code Examples
```csharp
class MyClass {
    public static void payloadDecode()
    {
        response.Headers.Add("Access-Control-Allow-Origin", "*");
        response.Headers.Add(HeaderNames.AccessControlAllowOrigin, "*");
        response.AppendHeader(HeaderNames.AccessControlAllowOrigin, "*");
    }
}

```

## Compliant Code Examples
```csharp
class MyClass {
    public static void payloadDecode()
    {
        response.Headers.Add("Access-Control-Allow-Origin", "https://domain.tld");
        response.Headers.Add(HeaderNames.AccessControlAllowOrigin, "https://domain.tld");
        response.AppendHeader(HeaderNames.AccessControlAllowOrigin, "https://domain.tld");
    }
}

```
