---
aliases:
- /continuous_integration/static_analysis/rules/php-code-style/objects-ensure-use
- /static_analysis/rules/php-code-style/objects-ensure-use
dependencies: []
disable_edit: true
group_id: php-code-style
meta:
  category: Error Prone
  id: php-code-style/objects-ensure-use
  language: PHP
  severity: Warning
  severity_rank: 2
title: Ensure newly created objects are used
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-code-style/objects-ensure-use`

**Language:** PHP

**Severity:** Warning

**Category:** Error Prone

## Description
This rule requires that all newly created objects in PHP should be used in your code. Creating an object with the `new` keyword but not using it is considered a violation of this rule. This prevents the creation of unnecessary objects that take up memory and can slow down your application's performance.

In PHP, when you create an object using the `new` keyword, it allocates memory for that object. If the object isn't used, this memory allocation is wasted. This can lead to memory leaks and performance issues, especially in larger applications.

To avoid violating this rule, always assign your new objects to a variable or use them directly after creation. For instance, `$obj = new Object;` is compliant code as the newly created object is assigned to a variable named `$obj`. On the other hand, `new Object;` is non-compliant code because the newly created object is not being used or assigned to any variable. Following this rule leads to more efficient, cleaner code.

## Non-Compliant Code Examples
```php
<?php
new Object;
```

## Compliant Code Examples
```php
<?php
$obj = new Object;
```
