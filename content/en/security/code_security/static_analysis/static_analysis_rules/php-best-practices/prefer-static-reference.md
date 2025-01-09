---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/prefer-static-reference
- /static_analysis/rules/php-best-practices/prefer-static-reference
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Best Practices
  id: php-best-practices/prefer-static-reference
  language: PHP
  severity: Warning
  severity_rank: 2
title: References in a static method should prefer static over self
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/prefer-static-reference`

**Language:** PHP

**Severity:** Warning

**Category:** Best Practices

## Description
This rule relates to how static methods are referenced within a class in PHP. The `self` keyword is used to refer to the same class in which the new keyword is being used. However, when dealing with static methods, it's considered best practice to use the `static` keyword instead of `self`.

The reason for this preference lies in the late static binding concept of PHP. If a child class inherits a static method from a parent class and you use `self` to reference it, it will call the parent's version of the method. But if you use `static`, it will call the child's version if it exists, providing more flexibility and correctly implementing the behavior of inheritance in object-oriented programming.

To adhere to this rule, always use `static` instead of `self` when referencing static methods within the same class. For instance, instead of `self::print()`, use `static::print()`. This practice ensures that your code is more robust and adaptable to changes in class hierarchy.

## Non-Compliant Code Examples
```php
<?php
public class Test {
    private static function print() {
        echo "Testing";
    }

    public static function display() {
        self::print();
    }
}
```

## Compliant Code Examples
```php
<?php
public class Test {
    private static function print() {
        echo "Testing";
    }

    public static function display() {
        static::print();
    }
}
```
