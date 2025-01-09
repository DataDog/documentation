---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/eql-string
- /static_analysis/rules/ruby-best-practices/eql-string
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/eql-string
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Do not use eql? for strings
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/eql-string`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Do not use eql? for strings" is a standard practice in Ruby programming. The `eql?` method in Ruby checks if two objects are of the same type and have the same value. While this may seem useful, it can lead to unexpected behavior when comparing strings.

This rule is important because using `eql?` to compare strings can lead to confusing and hard-to-debug issues. For instance, `eql?` will return false when comparing a string to a symbol with the same characters, even though they might seem equivalent to a human reader. 

To avoid violating this rule, it is recommended to use the `==` operator when comparing strings. The `==` operator in Ruby compares the values of two objects for equality, and is more intuitive for string comparisons. For example, instead of writing `'ruby'.eql? some_str`, you should write `'ruby' == some_str`. This will help to avoid potential confusion and make your code more readable and maintainable.

## Non-Compliant Code Examples
```ruby
'ruby'.eql? some_str
```

## Compliant Code Examples
```ruby
'ruby' == some_str
1.0.eql?
```
