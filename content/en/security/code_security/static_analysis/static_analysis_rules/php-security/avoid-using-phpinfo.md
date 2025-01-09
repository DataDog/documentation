---
aliases:
- /continuous_integration/static_analysis/rules/php-security/avoid-using-phpinfo
- /static_analysis/rules/php-security/avoid-using-phpinfo
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/avoid-using-phpinfo
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid using the phpinfo function
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/avoid-using-phpinfo`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [200](https://cwe.mitre.org/data/definitions/200.html)

## Description
The `phpinfo()` function is a built-in function in PHP that outputs a large amount of information about the current state of PHP. This includes information about PHP compilation options and extensions, the PHP version, server information and environment (if compiled as a module), the PHP environment, OS version information, paths, parent and local values of configuration options, HTTP headers, and the PHP License.

Using the `phpinfo()` function can pose a significant security risk, as it exposes all of this information to anyone who can access the page. This can potentially aid an attacker in finding a vulnerability in your server or application.

To avoid this, do not use the `phpinfo()` function in a production environment. If you need to use it for debugging purposes, make sure to remove it once you're done. You can also restrict access to the page containing the `phpinfo()` function to only trusted individuals. Use other debugging methods that do not expose sensitive information whenever possible.

## Non-Compliant Code Examples
```php
<?php
echo phpinfo();
```

## Compliant Code Examples
```php
<?php
echo "Hello World!";
```
