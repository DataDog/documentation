---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/avoid-xml-xxe
- /static_analysis/rules/csharp-security/avoid-xml-xxe
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/avoid-xml-xxe
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Prevent XXE attack from XML parser
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/avoid-xml-xxe`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [611](https://cwe.mitre.org/data/definitions/611.html)

## Description
Enabling processing of external data can lead to XML External Entity (XXE) attacks. To prevent this, disable external processing or make sure the external processing you are using is safe. Note that this vulnerability is important for .NET Framework prior to 4.5.2, latest revision are safe by default.

#### Learn More

 - [CWE-611: Improper Restriction of XML External Entity Reference](https://cwe.mitre.org/data/definitions/611.html)

## Non-Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    public static void payloadDecode()
    {
        XmlDocument parser = new XmlDocument();
        parser.XmlResolver = new XmlUrlResolver();
        parser.LoadXml("myDocument.xml");
    }
}

```

## Compliant Code Examples
```csharp
using System.Xml;

class MyClass {
    public static void payloadDecode()
    {
        XmlDocument parser = new XmlDocument();
        parser.XmlResolver = null;
        parser.LoadXml("myDocument.xml");
    }
}

```
