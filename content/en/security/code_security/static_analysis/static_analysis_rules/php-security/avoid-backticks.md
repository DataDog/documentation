---
aliases:
- /continuous_integration/static_analysis/rules/php-security/avoid-backticks
- /static_analysis/rules/php-security/avoid-backticks
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/avoid-backticks
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid executing shell commands with arbitrary input
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/avoid-backticks`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [94](https://cwe.mitre.org/data/definitions/94.html)

## Description
When you execute shell commands with user-defined inputs in PHP, it leaves your application open to shell injection attacks. In these attacks, a malicious user can manipulate the input to execute arbitrary shell commands, which can lead to unauthorized access, data leakage, or even system compromise.

To ensure the safety of your application, it's important to avoid using user-defined input directly in shell commands. Instead, use built-in PHP functions that can perform the required task without the need for executing shell commands. If there's a need to use shell commands, make sure to sanitize and validate the user input thoroughly before using it.

## Non-Compliant Code Examples
```php
<?php
echo `ping -n 3 {$user_input}`;
```

## Compliant Code Examples
```php
<?php
echo `ping -n 3 domain.tld`;
```
