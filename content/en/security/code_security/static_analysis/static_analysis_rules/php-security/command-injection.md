---
aliases:
- /continuous_integration/static_analysis/rules/php-security/command-injection
- /static_analysis/rules/php-security/command-injection
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/command-injection
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid potential command injections
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/command-injection`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [78](https://cwe.mitre.org/data/definitions/78.html)

## Description
Command injection vulnerabilities occur when an application passes unsafe user supplied data (forms, cookies, HTTP headers etc.) to a system shell. In this case, the attacker could execute arbitrary commands on the host operating system.

A command injection vulnerability could lead to data loss, corruption, or unauthorized access to sensitive data.

Always sanitize and validate user input before using it in a system command and avoid directly incorporating user input into system commands where possible.

## Non-Compliant Code Examples
```php
<?php
function check($host, $dir) {
    system("ping -n 3 " . $host);
    $out = null;
    $ret = null;
    exec('ls -lah'.$dir, $out, $ret);
}
```

## Compliant Code Examples
```php
<?php
function check() {
    system("ping -n 3 domain");
    $out = null;
    $ret = null;
    exec('ls -lah dir', $out, $ret);
}
```
