---
aliases:
- /continuous_integration/static_analysis/rules/php-security/avoid-path-injection
- /static_analysis/rules/php-security/avoid-path-injection
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/avoid-path-injection
  language: PHP
  severity: Error
  severity_rank: 1
title: Do not trust unsanitized user input for I/O
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/avoid-path-injection`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [22](https://cwe.mitre.org/data/definitions/22.html)

## Description
User input, if not properly validated or sanitized, can lead to security vulnerabilities like path traversal and code injection. These risks can compromise the application, leak sensitive data, or even lead to complete system takeover.
Functions like `file_get_contents` can retrieve content from any location on the local disk or even from remote URLs; if they receive unsanitized user input, they might be used to perform a wide range of security attacks.

Always validate and sanitize user input before using it in file I/O operations. This can be achieved through built-in PHP functions like `filter_input()`, or by implementing custom validation functions. Also, consider using an allowlist approach, where only known safe input is allowed. For example, in the compliant code below, the function `is_allowed()` could be used to check if the filename provided by the user is in a list of allowed filenames.

## Non-Compliant Code Examples
```php
<?php
$fileName = $_GET["filename"];
file_get_contents($fileName);
```

## Compliant Code Examples
```php
<?php
$fileName = $_GET["filename"];
if (is_allowed($fileName)) {
    file_get_contents($fileName);
}
```
