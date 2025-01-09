---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/percent-w
- /static_analysis/rules/ruby-best-practices/percent-w
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/percent-w
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer `%w` to the literal array syntax
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/percent-w`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Prefer `%w` to the literal array syntax" is a Ruby style guideline that encourages the use of `%w` notation instead of the traditional array syntax when defining arrays of strings. This rule is part of the Ruby community's efforts to promote readability and simplicity in Ruby code.

This rule is important because it helps to keep the code concise and easy to read. The `%w` notation allows you to define an array of strings without having to use quotes and commas. This can make the code cleaner and easier to understand, especially when dealing with large arrays.

To follow this rule, replace the traditional array syntax with the `%w` notation. For example, instead of writing `['foo', 'bar', 'baz']`, you should write `%w[foo bar baz]`. This will create the same array, but in a more readable and concise way. By following this rule, you can help to make your Ruby code cleaner and easier to understand.

## Non-Compliant Code Examples
```ruby
VALUES = ['foo', 'bar', 'baz']
```

## Compliant Code Examples
```ruby
VALUES = %w[foo bar baz]
```
