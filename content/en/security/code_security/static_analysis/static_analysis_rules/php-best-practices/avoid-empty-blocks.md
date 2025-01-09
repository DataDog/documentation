---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/avoid-empty-blocks
- /static_analysis/rules/php-best-practices/avoid-empty-blocks
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Error Prone
  id: php-best-practices/avoid-empty-blocks
  language: PHP
  severity: Warning
  severity_rank: 2
title: Avoid empty blocks
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/avoid-empty-blocks`

**Language:** PHP

**Severity:** Warning

**Category:** Error Prone

## Description
This rule is essential for maintaining clean and efficient code in PHP. An empty block, or a block of code that doesn't perform any action, can be confusing and misleading. It suggests that some logic should be implemented there, but it's missing or has been forgotten.

This rule is important because it helps to prevent potential bugs, improve code readability, and maintain a high level of code quality. An empty block can be a sign of unfinished code or a bug that's waiting to happen. For example, if you leave an empty `if` block, the code inside the `if` statement won't execute, leading to unexpected behavior.

To avoid violating this rule, always ensure that all your code blocks have meaningful content. If a block of code is not necessary, it's better to remove it entirely instead of leaving it empty. This makes your code cleaner, easier to read, and less prone to errors. For instance, instead of leaving an empty `if` block, you can use an `else` block or a ternary operator to handle the alternative scenario.

## Non-Compliant Code Examples
```php
<?php
if ($foo) {

}
```

## Compliant Code Examples
```php
<?php
if ($foo) {
    echo 'true';
}    else {
    echo 'false';
}
```
