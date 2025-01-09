---
aliases:
- /continuous_integration/static_analysis/rules/java-security/trust-boundaries
- /static_analysis/rules/java-security/trust-boundaries
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/trust-boundaries
  language: Java
  severity: Error
  severity_rank: 1
title: Enforce trust boundaries
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/trust-boundaries`

**Language:** Java

**Severity:** Error

**Category:** Security

**CWE**: [501](https://cwe.mitre.org/data/definitions/501.html)

## Description
The "Enforce trust boundaries" rule is a critical security principle that ensures all data crossing the trust boundary of an application is properly validated. Trust boundaries can be defined as the points in a program where data is transferred from a trusted to an untrusted source or vice versa. 

This rule helps prevent various security vulnerabilities such as SQL injection, cross-site scripting (XSS), and remote code execution which could occur if untrusted data is not correctly validated or sanitized.

Good coding practices to avoid violating this rule include validating all incoming data, encoding data that will be output, and using parameterized queries or prepared statements for database interactions. For instance, in the provided compliant code sample, the cookie value is URL decoded and then HTML encoded before it is output to the user, ensuring that any potentially malicious script tags are not executed. Additionally, the use of HttpOnly cookies can prevent client-side script from accessing sensitive data.

## Non-Compliant Code Examples
```java
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class NonCompliant {
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        String param = "<default>";
        java.util.Enumeration<String> headers = request.getHeaders("X-Some-Header");

        if (headers != null && headers.hasMoreElements()) {
            param = headers.nextElement();
        }
        param = java.net.URLDecoder.decode(param, "UTF-8");

        request.getSession().setAttribute(param, "<value>>");
    }
}

```
