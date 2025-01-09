---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/unset-loop-references
- /static_analysis/rules/php-best-practices/unset-loop-references
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Error Prone
  id: php-best-practices/unset-loop-references
  language: PHP
  severity: Warning
  severity_rank: 2
title: Ensure loop references are unset after the loop
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/unset-loop-references`

**Language:** PHP

**Severity:** Warning

**Category:** Error Prone

## Description
This rule requires that all references created during loops, such as `foreach`, should be unset after the loop has completed. This is important because PHP handles variable scope differently than some other programming languages. In PHP, a reference set inside a `foreach` loop will continue to exist after the loop has finished, potentially leading to unexpected behavior.

If a reference is not unset after a loop, it can accidentally be used later in the code, causing bugs that are difficult to trace. In the non-compliant code sample, `$value` is a reference to each element of `$arr` in the loop. After the loop, `$value` is still a reference to the last element of `$arr`. If `$value` is modified, the last element of `$arr` is also modified, which is likely not the intended behavior.

To avoid this, always explicitly unset references after the loop with `unset()`. This good practice ensures that the reference does not persist beyond its intended scope, preventing potential bugs and making your code more robust and easier to understand. Following this rule will help you write cleaner, more predictable code and reduce the likelihood of encountering difficult-to-diagnose bugs.

## Non-Compliant Code Examples
```php
<?php
foreach ($arr as &$value) {
  $value += 10;
}
$value = 'x';
```

## Compliant Code Examples
```php
<?php
foreach ($arr as &$value) {
  $value += 10;
}
unset($value);
$value = 'x';
```
