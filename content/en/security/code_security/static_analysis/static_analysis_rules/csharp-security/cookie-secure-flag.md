---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/cookie-secure-flag
- /static_analysis/rules/csharp-security/cookie-secure-flag
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/cookie-secure-flag
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Ensure cookies have the secure flag
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/cookie-secure-flag`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [614](https://cwe.mitre.org/data/definitions/614.html)

## Description
Cookies must always have the `secure` attribute so that they are not sent through an unencrypted HTTP session.

#### Learn More

 - [CWE-614: Sensitive Cookie in HTTPS Session Without 'Secure' Attribute](https://cwe.mitre.org/data/definitions/614)

## Non-Compliant Code Examples
```csharp
class MyClass {
    public static void setSecureCookie()
    {
        HttpCookie myCookie = new HttpCookie("my cookie");
        Console.WriteLine("Hello World");
        myCookie.Secure = false;
    }
}

```

```csharp
class MyClass {
    public static void setInsecureCookie()
    {
        HttpCookie myCookie = new HttpCookie("my cookie");
        Console.WriteLine("Hello World");
        myCookie.Secure = false;
    }
}

```
