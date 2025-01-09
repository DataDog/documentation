---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/double-colon-method-calls
- /static_analysis/rules/ruby-best-practices/double-colon-method-calls
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/double-colon-method-calls
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Use double colons only to reference constants
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/double-colon-method-calls`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
In Ruby, double colons `::` are used as a namespace resolution operator that allows you to reference constants, including classes and modules, from within different scopes. This rule emphasizes that you should only use double colons to reference these constants.

Using double colons for methods or variables can lead to confusion and unexpected behavior because it deviates from the standard Ruby syntax. It's important to use the correct operators for clarity and to maintain consistency in your code. 

To avoid violating this rule, always use a dot `.` when you want to call a method on an object or class. If you want to reference a constant, use double colons `::`. By following these guidelines, your code will be more readable and easier to understand.

## Non-Compliant Code Examples
```ruby
SomeClass::some_method
some_object::some_method
```

## Compliant Code Examples
```ruby
SomeClass.some_method
some_object.some_method
SomeModule::SomeClass::SOMETHING
SomeModule::SomeClass()
```
