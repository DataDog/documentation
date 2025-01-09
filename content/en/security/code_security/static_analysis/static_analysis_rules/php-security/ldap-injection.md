---
aliases:
- /continuous_integration/static_analysis/rules/php-security/ldap-injection
- /static_analysis/rules/php-security/ldap-injection
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/ldap-injection
  language: PHP
  severity: Error
  severity_rank: 1
title: Prevent LDAP injection
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/ldap-injection`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [90](https://cwe.mitre.org/data/definitions/90.html)

## Description
LDAP injection is a type of attack used to exploit applications that construct LDAP statements from user-supplied input. This can cause unauthorized viewing of data, privilege escalation, or other unintended behaviors.

The importance of this rule lies in its ability to prevent such attacks, safeguarding the application and its data. By not properly sanitizing user input before using it in an LDAP statement, you may be exposing your system to potential security risks.

To follow this rule and avoid LDAP injection, always sanitize and validate user input before using it in an LDAP statement. This can be achieved by using the `ldap_escape` function in PHP for escaping special characters in the input. Additionally, using regular expressions or other validation methods to ensure the input matches expected patterns can further enhance security.

## Non-Compliant Code Examples
```php
<?php
// Insecure: Using unsanitized user input in an LDAP search
$ldapconn = ldap_connect("ldap://example.com");
$base_dn = "ou=users,dc=example,dc=com";
$filter = "(uid=" . $_POST['username'] . ")";

if ($ldapconn) {
    ldap_bind($ldapconn, "cn=admin,dc=example,dc=com", "admin_password");
    $result = ldap_search($ldapconn, $base_dn, $filter);
    $entries = ldap_get_entries($ldapconn, $result);

    foreach ($entries as $entry) {
        echo "User: " . $entry["uid"][0];
    }
}
```

## Compliant Code Examples
```php
<?php
// Secure: Sanitize and validate user input before LDAP bind
$ldapconn = ldap_connect("ldap://example.com");

if ($ldapconn) {
    $username = ldap_escape($_GET['username'], '', LDAP_ESCAPE_DN);
    $ldaprdn = 'uid=' . $username . ',ou=users,dc=example,dc=com';
    $ldappass = $_GET['password'];

    // Additional validation for the username and password
    if (preg_match('/^[a-zA-Z0-9._-]+$/', $username) && !empty($ldappass)) {
        $ldapbind = ldap_bind($ldapconn, $ldaprdn, $ldappass);

        if ($ldapbind) {
            echo "LDAP bind successful.";
        } else {
            echo "LDAP bind failed.";
        }
    } else {
        echo "Invalid input.";
    }
}
```
