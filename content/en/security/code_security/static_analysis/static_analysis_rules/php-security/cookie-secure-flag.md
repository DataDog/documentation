---
aliases:
- /continuous_integration/static_analysis/rules/php-security/cookie-secure-flag
- /static_analysis/rules/php-security/cookie-secure-flag
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/cookie-secure-flag
  language: PHP
  severity: Error
  severity_rank: 1
title: Ensure cookies have the secure flag set
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/cookie-secure-flag`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [614](https://cwe.mitre.org/data/definitions/614.html)

## Description
The secure flag is a part of the `setcookie` function in PHP that dictates that the cookie should only be sent to the server with an encrypted request over the HTTPS protocol.

Using this flag helps protect sensitive cookie data from being exposed over insecure connections, reducing the risk of data theft or tampering. Cookies often contain sensitive information, and transmitting them securely is a fundamental part of web application security.

To ensure compliance with this rule, always set the secure flag to true when using the `setcookie` or `session_set_cookie_params` functions in PHP. For example, `setcookie($name, $value, $expire, $path, $domain, true);` or `session_set_cookie_params($lifetime, $path, $domain, true);`. By doing this, you can significantly enhance the security of your PHP applications.

## Non-Compliant Code Examples
```php
<?php
$value = "cookie data";
setcookie($name, $value, $expire, $path, $domain, false);
session_set_cookie_params($lifetime, $path, $domain, false);
```

## Compliant Code Examples
```php
<?php
$value = "cookie data";
setcookie($name, $value, $expire, $path, $domain, true);
session_set_cookie_params($lifetime, $path, $domain, true);
```
