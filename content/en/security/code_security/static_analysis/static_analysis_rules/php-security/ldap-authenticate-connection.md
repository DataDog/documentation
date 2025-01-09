---
aliases:
- /continuous_integration/static_analysis/rules/php-security/ldap-authenticate-connection
- /static_analysis/rules/php-security/ldap-authenticate-connection
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/ldap-authenticate-connection
  language: PHP
  severity: Error
  severity_rank: 1
title: LDAP connections should be authenticated
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/ldap-authenticate-connection`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [521](https://cwe.mitre.org/data/definitions/521.html)

## Description
Lightweight Directory Access Protocol (LDAP) is a protocol used for accessing and maintaining distributed directory information services over a network. It's often used for user authentication and authorization, among other things.

Unauthenticated LDAP connections can pose a significant security risk. Without proper authentication, sensitive data can be exposed to unauthorized users, and the system could be vulnerable to malicious attacks.

To avoid violating this rule, always provide authentication credentials when binding to an LDAP server using the `ldap_bind()` function in PHP. This function takes three parameters: the LDAP link identifier, the bind RDN (username), and the bind password. Providing the username and password ensures that the LDAP connection is authenticated. So, instead of `ldap_bind($ldap)`, use `ldap_bind($ldap, $username, $password)` to securely connect to the LDAP server.

## Non-Compliant Code Examples
```php
<?php
$ldap = ldap_connect("ldap.example.com");
$ldapbind = ldap_bind($ldap); // Insecure: no authentication provided
```

## Compliant Code Examples
```php
<?php
$username = "username";
$password = "password";
$ldap = ldap_connect("ldap.example.com");
$ldapbind = ldap_bind($ldap, $username, $password); // Secure: authentication provided
```
