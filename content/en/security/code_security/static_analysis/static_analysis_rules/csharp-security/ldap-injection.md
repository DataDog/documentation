---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/ldap-injection
- /static_analysis/rules/csharp-security/ldap-injection
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/ldap-injection
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Prevent LDAP injection
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/ldap-injection`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [90](https://cwe.mitre.org/data/definitions/90.html)

## Description
Unvalidated user inputs may lead to LDAP injection. Always escape characters in your LDAP queries. Do not build LDAP queries manually.

#### Learn More

 - [Escaping non special characters in string for LDAP query](https://stackoverflow.com/questions/12550358/escaping-non-special-characters-in-string-for-ldap-query)

## Non-Compliant Code Examples
```csharp
public class MyController : Controller
{
    public bool userExists(string user, string pass)
    {
        DirectoryEntry directory  = new DirectoryEntry();
        DirectorySearcher directorySearch  = new DirectorySearcher(directory);

        directorySearch.Filter = "(&(uid=" + user + ")(userPassword=" + pass + "))";

        return directorySearch.FindOne() != null;
    }
}
```
