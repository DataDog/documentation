---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/exception-must-be-thrown
- /static_analysis/rules/php-best-practices/exception-must-be-thrown
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Error Prone
  id: php-best-practices/exception-must-be-thrown
  language: PHP
  severity: Warning
  severity_rank: 2
title: Exceptions must be thrown
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/exception-must-be-thrown`

**Language:** PHP

**Severity:** Warning

**Category:** Error Prone

## Description
This rule in PHP static analysis is important for ensuring that your code behaves as expected during runtime. It mandates that any exception that is created must also be thrown using the `throw` keyword. This rule is critical because creating an exception object without throwing it does not interrupt the flow of execution. Potential errors or issues that an exception is supposed to handle might go unnoticed, leading to unexpected behavior or bugs.

Non-compliance with this rule could lead to code that silently fails or behaves inconsistently, making it difficult to debug or maintain. When you create an exception, ensure that you also throw it using the `throw` keyword. This will interrupt the normal flow of execution and allow the exception to be caught and handled appropriately.

For instance, instead of writing `new Exception('Not secure');`, you can write `throw new Exception('Not secure');`. This ensures that the exception is properly thrown and can be caught in a higher level of your code. This is a good coding practice as it makes your code more robust and easier to maintain.

## Non-Compliant Code Examples
```php
<?php
if (notSecure()) {
    new Exception('Not secure');
}
```

## Compliant Code Examples
```php
<?php
if (notSecure()) {
    throw new Exception('Not secure');
}
```
