---
aliases:
- /continuous_integration/static_analysis/rules/java-security/unvalidated-redirect
- /static_analysis/rules/java-security/unvalidated-redirect
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/unvalidated-redirect
  language: Java
  severity: Error
  severity_rank: 1
title: Do not use unvalidated request
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/unvalidated-redirect`

**Language:** Java

**Severity:** Error

**Category:** Security

**CWE**: [601](https://cwe.mitre.org/data/definitions/601.html)

## Description
Do not use unvalidated redirect. Always check the redirect URL coming from a request.

#### Learn More

 - [Unvalidated Redirect](https://find-sec-bugs.github.io/bugs.htm#UNVALIDATED_REDIRECT)
 - [CWE-601 - URL Redirection to Untrusted Site](https://cwe.mitre.org/data/definitions/601.html)

## Non-Compliant Code Examples
```java
public class MyClass {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendRedirect(req.getParameter("redirectUrl"));
    }
}
```

## Compliant Code Examples
```java
public class MyClass {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendRedirect(validateUrl(req.getParameter("redirectUrl")));
    }
}
```
