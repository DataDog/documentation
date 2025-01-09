---
aliases:
- /continuous_integration/static_analysis/rules/java-security/potential-sql-injection
- /static_analysis/rules/java-security/potential-sql-injection
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/potential-sql-injection
  language: Java
  severity: Warning
  severity_rank: 2
title: SQL injection in SqlUtil.execQuery
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/potential-sql-injection`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [89](https://cwe.mitre.org/data/definitions/89.html)

## Description
The parameter of the SQL query should be properly escaped and validated.

#### Learn More

 - [CWE-89: Improper Neutralization of Special Elements used in an SQL Command](https://cwe.mitre.org/data/definitions/89.html)
 - [Potential Injection](https://find-sec-bugs.github.io/bugs.htm#CUSTOM_INJECTION)

## Non-Compliant Code Examples
```java
class Foobar {

    public void test() {
        SqlUtil.execQuery("select * from UserEntity t where id = " + parameterInput);
    }
}
```

## Compliant Code Examples
```java
class Foobar {

    public void test() {
        SqlUtil.execQuery("select * from UserEntity t where id = " + sanitize(parameterInput));
    }
}
```
