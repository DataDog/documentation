---
aliases:
- /continuous_integration/static_analysis/rules/php-code-style/bad-null-guard
- /static_analysis/rules/php-code-style/bad-null-guard
dependencies: []
disable_edit: true
group_id: php-code-style
meta:
  category: Error Prone
  id: php-code-style/bad-null-guard
  language: PHP
  severity: Error
  severity_rank: 1
title: Bad null guards can cause null pointer dereferences
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-code-style/bad-null-guard`

**Language:** PHP

**Severity:** Error

**Category:** Error Prone

## Description
This rule checks for improper null guard conditions in PHP code. A null guard is a conditional statement that checks if a variable is null before proceeding with an operation. This is important to prevent null pointer dereferences, which occur when the program tries to access a memory location through a null pointer. Null pointer dereferences can lead to unexpected behaviors and crashes in your application.

In non-compliant code, the logical AND (`&&`) and OR (`||`) operators are used incorrectly in null guard conditions. This can lead to situations where a method is called on a null object, causing a null pointer dereference.

To avoid violating this rule, always use the correct logical operator in your null guard conditions. If you want to ensure that a method is only called when a variable is not null, use the AND operator (`&&`). If you want to ensure that a method is called when a variable is null or the method returns true, use the OR operator (`||`). This way, you can prevent null pointer dereferences and improve the robustness of your code.

## Non-Compliant Code Examples
```php
<?php
if ($var == null && $var->method()) {
  echo "method is true";
}

if ($var != null || $var->method()) {
  echo "method is true";
}
```

## Compliant Code Examples
```php
<?php
if ($var == null || $var->method()) {
  echo "method is true";
}

if ($var != null && $var->method()) {
  echo "method is true";
}
```
