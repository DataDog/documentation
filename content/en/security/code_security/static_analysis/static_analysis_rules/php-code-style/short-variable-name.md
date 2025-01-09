---
aliases:
- /continuous_integration/static_analysis/rules/php-code-style/short-variable-name
- /static_analysis/rules/php-code-style/short-variable-name
dependencies: []
disable_edit: true
group_id: php-code-style
meta:
  category: Code Style
  id: php-code-style/short-variable-name
  language: PHP
  severity: Notice
  severity_rank: 3
title: Avoid short variable names
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-code-style/short-variable-name`

**Language:** PHP

**Severity:** Notice

**Category:** Code Style

## Description
This rule emphasizes the importance of using meaningful and descriptive variable names in your PHP code. Short variable names such as `$a` or `$b` are discouraged because they do not provide any context or information about the variable's purpose or the type of data it holds.

This rule is essential for ensuring readability and maintainability of your code. When variables are named descriptively, it is easier for other developers and yourself to understand the code's functionality without needing extensive comments or documentation.

To adhere to this rule, always choose variable names that accurately represent the data the variable is holding. For example, instead of using `$a`, use `$userCount` or `$productPrice`. This not only makes your code more readable, but also reduces the chance of bugs caused by misunderstanding what a variable is used for.

Clarity should always be prioritized over brevity when naming variables. Good naming conventions can significantly improve the quality of your code and make it easier to work with in the long run.

## Non-Compliant Code Examples
```php
<?php
$a = 2;
```

## Compliant Code Examples
```php
<?php
$foo = 2;
```
