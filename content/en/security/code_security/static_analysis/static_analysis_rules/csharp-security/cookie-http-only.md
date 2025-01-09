---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/cookie-http-only
- /static_analysis/rules/csharp-security/cookie-http-only
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/cookie-http-only
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Ensure cookies have the secure flag
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/cookie-http-only`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [614](https://cwe.mitre.org/data/definitions/614.html)

## Description
Cookies must only be used for HTTP connections. Otherwise, client-side scripts can access cookies and compromise the user security.

#### Learn More

 - [CWE-1004: Sensitive Cookie Without 'HttpOnly' Flag](https://cwe.mitre.org/data/definitions/1004)

## Non-Compliant Code Examples
```csharp
class MyClass {
    public static void setSecureCookie()
    {
        HttpCookie myCookie = new HttpCookie("my cookie");
        Console.WriteLine("Hello World");
        myCookie.HttpOnly = false;
    }
}

```

```csharp
class MyClass {
    public static void setInsecureCookie()
    {
        HttpCookie myCookie = new HttpCookie("my cookie");
        Console.WriteLine("Hello World");
        myCookie.HttpOnly = false;
    }
}

```
