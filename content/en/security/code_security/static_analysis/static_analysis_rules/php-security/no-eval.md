---
aliases:
- /continuous_integration/static_analysis/rules/php-security/no-eval
- /static_analysis/rules/php-security/no-eval
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/no-eval
  language: PHP
  severity: Error
  severity_rank: 1
title: Use of eval can be insecure
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/no-eval`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CVE**: [2017-9807](https://cve.org/CVERecord?id=CVE-2017-9807)

## Description
Do not use the `eval()` function in PHP. The `eval()` function evaluates a string as PHP code, which can lead to serious security risks if the string contains user input or data from an untrusted source. This is because it opens the door to code injection attacks, where an attacker can execute arbitrary PHP code.

To adhere to this rule and avoid potential security vulnerabilities, you should never use `eval()` in your PHP code. Instead, consider using safer alternatives that don't evaluate strings as code. For instance, if you want to dynamically call a function based on a string name, you can use the `call_user_func()` function. Always ensure to sanitize and validate any user input or data from untrusted sources.

## Non-Compliant Code Examples
```php
<?php
$code = "echo 'test'";
eval($code);
```

## Compliant Code Examples
```php
<?php
echo 'test';
```
