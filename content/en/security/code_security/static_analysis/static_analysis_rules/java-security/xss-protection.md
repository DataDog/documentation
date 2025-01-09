---
aliases:
- /continuous_integration/static_analysis/rules/java-security/xss-protection
- /static_analysis/rules/java-security/xss-protection
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/xss-protection
  language: Java
  severity: Warning
  severity_rank: 2
title: Prevent XSS attacks
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/xss-protection`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [79](https://cwe.mitre.org/data/definitions/79.html)

## Description
This rule is designed to prevent Cross-Site Scripting (XSS) attacks, which occur when untrusted data is included in a web page without proper validation or escaping, allowing an attacker to inject malicious scripts and perform actions on behalf of the user. It's important because XSS attacks can lead to a variety of security breaches, including session hijacking, identity theft, and defacement of websites.

In Java, particularly in web applications, developers should always validate and sanitize user input before using it in HTML or JavaScript code. This involves ensuring that the input conforms to expected formats and does not contain potentially harmful characters or scripts. 

To avoid violations of this rule, use context-specific output encoding whenever outputting user-controlled data. Libraries such as the OWASP Java Encoder can be used to safely encode user data for different HTML and JavaScript contexts. Also, consider using modern web development frameworks that automatically escape user-controlled data, such as Thymeleaf for Java.

In addition, setting the HTTP response header `X-XSS-Protection` to `0` can disable the browser's built-in XSS protection, leaving the user more vulnerable to XSS attacks. Do not set this header to `0` unless you have a specific reason to do so and understand the security implications.

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

        response.setHeader("X-XSS-Protection", "0");
        response.getWriter().printf("Hello, %s!", param);
    }
}

```
