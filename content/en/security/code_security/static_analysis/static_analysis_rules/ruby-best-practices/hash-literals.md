---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/hash-literals
- /static_analysis/rules/ruby-best-practices/hash-literals
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/hash-literals
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Use new syntax when keys are symbols
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/hash-literals`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Use new syntax when keys are symbols" is a coding standard in modern Ruby development. It encourages the use of the new hash syntax, introduced in Ruby 1.9, where symbols are used as keys. The old hash rocket syntax (`:symbol => value`) is replaced with the more elegant and succinct `symbol: value` syntax.

This rule is important as it promotes a cleaner, more readable code. The new syntax is more concise and less cluttered, making it easier to understand the structure and purpose of the hash. This is particularly beneficial in large codebases or when hashes are nested or complex.

To adhere to this rule, always use the new syntax when defining hashes where keys are symbols. Instead of defining a hash with `:symbol => value`, use `symbol: value`. This approach will not only make your code more readable but also ensure consistency across your codebase.

## Non-Compliant Code Examples
```ruby
values = { :foo => 42, :bar => 99, :baz => 123 }
```

## Compliant Code Examples
```ruby
values = { foo: 42, bar: 99, baz: 123 }
```
