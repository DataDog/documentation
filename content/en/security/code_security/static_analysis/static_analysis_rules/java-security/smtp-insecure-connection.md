---
aliases:
- /continuous_integration/static_analysis/rules/java-security/smtp-insecure-connection
- /static_analysis/rules/java-security/smtp-insecure-connection
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/smtp-insecure-connection
  language: Java
  severity: Warning
  severity_rank: 2
title: SMTP server identify must be enforced
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/smtp-insecure-connection`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [297](https://cwe.mitre.org/data/definitions/297.html)

## Description
When a program establish an SMTP connection, server identity should be checked.

#### Learn More

 - [CWE-297: Improper Validation of Certificate with Host Mismatch](https://cwe.mitre.org/data/definitions/297.html)

## Non-Compliant Code Examples
```java
class NotCompliant {
    public void myMethod() {
        Email email = new SimpleEmail();
        email.setHostName("smtp.servermail.com");
        email.setSmtpPort(465);
        email.setAuthenticator(new DefaultAuthenticator(username, password));
        // email.setSSLOnConnect(true);
        email.setFrom("user@gmail.com");
        email.setSubject("TestMail");
        email.setMsg("This is a test mail ... :-)");
        email.addTo("foo@bar.com");
        email.send();
    }
}
```

## Compliant Code Examples
```java
class Compliant {
    public void myMethod() {
        Email email = new SimpleEmail();
        email.setHostName("smtp.servermail.com");
        email.setSmtpPort(465);
        email.setAuthenticator(new DefaultAuthenticator(username, password));
        email.setSSLOnConnect(true);
        email.setFrom("user@gmail.com");
        email.setSubject("TestMail");
        email.setMsg("This is a test mail ... :-)");
        email.addTo("foo@bar.com");
        email.setSSLCheckServerIdentity(true);
        email.send();
    }
}
```
