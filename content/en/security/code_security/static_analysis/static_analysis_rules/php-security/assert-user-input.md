---
aliases:
- /continuous_integration/static_analysis/rules/php-security/assert-user-input
- /static_analysis/rules/php-security/assert-user-input
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/assert-user-input
  language: PHP
  severity: Error
  severity_rank: 1
title: Do not call assert on unsanitized user input
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/assert-user-input`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [95](https://cwe.mitre.org/data/definitions/95.html)

## Description
You should not call `assert` on unsanitized user input. The `assert` function is a debugging feature in PHP that evaluates an assertion and triggers an error when the assertion is false. Using unsanitized user input as the argument for an `assert` function can lead to security vulnerabilities, as it could allow a malicious user to execute arbitrary code.

To adhere to this rule and maintain good coding practices, always sanitize user inputs before using them in your code. You can create a function to sanitize the input, or use built-in PHP functions such as `filter_var`. Additionally, it's generally a good idea to avoid using the `assert` function on user input altogether, even if it has been sanitized. Instead, use other methods to validate user input, such as comparison operators or regular expressions.

## Non-Compliant Code Examples
```php
<?php
$data = $_GET['input'];
assert($data);
```

## Compliant Code Examples
```php
<?php
$data = $_GET['input'];
$data = sanitize_input($data);
assert($data);
```
