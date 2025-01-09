---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/avoid-silencing-errors
- /static_analysis/rules/php-best-practices/avoid-silencing-errors
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Error Prone
  id: php-best-practices/avoid-silencing-errors
  language: PHP
  severity: Warning
  severity_rank: 2
title: Do not silence errors, they should not be ignored
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/avoid-silencing-errors`

**Language:** PHP

**Severity:** Warning

**Category:** Error Prone

## Description
This rule stipulates that errors in your PHP code should not be silenced using the '@' operator. Suppressing errors using this operator is not a good practice as it can make debugging difficult and lead to unexpected behavior in your application.

Errors in your code indicate that something is not functioning as expected. By silencing these errors, you are ignoring potential problems that could lead to bigger issues down the line. Keeping a clean, error-free codebase is essential for maintaining a robust and reliable application.

To avoid breaking this rule, ensure that all potential errors in your code are properly handled. This can be achieved through the use of try/catch blocks or error handling functions. Instead of suppressing an error, handle it appropriately and provide a meaningful response. For instance, you can log the error for later review or display an error message to the user.

For example, instead of writing `@canThrowAnError();`, you can write:
```php
try {
    canThrowAnError();
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
```
This way, you can manage the error and take appropriate action, rather than ignoring it.

## Non-Compliant Code Examples
```php
<?php
@canThrowAnError();
```

## Compliant Code Examples
```php
<?php
canThrowAnError();
```
