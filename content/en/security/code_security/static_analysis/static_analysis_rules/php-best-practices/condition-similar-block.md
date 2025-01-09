---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/condition-similar-block
- /static_analysis/rules/php-best-practices/condition-similar-block
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Best Practices
  id: php-best-practices/condition-similar-block
  language: PHP
  severity: Warning
  severity_rank: 2
title: If conditions should have different code blocks
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/condition-similar-block`

**Language:** PHP

**Severity:** Warning

**Category:** Best Practices

## Description
This rule stipulates that each condition within an `if` statement should have a distinct block of code. This rule is crucial because it ensures that code is not unnecessarily duplicated, which can lead to code bloat, increased chances for errors, and difficulty in maintaining and updating the code.

A violation of this rule occurs when the same block of code is used for multiple conditions within the same `if` statement. This often indicates a lack of understanding of the program's logic and can lead to unexpected behavior, particularly if the conditions are not mutually exclusive.

To adhere to this rule, ensure that each condition within an `if` statement has a unique corresponding block of code. If the same action needs to be taken for multiple conditions, consider whether these conditions can be combined using logical operators, or whether the repeated code can be extracted into a separate function or method. This not only makes the code more readable and maintainable, but also it adheres to the DRY (Don't Repeat Yourself) principle, a fundamental concept of software development.

## Non-Compliant Code Examples
```php
<?php
if ($foo) {
  echo "bar";
} else if ($baz) {
  echo "bar";
}
```

## Compliant Code Examples
```php
<?php
if ($foo) {
  echo "bar";
} else if ($baz) {
  echo "baz";
}
```
