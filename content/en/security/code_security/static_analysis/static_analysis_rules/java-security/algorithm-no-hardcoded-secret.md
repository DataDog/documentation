---
aliases:
- /continuous_integration/static_analysis/rules/java-security/algorithm-no-hardcoded-secret
- /static_analysis/rules/java-security/algorithm-no-hardcoded-secret
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/algorithm-no-hardcoded-secret
  language: Java
  severity: Error
  severity_rank: 1
title: No hardcoded secret with algorithm methods
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/algorithm-no-hardcoded-secret`

**Language:** Java

**Severity:** Error

**Category:** Security

**CWE**: [798](https://cwe.mitre.org/data/definitions/798.html)

## Description
Do not use hardcoded secrets. Instead, use secrets coming from a vault and a secure source.

#### Learn More

 - [CWE-798 - Use of hardcoded credentials](https://cwe.mitre.org/data/definitions/798.html)

## Non-Compliant Code Examples
```java
class App {
    private static void error1() {
        Algorithm algorithm = Algorithm.HMAC256("secret");
        Algorithm algorithm = Algorithm.HMAC512("secret");
        Algorithm algorithm = Algorithm.HMAC384("secret");
    }
}
```

## Compliant Code Examples
```java
class App {
    @Test
    public void myFunctionToTest() {
        Algorithm algorithm = Algorithm.HMAC256("secret");
    }
}
```
