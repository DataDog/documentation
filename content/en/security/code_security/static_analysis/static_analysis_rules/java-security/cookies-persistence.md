---
aliases:
- /continuous_integration/static_analysis/rules/java-security/cookies-persistence
- /static_analysis/rules/java-security/cookies-persistence
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/cookies-persistence
  language: Java
  severity: Warning
  severity_rank: 2
title: Cookies should not have a long expiration
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/cookies-persistence`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [539](https://cwe.mitre.org/data/definitions/539.html)

## Description
Cookie should not persist for too long. If the computer that stores the cookie is attacked or breached, this can lead to a potential account compromise.

Cookies should not be stored too long and should not be used to store sensitive data (such as personal identifiable information).

#### Learn More

 - [Cookie JavaDoc](https://tomcat.apache.org/tomcat-5.5-doc/servletapi/javax/servlet/http/Cookie.html#setMaxAge%28int%29)
 - [CWE-539: Use of Persistent Cookies Containing Sensitive Information](https://cwe.mitre.org/data/definitions/539.html) 

## Non-Compliant Code Examples
```java
class NotCompliant {
    public void setCookie(String field, String value) {
        Cookie cookie = new Cookie("field", value);

        // Set Cookie for a year
        cookie.setMaxAge(2592000);
    }
}
```

## Compliant Code Examples
```java
class Compliant {
    public void setCookie(String field, String value) {
        Cookie cookie = new Cookie("field", value);

        // Set Cookie for a month
        cookie.setMaxAge(216000);
    }
}
```
