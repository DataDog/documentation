---
aliases:
- /continuous_integration/static_analysis/rules/php-code-style/no-this-static
- /static_analysis/rules/php-code-style/no-this-static
dependencies: []
disable_edit: true
group_id: php-code-style
meta:
  category: Error Prone
  id: php-code-style/no-this-static
  language: PHP
  severity: Error
  severity_rank: 1
title: Do not use this in a static method
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-code-style/no-this-static`

**Language:** PHP

**Severity:** Error

**Category:** Error Prone

## Description
In PHP, `$this` is a special variable that is used to reference the current object. However, static methods are not associated with an object, but with a class. Therefore, `$this` is not available within a static method.

Ignoring this rule and attempting to use `$this` in a static method results in a fatal error because PHP cannot resolve `$this` without an instance of the class. It is critical to ensure that `$this` is not used in a static context to prevent such fatal errors.

To follow this rule, you should only use `$this` in non-static methods where it will refer to the current object instance. If you need to use a method or property in a static method, consider making that method or property static as well. For example, if you have a property that you need to access in a static method, you can declare it as `public static $property`, and then access it in the static method using `self::$property` instead of `$this->property`.

## Non-Compliant Code Examples
```php
<?php
class Foo {
    public $debug;

    static function print() {
        if ($this->debug) {
            echo "Testing";
        }
    }
}
```

## Compliant Code Examples
```php
<?php
class Foo {
    public $debug;

    public function print() {
        if ($this->debug) {
            echo "Testing";
        }
    }
}
```
