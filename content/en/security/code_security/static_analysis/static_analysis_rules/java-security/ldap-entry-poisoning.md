---
aliases:
- /continuous_integration/static_analysis/rules/java-security/ldap-entry-poisoning
- /static_analysis/rules/java-security/ldap-entry-poisoning
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/ldap-entry-poisoning
  language: Java
  severity: Info
  severity_rank: 4
title: Prevent LDAP Entry Poisoning
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/ldap-entry-poisoning`

**Language:** Java

**Severity:** Info

**Category:** Security

## Description
JNDI API support the binding of serialize object in LDAP directories and can lead to remove code execution. Generally, object deserialization should be consider a risky operation that can lead to remote code execution. This exploitation has been demonstrated at Black Hat USA 2016.

#### Learn More

 - [Black Hat 2016 Exploitation](https://www.blackhat.com/docs/us-16/materials/us-16-Munoz-A-Journey-From-JNDI-LDAP-Manipulation-To-RCE-wp.pdf)

## Non-Compliant Code Examples
```java
class NotCompliant {
    public void myMethod() {
        DirContext ctx = new InitialDirContext();

        ctx.search(query, filter,
                new SearchControls(scope, countLimit, timeLimit, attributes,
                    true,
                    deref));
    }
}
```

## Compliant Code Examples
```java
class Compliant {
    public void myMethod() {
        DirContext ctx = new InitialDirContext();

        ctx.search(query, filter,
                new SearchControls(scope, countLimit, timeLimit, attributes,
                    false,
                    deref));
    }
}
```
