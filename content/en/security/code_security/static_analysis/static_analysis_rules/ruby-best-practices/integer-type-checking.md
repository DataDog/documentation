---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/integer-type-checking
- /static_analysis/rules/ruby-best-practices/integer-type-checking
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/integer-type-checking
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Enforce using Integer to check the type of an integer number
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/integer-type-checking`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule enforces the use of the `Integer` class when performing type checking on integer numbers in Ruby. This is important because, in Ruby, integers can be either `Fixnum` or `Bignum` depending on their size. However, both `Fixnum` and `Bignum` are subclasses of `Integer`, making `Integer` the most appropriate class to use when checking if a number is an integer.

Using `Integer` for type checking increases the readability and maintainability of your code. It avoids the need to check for both `Fixnum` and `Bignum` separately, which can lead to redundant and cluttered code. Additionally, using `Integer` for type checking ensures that your code will continue to work correctly if Ruby changes its implementation of integer numbers in the future.

To abide by this rule and maintain good coding practices, always use `Integer` when checking if a number is an integer. Instead of writing `num.is_a?(Fixnum)` or `num.is_a?(Bignum)`, write `num.is_a?(Integer)`. This ensures your code is succinct, easily understandable, and robust against potential changes in Ruby's integer implementation.

## Non-Compliant Code Examples
```ruby
timestamp.is_a?(Fixnum)
timestamp.is_a?(Bignum)
```

## Compliant Code Examples
```ruby
timestamp.is_a?(Integer)
```
