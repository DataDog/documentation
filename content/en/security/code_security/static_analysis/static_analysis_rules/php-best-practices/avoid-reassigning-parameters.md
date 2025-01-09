---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/avoid-reassigning-parameters
- /static_analysis/rules/php-best-practices/avoid-reassigning-parameters
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Error Prone
  id: php-best-practices/avoid-reassigning-parameters
  language: PHP
  severity: Warning
  severity_rank: 2
title: Avoid reassigning parameters as it's bug prone
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/avoid-reassigning-parameters`

**Language:** PHP

**Severity:** Warning

**Category:** Error Prone

## Description
This rule is a simple yet crucial guideline in PHP development. This rule states that once a parameter is passed into a function, its value should not be reassigned within the function. This practice is discouraged because it can lead to confusion and unexpected behavior, increasing the likelihood of bugs in the code.

The importance of this rule lies in its ability to enhance code readability and maintainability. When a parameter is reassigned, it can confuse other developers who may expect the parameter to retain its original value throughout the function. This can make the code more difficult to understand and debug, especially in complex codebases.

To adhere to this rule, developers should create new variables inside the function instead of reassigning the parameters' values. If a function needs to modify a parameter's value, it should do so by returning a new value rather than changing the parameter itself. For example, instead of writing `function sum($a, $b) { $a = 2; return $a + $b; }`, you can write `function sum($a, $b) { $newA = 2; return $newA + $b; }`. This makes the function's behavior more predictable and the code easier to read and maintain.

## Non-Compliant Code Examples
```php
<?php
function sum($a, $b) {
    $a = 2;
    return $a + $b
}
```

## Compliant Code Examples
```php
<?php
function sum($a, $b) {
    return $a + $b
}
```
