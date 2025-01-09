---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/hash-key
- /static_analysis/rules/ruby-best-practices/hash-key
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/hash-key
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer using hash key and value
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/hash-key`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Prefer using hash key and value" encourages the use of the `key?` and `value?` methods when working with Ruby hashes, as opposed to the older `has_key?` and `has_value?` methods. These older methods are considered deprecated and may not be supported in future versions of Ruby. 

This rule is important because it promotes the use of more modern, clean, and efficient Ruby syntax. By using `key?` and `value?`, your code will be more readable and maintainable, and you'll avoid potential issues with deprecated methods in future Ruby versions.

To adhere to this rule, replace any instances of `has_key?` with `key?` and `has_value?` with `value?` in your Ruby code. For example, instead of `hash.has_key?(:test)`, you should use `hash.key?(:test)`. Similarly, replace `hash.has_value?(value)` with `hash.value?(value)`. By following these practices, your Ruby code will be more modern, efficient, and future-proof.

## Non-Compliant Code Examples
```ruby
hash.has_key?(:test)
hash.has_value?(value)
```

## Compliant Code Examples
```ruby
hash.key?(:test)
hash.value?(value)
```
