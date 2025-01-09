---
aliases:
- /continuous_integration/static_analysis/rules/java-security/tainted-xpath
- /static_analysis/rules/java-security/tainted-xpath
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Best Practices
  id: java-security/tainted-xpath
  language: Java
  severity: Warning
  severity_rank: 2
title: Detect an XPath input from an HTTP request
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/tainted-xpath`

**Language:** Java

**Severity:** Warning

**Category:** Best Practices

**CWE**: [643](https://cwe.mitre.org/data/definitions/643.html)

## Description
This rule identifies potential security vulnerabilities in your code where an XPath expression may be influenced by data coming from an HTTP request. This could lead to what is known as an XPath Injection attack, where an attacker could manipulate the XPath query to access unauthorized data, or potentially cause other harmful effects.

This rule is crucial because XPath Injection is a severe security risk, similar to SQL Injection. If an attacker can control part of an XPath query, they can alter the query's logic, leading to unauthorized access or exposure to sensitive data.

Never construct XPath queries using string concatenation with unvalidated input. Instead, always use parameterized queries or sanitize the input before using it in an XPath query. If possible, limit the XPath functionality that your application uses to reduce the attack surface. You can also use APIs that automatically protect against XPath Injection, or use a web application firewall to detect and block attack attempts.

## Non-Compliant Code Examples
```java
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.xpath.XPathFactory;
import javax.xml.xpath.XPath;

public class NonCompliant {
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        String param = "<default>";
        java.util.Enumeration<String> headers = request.getHeaders("X-Some-Header");

        if (headers != null && headers.hasMoreElements()) {
            param = headers.nextElement();
        }

        param = java.net.URLDecoder.decode(param, "UTF-8");

        XPathFactory xpf = XPathFactory.newInstance();
        XPath xp = xpf.newXPath();

        String expression = "/Employees/Employee[@emplid='" + param + "']";
        xp.compile(expression).evaluate(xmlDocument);
    }
}

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NonCompliant2 {

    @PostMapping("/")
    public void handlePost(@RequestHeader("X-Some-Header") String headerValue) {
        XPathFactory xpf = XPathFactory.newInstance();
        XPath xp = xpf.newXPath();

        String expression = "/Employees/Employee[@emplid='" + headerValue + "']";
        xp.compile(expression).evaluate(xmlDocument);
    }
}

```
