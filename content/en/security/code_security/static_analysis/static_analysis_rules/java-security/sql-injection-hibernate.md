---
aliases:
- /continuous_integration/static_analysis/rules/java-security/sql-injection-hibernate
- /static_analysis/rules/java-security/sql-injection-hibernate
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/sql-injection-hibernate
  language: Java
  severity: Warning
  severity_rank: 2
title: SQL injection in Hibernate
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/sql-injection-hibernate`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [89](https://cwe.mitre.org/data/definitions/89.html)

## Description
Never build a SQL query by concatenating string. Instead, make sure that you use Hibernate functionalities to prevent SQL Injection.

#### Learn More

 - [CWE-89: Improper Neutralization of Special Elements used in an SQL Command](https://cwe.mitre.org/data/definitions/89.html)
 - [Potential SQL Injection with Hibernate](https://find-sec-bugs.github.io/bugs.htm#SQL_INJECTION_HIBERNATE)

## Non-Compliant Code Examples
```java
class Foobar {

    public void test() {
        Session session = sessionFactory.openSession();
        Query q = session.createQuery("select t from UserEntity t where id = " + input);
        q.execute();
    }
}
```

## Compliant Code Examples
```java
class Foobar {

    public void test() {
        Session session = sessionFactory.openSession();
        Query q = session.createQuery("select t from UserEntity t where id = :userId");
        q.setString("userId",input);
        q.execute();
    }
}
```
