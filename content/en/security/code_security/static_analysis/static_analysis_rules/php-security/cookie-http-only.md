---
aliases:
- /continuous_integration/static_analysis/rules/php-security/cookie-http-only
- /static_analysis/rules/php-security/cookie-http-only
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/cookie-http-only
  language: PHP
  severity: Error
  severity_rank: 1
title: Ensure cookies set the HttpOnly flag
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/cookie-http-only`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [1004](https://cwe.mitre.org/data/definitions/1004.html)

## Description
This rule is crucial for preventing cross-site scripting (XSS) attacks. When the HttpOnly flag is set to true, it instructs the browser to prevent client-side scripts from accessing the cookie. This is important because if a malicious script can access the session cookie, it can impersonate the user, potentially leading to a security breach.

Non-compliance with this rule can make your application vulnerable to XSS attacks. An attacker can exploit this vulnerability to steal sensitive information, manipulate user data, or even gain control over user accounts.

To avoid this, always set the HttpOnly flag to true when setting cookies in your PHP code. This can be done by passing true as the final argument when calling the `setcookie` or `session_set_cookie_params` functions. This ensures that your cookies are not accessible through client-side scripts, thereby increasing the security of your application.

## Non-Compliant Code Examples
```php
<?php
$value = "cookie data";
session_set_cookie_params($lifetime, $path, $domain, true, false);
setcookie($name, $value, $expire, $path, $domain, true, false);
```

## Compliant Code Examples
```php
<?php
$value = "cookie data";
session_set_cookie_params($lifetime, $path, $domain, true, true);
setcookie($name, $value, $expire, $path, $domain, true, true);
```
