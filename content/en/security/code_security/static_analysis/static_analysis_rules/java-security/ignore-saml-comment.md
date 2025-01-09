---
aliases:
- /continuous_integration/static_analysis/rules/java-security/ignore-saml-comment
- /static_analysis/rules/java-security/ignore-saml-comment
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/ignore-saml-comment
  language: Java
  severity: Error
  severity_rank: 1
title: Ignore SAML comments
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/ignore-saml-comment`

**Language:** Java

**Severity:** Error

**Category:** Security

## Description
Ignoring comments in SAML may lead to vulnerabilities.

#### Learn More

 - [Duo Finds SAML Vulnerabilities Affecting Multiple Implementations
](https://duo.com/blog/duo-finds-saml-vulnerabilities-affecting-multiple-implementations)
- [Spring SAML Vulnerability](https://spring.io/blog/2018/03/01/spring-security-saml-and-this-week-s-saml-vulnerability)

## Non-Compliant Code Examples
```java
public class MyClass {
 
    @Bean
    ParserPool myParserPool() {
        BasicParserPool pool = new BasicParserPool();
        pool.setIgnoreComments(false);
        return pool;
    }
}
```

## Compliant Code Examples
```java
public class MyClass {
 
    @Bean
    ParserPool myParserPool() {
        BasicParserPool pool = new BasicParserPool();
        return pool;
    }
}
```
