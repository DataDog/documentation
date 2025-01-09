---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/prefer-require-include-once
- /static_analysis/rules/php-best-practices/prefer-require-include-once
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Error Prone
  id: php-best-practices/prefer-require-include-once
  language: PHP
  severity: Warning
  severity_rank: 2
title: Prefer using require_once or include_once
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/prefer-require-include-once`

**Language:** PHP

**Severity:** Warning

**Category:** Error Prone

## Description
This rule emphasizes the importance of using `require_once` or `include_once` instead of `require` or `include` in PHP. The main reason behind this is to avoid the inclusion of the same file more than once. If a file is included multiple times, it may lead to function redefinitions, variable value reassignments, and other unexpected behaviors which can be hard to debug.

`require_once` and `include_once` are statements that handle this problem effectively. They check if the file has already been included, and if so, they do not include it again. This ensures that the code within the file is executed only once, maintaining the integrity of your PHP application.

To comply with this rule, always use `require_once` or `include_once` when you want to include a PHP file. This will help to prevent potential issues with function redefinition or variable reassignment, and will make your code more reliable and easier to manage.

## Non-Compliant Code Examples
```php
<?php
require 'file.php';
include 'file.php';
```

## Compliant Code Examples
```php
<?php
require_once 'file.php';
include_once 'file.php';
```
