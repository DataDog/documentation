---
aliases:
- /continuous_integration/static_analysis/rules/php-code-style/illogical-count-compare
- /static_analysis/rules/php-code-style/illogical-count-compare
dependencies: []
disable_edit: true
group_id: php-code-style
meta:
  category: Error Prone
  id: php-code-style/illogical-count-compare
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid illogical comparisons with count
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-code-style/illogical-count-compare`

**Language:** PHP

**Severity:** Error

**Category:** Error Prone

## Description
This rule is important because it helps to avoid illogical comparisons in your code. In PHP, the `count()` function will always return an integer greater than or equal to zero. Checking if the count of an array is less than zero or greater than or equal to zero doesn't make sense, and can lead to confusing code.

Good coding practices suggest that you should only compare the count of an array with zero or a positive integer. You can check if an array is empty by comparing the count with zero, and if an array has elements by comparing the count with a number greater than zero. This makes your code more readable and less prone to errors.

For example, instead of writing `if (count($array) >= 0)`, which will always be true, you can write `if (count($array) > 0)`, which will only be true if the array is not empty. Similarly, instead of writing `if (count($array) < 0)`, which will never be true, you can write `if (count($array) == 0)`, which will be true if the array is empty.

## Non-Compliant Code Examples
```php
<?php
if (count($array) >= 0) {
    echo "The length is >= 0";
    if (count($array) < 0) {
        echo "Impossible condition";
    }
}
```

## Compliant Code Examples
```php
<?php
if (count($array) > 0) {
    echo "Length is greater than 0"
} else if (count($array) == 0) {
    echo "Length is zeroo"
}
```
