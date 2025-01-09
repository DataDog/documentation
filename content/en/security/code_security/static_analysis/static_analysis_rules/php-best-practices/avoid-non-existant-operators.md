---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/avoid-non-existant-operators
- /static_analysis/rules/php-best-practices/avoid-non-existant-operators
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Error Prone
  id: php-best-practices/avoid-non-existant-operators
  language: PHP
  severity: Error
  severity_rank: 1
title: Do not use operators that don't exist
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/avoid-non-existant-operators`

**Language:** PHP

**Severity:** Error

**Category:** Error Prone

## Description
This rule aims to prevent the use of invalid or incorrect operators in PHP code. These operators can lead to unexpected behavior, errors, or bugs in the code. PHP has a predefined set of arithmetic, assignment, comparison, increment/decrement, logical, and string operators. Using an operator outside of this set, or using an operator incorrectly, is a violation of this rule.

The importance of this rule lies in maintaining the correctness and robustness of the code. Invalid operators can cause the code to fail or behave unexpectedly, which can be difficult to debug. It can also lead to incorrect results, which can affect the functionality of the application.

To adhere to this rule, always ensure that you are using the correct operators for the intended operations. Familiarize yourself with the different operators available in PHP and their correct usage. Use the `+=` and `-=` assignment operators for adding or subtracting from a variable, not `=+` or `=-`. Use the `!` operator to negate a boolean value, not to compare it with `false`. In general, if you're not sure about an operator's existence or usage, see the [official PHP documentation](https://www.php.net/manual/en/language.operators.php).

## Non-Compliant Code Examples
```php
<?php
$var = 1;
$var =+ 2;
$var =- 1;
$cond = true;
$cond =! false;
```

## Compliant Code Examples
```php
<?php
$var = 1;
$var += 2;
$var -= 1;
$cond = true;
$cond = !cond;
```
