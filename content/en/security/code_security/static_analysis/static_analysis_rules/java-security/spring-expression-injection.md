---
aliases:
- /continuous_integration/static_analysis/rules/java-security/spring-expression-injection
- /static_analysis/rules/java-security/spring-expression-injection
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/spring-expression-injection
  language: Java
  severity: Warning
  severity_rank: 2
title: Potential code injection when using Spring Expression
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/spring-expression-injection`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [94](https://cwe.mitre.org/data/definitions/94.html)

## Description
A Spring expression is built on a dynamic value using an input string. The source should be checked to ensure there is no injection.

#### Learn More

 - [CWE-94: Improper Control of Generation of Code ('Code Injection')](https://cwe.mitre.org/data/definitions/94.html)
 - [Beware of the Magic SpEL(L) – Part 2 (CVE-2018-1260)](https://www.gosecure.net/blog/2018/05/17/beware-of-the-magic-spell-part-2-cve-2018-1260/)
 - [Potential code injection when using Spring Expression](https://find-sec-bugs.github.io/bugs.htm#SPEL_INJECTION)

## Non-Compliant Code Examples
```java
class MyClass {
    public void parseExpressionInterface(Person personObj,String property) {

        ExpressionParser parser = new SpelExpressionParser();

        //Unsafe if the input is control by the user..
        Expression exp = parser.parseExpression(property+" == 'Albert'");

        StandardEvaluationContext testContext = new StandardEvaluationContext(personObj);
        boolean result = exp.getValue(testContext, Boolean.class);
    }
}
```
