---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/explicit-method-visibility
- /static_analysis/rules/php-best-practices/explicit-method-visibility
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Best Practices
  id: php-best-practices/explicit-method-visibility
  language: PHP
  severity: Notice
  severity_rank: 3
title: Methods should explicitly declare their visibility
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/explicit-method-visibility`

**Language:** PHP

**Severity:** Notice

**Category:** Best Practices

## Description
In PHP, it's considered best practice to explicitly declare the visibility of methods in a class. The visibility of a method or property can be defined by prefixing the declaration with the keywords `public`, `protected`, or `private`.

The importance of this rule lies in the principle of encapsulation in object-oriented programming. By declaring method visibility, you ensure that your code is more readable, maintainable, and less prone to errors or unexpected behavior. It also helps in controlling the accessibility of the methods, which is crucial for large-scale applications and team projects.

To abide by this rule, always ensure that you specify the visibility when declaring methods in your classes. This could be `public`, `protected`, or `private`, depending on the level of accessibility you want to provide. For example, use `public function test()` instead of just `function test()`. This will ensure your code is compliant, easier to understand, and better organized.

## Non-Compliant Code Examples
```php
<?php
class Foo {
    function test() {
        echo "Test";
    }
}
```

## Compliant Code Examples
```php
<?php
class Foo {
    public function test() {
        echo "Test";
    }
}
```
