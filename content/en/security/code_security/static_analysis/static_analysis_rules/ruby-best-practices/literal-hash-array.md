---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/literal-hash-array
- /static_analysis/rules/ruby-best-practices/literal-hash-array
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/literal-hash-array
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid array and hash constructor when empty
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/literal-hash-array`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Avoid array and hash constructor when empty" is an important practice in Ruby for creating empty arrays and hashes. It dictates that developers should use literal constructors `[]` for arrays and `{}` for hashes rather than `Array.new` and `Hash.new` when the array or hash being created is empty. 

This rule is important because it promotes code readability and simplicity. The literal constructors `[]` and `{}` are concise, straightforward, and are commonly used in the Ruby community. Using these instead of `Array.new` and `Hash.new` makes the code easier to read and understand.

To adhere to this rule, always use `[]` to initialize an empty array and `{}` to initialize an empty hash. However, it is acceptable to use `Array.new` and `Hash.new` when you are initializing an array or hash with default values, as demonstrated in the compliant code example.

## Non-Compliant Code Examples
```ruby
foo = Array.new
bar = Hash.new
```

## Compliant Code Examples
```ruby
foo = []
bar = {}
# Okay since they contain values
baz = Array.new(42) 
qux = Hash.new(99)
```
