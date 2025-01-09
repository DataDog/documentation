---
aliases:
- /continuous_integration/static_analysis/rules/php-code-style/single-var-declaration
- /static_analysis/rules/php-code-style/single-var-declaration
dependencies: []
disable_edit: true
group_id: php-code-style
meta:
  category: Best Practices
  id: php-code-style/single-var-declaration
  language: PHP
  severity: Notice
  severity_rank: 3
title: Separate lines for each declaration
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-code-style/single-var-declaration`

**Language:** PHP

**Severity:** Notice

**Category:** Best Practices

## Description
This rule requires that each variable declaration should be on its own separate line. This is important for readability and maintainability of the code. If multiple variables are declared on the same line, it can be easy to miss a declaration or confuse the values of the variables.

In order to comply with this rule, when declaring multiple variables, each one should be placed on its own line with its own assignment statement. This makes it clear what each variable is and what its initial value is.

Non-compliant code can be corrected by moving each declaration to its own line. For example, instead of writing `$field1 = 1, $field2 = 2;`, you can write: `$field1 = 1; $field2 = 2;`. This makes the code easier to read and understand.

## Non-Compliant Code Examples
```php
<?php
class Test
{
    $field1 = 1, $field2 = 2;
}
```

## Compliant Code Examples
```php
<?php
class Test
{
    $field1 = 1;
    $field2 = 2;
}
```
