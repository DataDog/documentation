---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/use-specific-exceptions
- /static_analysis/rules/php-best-practices/use-specific-exceptions
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Best Practices
  id: php-best-practices/use-specific-exceptions
  language: PHP
  severity: Warning
  severity_rank: 2
title: Do not throw generic exceptions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/use-specific-exceptions`

**Language:** PHP

**Severity:** Warning

**Category:** Best Practices

## Description
This rule states that a developer should not throw generic exceptions in PHP. The use of generic exceptions like `Exception` or `RuntimeException` is discouraged because they do not provide specific information about the type of error that occurred. This makes it harder for other developers to understand and handle the error properly.

The importance of this rule lies in enhancing code readability and maintainability. When a specific exception is thrown, it provides clear insight into what exactly went wrong and where it happened. This makes debugging easier and faster, and it also helps in handling exceptions more accurately.

To follow this rule, always define and throw custom exceptions that extend the base `Exception` class. This should be done for each different type of error that your application can encounter. Also, make sure to provide a meaningful and descriptive message with each exception. This will make your code easier to understand and maintain, and it will make debugging a much smoother process. For example, instead of throwing a generic `Exception`, you can throw a `DatabaseConnectionException` or a `FileNotFoundException`, depending on the specific error that occurred.

## Non-Compliant Code Examples
```php
<?php
throw new Exception("error");
throw new RuntimeException("runtime error");
```

## Compliant Code Examples
```php
<?php
throw new CustomException("custom error");
```
