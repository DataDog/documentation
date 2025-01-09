---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/no-nested-ternary
- /static_analysis/rules/php-best-practices/no-nested-ternary
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Code Style
  id: php-best-practices/no-nested-ternary
  language: PHP
  severity: Notice
  severity_rank: 3
title: Avoid nested ternary expressions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/no-nested-ternary`

**Language:** PHP

**Severity:** Notice

**Category:** Code Style

## Description
This rule is essential for maintaining clean, readable, and understandable code. Ternary expressions, while concise, can become complicated and hard to read when nested. This can lead to potential bugs and difficulties in debugging, especially in complex applications.

The importance of this rule lies in its contribution to code clarity and maintainability. Being able to understand what a piece of code does at a glance is vital for efficient development and for ensuring the code's correctness. Nested ternary expressions often require more cognitive effort to understand, compared to their equivalent structured control flow statements, such as `if-else` blocks.

To adhere to this rule, avoid using more than one ternary expression within a single statement. Instead, use structured control flow statements, such as `if-else` blocks. These are more verbose, but they are also more readable and easier to understand. For instance, instead of writing `$var = $a ? "a" : $b ? "b" : $c ? "c" : "d";`, you can write a series of `if-else` statements, as demonstrated in the compliant code sample.

## Non-Compliant Code Examples
```php
<?php
class Test {
    public function routine($a, $b, $c) {
        $var = $a ? "a" : $b ? "b" : $c ? "c" : "d";
    }
}
```

## Compliant Code Examples
```php
<?php
class Test {
    public function routine($a, $b, $c) {
        if ($a) {
            $var = "a";
        } else if ($b) {
            $var = "b";
        } else if ($c) {
            $var = "c";
        } else {
            $var = "d";
        }
    }
}
```
