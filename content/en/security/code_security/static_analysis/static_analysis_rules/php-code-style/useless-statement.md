---
aliases:
- /continuous_integration/static_analysis/rules/php-code-style/useless-statement
- /static_analysis/rules/php-code-style/useless-statement
dependencies: []
disable_edit: true
group_id: php-code-style
meta:
  category: Error Prone
  id: php-code-style/useless-statement
  language: PHP
  severity: Warning
  severity_rank: 2
title: Avoid useless statements in code
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-code-style/useless-statement`

**Language:** PHP

**Severity:** Warning

**Category:** Error Prone

## Description
This rule is about avoiding useless statements in your PHP code. Useless statements are those that do not have any effect on your code; they neither change the state of the program nor have any output. These can include standalone variables, constants, or expressions that are not part of a larger expression or statement.

Such statements are not only unnecessary but can also lead to confusion and make the code harder to understand and maintain. They can give the false impression that they are doing something, which can lead to bugs being overlooked.

To avoid violating this rule, always ensure that every statement in your code serves a purpose. Be wary of leaving in variables or expressions that were used for debugging or during development but are no longer needed. Regularly reviewing and cleaning up your code can prevent such issues.

## Non-Compliant Code Examples
```php
<?php
$var;
2;
$a == $b;
```

## Compliant Code Examples
```php
<?php
$var = 2;
$a = $b;
```
