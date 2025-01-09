---
aliases:
- /continuous_integration/static_analysis/rules/java-security/sql-injection-turbine
- /static_analysis/rules/java-security/sql-injection-turbine
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/sql-injection-turbine
  language: Java
  severity: Warning
  severity_rank: 2
title: SQL injection in BasePeer
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/sql-injection-turbine`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [89](https://cwe.mitre.org/data/definitions/89.html)

## Description
When issuing a SQL query with Turbine, make sure you do not build your query manually and use all the utility functions available with the library.

#### Learn More

 - [CWE-89: Improper Neutralization of Special Elements used in an SQL Command](https://cwe.mitre.org/data/definitions/89.html)
 - [Potential SQL Injection with Turbine](https://find-sec-bugs.github.io/bugs.htm#SQL_INJECTION_TURBINE)

## Non-Compliant Code Examples
```java
class Foobar {

    public void test() {
        List<Record> BasePeer.executeQuery( "select * from Customer where id=" + inputId );
    }
}



```

## Compliant Code Examples
```java
class Foobar {

    public void test() {
        Criteria c = new Criteria();
        c.add( CustomerPeer.ID, inputId );

        List<Customer> customers = CustomerPeer.doSelect( c );
    }
}



```
