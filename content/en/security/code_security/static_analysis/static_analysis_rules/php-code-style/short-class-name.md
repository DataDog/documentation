---
aliases:
- /continuous_integration/static_analysis/rules/php-code-style/short-class-name
- /static_analysis/rules/php-code-style/short-class-name
dependencies: []
disable_edit: true
group_id: php-code-style
meta:
  category: Code Style
  id: php-code-style/short-class-name
  language: PHP
  severity: Notice
  severity_rank: 3
title: Avoid short class names
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-code-style/short-class-name`

**Language:** PHP

**Severity:** Notice

**Category:** Code Style

## Description
This rule suggests that class names in PHP should be descriptive and meaningful, rather than short and non-descriptive. This is important because meaningful class names make your code more readable and maintainable. They provide a clear idea of what the class is for, or what functionality it provides, without having to delve into the details of the class implementation.

Short class names like `A`, `B`, or `C`, on the other hand, are not immediately clear in their purpose, making it difficult for others and yourself to understand what the class is supposed to do at a glance. This can lead to confusion and can make the code harder to work with.

To avoid violating this rule, always give your classes, interfaces, and enums descriptive names. These names should be concise, yet clearly describe what the class, interface, or enum does. For instance, instead of naming a class that handles user authentication as `A`, name it `UserAuthenticationHandler`. This makes it immediately clear what the class is responsible for, enhancing the readability and maintainability of your code.

## Non-Compliant Code Examples
```php
<?php
class A {

}

enum B {

}

interface C {

}
```

## Compliant Code Examples
```php
<?php
class Foo {

}

enum Bar {

}

interface Baz {

}
```
