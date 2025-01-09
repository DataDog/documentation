---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/no-self-assign
- /static_analysis/rules/php-best-practices/no-self-assign
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Error Prone
  id: php-best-practices/no-self-assign
  language: PHP
  severity: Notice
  severity_rank: 3
title: Do not assign a variable to itself
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/no-self-assign`

**Language:** PHP

**Severity:** Notice

**Category:** Error Prone

## Description
This rule aims to prevent redundancy in code. Assigning a variable to itself is a pointless operation that can lead to confusion and clutter in the code, making it harder to read and understand. It's also a potential indicator of a mistake or oversight in the code, where a different assignment was intended.

This rule is important because clean, efficient code is a hallmark of good programming. Unnecessary assignments can slow down the runtime of the script and, more importantly, make the code harder to maintain and debug. In a large codebase, such redundancies can add up to significant inefficiencies.

To avoid this, always ensure that the right-hand side of an assignment is not the same as the left-hand side. If you find yourself writing `var = var`, it's probably a mistake. Double-check your code to ensure that you're assigning the correct variables. If you're reassigning a variable to itself intentionally, consider whether this is really necessary and if there might be a cleaner way to achieve your goal.

## Non-Compliant Code Examples
```php
<?php
$var = 1;
$var2 = 2;
$var = $var;
```

## Compliant Code Examples
```php
<?php
$var = 1;
$var2 = 2;
$var = $var2;
```
