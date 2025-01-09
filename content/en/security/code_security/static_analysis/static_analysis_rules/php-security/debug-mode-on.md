---
aliases:
- /continuous_integration/static_analysis/rules/php-security/debug-mode-on
- /static_analysis/rules/php-security/debug-mode-on
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/debug-mode-on
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid enabling debug mode in applications
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/debug-mode-on`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [489](https://cwe.mitre.org/data/definitions/489.html)

## Description
Debug mode, while useful during development and testing stages, can expose sensitive information such as server configuration, third-party modules, and other internal details of the application that can be exploited by attackers. In the worst-case scenario, it can lead to a serious security breach.

Make sure that debug mode is disabled in the production environment. This can be achieved by setting the debug configuration to false or 0 in the application's configuration settings. For example, in CakePHP, use `Config::write('debug', 0);` or `Configure::config('debug', false);`, and in WordPress, use `define('WP_DEBUG', false);`.

## Non-Compliant Code Examples
```php
<?php
// CakePHP 1.x, 2.x
Configure::write('debug', 1);
// CakePHP 3.x
Configure::config('debug', true);
// WordPress
define('WP_DEBUG', true);
```

## Compliant Code Examples
```php
<?php
// CakePHP 1.x, 2.x
Configure::write('debug', 0);
// CakePHP 3.x
Configure::config('debug', false);
// WordPress
define('WP_DEBUG', false);
```
