---
aliases:
- /continuous_integration/static_analysis/rules/java-security/command-injection
- /static_analysis/rules/java-security/command-injection
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/command-injection
  language: Java
  severity: Error
  severity_rank: 1
title: Prevent command injection
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/command-injection`

**Language:** Java

**Severity:** Error

**Category:** Security

**CWE**: [78](https://cwe.mitre.org/data/definitions/78.html)

## Description
This rule detects command injection, a serious security vulnerability that occurs when an attacker is able to manipulate a command that the application executes. Command injection attacks can lead to data loss, corruption, or unauthorized access to sensitive system data.

Command injection vulnerabilities generally occur when user input is used unsanitized in a command that is executed by the application. In the non-compliant code samples, the user input is directly added to a command that is executed by the application, allowing an attacker to potentially execute arbitrary commands.

To avoid this vulnerability, user input should never be used directly in a command that is executed by the application. Instead, use safe APIs that allow you to execute commands without the risk of injection, or ensure that user input is properly sanitized before it is used. If you must use user input in a command, ensure that it is properly escaped or quoted to prevent the injection of additional commands.

## Non-Compliant Code Examples
```java
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class NonCompliant {
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        String param = "<default>";
        java.util.Enumeration<String> headers = request.getHeaders("X-Some-Header");

        java.util.List<String> argList = new java.util.ArrayList<String>("./script.sh");
        if (headers != null && headers.hasMoreElements()) {
            argList.add(java.net.URLDecoder.decode(headers.nextElement(), "UTF-8"));
        }

        ProcessBuilder pb = new ProcessBuilder();
        pb.command(argList);
    }
}

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NonCompliant2 {

    @PostMapping("/")
    public void handlePost(@RequestHeader("X-Some-Header") String headerValue) {
        java.util.List<String> argList = new java.util.ArrayList<String>("./script.sh");
        argList.add("-c");
        argList.add(headerValue);

        ProcessBuilder pb = new ProcessBuilder();
        pb.command(argList);
    }
}

```
