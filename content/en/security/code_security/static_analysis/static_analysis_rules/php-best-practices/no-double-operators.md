---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/no-double-operators
- /static_analysis/rules/php-best-practices/no-double-operators
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Error Prone
  id: php-best-practices/no-double-operators
  language: PHP
  severity: Warning
  severity_rank: 2
title: Do not use the same operator twice
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/no-double-operators`

**Language:** PHP

**Severity:** Warning

**Category:** Error Prone

## Description
This rule advises against the use of the same operator twice in a row in PHP code. This practice can lead to confusion and errors. Using operators like `!!` or `~~` can be misleading, as their purpose might not be immediately clear to other developers reading the code.

The importance of this rule lies in the readability and maintainability of the code. Clear, readable code is crucial in any development project, as it allows other team members to understand and work on the code. It also reduces the likelihood of bugs and errors.

To adhere to this rule, avoid using the same operator twice in a row. If you are tempted to use double operators for type conversion, instead consider using explicit type conversion functions such as `boolval()` for booleans or `intval()` for integers. This will make your code more explicit and easier to understand.

## Non-Compliant Code Examples
```php
<?php
$myInt = 2;
$myValue1 = !!$myInt;
$myValue2 = ~~$myInt;
```

## Compliant Code Examples
```php
<?php
$myInt = 2;
$myValue1 = boolVal($myInt);
$myValue2 = $myInt;
```
