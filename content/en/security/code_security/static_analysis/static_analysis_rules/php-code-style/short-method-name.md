---
aliases:
- /continuous_integration/static_analysis/rules/php-code-style/short-method-name
- /static_analysis/rules/php-code-style/short-method-name
dependencies: []
disable_edit: true
group_id: php-code-style
meta:
  category: Code Style
  id: php-code-style/short-method-name
  language: PHP
  severity: Notice
  severity_rank: 3
title: Avoid short method names
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-code-style/short-method-name`

**Language:** PHP

**Severity:** Notice

**Category:** Code Style

## Description
This rule emphasizes the importance of avoiding short method names in your PHP code. Short method names such as 'a' or 'b' provide little to no context about what the function does, making it harder for others and yourself to understand the code. This can lead to confusion, misinterpretation, and mistakes during code maintenance or enhancement.

The importance of this rule lies in the clarity and maintainability of your code. Clear, descriptive method names make it easier to understand the function's purpose without needing to read and understand its internal implementation. This not only improves readability, but also reduces the time needed to understand the code, making it more efficient to work with.

To avoid this, always use meaningful, descriptive names for your methods. Good method names should accurately represent what the method does. For example, a method that calculates the total price could be named `calculateTotalPrice()`. By following this practice, you contribute to creating clean, understandable, and maintainable code.

## Non-Compliant Code Examples
```php
<?php
function a() {

}

class Foo {
    function b() {

    }
}
```

## Compliant Code Examples
```php
<?php
function foo() {

}

class Foo {
    function bar() {

    }
}
```
