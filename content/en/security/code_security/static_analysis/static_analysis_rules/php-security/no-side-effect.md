---
aliases:
- /continuous_integration/static_analysis/rules/php-security/no-side-effect
- /static_analysis/rules/php-security/no-side-effect
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Best Practices
  id: php-security/no-side-effect
  language: PHP
  severity: Warning
  severity_rank: 2
title: Avoid side effects in a file that defines symbols
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/no-side-effect`

**Language:** PHP

**Severity:** Warning

**Category:** Best Practices

## Description
Avoiding side effects in a file that defines symbols is an important principle in PHP development. A file should declare symbols (like classes, functions, or constants) and cause no other side effects. Side effects include but are not limited to: generating output, explicit use of `require` or `include`, connecting to external services, modifying ini settings, emitting errors or exceptions, modifying global or static variables, reading from or writing to a file, and so on.

This rule is essential because it promotes the separation of concerns, which is a fundamental aspect of good software design. It helps to maintain the readability, maintainability, and testability of your code. Side effects can lead to hidden dependencies, making the code harder to understand and manage.

To adhere to this rule, always ensure that your PHP files either define symbols (like classes, functions, or constants) or cause side effects (like generating output or changing ini settings), but not both. For instance, if a file defines a class, it shouldn't also connect to the database. Instead, the database connection should be done in a different file or within a method or function when needed. This way, you can maintain a clear separation between the definition of your symbols and the implementation of your application logic.

## Non-Compliant Code Examples
```php
<?php
class Test {
}
print 'testing!';
```

## Compliant Code Examples
```php
<?php
class Test {
}

class Main {
}
```
